import { NavigateFunction } from "react-router-dom";
import { Global_Vars, PIXI, app, appStage } from "../../renderer";
import { fadeInOut, tweenTo } from "../../utils/urls";
import { media_stop_tablet, loadSound } from "../../utils/utils";
import loadMainScreen from "./loadMainScreen";
import { gameParamsType } from "../../store/types";

export async function loadStartScreen(navigate: NavigateFunction, gameParams: gameParamsType) {
  Global_Vars.loaded = true;
  appStage.removeChildren()
  const portalSprite1 = new PIXI.Sprite(PIXI.Texture.from('/assets/image/portal1.png'))
  // const portalSprite2 = new PIXI.Sprite(PIXI.Texture.from('/assets/image/portal2.png'))
  const buttonStart = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-start.png'))
  const logoJungleSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/logo-jungle.png'))
  appStage.addChild(portalSprite1);
  // appStage.addChild(portalSprite2);
  appStage.addChild(logoJungleSprite);
  appStage.addChild(buttonStart);
  portalSprite1.anchor.set(0.5)
  buttonStart.eventMode = 'static'
  buttonStart.cursor = 'pointer'
  buttonStart.on('pointerdown', () => {
    loadSound()
    tweenTo(app.stage, 'alpha', 0, 1, 1000, fadeInOut(), null, null)
    setTimeout(() => loadMainScreen(navigate, gameParams), 400);
  });
  (Global_Vars.info_dialog_wrapper_resize_callback = function () {
    if (app.screen.width > app.screen.height * media_stop_tablet) {
      // portalSprite2.position.set(1000, 200)
      portalSprite1.position.set(940, 450)
      portalSprite1.scale.set(1.2)
      buttonStart.position.set(760, 750);
      logoJungleSprite.position.set(650, 0)
    } else {
      // portalSprite2.position.set(600, 360)
      portalSprite1.scale.set(1.4)
      portalSprite1.position.set(950, 400)
      buttonStart.position.set(780, 730);
      logoJungleSprite.position.set(650, -80)
    }
  })();

}