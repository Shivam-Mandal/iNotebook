<<<<<<< HEAD
const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const app = express()
const port = 5173

const cors = require('cors')
 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
=======
const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const app = express()
const port = 5173

const cors = require('cors') 
 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
>>>>>>> master
})