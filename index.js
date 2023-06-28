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

//Route to home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
}
);

//Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.post('/submit', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;

    const pop = Array.isArray(req.body.pop) ? req.body.pop : [req.body.pop];
    let data = '';
    if (pop) {
        for (let i = 0; i < pop.length; i++) {
            let x = Number(pop[i]) / 4;
            data =+ x + "\n";
        }
    }

    console.log(data);
fs.appendFile(__dirname + "txResults.csv", data, "utf-8", (err) => {
    if (err) console.log(err);
    else console.log('data saved');
})

})