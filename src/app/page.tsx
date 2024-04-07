"use client";

import React from "react";
import { NetworkGraph } from "./components/NetworkGraph/NetworkGraph";
import data from "./graph.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      POC to show network graph
      <br />
      <br />
      <div style={{ width: 600, height: 600 }}>
        <NetworkGraph data={data} />
      </div>
    </main>
  );
}
