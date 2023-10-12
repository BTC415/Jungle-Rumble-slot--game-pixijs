import { PIXI, appStage } from "../renderer";
import { slotAnimateUrlType } from "./urls";

export const fire_animate = () => {
    const frames = [];
    for (let i = 0; i < 300; i++) {
        frames.push(PIXI.Texture.from(`fire_image_${i}.png`));
    }
    const fireSprite = new PIXI.AnimatedSprite(frames);
    fireSprite.animationSpeed = 0.5;
    fireSprite.play();
    fireSprite.position.set(216, 170)
    fireSprite.scale.set(2)
    appStage.addChild(fireSprite);
    const new_fireSprite = new PIXI.AnimatedSprite(frames);
    new_fireSprite.animationSpeed = 0.5;
    new_fireSprite.play();
    new_fireSprite.position.set(1626, 170)
    new_fireSprite.scale.set(2)
    appStage.addChild(new_fireSprite);
    const torch_base_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/torch-base.png'))
    torch_base_sprite.position.set(215, 367)
    appStage.addChild(torch_base_sprite);
    const torch_base_sprite_2 = new PIXI.Sprite(PIXI.Texture.from('/assets/image/torch-base.png'))
    torch_base_sprite_2.position.set(1624, 367)
    appStage.addChild(torch_base_sprite_2);
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
export const gen_card_animated_sprite = (item:slotAnimateUrlType) => {
    const frames = [];
    for (let i = 1; i <= item.length * 2 - 1; i++) {
        const j = (i > item.length) ? item.length * 2 - i : i
        frames.push(PIXI.Texture.from(`card-${item.title}-anim-${j}.png`));
    }
    const cardAnimateSprite = new PIXI.AnimatedSprite(frames);
    cardAnimateSprite.animationSpeed = 0.5;
    // cardAnimateSprite.play();
    appStage.addChild(cardAnimateSprite);
    return cardAnimateSprite;
}