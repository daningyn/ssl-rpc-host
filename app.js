const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('by daningyn');
})

app.listen(3000)