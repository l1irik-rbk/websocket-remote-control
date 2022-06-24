import { httpServer } from './src/http_server/index';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { dataParse } from './src/dataParse';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });
    const newData = data.toString().split(' ');
    const command = newData[0];
    const width = +newData[1];
    const height = +newData[2];
    dataParse(command, width, height, duplex);
  });
});

wss.on('close', () => {});
