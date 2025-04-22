const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 5501;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let word = "Hello World!";

server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log('Server running on port ' + port);
});

// app.post('/calls', (req, res) => {
//     console.log(req.body);
//     const phoneNumber = "+46738514392"; // Replace with a real, validated number
//     res.status(200).json({ connect: phoneNumber });
//     word = "kai is gae"
//     res.end();
// });

app.post('/call1', (req, res) => {
    const phoneNumber = "+46123456789"; // temporary test number
    console.log("Received request from 47elks:", req.body);
    console.log("Responding with number:", phoneNumber);
    res.status(200).json({ connect: phoneNumber });
});

app.post('/calls', (req, res) => {
  const response = {
    // play: "https://file-examples.com/storage/feeed4f6296807c3196e058/2017/11/file_example_MP3_700KB.mp3",
    play: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/ringtone.mp3",
    skippable: false
  };
  word = "kai is gae";
  res.status(200).json(response);
});


app.post('/incoming-call', (req, res) => {
    const response = {
      ivr: {
        play: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/press1.mp3",
        options: {
          "1": "https://ai-path-f7f6a6c9f0f8.herokuapp.com/calls"
        },
        timeout: 10,
        maxdigits: 1
      }
    };
    res.status(200).json(response);
  });

app.get('/', (req, res) => {
    res.status(200);
    res.send(word);
    res.end();
});