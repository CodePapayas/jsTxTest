const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const router = express.Router();
const uri = "mongodb+srv://CodePapayas:Pistachios2050@cluster0.crlnuvw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.post('/provider-submit', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const txGender = req.body.txGender;
  const txAge = req.body.txAge;
  const otherGendarA1 = req.body.otherGendarA1;
  const age = req.body.age;
  const race = req.body.race;
  const lgbt = req.body.lgbt;
  const modal = req.body.modal;

  const pop = Array.isArray(req.body.pop) ? req.body.pop : [req.body.pop];

  let popData = [];
  if (pop) {
    for (let i = 0; i < pop.length; i++) {
      let x = Number(pop[i]) / 3;
      let xRounded = x.toFixed(3);
      popData.push(Number(xRounded));
    }
  }

  const symptoms = Array.isArray(req.body.symptoms) ? req.body.symptoms : [req.body.symptoms];

  let sympData = [];
  if (symptoms) {
    for (let i = 0; i < pop.length; i++) {
      let x = Number(pop[i]) / 3;
      let xRounded = x.toFixed(3);
      sympData.push(Number(xRounded));
    }
  }


  const txAnswers = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    txGender: txGender,
    txAge: txAge,
    otherGendarA1: otherGendarA1,
    age: age,
    race: race,
    lgbt: lgbt,
    modal: modal,
    popData: popData,
    sympData: sympData
  };

  try {
    await client.connect();

    const db = client.db('AnswerObjects');
    const collection = db.collection('ProviderAnswers');

    await collection.insertOne(txAnswers);

    console.log('Data written successfully');
    res.sendFile('finish.html', { root:'.'});
  } catch (error) {
    console.error('Error writing data to MongoDB:', error);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

router.post('/patient-submit', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const txGender = req.body.txGender;
  const txAge = req.body.txAge;
  const otherGendarA1 = req.body.otherGendarA1
  const age = req.body.age;
  const race = req.body.race;
  const lgbt = req.body.lgbt;
  const modal = req.body.modal;

  const pop = Array.isArray(req.body.pop) ? req.body.pop : [req.body.pop];

  let popData = [];
  if (pop) {
    for (let i = 0; i < pop.length; i++) {
      let x = Number(pop[i]) / 3;
      let xRounded = x.toFixed(3);
      popData.push(Number(xRounded));
    }
  }

  const symptoms = Array.isArray(req.body.symptoms) ? req.body.symptoms : [req.body.symptoms];

  let sympData = [];
  if (symptoms) {
    for (let i = 0; i < symptoms.length; i++) {
      let x = Number(symptoms[i]) / 3;
      let xRounded = x.toFixed(3);
      sympData.push(Number(xRounded));
    }
  }


  const txAnswers = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    txGender: txGender,
    txAge: txAge,
    otherGendarA1: otherGendarA1,
    age: age,
    race: race,
    lgbt: lgbt,
    modal: modal,
    popData: popData,
    sympData: sympData
  };

  try {
    await client.connect();

    const db = client.db('AnswerObjects');
    const collection = db.collection('PatientAnswers');

    await collection.insertOne(txAnswers);

    console.log('Data written successfully');
    res.sendFile('finish.html', { root:'.'});
  } catch (error) {
    console.error('Error writing data to MongoDB:', error);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});


module.exports = router;
