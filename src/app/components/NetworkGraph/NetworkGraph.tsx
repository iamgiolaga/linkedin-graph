import { ResponsiveNetwork } from "@nivo/network";
import React, { FC } from "react";
import type { NetworkGraphProps } from "./NetworkGraph.types";
import { LINK_COLOR, NODE_BORDER_COLOR } from "@/app/common/constants";

export const NetworkGraph: FC<NetworkGraphProps> = ({ data }) => (
  <ResponsiveNetwork
    data={data}
    linkDistance={(e) => e.distance}
    centeringStrength={1.2}
    repulsivity={66}
    nodeSize={(n) => n.size}
    activeNodeSize={(n) => 1.5 * n.size}
    nodeColor={(e) => e.color}
    linkColor={LINK_COLOR}
    nodeBorderWidth={2}
    nodeBorderColor={NODE_BORDER_COLOR}
    nodeTooltip={(e) => e.node.data.label}
    linkThickness={(n) => 2 + 2 * n.target.data.height}
    linkBlendMode="multiply"
    motionConfig="wobbly"
  />
);
