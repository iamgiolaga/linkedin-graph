export const computeFrequencies = (connections: string[][]) => {
  let frequencies: Record<string, number> = {};

  connections.forEach((row, index) => {
    if (index > 3) {
      const company = row[4];
      if (company) {
        const counter = frequencies[company];
        if (counter) {
          frequencies[company] = counter + 1;
        } else {
          frequencies[company] = 1;
        }
      }
    }
  });

  return frequencies;
};
