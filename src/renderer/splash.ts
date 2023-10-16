import { PIXI, appStage, Global_Store, app } from ".";
import { loadingTextStyle } from "../config";

const loadingText = new PIXI.Text(`Loading...`, loadingTextStyle);
loadingText.anchor.set(0.5)
loadingText.scale.set(app.screen.width > app.screen.height ? 1 : 2)
loadingText.position.set(980, 500)
const loadingSpriteBackSprite = new PIXI.Graphics()
appStage.addChild(loadingSpriteBackSprite)
loadingSpriteBackSprite.lineStyle(0);
loadingSpriteBackSprite.beginFill(0x0, 1);
loadingSpriteBackSprite.moveTo(-4000, -6000);
loadingSpriteBackSprite.lineTo(5000, -6000);
loadingSpriteBackSprite.lineTo(5000, 7000);
loadingSpriteBackSprite.lineTo(-4000, 7000);
appStage.addChild(loadingText);
PIXI.Assets.load(['/assets/image/loading.json']).then(() => {
  if (Global_Store.loaded) return
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
PIXI.Assets.load(['/assets/image/power-game.json', '/assets/image/init-bg.png']).then(() => {
  if (Global_Store.loaded) return
  Global_Store.loaded = true
  const frames = [];
  for (let i = 0; i < 48; i++) {
    const val = i < 10 ? `0${i}` : i;
    frames.push(PIXI.Texture.from(`power-game-${val}.gif`));
  }
  const splashContainer = new PIXI.Container();
  const back_graphics_sprite = new PIXI.Graphics()
  splashContainer.addChild(back_graphics_sprite)
  back_graphics_sprite.lineStyle(0);
  back_graphics_sprite.beginFill(0x0, 1);
  back_graphics_sprite.moveTo(-4000, -6000);
  back_graphics_sprite.lineTo(5000, -6000);
  back_graphics_sprite.lineTo(5000, 7000);
  back_graphics_sprite.lineTo(-4000, 7000);

  const splashSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/init-bg.png'))
  const loadingSprite = new PIXI.AnimatedSprite(frames);
  loadingSprite.animationSpeed = 0.5;
  loadingSprite.play();
  splashContainer.x = 680
  splashContainer.y = 300
  splashSprite.anchor.set(0.5)
  splashSprite.position.set(280, 150)
  splashContainer.addChild(splashSprite)
  splashContainer.addChild(loadingSprite)
  loadingSprite.x = 95
  loadingSprite.y = 330
  appStage.removeChildren();
  appStage.addChild(splashContainer);
});