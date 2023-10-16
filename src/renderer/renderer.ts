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
export const Global_Store: {
  loaded: boolean,
  info_dialog_wrapper_resize_callback: (() => void) | null
} = {
  loaded: false,
  info_dialog_wrapper_resize_callback: null
}
export const appStage = new PIXI.Container()
export const info_dialog_wrapper_resize_callback: (() => void) | null = null;
const backgroundSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/BG.png'))
app.stage.addChild(backgroundSprite)
export function resizeApp() {
  app.renderer.resize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
  // app.renderer.resolution = window.devicePixelRatio;
  let APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height)
  if(app.screen.width<app.screen.height){
    APP_SCALE*=1.64
  }
  appStage.x = (app.screen.width - App_Dimension.width * APP_SCALE) / 2
  appStage.y = (app.screen.height - App_Dimension.height * APP_SCALE) / 2
  appStage.scale.set(APP_SCALE)
  if (Global_Store.info_dialog_wrapper_resize_callback) {
    Global_Store.info_dialog_wrapper_resize_callback()
  }
  backgroundSprite.scale.set(app.screen.width / 1080)
};
window.onresize = resizeApp

app.stage.addChild(appStage)
resizeApp();