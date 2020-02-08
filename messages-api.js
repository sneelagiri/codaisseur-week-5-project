const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/messages", (req, res) => {
  console.log(req.body.text);
  res.json({ message: "I received your request body!" });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
