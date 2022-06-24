import robot from 'robotjs';
import { WebSocket } from 'ws';

export const drawRectangle = (
  ws: WebSocket,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  robot.mouseToggle('down');
  robot.moveMouseSmooth(x + width, y);
  robot.moveMouseSmooth(x + width, y + height);
  robot.moveMouseSmooth(x, y + height);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
  ws.send(`draw_square`);
};
