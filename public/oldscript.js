let messagesShown = 20;
let totalMessages = [];
let test;

function showMessages() {
    const nickname = document.getElementById('nicknameInput').value;
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    fetch(`/get-messages?nickname=${nickname}`)
      .then(response => response.json())
      .then(data => {
        messagesContainer.innerHTML = ''; // Önceki içeriği temizle
        totalMessages = data;
        displayMessages();
        console.log(test);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      })
      .catch(error => {
        console.error('Hata:', error);
        messagesContainer.innerHTML = 'Mesajlar alınamadı.';
      });
}

function displayMessages() {
  const messagesContainer = document.getElementById('messages');

  if (messagesShown <= totalMessages.length) {
    totalMessages.slice(messagesShown*2).forEach(message => {
        const messageElement = document.createElement('p');
        const timestamp = document.createElement('span');
        timestamp.textContent = message.timestamp + ' - ';
        messageElement.textContent = message.message;
        messageElement.prepend(timestamp);
        messageElement.classList.add('message');
        messageElement.dataset.messageId = message.id;
        messagesContainer.appendChild(messageElement);
    });
  } else if (messagesShown >= totalMessages.length){
    totalMessages.slice(0).forEach(message => {
        const messageElement = document.createElement('p');
        const timestamp = document.createElement('span');
        timestamp.textContent = message.timestamp + ' - ';
        messageElement.textContent = message.message;
        messageElement.prepend(timestamp);
        messageElement.classList.add('message');
        messageElement.dataset.messageId = message.id;
        messagesContainer.appendChild(messageElement);
    });
  }

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


document.getElementById('messages').addEventListener('scroll', function() {
  const messagesContainer = this;

  if (messagesContainer.scrollTop === 0) {
    if (messagesShown < totalMessages.length) {
      messagesShown += messagesShown;
      displayMessages();
      messagesContainer.scrollTop = messagesContainer.scrollHeight / 2;
      console.log('Yeni mesajlar yüklendi. Toplam mesaj sayısı: ' + totalMessages.length);
      console.log('Görüntülenen mesaj sayısı: ' + messagesShown);
    }else {
      messagesShown = totalMessages.length;
      displayMessages();
    }
  }
});