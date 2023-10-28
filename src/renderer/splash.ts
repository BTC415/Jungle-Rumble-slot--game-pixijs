import { PIXI, appStage, Global_Vars, app } from ".";
import { loadingTextStyle } from "../config";

const loadingText = new PIXI.Text(`Loading...`, loadingTextStyle);
loadingText.anchor.set(0.5)
loadingText.scale.set(app.screen.width > app.screen.height ? 1 : 2)
loadingText.position.set(980, 500)
const loadingSpriteBackSprite = new PIXI.Graphics()
appStage.addChild(loadingSpriteBackSprite)
loadingSpriteBackSprite.lineStyle(0);
loadingSpriteBackSprite.beginFill(0x0, 1).drawRect(-4000, -6000, 9000, 13000);
appStage.addChild(loadingText);
PIXI.Assets.load(['/assets/image/loading.json']).then(() => {
  if (Global_Vars.initLoaded) return
  const frames = [];
  for (let i = 0; i < 34; i++) {
    const val = i < 10 ? `0${i}` : i;
    frames.push(PIXI.Texture.from(`loading-${val}.png`));
  }
  const loadingSprite = new PIXI.AnimatedSprite(frames);
  loadingSprite.animationSpeed = 0.5;
  loadingSprite.anchor.set(0.5)
  loadingSprite.scale.set(app.screen.width > app.screen.height ? 1 : 2)
  loadingSprite.play();
  loadingSprite.position.set(970, 430)
  appStage.addChild(loadingSprite);
});
PIXI.Assets.load(['/assets/image/loading-bar-anim.json', '/assets/image/init-bg.png']).then(() => {
  if (Global_Vars.loaded) return
  Global_Vars.initLoaded = true
  const frames = [];
  for (let i = 1; i <= 23; i++) {
    // const val = i < 10 ? `0${i}` : i;
    frames.push(PIXI.Texture.from(`loading-bar-anim-${i}.png`));
  }
  const splashContainer = new PIXI.Container();
  const back_graphics_sprite = new PIXI.Graphics()
  splashContainer.addChild(back_graphics_sprite)
  back_graphics_sprite.lineStyle(0);
  back_graphics_sprite.beginFill(0x0, 1).drawRect(-4000, -6000, 9000, 9000);

  const splashSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/init-bg.png'))
  const loadingSprite = new PIXI.AnimatedSprite(frames);
  loadingSprite.animationSpeed = 0.2;
  loadingSprite.play();
  splashContainer.x = 680
  splashContainer.y = 300
  splashSprite.anchor.set(0.5)
  splashSprite.position.set(280, 220)
  splashContainer.addChild(splashSprite)
  splashContainer.addChild(loadingSprite)
  loadingSprite.position.set(60,330)
  loadingSprite.scale.set(1.5)
  appStage.removeChildren();
  appStage.addChild(splashContainer);
});