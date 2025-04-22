const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 5501;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let word = "Hello World!";

server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log('Server running on port ' + port);
});

app.post('/calls', (req, res) => {
    console.log(req.body);
    const phoneNumber = "+46738514392"; // Replace with a real, validated number
    res.status(200).json({ connect: phoneNumber });
    word = "I love fat women"
    res.end();
});

app.post('/call1', (req, res) => {
    const phoneNumber = "+46123456789"; // temporary test number
    console.log("Received request from 47elks:", req.body);
    console.log("Responding with number:", phoneNumber);
    res.status(200).json({ connect: phoneNumber });
});

app.get('/', (req, res) => {
    res.status(200);
    res.send(word);
    res.end();
}       );