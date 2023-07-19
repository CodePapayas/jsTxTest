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

router.post('/form', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const sameGenderQ = req.body.sameGenderQ;
  const otherGenderA = req.body.otherGenderA;
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


  const txAnswers = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    sameGenderQ: sameGenderQ,
    otherGenderA: otherGenderA,
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

router.post('/submit', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const txGender = req.body.txGender;
  const txAge = req.body.txAge;
  const age = req.body.age;
  const race = req.body.race;
  const lgbt = req.body.lgbt;
  const depression = req.body.depression;
  const anxiety = req.body.anxiety;
  const impactoftrauma = req.body.impactoftrauma;
  const psychosis = req.body.psychosis;
  const obsessivesymptoms = req.body.obsessivesymptoms;
  const bipolarsymptoms = req.body.bipolarsymptoms;
  const disorderedeating = req.body.disorderedeating;

  const pop = Array.isArray(req.body.pop) ? req.body.pop : [req.body.pop];

  let popData = [];
  if (pop) {
    for (let i = 0; i < pop.length; i++) {
      let x = Number(pop[i]) / 3;
      let xRounded = x.toFixed(3);
      popData.push(Number(xRounded));
    }
  }

  const ptAnswers = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    txGender: txGender,
    txAge: txAge,
    age: age,
    race: race,
    lgbt: lgbt,
    popData: popData,
    depression: depression,
    anxiety: anxiety,
    impactoftrauma: impactoftrauma,
    psychosis: psychosis,
    obsessivesymptoms: obsessivesymptoms,
    bipolarsymptoms: bipolarsymptoms,
    disorderedeating: disorderedeating
  };

  try {
    await client.connect();

    const db = client.db('AnswerObjects');
    const collection = db.collection('PatientAnswers');

    await collection.insertOne(ptAnswers);

    console.log('Data written successfully');
    res.sendFile('finish.html', { root: '.' });
  } catch (error) {
    console.error('Error writing data to MongoDB:', error);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});


module.exports = router;
