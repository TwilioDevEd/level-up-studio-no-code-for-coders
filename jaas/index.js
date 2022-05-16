const express = require("express");
const axios = require("axios");

const app = express();  

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/api/jokes", async (req, res) => {
  // TODO: Use the our database instead of Dad Joke API
  const response = await axios.get("https://icanhazdadjoke.com",{
    headers: {
      "Accept": "application/json",
      "User-Agent": "Twilio Studio Demo - jaas - cdennis@twilio.com"
    }
  });
  console.log(`Retrieved joke ${JSON.stringify(response.data)}`);
  res.json(response.data);
});

app.post("/api/jokes/ratings", async (req, res) => {
  console.log(`Received a rating. X-Twilio-Signature: ${req.headers['x-twilio-signature']}`);
  const jokeId = req.body.JokeId;
  const rating = req.body.Rating;
  console.log(`Rating ${rating} for Joke ${jokeId}`);
});

app.post("/handle-joke-transcription", async(req, res) => {
  console.log(`Received a joke. X-Twilio-Signature: ${req.headers['x-twilio-signature']}`);
  const joke = req.body.TranscriptionText;
  console.log(`Received a new joke: "${joke}"`);
  // TODO: Save to our database
  res.status(201);
  res.json({status: "success"});
  res.end();
});

console.log(`Server is listening on port ${PORT}`);
app.listen(PORT);
