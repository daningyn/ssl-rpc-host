const express = require('express')
const app = express()

app.get('*', function (req, res) {
  res.send('by daningyn');
  res.sendFile(`${__dirname}/landing-html/landing.html`);
})

app.listen(3000)