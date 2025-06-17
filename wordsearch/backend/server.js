const express = require('express');
const { execFile } = require('child_process'); // to run the C exe
const path = require('path'); 
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/run-wordsearch', (req, res) => {
  const { gridSize, wordsList } = req.body;

  const args = [gridSize, ...wordsList];

  const exePath = path.join(__dirname, 'ws.exe');

  execFile(exePath, args, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`check`);
});