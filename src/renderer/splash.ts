import { PIXI, appStage, flags } from ".";
import { loadingTextStyle } from "../config";

const loadingText = new PIXI.Text(`Loading...`, loadingTextStyle);
loadingText.anchor.set(0.5)
loadingText.x = 980
loadingText.y = 500
appStage.addChild(loadingText);
PIXI.Assets.load(['/assets/image/loading.json']).then(() => {
  if (flags.loaded) return
  const frames = [];
  for (let i = 0; i < 34; i++) {
      const val = i < 10 ? `0${i}` : i;
      frames.push(PIXI.Texture.from(`loading-${val}.png`));
  }
  const loadingSprite = new PIXI.AnimatedSprite(frames);
  loadingSprite.animationSpeed = 0.5;
  loadingSprite.play();
  loadingSprite.position.set(950,430)
  appStage.addChild(loadingSprite);
});
PIXI.Assets.load(['/assets/image/power-game.json','/assets/image/init-bg.png']).then(() => {
  if (flags.loaded) return
  flags.loaded = true
  const frames = [];
  for (let i = 0; i < 48; i++) {
      const val = i < 10 ? `0${i}` : i;
      frames.push(PIXI.Texture.from(`power-game-${val}.gif`));
  }
  const splashContainer = new PIXI.Container();
  const splashSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/init-bg.png'))
  const loadingSprite = new PIXI.AnimatedSprite(frames);
  loadingSprite.animationSpeed = 0.5;
  loadingSprite.play();
  splashContainer.x = 700
  splashContainer.y = 300
  splashSprite.anchor.set(0.5)
  splashSprite.position.set(280,150)
  splashContainer.addChild(splashSprite)
  splashContainer.addChild(loadingSprite)
  loadingSprite.x = 95
  loadingSprite.y = 380
  appStage.removeChildren();
  appStage.addChild(splashContainer);
});