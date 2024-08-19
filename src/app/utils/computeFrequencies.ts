type Connection = {
  Company: string;
  "Connected On": string;
  "Email Address": string;
  "First Name": string;
  "Last Name": string;
  Position: string;
  URL: string;
};

export const computeFrequencies = (connections: Connection[]) => {
  let frequencies: Record<string, number> = {};

  connections.forEach((row, _) => {
    const company = row.Company;
    if (company) {
      const counter = frequencies[company];
      if (counter) {
        frequencies[company] = counter + 1;
      } else {
        frequencies[company] = 1;
      }
    }
  });

  return frequencies;
};
