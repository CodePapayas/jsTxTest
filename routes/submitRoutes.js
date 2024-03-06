const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Connect to SQLite db
const db = new sqlite3.Database('./test_db_3_24.sqlite3', (err) => {
	if (err) {
		return console.log(err.message);
	}
	console.log('Connected to the database.');
});

// Check tables exist
const initDb = () => {
	db.run(`
		CREATE TABLE IF NOT EXISTS ProviderAnswers (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			intern TEXT,
			firstName TEXT,
			lastName TEXT,
			txGender TEXT,
			age INTEGER,
			race TEXT,
			lgbt TEXT,
			modal TEXT,
			popData TEXT,
			sympData TEXT
		)
	`);

	db.run(`
		CREATE TABLE IF NOT EXISTS PatientAnswers (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			intern TEXT,
			firstName TEXT,
			lastName TEXT,
			txGender TEXT,
			age INTEGER,
			race TEXT,
			lgbt TEXT,
			modal TEXT,
			popData TEXT,
			sympData TEXT
		)
	`);
};

// Initialize db tables
initDb();

router.post('/provider-submit', async (req, res) => {
    const { intern, firstName, lastName, txGender, age, race, lgbt, modal, modalOther, pop, symptoms } = req.body;
    let popData = pop ? (Array.isArray(pop) ? pop : JSON.parse(pop)) : [];
    let sympData = symptoms ? (Array.isArray(symptoms) ? symptoms : JSON.parse(symptoms)) : [];
	let modalData = Array.isArray(modal) ? modal : (modal ? [modal] : []);
	if (modalOther) {
		modalData.push(modalOther);
	}
    const sql = `INSERT INTO ProviderAnswers (intern, firstName, lastName, txGender, age, race, lgbt, modal, popData, sympData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [intern, firstName, lastName, txGender, age, race, lgbt, JSON.stringify(popData), JSON.stringify(sympData), JSON.stringify(modalData)], (err) => {
        if (err) {
            console.error('Error writing data to SQLite:', err);
            return res.status(500).send('Error writing data to SQLite');
        }
        console.log('Provider data written successfully');
        res.sendFile('finish.html', {root: '.'});
    });
});

router.post('/patient-submit', async (req, res) => {
    const { intern, firstName, lastName, txGender, age, race, lgbt, modal, modalOther, pop, symptoms } = req.body;
    let popData = pop ? (Array.isArray(pop) ? pop : JSON.parse(pop)) : [];
    let sympData = symptoms ? (Array.isArray(symptoms) ? symptoms : JSON.parse(symptoms)) : [];
	let modalData = Array.isArray(modal) ? modal : (modal ? [modal] : []);
	if (modalOther) {
		modalData.push(modalOther);
	}

    const sql = `INSERT INTO PatientAnswers (intern, firstName, lastName, txGender, age, race, lgbt, modal, popData, sympData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [intern, firstName, lastName, txGender, age, race, lgbt, JSON.stringify(popData), JSON.stringify(sympData), JSON.stringify(modalData)], (err) => {
        if (err) {
            console.error('Error writing data to SQLite:', err);
            return res.status(500).send('Error writing data to SQLite');
        }
        console.log('Patient data written successfully');
        res.sendFile('finish.html', {root: '.'});
    });
});


// Export router
module.exports = router;
