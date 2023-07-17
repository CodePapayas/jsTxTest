const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/presenting-issues', (req, res) => {
  try {
    const data = fs.readFileSync('presentingIssues.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/populations', (req, res) => {
  try {
    const data = fs.readFileSync('populations.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
