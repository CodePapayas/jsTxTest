const express = require('express');
const app = express();
const port = 3000;

//Parse HTML forms
app.use(express.urlencoded({ extended: true}));
//Parse JSON
app.use(express.json());
//Handle static files
app.use(express.static('/jsTxTest'));

//Route to home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
}
);

//Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//Grab info from form and send response
app.post('/submit', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthday = req.body.birthday;

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Birthday:', birthday);

    res.send(`Hello, ${firstName} ${lastName}, born ${birthday}.`);

})