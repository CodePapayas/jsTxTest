const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

//Parse HTML forms
app.use(express.urlencoded({ extended: true}));
//Parse JSON
app.use(express.json());
//Handle static files
app.use(express.static('jsTxTest'));

//home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
}
);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.post('/submit', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const gender = req.body.gender;
    const sameGenderQ = req.body.sameGenderQ;
    const age = req.body.age;
    const race = req.body.race;
    const lgbt = req.body.lgbt;
    const modal = req.body.modal;

    const pop = Array.isArray(req.body.pop) ? req.body.pop : [req.body.pop];

    let data = '';
    if (pop) {
        for (let i = 0; i < pop.length; i++) {
            let x = Number(pop[i]) / 4;
            data += x + "\n";
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
        data: data
      };
      

fs.appendFile("answers.txt", txAnswers, (err) => {
    if (err)
    console.log(err);
    else
    console.log('Data written successfully')
})
});