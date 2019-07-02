const express = require('express')
var fs = require('fs')
var https = require('http')
const app = express()
const port = 3000

const makeRequestOptions = {
    hostname: 'localhost',
    port: port,
    path: '/timestamp',
    method: 'GET',
}

function makeRequest(){
    console.log('Making HTTP GET request')
    const req = https.request(makeRequestOptions, (res) => {
      
        res.on('data', (d) => {
          console.log('HTTP GET Response: '+ d)
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

app.listen(port, () => console.log(`HTTP Server started on port ${port}!`))

module.exports = app;