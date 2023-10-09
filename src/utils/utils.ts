import { PIXI, appStage } from "../renderer";

export const fire_animate = () => {
    const frames = [];
    for (let i = 0; i < 300; i++) {
        frames.push(PIXI.Texture.from(`fire_image_${i}.png`));
    }
    const fireSprite = new PIXI.AnimatedSprite(frames);
    fireSprite.animationSpeed = 0.5;
    fireSprite.play();
    fireSprite.position.set(216, 160)
    fireSprite.scale.set(2)
    appStage.addChild(fireSprite);
    const new_fireSprite = new PIXI.AnimatedSprite(frames);
    new_fireSprite.animationSpeed = 0.5;
    new_fireSprite.play();
    new_fireSprite.position.set(1626, 165)
    new_fireSprite.scale.set(2)
    appStage.addChild(new_fireSprite);
}
export const bubble_animate = () => {
    const frames = [];
    for (let i = 0; i < 300; i++) {
        frames.push(PIXI.Texture.from(`bubble_image_${i}.png`));
    }
    const bubbleSprite = new PIXI.AnimatedSprite(frames);
    bubbleSprite.animationSpeed = 0.5;
    bubbleSprite.play();
    bubbleSprite.anchor.set(0.5)
    bubbleSprite.position.set(80, 580)
    bubbleSprite.scale.set(1)
    appStage.addChild(bubbleSprite);
    const new_bubbleSprite = new PIXI.AnimatedSprite(frames);
    new_bubbleSprite.animationSpeed = 0.5;
    new_bubbleSprite.play();
    new_bubbleSprite.anchor.set(0.5)
    new_bubbleSprite.position.set(1826, 580)
    new_bubbleSprite.scale.set(1)
    appStage.addChild(new_bubbleSprite);
}