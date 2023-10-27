import { IReel, slotAnimateUrlType } from "../@types";
import { PIXI, appStage } from "../renderer";
import { sound } from '@pixi/sound';
import { backout, reelTweenings, tweenTo } from "./urls";
export const critical_ratio = 0.75
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
export const gen_card_animated_sprite = (item: slotAnimateUrlType) => {
    const frames = [];
    for (let i = 1; i <= (item.playback ? item.length * 2 - 1 : item.length); i++) {
        const j = (i > item.length) ? item.length * 2 - i : i
        frames.push(PIXI.Texture.from(`card-${item.title}-anim-${j}.png`));
    }
    const cardAnimateSprite = new PIXI.AnimatedSprite(frames);
    cardAnimateSprite.animationSpeed = item.speed;
    // cardAnimateSprite.play();
    appStage.addChild(cardAnimateSprite);
    cardAnimateSprite.position.set(item.position.x, item.position.y)
    cardAnimateSprite.scale.set(item.scale)
    return cardAnimateSprite;
}
export const gen_autospin_item = (text: string) => {
    const button_auto_spin_item = new PIXI.Graphics()
    button_auto_spin_item.lineStyle(0);
    button_auto_spin_item.beginFill(0x444444, 1);
    button_auto_spin_item.moveTo(0, 0);
    button_auto_spin_item.lineTo(70, 0);
    button_auto_spin_item.lineTo(70, 50);
    button_auto_spin_item.lineTo(0, 50);
    const button_auto_spin_item_static_text = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 20, fill: 0xffffff })
    button_auto_spin_item_static_text.anchor.set(0.5)
    button_auto_spin_item_static_text.position.set(button_auto_spin_item.width / 2, button_auto_spin_item.height / 2)
    button_auto_spin_item.addChild(button_auto_spin_item_static_text)
    return button_auto_spin_item
}
export const calculateScale = (sprite: PIXI.DisplayObject): PIXI.ObservablePoint => {
    if (!sprite.parent) {
        const new_point = new PIXI.ObservablePoint(() => { }, null, sprite.scale.x, sprite.scale.y)
        return new_point
    }
    const parentSprite = sprite.parent;
    const new_parentScale = calculateScale(parentSprite);
    const spriteScale = sprite.scale;
    new_parentScale.x *= spriteScale.x
    new_parentScale.y *= spriteScale.y
    return new_parentScale;
}
export const sleep = async (time: number) => await new Promise((resolve) => {
    setTimeout(() => resolve("Go"), time);
});
export const pay_table = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 0, 1, 2],
    [1, 1, 2, 1, 0],
    [2, 2, 2, 2, 2],
    [1, 0, 1, 2, 1],
    [1, 0, 1, 2, 2],
    [1, 0, 0, 1, 2],
    [1, 2, 1, 0, 1],
    [1, 2, 2, 1, 0],
    [1, 2, 1, 0, 0],
    [0, 1, 2, 1, 0],
    [0, 1, 1, 1, 2],
    [0, 0, 1, 2, 2],
    [0, 0, 1, 2, 1],
    [0, 0, 0, 1, 2],
    [2, 1, 0, 1, 2],
    [2, 1, 1, 1, 0],
    [2, 2, 1, 0, 0],
    [2, 2, 1, 0, 1],
]

export const playSound = (type: 'bg' | 'spin' | 'win') => {
    let status = '';
    switch (type) {
        case 'bg':
            status = localStorage.getItem('music') || 'true'
            break;
        case 'spin':
        case 'win':
            status = localStorage.getItem('fx') || 'true'
            break;
    }
    if (status === 'true')
        sound.play(`${type}-sound`, { loop: type === 'bg' });
}
export const stopSound = (type: 'bg' | 'spin' | 'win') => {
    sound.stop(`${type}-sound`)
}

export const loadSound = () => {
    sound.add('bg-sound', '/assets/audio/bgm/bg-sound.mp3');
    sound.add('spin-sound', '/assets/audio/sfx/spin.mp3');
    sound.add('win-sound', '/assets/audio/sfx/win.mp3');
    sound.volumeAll = 0.5

}
export const setVolume = (val: number) => {
    sound.volumeAll = val / 100
}
export const animateReels = (reels: IReel[], reelsComplete: () => Promise<void>) => {

    reelTweenings.splice(0)
    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        // const extra = Math.floor(Math.random() * 3);
        // const target = r.position + 50 + i * 5 + extra;
        const target = r.animated_symbols.length * 30
        const time = 8000 + i * 500
        tweenTo(r, 'position', r.position % r.animated_symbols.length, target, time, backout(1.03), null, i === reels.length - 1 ? reelsComplete : null, true);
    }
}