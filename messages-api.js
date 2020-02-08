const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/messages", (req, res) => {
  if (
    (req.body.text === undefined || req.body.text.length === 0) &&
    badRequestCount < 5
  ) {
    ++badRequestCount;
    console.log(badRequestCount);
    res.status(400).end();
  } else if (badRequestCount >= 5) {
    // This if statement purposefully shows Too Many Requests even if a request is a "good" request
    res.status(429).end();
    setTimeout(resetCount, 300000);
  } else {
    console.log(req.body.text);
    res.json({ message: "I received your request body!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
