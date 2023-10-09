
export function loop(deltaTime: number, isMonitor: boolean) {
  // Animation Code.
  console.debug(deltaTime)
  // Monitoring.
  if (isMonitor) {
    // console.log(`Delta Time: ${deltaTime}`);
    // console.log(`FPS: ${app.ticker.FPS}`);
  }
};
