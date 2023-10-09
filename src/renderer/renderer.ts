import { PIXI } from './pixi';
import { App_Dimension, config } from '../config';

export const app = new PIXI.Application<HTMLCanvasElement>({
  width: config.width,
  height: config.height,
  backgroundColor: config.backgroundColor,
  autoStart: config.autoStart,
  antialias: config.antialias,
  resolution: config.resolution,
});

document.getElementById('game')?.appendChild(app.view);
export const flags = {
  loaded: false,
}
export const appStage = new PIXI.Container()
export function resizeApp() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  const APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height)
  appStage.x = (app.screen.width - App_Dimension.width * APP_SCALE) / 2
  appStage.y = (app.screen.height - App_Dimension.height * APP_SCALE) / 2
  appStage.scale.set(APP_SCALE)
};
window.onresize = resizeApp
app.stage.addChild(appStage)
resizeApp();