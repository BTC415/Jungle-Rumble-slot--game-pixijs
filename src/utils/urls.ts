import { PIXI } from "../renderer"

export const assetUrls = [
    '/assets/image/background.png',
    '/assets/image/background-footer.png',
    '/assets/image/torch-base.png',
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
    '/assets/image/card-wild-anim.json',
    '/assets/image/card-wild2-anim.json',
    '/assets/image/card-wild3-anim.json',
    '/assets/image/card-10-anim.json',
    '/assets/image/card-A-anim.json',
    '/assets/image/card-bird-anim.json',
    '/assets/image/card-boy-anim.json',
    '/assets/image/card-dragon-anim.json',
    '/assets/image/card-girl-anim.json',
    '/assets/image/card-J-anim.json',
    '/assets/image/card-K-anim.json',
    '/assets/image/card-Q-anim.json',
    '/assets/image/card-sun-anim.json',
    '/assets/image/card-triangle-anim.json',
    '/assets/image/button-setting-empty.png',
    '/assets/image/button-setting.png',
    '/assets/image/button-bet.png',
    '/assets/image/button-wallet.png',
    '/assets/image/button-wallet-empty.png',
]
export type slotAnimateUrlType = {
    title: string, length: number
}
export const slotAnimateUrls = [
    { title: 'wild', length: 1 },
    { title: 'wild2', length: 1 },
    { title: 'wild3', length: 1 },
    { title: '10', length: 1 },
    { title: 'A', length: 1 },
    { title: 'bird', length: 1 },
    { title: 'boy', length: 1 },
    { title: 'dragon', length: 1 },
    { title: 'girl', length: 26 },
    { title: 'J', length: 1 },
    { title: 'K', length: 1 },
    { title: 'Q', length: 1 },
    { title: 'sun', length: 1 },
    { title: 'triangle', length: 1 },
]
export const show_dialog = (info_dialog_wrapper: PIXI.Container, close_button_sprite: PIXI.Sprite) => {
    if (info_dialog_wrapper.alpha === 0) {
        tweenTo(info_dialog_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'static'
    } else if (info_dialog_wrapper.alpha === 1) {
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