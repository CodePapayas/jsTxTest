const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const router = express.Router();
const uri =
	'mongodb+srv://CodePapayas:Pistachios2050@cluster0.crlnuvw.mongodb.net/?retryWrites=true&w=majority';
const { divideArrayByFactor } = require('../utils/arrayHelpers.js');

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

router.post('/provider-submit', async (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const gender = req.body.gender;
	const age = req.body.age;
	const race = req.body.race;
	const lgbt = req.body.lgbt;
	const modal = req.body.modal;

	const popData = divideArrayByFactor(req.body.pop, 3);
	const sympData = divideArrayByFactor(req.body.symptoms, 3);

	const txAnswers = {
		firstName: firstName,
		lastName: lastName,
		gender: gender,
		age: age,
		race: race,
		lgbt: lgbt,
		modal: modal,
		popData: popData,
		sympData: sympData,
	};

	try {
		await client.connect();

		const db = client.db('AnswerObjects');
		const collection = db.collection('ProviderAnswers');

		await collection.insertOne(txAnswers);

		console.log('Data written successfully');
		res.sendFile('finish.html', { root: '.' });
	} catch (error) {
		console.error('Error writing data to MongoDB:', error);
	} finally {
		await client.close(); // Close the MongoDB connection
	}
});

router.post('/patient-submit', async (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const gender = req.body.txGender;
	const age = req.body.txAge;
	const race = req.body.race;
	const lgbt = req.body.lgbt;
	const modal = req.body.modal;

	const popData = divideArrayByFactor(req.body.pop, 3);
	const sympData = divideArrayByFactor(req.body.symptoms, 3);

	const ptAnswers = {
		firstName: firstName,
		lastName: lastName,
		gender: gender,
		age: age,
		race: race,
		lgbt: lgbt,
		modal: modal,
		popData: popData,
		sympData: sympData,
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
		await client.close();
	}
});

module.exports = router;
