import robot from 'robotjs';
import { WebSocket } from 'ws';

export const drawCircle = (ws: WebSocket, x: number, y: number, width: number) => {
  robot.mouseToggle('down');
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const newX = x + width * Math.cos(i) - width;
    const newY = y + width * Math.sin(i);
    robot.dragMouse(newX, newY);
  }
  robot.mouseToggle('up');
  ws.send(`draw_circle`);
};
