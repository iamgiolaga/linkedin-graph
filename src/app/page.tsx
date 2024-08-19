"use client";

import React, { useCallback, useEffect, useState } from "react";
import { NetworkGraph } from "./components/NetworkGraph/NetworkGraph";
import type { NetworkGraphProps } from "./components/NetworkGraph/NetworkGraph.types";
import * as S from "./page.styles";
import { GITHUB_REPOSITORY_URL } from "./common/constants";
import { ConnectButton } from "./components/ConnectButton/ConnectButton";
import { computeFrequencies } from "./utils/computeFrequencies";
import { generateGraph } from "./utils/generateGraph";

export default function Home() {
  const [graph, setGraph] = useState<NetworkGraphProps["data"]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkTokenValidity = useCallback(async () => {
    try {
      const response = await fetch("/api/check-token-validity");
      return response.ok;
    } catch (err) {
      setError(true);
      return false;
    }
  }, []);

  const fetchConnections = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/snapshot");
      const { snapshotData } = await response.json();
      setError(false);
      const frequencies = computeFrequencies(snapshotData);
      const graph = generateGraph(frequencies);
      setGraph(graph);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (await checkTokenValidity()) {
        await fetchConnections();
      }
    };

    initialize();
  }, [checkTokenValidity, fetchConnections]);

  const displayContent = () => {
    if (loading) {
      return "Generating graph...";
    }
    if (error) {
      return <ConnectButton />;
    }
    if (graph) {
      return (
        <div style={{ width: 600, height: 600 }}>
          <NetworkGraph data={graph} />
        </div>
      );
    }

    return <ConnectButton />;
  };

  return (
    <>
      <a href={GITHUB_REPOSITORY_URL} target="_blank">
        <S.StyledGithubIcon />
      </a>
      <main className="flex flex-col items-center" style={{ height: "140vh" }}>
        <S.StyledLinkedInIcon fontSize="large" />
        <S.StyledHeaderWrapper>
          <h1>Visualize your professional network</h1>
        </S.StyledHeaderWrapper>
        {displayContent()}
      </main>
      <small style={{ position: "fixed", bottom: 0, opacity: 0.3 }}>
        This website is intended for illustrative, non-profit, and learning
        purposes only. Please note that this website is not affiliated with
        LinkedIn Corporation. We adhere to LinkedIn&apos;s guidelines and
        policies regarding the use of their trademarks and brand features.
      </small>
    </>
  );
}
