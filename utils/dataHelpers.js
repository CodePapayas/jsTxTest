const fs = require('fs');

function readDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    throw new Error('Internal server error');
  }
}

module.exports = {
  readDataFromFile,
};

