const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Arcnc is running')
});


// mongodb code start
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.ARCNC_DB_USER}:${process.env.ARCNC_DB_PASSWORD}@cluster0.pphnrsn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1 });

async function run() {
    try {
        const collections = client.db("ARCNC")
        const usersCollection = collections.collection("users");


        /**save User in DB*/
        app.put('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const options = { upsert: true };
            const updatedDock = {
                $set: req.body
            };
            const result = await usersCollection.updateOne(query, updatedDock, options);
            res.send(result);
        });





    } finally {
        // await client.close();
    }
}
run().catch(console.dir);
// mongodb end


app.listen(port, () => {
    console.log(`last section server in running port of ${port}`)
})