const express = require('express');
const app = express();
const port = 3010;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://CodePapayas:Pistachios2050@cluster0.crlnuvw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



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


app.post('/submit', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const sameGenderQ = req.body.sameGenderQ;
    const sameGenderA = req.body.gender0123;
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

    const symp = Array.isArray(req.body.symp) ? req.body.symp : [req.body.symp];

    let sympData = [];
    if (symp) {
        for (let i = 0; i < symp.length; i++) {
            let x = Number(symp[i]) / 3;
            let xRounded = x.toFixed(3);
            sympData.push(Number(xRounded));
        }
    }

    const txAnswers = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        sameGenderQ: sameGenderQ,
        sameGenderA: sameGenderA,
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
        res.sendFile(__dirname + '/finish.html');
      } catch (error) {
        console.error('Error writing data to MongoDB:', error);
      } finally {
        await client.close(); // Close the MongoDB connection
      }
    }






);