const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/styles.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, '../styles.css'));
});

router.get('/script.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../script.js'));
});

router.get('/vue.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../vue.js'));
});

  module.exports = router;
