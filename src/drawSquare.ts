import robot from 'robotjs';
import { WebSocket } from 'ws';

export const drawSquare = (ws: WebSocket, x: number, y: number, width: number) => {
  robot.mouseToggle('down');
  robot.moveMouseSmooth(x + width, y);
  robot.moveMouseSmooth(x + width, y + width);
  robot.moveMouseSmooth(x, y + width);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
  ws.send(`draw_square`);
};
