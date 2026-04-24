const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "secretkey";

let users = [{ username: "admin", password: "admin" }];
let votes = [];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send("Invalid");

  const token = jwt.sign({ username }, SECRET);
  res.json({ token });
});

app.post('/vote', (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, SECRET);
    const existing = votes.find(v => v.username === decoded.username);
    if (existing) return res.status(400).send("Already voted");

    votes.push({ username: decoded.username, candidate: req.body.candidate });
    res.send("Vote recorded");
  } catch {
    res.status(401).send("Unauthorized");
  }
});

app.get('/results', (req, res) => {
  const result = {};
  votes.forEach(v => {
    result[v.candidate] = (result[v.candidate] || 0) + 1;
  });
  res.json(result);
});

app.listen(5000, () => console.log("Server running on 5000"));