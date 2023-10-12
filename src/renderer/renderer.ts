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
export const flags: {
  loaded: boolean,
  info_dialog_wrapper_resize_callback: (() => void) | null
} = {
  loaded: false,
  info_dialog_wrapper_resize_callback: null
}
export const appStage = new PIXI.Container()
export const info_dialog_wrapper_resize_callback: (() => void) | null = null;
export function resizeApp() {
  app.renderer.resize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
  // app.renderer.resolution = window.devicePixelRatio;
  const APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height)
  appStage.x = (app.screen.width - App_Dimension.width * APP_SCALE) / 2
  appStage.y = (app.screen.height - App_Dimension.height * APP_SCALE) / 2
  appStage.scale.set(APP_SCALE)
  if (flags.info_dialog_wrapper_resize_callback) {
    flags.info_dialog_wrapper_resize_callback()
  }
};
window.onresize = resizeApp
app.stage.addChild(appStage)
resizeApp();