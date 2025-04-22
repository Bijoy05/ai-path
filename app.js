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
    res.status(200);
    console.log(req.body);
    const phoneNumber = "+46738514392"; // Replace with a real, validated number
    res.status(200).json({ connect: phoneNumber });
    word = "I love fat women"
    res.end();
});

app.get('/', (req, res) => {
    res.status(200);
    res.send(word);
    res.end();
}       );