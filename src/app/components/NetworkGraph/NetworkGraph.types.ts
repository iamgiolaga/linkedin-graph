import { InputLink, InputNode, NetworkDataProps } from "@nivo/network";

export type NetworkGraphProps = NetworkDataProps<
  InputNode & { color: string; height: number; label: string; size: number },
  InputLink & { distance: number }
>;
