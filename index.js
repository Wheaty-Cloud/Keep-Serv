const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// --- PARTIE 1 : LE RÉVEIL (Serveur Web) ---
app.get('/', (req, res) => {
  res.send('Le bot est réveillé !');
});

app.listen(3000, () => {
  console.log('Serveur de réveil actif sur le port 3000');
});

// --- PARTIE 2 : LE BOT MINECRAFT ---
const botArgs = {
  host: 'stryblock.falix.gg ', // Exemple: mavoie.falix.gg
  port: 25565,          // Ton port
  username: 'Garde24h',
  version: '1.20.4'     // Ta version
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot connecté au serveur Minecraft !');
    // Petit saut toutes les 30 sec pour l'anti-AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  // Se reconnecte automatiquement si le serveur crash
  bot.on('end', () => {
    console.log('Déconnecté, reconnexion dans 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Erreur:', err));
}


createBot();
