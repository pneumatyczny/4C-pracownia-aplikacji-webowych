const express = require('express')
const path = require("node:path");
const fs = require("fs");
const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_params', (req, res) => {
    const params = req.query
    const timestamp = Date.now()
    const fileName = `params_${timestamp}+.json`

    fs.writeFile(fileName, JSON.stringify(params), (err) => {
        if (err) {
            console.log(err)
        }
    })
    res.status(200).json({ok:"ok"})
})

app.get('/html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pliczek.html'))
})

app.get('/json', (req, res) => {
    res.json({
        hello: 'world',
    })
})

app.get('/xd', (req, res) => {
    res.sendFile(path.join(__dirname, 'package.json'))
})
app.use(express.static('assets'), (req, res) => {
    // Simulating an asynchronous operation that fails
    res.status(404).json({error:"404"});
})
app.listen(port, () => {
    console.log("App listening at http://localhost:" + port)
})

