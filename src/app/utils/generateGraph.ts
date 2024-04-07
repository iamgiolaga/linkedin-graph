import { COMPANY_COLOR, YOU, YOUR_COLOR } from "../common/constants";
import { NetworkLink, NetworkNode } from "../common/types";

export const generateGraph = (frequencies: Record<string, number>) => {
  const mostFrequentOccurrence = Math.max(...Object.values(frequencies));

  let nodes: NetworkNode[] = [];
  let links: NetworkLink[] = [];

  nodes.push({
    id: "Node 0",
    height: 2,
    size: 32,
    color: YOUR_COLOR,
    label: YOU,
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
      color: COMPANY_COLOR,
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
