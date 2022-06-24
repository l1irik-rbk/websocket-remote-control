import Jimp from 'jimp';
import { httpServer } from './src/http_server/index';
import robot from 'robotjs';
import { WebSocketServer, WebSocket } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const newData = data.toString().split(' ');
    const command = newData[0];
    const width = +newData[1];
    const height = +newData[2];
    console.log('data', newData);
    dataParse(command, ws, width, height);
  });
});

wss.on('close', () => {});

const dataParse = (command: string, ws: WebSocket, width: number, height: number) => {
  const { x, y } = robot.getMousePos();

  switch (command) {
    case 'mouse_position':
      ws.send(`mouse_position ${x},${y}`);
      break;
    case 'mouse_left':
      ws.send(`mouse_left`);
      robot.moveMouse(-width + x, y);
      break;
    case 'mouse_right':
      ws.send(`mouse_right`);
      robot.moveMouse(width + x, y);
      break;
    case 'mouse_down':
      ws.send(`mouse_down`);
      robot.moveMouse(x, width + y);
      break;
    case 'mouse_up':
      ws.send(`mouse_up`);
      robot.moveMouse(x, -width + y);
      break;
    case 'draw_circle':
      robot.mouseToggle('down');
      for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const newX = x + width * Math.cos(i) - width;
        const newY = y + width * Math.sin(i);
        robot.dragMouse(newX, newY);
      }
      robot.mouseToggle('up');
      ws.send(`draw_circle`);
      break;
    case 'draw_square':
      robot.mouseToggle('down');
      robot.moveMouseSmooth(x + width, y);
      robot.moveMouseSmooth(x + width, y + width);
      robot.moveMouseSmooth(x, y + width);
      robot.moveMouseSmooth(x, y);
      robot.mouseToggle('up');
      ws.send(`draw_square`);
      break;
    case 'draw_rectangle':
      robot.mouseToggle('down');
      robot.moveMouseSmooth(x + width, y);
      robot.moveMouseSmooth(x + width, y + height);
      robot.moveMouseSmooth(x, y + height);
      robot.moveMouseSmooth(x, y);
      robot.mouseToggle('up');
      ws.send(`draw_square`);
      break;
    default:
      break;
  }
};
