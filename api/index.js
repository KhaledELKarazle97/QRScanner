const {MongoClient} = require('mongodb');//import mongoclient
const express = require('express');
require('dotenv').config();
const app = express()
const port = process.env.PORT
const uri = process.env.DB_URL;

const client = new MongoClient(uri);
    try {
        // Connecting to my cluster
        client.connect();
        console.log('CONNECTED')
    } 
    catch (e) {
        console.error(e);
    }

app.use(express.json());

app.get('/',(req,res)=>{
    client.db('QRScanner').collection('QR_Code_Data').find({}).toArray((err,res)=>{
        console.log(res)
    })
    res.send('')
})

app.post('/saveData',(req,res)=>{
    let QRURL = req.body.QRURL;
    let now = Date()
    client.db("QRScanner").collection("QR_Code_Data").insertOne({
        URL:QRURL,
        date:now 
    }).then((res)=>{
        console.log(res)
        res.sendStatus(200)
    }).catch((er)=>{
        res.send(er)
    })
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})