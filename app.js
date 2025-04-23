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


app.post('/play-music', async (req, res) => {
  try {
    const musicData = await axios.post('https://apibox.erweima.ai/api/v1/generate', {
      prompt: "A funny music about the great amazon customer service",
      style: "Rock",
      title: "AWS",
      customMode: true,
      instrumental: true,
      model: "V3_5"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const taskId = musicData.data.task_id;
    if (!taskId) {
      throw new Error("No task_id returned from Suno API");
    }

    console.log("Music generation started with task ID:", taskId);

    // Immediately return a holding tone while music is being generated
    res.status(200).json({
      play: "https://ai-path-f7f6a6c9f0f8.herokuapp.com/media/hold.mp3",
      skippable: false
    });

    // Start polling in the background
    const pollForAudio = async () => {
      let tries = 0;
      while (tries < 12) { // Poll up to 60 seconds (12 x 5s)
        try {
          const status = await axios.get(`https://apibox.erweima.ai/api/v1/status/${taskId}`, {
            headers: {
              'Authorization': `Bearer ${process.env.SUNO_API_KEY}`
            }
          });

          if (status.data.status === "completed" && status.data.audio_url) {
            console.log("Music ready:", status.data.audio_url);
            // You can optionally store the audio_url in memory or DB for later streaming
            break;
          }
        } catch (err) {
          console.error("Polling error:", err.message);
        }
        await new Promise(res => setTimeout(res, 5000));
        tries++;
      }
    };

    pollForAudio();

  } catch (error) {
    console.error("Error in async music generation:", error.message);
    res.status(200).json({
      play: "https://file-examples.com/storage/feeed4f6296807c3196e058/2017/11/file_example_MP3_700KB.mp3",
      skippable: false
    });
  }
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