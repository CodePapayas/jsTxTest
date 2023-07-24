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

  const db = client.db('AnswerObjects');
  const providerAnswersCollection = db.collection('providerAnswers');
  const patientAnswersCollection = db.collection('patientAnswers');

  router.get('/api/providerAnswers', async (req, res) => {
    try {
      const providerAnswers = await providerAnswersCollection.find().toArray();
      res.json(providerAnswers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/api/patientAnswers', async (req, res) => {
    try {
      const patientAnswers = await patientAnswersCollection.find().toArray();
      res.json(patientAnswers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;
