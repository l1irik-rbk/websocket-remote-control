import robot from 'robotjs';
import { WebSocket } from 'ws';
import { drawCircle } from './drawCircle';
import { drawSquare } from './drawSquare';
import { drawRectangle } from './drawRectangle';
import { prntScrn } from './prntScrn';

export const dataParse = async (command: string, ws: WebSocket, width: number, height: number) => {
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
      drawCircle(ws, x, y, width);
      break;
    case 'draw_square':
      drawSquare(ws, x, y, width);
      break;
    case 'draw_rectangle':
      drawRectangle(ws, x, y, width, height);
      break;
    case 'prnt_scrn':
      const base64 = await prntScrn(x, y);
      ws.send(`prnt_scrn ${base64}`);
      break;
    default:
      break;
  }
};
