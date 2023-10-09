import { PIXI } from "../renderer"

export const assetUrls = [
    '/assets/image/background.png',
    '/assets/image/background-footer.png',
    '/assets/image/card-back.png',
    '/assets/image/help-content.png',
    '/assets/image/info-content.png',
    '/assets/image/button-spin.png',
    '/assets/image/button-spin-empty.png',
    '/assets/image/button-info.png',
    '/assets/image/button-help.png',
    '/assets/image/button-info-bar.png',
    '/assets/image/button-info-bar-empty.png',
    '/assets/image/fire.json',
    '/assets/image/bubble.json',
    '/assets/image/button-setting-empty.png',
    '/assets/image/button-setting.png',
    '/assets/image/button-bet.png',
    '/assets/image/button-wallet.png',
    '/assets/image/button-wallet-empty.png',
]
export const slotTextureUrls = [
    '/assets/image/card-wild.webp',
    '/assets/image/card-wild2.png',
    '/assets/image/card-wild3.png',
    '/assets/image/card-10.webp',
    '/assets/image/card-A.webp',
    '/assets/image/card-bird.webp',
    '/assets/image/card-boy.webp',
    '/assets/image/card-dragon.webp',
    '/assets/image/card-girl.webp',
    '/assets/image/card-J.webp',
    '/assets/image/card-K.webp',
    '/assets/image/card-Q.webp',
    '/assets/image/card-sun.webp',
    '/assets/image/card-triangle.webp',
]
export const show_dialog = (info_dialog_wrapper: PIXI.Container, close_button_sprite: PIXI.Sprite) => {
    if (info_dialog_wrapper.alpha === 0){
        tweenTo(info_dialog_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'static'
    } else if (info_dialog_wrapper.alpha === 1){
        tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'none'
    }
}
export const tweening: any = [];
export function tweenTo(object: any, property: any, propertyBeginValue: any, target: any, time: any, easing: any, onchange: any, oncomplete: any) {
    const tween = {
        object,
        property,
        propertyBeginValue,
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}
export function lerp(a1: any, a2: any, t: any) {
    return a1 * (1 - t) + a2 * t;
}
export function backout(b: any) {
    // return (t: any) => (t * t * ((amount + 1) * t + amount));
    return (t: any) => (Math.sin(b * Math.PI * t - Math.PI / 2) + 1) / (Math.sin(b * Math.PI - Math.PI / 2) + 1)
}