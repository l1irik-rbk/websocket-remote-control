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
      duplex.write(`mouse_position ${x},${y} \0`, 'utf-8');
      console.log(`Command: "mouse_position" completed successfully!\n`);
      break;
    case 'mouse_left':
      duplex.write(`mouse_left \0`, 'utf-8');
      robot.moveMouse(-width + x, y);
      console.log(`Command: "mouse_left" completed successfully!\n`);
      break;
    case 'mouse_right':
      duplex.write(`mouse_right \0`, 'utf-8');
      robot.moveMouse(width + x, y);
      console.log(`Command: "mouse_right" completed successfully!\n`);
      break;
    case 'mouse_down':
      duplex.write(`mouse_down \0`, 'utf-8');
      robot.moveMouse(x, width + y);
      console.log(`Command: "mouse_down" completed successfully!\n`);
      break;
    case 'mouse_up':
      duplex.write(`mouse_up \0`, 'utf-8');
      robot.moveMouse(x, -width + y);
      console.log(`Command: "mouse_up" completed successfully!\n`);
      break;
    case 'draw_circle':
      drawCircle(duplex, x, y, width);
      console.log(`Command: "draw_circle" completed successfully!\n`);
      break;
    case 'draw_square':
      drawSquare(duplex, x, y, width);
      console.log(`Command: "draw_square" completed successfully!\n`);
      break;
    case 'draw_rectangle':
      drawRectangle(duplex, x, y, width, height);
      console.log(`Command: "draw_rectangle" completed successfully!\n`);
      break;
    case 'prnt_scrn':
      const base64 = await prntScrn(x, y);
      duplex.write(`prnt_scrn ${base64} \0`, 'utf-8');
      console.log(`Command: "prnt_scrn" completed successfully!\n`);
      break;
    default:
      console.log(`Oops! Something went wrong!\n`);
      break;
  }
};
