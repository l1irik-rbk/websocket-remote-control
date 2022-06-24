import * as stream from 'stream';
import robot from 'robotjs';
import { drawCircle } from './drawCircle';
import { drawSquare } from './drawSquare';
import { drawRectangle } from './drawRectangle';
import { prntScrn } from './prntScrn';

export const dataParse = async (
  command: string,
  width: number,
  height: number,
  duplex: stream.Duplex
) => {
  const { x, y } = robot.getMousePos();

  switch (command) {
    case 'mouse_position':
      duplex.write(`mouse_position ${x},${y}`, 'utf-8');
      break;
    case 'mouse_left':
      duplex.write(`mouse_left`, 'utf-8');
      robot.moveMouse(-width + x, y);
      break;
    case 'mouse_right':
      duplex.write(`mouse_right`, 'utf-8');
      robot.moveMouse(width + x, y);
      break;
    case 'mouse_down':
      duplex.write(`mouse_down`, 'utf-8');
      robot.moveMouse(x, width + y);
      break;
    case 'mouse_up':
      duplex.write(`mouse_up`, 'utf-8');
      robot.moveMouse(x, -width + y);
      break;
    case 'draw_circle':
      drawCircle(duplex, x, y, width);
      break;
    case 'draw_square':
      drawSquare(duplex, x, y, width);
      break;
    case 'draw_rectangle':
      drawRectangle(duplex, x, y, width, height);
      break;
    case 'prnt_scrn':
      const base64 = await prntScrn(x, y);
      duplex.write(`prnt_scrn ${base64}`, 'utf-8');
      break;
    default:
      break;
  }
};
