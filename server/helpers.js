const parse = require('csv-parse/lib/sync');
const fs = require('fs').promises;

function calculateMeanSpO2FromCsv(fileName) {
  return fs.readFile(fileName, 'utf8').then((data) => {
    const measurement = parse(data, {
      columns: true,
    });

    if (!measurement.length) return null;

    return (
      measurement.reduce((acc, instance) => acc + parseInt(instance['SPO2']), 0) /
      measurement.length
    );
  });
}

module.exports = { calculateMeanSpO2FromCsv };
