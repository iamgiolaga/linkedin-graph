import { ResponsiveNetwork } from "@nivo/network";
import React from "react";
import type { NetworkGraphProps } from "./NetworkGraph.types";

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => (
  <ResponsiveNetwork
    data={data}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    linkDistance={(e) => e.distance}
    centeringStrength={1.2}
    repulsivity={66}
    nodeSize={(n) => n.size}
    activeNodeSize={(n) => 1.5 * n.size}
    nodeColor={(e) => e.color}
    nodeBorderWidth={1}
    nodeBorderColor={{
      from: "color",
      modifiers: [["darker", 0.8]],
    }}
    nodeTooltip={(e) => e.node.data.label}
    linkThickness={(n) => 2 + 2 * n.target.data.height}
    linkBlendMode="multiply"
    motionConfig="wobbly"
  />
);
