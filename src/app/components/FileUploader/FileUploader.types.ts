import type { NetworkGraphProps } from "../NetworkGraph/NetworkGraph.types";

export type FileUploaderProps = {
  setGraph: (graph: NetworkGraphProps["data"]) => void;
};
