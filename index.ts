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

const dataParse = async (command: string, ws: WebSocket, width: number, height: number) => {
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
    case 'prnt_scrn':
      const widthSize = 200;
      const heightSize = 200;
      const img = robot.screen.capture(
        x - widthSize / 2,
        y - heightSize / 2,
        widthSize,
        heightSize
      );

      const jimp = new Jimp({ data: img.image, width: img.width, height: img.height });
      const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);
      const base64 = base64Img.split(',')[1];
      ws.send(`prnt_scrn ${base64}`);
      break;
    default:
      break;
  }
};
