const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/clientForm.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../clientForm.html'));
});

router.get('/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../form.html'));
});

module.exports = router;
