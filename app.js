require('dotenv').config({ path: 'variables.env' })
const express = require('express')
const app = express()
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

const request = require('request')
const multer = require('multer')

const getPrediction = image_url => new Promise((s, j) => {
  request.post({ url: 'http://127.0.0.1:5000/model/predict', formData: {image: image_url}, (e, s, b) => {
    if (err) throw e;
    s(JSON.parse(b));
  })
})

const save = multer({
  dest: './static'
})

app.use(express.static('./static'))

app.post('/predict', (q, s) => {
  const { image, token } = q.body
  if (token != process.env.TOKEN) return s.status(400).send({error: 'Invalid creds!'})
  save.single('file'
})
