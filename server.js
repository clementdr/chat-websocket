// importation des modules express, http et ws
const express = require("express"); // créer des applications web
const http = require("http"); // créer un serveur HTTP
const WebSocket = require("ws"); // communication server - client en temps reel

const app = express(); // création d’une instance de l’app express
const server = http.createServer(app); // création d’un serveur HTTP à partir de l’instance de l’app express
const wss = new WebSocket.Server({ server }); // création d’un serveur WebSocket à partir du serveur HTTP

// définition du port sur lequel le serveur écoute et démarrage du serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// lorsqu'un utilisateur accède à la racine du site, on lui envoie le fichier index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// lorsqu'un client se connecte, on affiche un message dans la console
wss.on("connection", (ws) => {
  console.log("Un utilisateur est connecté");

  // Réception de messages du client
  ws.on("message", (message) => {
    console.log("Message reçu:", message);

    // Envoyer le message à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Lorsqu'un client se déconnecte, on affiche un message dans la console
  ws.on("close", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});
