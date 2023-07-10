const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

//Parse HTML forms
app.use(express.urlencoded({ extended: true}));
//Parse JSON
app.use(express.json());
//Handle static files
app.use(express.static(__dirname + 'jsTxTest'));

//Set MIME type for CSS
app.get('/styles.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/styles.css');
  });


//home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
}
);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.post('/submit', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const sameGenderQ = req.body.sameGenderQ;
    const age = req.body.age;
    const race = req.body.race;
    const lgbt = req.body.lgbt;
    const modal = req.body.modal;

    const pop = Array.isArray(req.body.pop) ? req.body.pop : [req.body.pop];

    let popData = [];
    if (pop) {
        for (let i = 0; i < pop.length; i++) {
            let x = Number(pop[i]) / 4;
            popData.push(x);
        }
    }

    const symp = Array.isArray(req.body.symp) ? req.body.symp : [req.body.symp];

    let sympData = [];
    if (symp) {
        for (let i = 0; i < symp.length; i++) {
            let x = Number(symp[i]) / 4;
            sympData.push(x);
        }
    }

    const txAnswers = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        sameGenderQ: sameGenderQ,
        age: age,
        race: race,
        lgbt: lgbt,
        modal: modal,
        popData: popData,
        sympData: sympData
      };
      

fs.appendFile("./answers.txt", JSON.stringify(txAnswers), (err) => {
    if (err) {
    console.log(err);
    }else {
    console.log('Data written successfully');
    res.sendFile(__dirname + "/finish.html");
    };
});





});