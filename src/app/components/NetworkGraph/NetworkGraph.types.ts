import type { NetworkNode, NetworkLink } from "@/app/common/types";
import { NetworkDataProps } from "@nivo/network";

export type NetworkGraphProps = NetworkDataProps<NetworkNode, NetworkLink>;
