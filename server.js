const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const messagesFolderPath = path.join(__dirname, 'Messages');

app.get('/get-messages', (req, res) => {
  const { nickname } = req.query;

  const userMessagesPath = path.join(messagesFolderPath, `${nickname}.json`);

  if (fs.existsSync(userMessagesPath)) {
    const fileData = fs.readFileSync(userMessagesPath, 'utf8');
    const userMessages = JSON.parse(fileData);
    res.json(userMessages); // JSON mesajları gönder
  } else {
    res.status(404).json({ error: 'Mesajlar bulunamadı' });
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı port üzerinde çalışıyor.`);
});
