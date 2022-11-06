const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//middle Wares
//cors => Cross Origin Resource Sharing
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aes3u62.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
  const productCollection = client.db('emaJohn').collection('products')

  try {
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray()
      res.send(result)
    })
  }
  finally {

  }
}

run().catch(err => console.error(err))


app.get('/', (req, res) => {
  res.send('Hello from Ema John Server')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})