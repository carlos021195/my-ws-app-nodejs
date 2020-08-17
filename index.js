const express = require('express');
const path = require('path');
const WebSocket = require('ws'); // new
const app = express();

const socketServer = new WebSocket.Server({port: 3030});

socketServer.on('connection', (socketClient) => {
  console.log('connected');
  console.log('client Set length: ', socketServer.clients.size);
  


  socketClient.on('message', message => {
      socketServer.clients.forEach((client) => {
          if(client.readyState === WebSocket.OPEN){
              client.send(JSON.stringify(message))
          }
      })
  });



  socketClient.on('close', (socketClient) => {
    console.log('closed');
    console.log('Number of clients: ', socketServer.clients.size);
  });
});