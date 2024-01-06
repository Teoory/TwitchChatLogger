let totalMessages = [];

function showMessages() {
    const nickname = document.getElementById('nicknameInput').value;
    const messagesContainer = document.getElementById('messages');
    const totalMessagesDiv = document.getElementById('totalMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    fetch(`/get-messages?nickname=${nickname}`)
      .then(response => response.json())
      .then(data => {
        messagesContainer.innerHTML = ''; // Önceki içeriği temizle
        totalMessagesDiv.innerHTML = '';
        totalMessages = data;

        data.forEach(message => {
          const messageElement = document.createElement('p');
          const timestamp = document.createElement('span');
          const msg = document.createElement('span');

          timestamp.textContent = message.timestamp + '  - ';
          msg.textContent = message.message;
          messageElement.prepend(msg);
          messageElement.prepend(timestamp);
          messageElement.classList.add('message');
          msg.classList.add('msg');
          timestamp.classList.add('timestamp');
          messagesContainer.appendChild(messageElement);
        });
        console.log('Yeni mesajlar yüklendi. Toplam mesaj sayısı: ' + totalMessages.length);
        
        
        const messagesText = document.createElement('p');
        messagesText.textContent = 'Toplam mesaj sayısı: ' + totalMessages.length;
        totalMessagesDiv.prepend(messagesText);
        messagesText.classList.add('messagesText');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      })
      .catch(error => {
        console.error('Hata:', error);
        messagesContainer.innerHTML = 'Mesajlar alınamadı.';
      });
  }