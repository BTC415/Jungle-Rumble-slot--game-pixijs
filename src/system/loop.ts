import { PIXI, app } from "../renderer";

export function loop(deltaTime: number, isMonitor: boolean) {
  // Animation Code.

  // Monitoring.
  if (isMonitor) {
    // console.log(`Delta Time: ${deltaTime}`);
    // console.log(`FPS: ${app.ticker.FPS}`);
  }
};
