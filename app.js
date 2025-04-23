const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 5501;
const path = require('path');
const { exec } = require('child_process');

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


app.post('/calls', (req, res) => {
  const response = {
    // play: "https://file-examples.com/storage/feeed4f6296807c3196e058/2017/11/file_example_MP3_700KB.mp3",
    play: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/Hello.mp3",
    skippable: false
  };
  word = "kai is gae";
  res.status(200).json(response);
});


// app.post('/incoming-call', (req, res) => {
//     const response = {
//       ivr: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/Hello.mp3",
//       digits: 1,
//       timeout: 10,
//       repeat: 3,
//       "1": {
//         "play": "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/ringtone.mp3"
//       },
//       "2":"https://ai-path-f7f6a6c9f0f8.herokuapp.com/calls"
//     };
//     res.status(200).json(response);
//   });


// app.post('/play-music', async (req, res) => {
//     try {
//       const musicData = await generateMusic("A funny music about the great amazon customer service", "Rock", "AWS");
//       const audioUrl = musicData.data[0].audio_url;
  
//       const response = {
//         play: audioUrl,
//         skippable: false
//       };
//       res.status(200).json(response);
//     } catch (error) {
//       console.error("Error generating music:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });

app.post('/sms1', (req, res) => {
    return res.status(200).json({"connect": "+46724037707"});
  });


app.post('/sms', (req, res) => {
  const scriptPath = path.join(__dirname, 'send_sms.py');
  exec(`pip install requests`);
  exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send("SMS sending failed.");
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send("SMS sending error.");
    }
    console.log(`Stdout: ${stdout}`);
    return res.status(200).json({ message: "SMS sent via Python script." });
  });
});


app.post('/incoming-call', (req, res) => {
    const response = {
      ivr: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/Hello.mp3",
      digits: 1,
      timeout: 10,
      repeat: 3,
      "1":"https://ai-path-f7f6a6c9f0f8.herokuapp.com/sms1",
    //   "2":{"https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/hold.mp3"}
    };
    res.status(200).json(response);
  });


// app.post('/incoming-call', (req, res) => {
//     const response = {
//         ivr: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/Hello.mp3",
//         digits: 1,
//         timeout: 10,
//         repeat: 3,
//         "1": "https://ai-path-f7f6a6c9f0f8.herokuapp.com/play-music",
//         "2": "https://ai-path-f7f6a6c9f0f8.herokuapp.com/get-music"
//       };
//     res.status(200).json(response);
//   });

app.get('/', (req, res) => {
    res.status(200);
    res.send(word);
    res.end();
});