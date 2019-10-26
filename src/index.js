const express = require("express");
const data = require("./dataFunc");
const port = 5000;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser());

const API_ROOT = `http://localhost:${port}`;

app.post("/", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const results = await data(userData);
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "==> 🌎  Listening on port %s. Open up %s in your browser.",
      port,
      API_ROOT,
    );
  }
});
