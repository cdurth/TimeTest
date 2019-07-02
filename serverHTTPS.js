const express = require('express')
var fs = require('fs')
var https = require('https')
const app = express()
const port = 3000

const makeRequestOptions = {
    hostname: 'localhost',
    port: port,
    path: '/timestamp',
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
}

function makeRequest(){
    console.log('Making HTTPS GET request')
    const req = https.request(makeRequestOptions, (res) => {
        res.on('data', (d) => {
          console.log('HTTPS GET Response: '+ d)
        })
      })
      
      req.on('error', (error) => {
        console.error('An error occured: '+ error)
      })
      
      req.end()
}

app.get('/timestamp', (req, res) => {
    let returnObj = {
        timestamp: new Date().toISOString()
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(returnObj)
})

setInterval(makeRequest,5000)

https.createServer({
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.cert')
  }, app)
.listen(port, () => console.log(`HTTPS Server started on port ${port}!`))

module.exports = app;