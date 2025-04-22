const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 5501;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let word = "Hello World!";


const axios = require('axios');

async function generateMusic(prompt, style, title) {
  const response = await axios.post('https://apibox.erweima.ai/api/v1/generate', {
    prompt: prompt,
    style: style,
    title: title,
    customMode: true,
    instrumental: true,
    model: "V3_5"
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}


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


app.post('/play-music', (req, res) => {
    const response = {
      play: "https://file-examples.com/storage/feeed4f6296807c3196e058/2017/11/file_example_MP3_700KB.mp3",
      skippable: false
    };
    res.status(200).json(response);
  });


app.post('/incoming-call', (req, res) => {
    const response = {
        ivr: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/Hello.mp3",
        digits: 1,
        timeout: 10,
        repeat: 3,
        "1": "https://ai-path-f7f6a6c9f0f8.herokuapp.com/play-music"
      };
    res.status(200).json(response);
  });

app.get('/', (req, res) => {
    res.status(200);
    res.send(word);
    res.end();
});