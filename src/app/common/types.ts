import { InputLink, InputNode } from "@nivo/network";

export type NetworkNode = InputNode & {
  color: string;
  height: number;
  label: string;
  size: number;
};

export type NetworkLink = InputLink & { distance: number };
