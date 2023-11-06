import { PIXI } from './pixi';
import { App_Dimension, config } from '../config';
import { media_stop_laptop, media_stop_laptopL, media_stop_tablet } from '../utils/utils';

export const app = new PIXI.Application<HTMLCanvasElement>({
  width: config.width,
  height: config.height,
  backgroundColor: config.backgroundColor,
  autoStart: config.autoStart,
  antialias: config.antialias,
  resolution: config.resolution,
});

document.getElementById('game')?.appendChild(app.view);
export const Global_Vars: {
  loaded: boolean,
  initLoaded: boolean,
  info_dialog_wrapper_resize_callback: (() => void) | null,
} = {
  initLoaded: false,
  loaded: false,
  info_dialog_wrapper_resize_callback: null,
}
export const appStage = new PIXI.Container()
export const info_dialog_wrapper_resize_callback: (() => void) | null = null;
const backgroundSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/BG.png'))
app.stage.addChild(backgroundSprite)
export function resizeApp() {
  app.renderer.resize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
  // app.renderer.resolution = window.devicePixelRatio;
  let APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height)
  if (app.screen.width < app.screen.height * media_stop_tablet) {
    APP_SCALE *= 1.64
  } else if (app.screen.width < app.screen.height * media_stop_laptop) {
    APP_SCALE *= 1.2
  } else if (app.screen.width < app.screen.height * media_stop_laptopL) {
    APP_SCALE *= 1.2
  }
  
  appStage.x = (app.screen.width - App_Dimension.width * APP_SCALE) / 2
  appStage.y = (app.screen.height - App_Dimension.height * APP_SCALE) / 2
  appStage.scale.set(APP_SCALE)
  if (Global_Vars.info_dialog_wrapper_resize_callback) {
    Global_Vars.info_dialog_wrapper_resize_callback()
  }
  backgroundSprite.scale.set(app.screen.width / 1080)
};
window.onresize = resizeApp

app.stage.addChild(appStage)
resizeApp();