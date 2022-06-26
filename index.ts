import { httpServer } from './src/http_server/index';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { dataParse } from './src/dataParse';

const HTTP_PORT = 3000;
const WEBSOCKET_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!\n`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on('connection', (ws) => {
  console.log(`WebSocket strted on port: ${WEBSOCKET_PORT}!\n`);

  ws.on('message', (data) => {
    const duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });
    const newData = data.toString().split(' ');
    const command = newData[0];
    const width = +newData[1];
    const height = +newData[2];
    dataParse(command, width, height, duplex);
  });
});

wss.on('close', () => {
  console.log('WebSocket closed!\n');
});
