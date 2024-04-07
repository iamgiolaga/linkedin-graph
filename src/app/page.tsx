"use client";

import React, { useState } from "react";
import { NetworkGraph } from "./components/NetworkGraph/NetworkGraph";
import { FileUploader } from "./components/FileUploader/FileUploader";
import type { NetworkGraphProps } from "./components/NetworkGraph/NetworkGraph.types";

export default function Home() {
  const [graph, setGraph] = useState<NetworkGraphProps["data"]>();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      POC to show network graph
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
