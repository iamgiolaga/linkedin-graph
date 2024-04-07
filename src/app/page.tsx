"use client";

import React, { useState } from "react";
import { NetworkGraph } from "./components/NetworkGraph/NetworkGraph";
import { FileUploader } from "./components/FileUploader/FileUploader";
import type { NetworkGraphProps } from "./components/NetworkGraph/NetworkGraph.types";

export default function Home() {
  const [graph, setGraph] = useState<NetworkGraphProps["data"]>();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>POC to show network graph</h1>
      <br />
      <br />
      <FileUploader setGraph={setGraph} />
      {graph && (
        <div style={{ width: 600, height: 600 }}>
          <NetworkGraph data={graph} />
        </div>
      )}
    </main>
  );
}
