const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Varsayılan port numarası, gerektiğinde değiştirilebilir

const messagesFolderPath = path.join(__dirname, 'Messages');

// GET isteği için '/get-messages' endpoint'i
app.get('/get-messages', (req, res) => {
  const { nickname } = req.query;

  const userMessagesPath = path.join(messagesFolderPath, `${nickname}.json`);

  if (fs.existsSync(userMessagesPath)) {
    const fileData = fs.readFileSync(userMessagesPath, 'utf8');
    const userMessages = JSON.parse(fileData);
    res.json(userMessages); // JSON formatında mesajları gönder
  } else {
    res.status(404).json({ error: 'Mesajlar bulunamadı' });
  }
});

// Statik dosyaları sunmak için public klasörünü kullanmak (örneğin, HTML dosyası)
app.use(express.static('public'));

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı port üzerinde çalışıyor.`);
});
