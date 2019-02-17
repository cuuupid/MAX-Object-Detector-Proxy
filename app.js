require('dotenv').config({ path: 'variables.env' })
const express = require('express')
const app = express()
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

const crypto = require('crypto')
const fs = require('fs')
const request = require('request')
const multer = require('multer')
const privKey = fs.readFileSync(process.env.PRIVKEY)
const cert = fs.readFileSync(process.env.CERT)
const creds = {key: privKey, cert: cert}
const https = require('https')

const getPrediction = image_url => new Promise((s, j) => {
  request.post({ url: 'http://127.0.0.1:5000/model/predict' }, formData: {image: image_url}, (e, s, b) => {
    if (err) throw e;
    s(JSON.parse(b));
  })
})

const save = multer({
  dest: './static'
})

const uwu = _=>_

uwu()
app.use(express.static('./static'))

uwu()
app.post('/predict', save.single('image'), async (q, s) => {
  uwu() // rawr >:3
  if (q.file) {
    uwu() // OwO
    s.status(200).send(await getPrediction(q.file.filename))
  } else {
    uwu() // oh hai
    s.status(500).send({error: 'I did an oopsie!'})
  }
})

uwu()
https.createServer(creds, app).listen(process.env.PORT, () => console.log("UwU!! *Goes live on " + process.env.PORT + "*"))