"use client";

import React, { useState } from "react";
import { NetworkGraph } from "./components/NetworkGraph/NetworkGraph";
import { FileUploader } from "./components/FileUploader/FileUploader";
import type { NetworkGraphProps } from "./components/NetworkGraph/NetworkGraph.types";
import * as S from "./page.styles";

export default function Home() {
  const [graph, setGraph] = useState<NetworkGraphProps["data"]>();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <S.StyledLinkedInIcon fontSize="large" />
      <S.StyledHeaderWrapper>
        <h1>Visualize your professional network</h1>
      </S.StyledHeaderWrapper>

      <br />
      <br />
      <p>
        1. Go under <b>Me</b>, choose <b>Settings & Privacy</b> and search for{" "}
        <b>Data Privacy</b> section. Click <b>Get a copy of your data</b>,
        select <b>Connections</b> and <b>Request archive</b>.
      </p>
      <p>2. Wait for the archive to be available (approximately 10 mins)</p>
      <p>3. Download the file and upload it here 👇🏻</p>
      <br />
      <br />

      <FileUploader setGraph={setGraph} />
      <br />
      <br />

      {graph && (
        <div style={{ width: 600, height: 600 }}>
          <NetworkGraph data={graph} />
        </div>
      )}
    </main>
  );
}
