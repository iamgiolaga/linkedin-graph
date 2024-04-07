const fs = require("fs");
const csv = require("csv-parser");

const inputPath =
  "/Users/Giovanni/Desktop/network-visualizer/src/app/Connections.csv";
const outputPath =
  "/Users/Giovanni/Desktop/network-visualizer/src/app/graph.json";

let frequencies = {};

fs
  .createReadStream(inputPath)
  .pipe(csv())
  .on("data", (row) => {
    const company = row["_4"];
    if (company) {
      const counter = frequencies[company];
      if (counter) {
        frequencies[company] = counter + 1;
      } else {
        frequencies[company] = 1;
      }
    }
  })
  .on("end", () => {
    generateData(frequencies);
    console.log("CSV file successfully processed");
  });

const generateData = (frequencies) => {
  const mostFrequentOccurrence = Math.max(...Object.values(frequencies))

  let nodes = [];
  let links = [];
  nodes.push({
    id: "Node 0",
    height: 2,
    size: 32,
    color: "rgb(244, 117, 96)",
    label: "You",
  });
  const companies = Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 70);

  companies.forEach((company, index) => {
    const companyFrequency = frequencies[company];
    const normalizedFrequency = Math.log(companyFrequency + 1) / Math.log(mostFrequentOccurrence + 1);
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

  const data = {
    nodes,
    links,
  };

  fs.writeFile(outputPath, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Errore durante la scrittura del file:", err);
    } else {
      console.log("Dati scritti con successo su output.json");
    }
  });
};
