import { NetworkLink, NetworkNode } from "../common/types";

export const generateGraph = (frequencies: Record<string, number>) => {
  const mostFrequentOccurrence = Math.max(...Object.values(frequencies));

  let nodes: NetworkNode[] = [];
  let links: NetworkLink[] = [];

  nodes.push({
    id: "Node 0",
    height: 2,
    size: 32,
    color: "rgb(244, 117, 96)",
    label: "You",
  });

  const companies = Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, 70);

  companies.forEach((company, index) => {
    const companyFrequency = frequencies[company];
    const normalizedFrequency =
      Math.log(companyFrequency + 1) / Math.log(mostFrequentOccurrence + 1);
    const distance = (1 - normalizedFrequency) * 300;

    nodes.push({
      id: `Node ${index + 1}`,
      height: 1,
      size: 24,
      color: "rgb(97, 205, 187)",
      label: `${company} (${companyFrequency})`,
    });
    links.push({
      source: "Node 0",
      target: `Node ${index + 1}`,
      distance,
    });
  });

  return {
    nodes,
    links,
  };
};
