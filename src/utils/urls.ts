import { PIXI } from "../renderer"

export const assetUrls = [
    '/assets/image/background.png',
    '/assets/image/background-footer.png',
    '/assets/image/torch-base.png',
    '/assets/image/card-back.png',
    '/assets/image/info-content.png',
    '/assets/image/button-spin.png',
    '/assets/image/button-spin-empty.png',
    '/assets/image/button-auto-spin-empty.png',
    '/assets/image/button-auto-spin-stop.png',
    '/assets/image/button-info-bar.png',
    '/assets/image/button-info-bar-empty.png',
    '/assets/image/fire.json',
    '/assets/image/bubble.json',
    '/assets/image/card-wild-anim.json',
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
    '/assets/image/button-up-down.png',
    '/assets/image/button-mobile-A.png',
    '/assets/image/button-mobile-stop.png',
    '/assets/image/button-mobile-chip.png',
    '/assets/image/button-mobile-H.png',
    '/assets/image/button-mobile-i.png',
    '/assets/image/button-mobile-reload.png',
    '/assets/image/button-mobile-setting.png',
    '/assets/image/button-mobile-wallet.png',

    '/assets/image/music-true.png',
    '/assets/image/music-false.png',
    '/assets/image/fx-true.png',
    '/assets/image/fx-false.png',


    '/assets/image/portal1.png',
    // '/assets/image/portal2.png',
    '/assets/image/logo-jungle.png',
    '/assets/image/button-start.png',
    //Sound
    '/assets/audio/sfx/spin.mp3',
    '/assets/audio/sfx/win.mp3',
    '/assets/audio/bgm/bg-sound.mp3',
]
export type slotAnimateUrlType = {
    title: string, length: number, position: { x: number, y: number }, scale: number, playback?: boolean, speed: number
}
export const slotAnimateUrls:slotAnimateUrlType[] = [
    { title: '10', length: 22, position: { x: -40, y: -30 }, scale: 1.3, speed: 0.3 },
    { title: 'A', length: 30, position: { x: -30, y: 0 }, scale: 1.1, speed: 0.3 },
    { title: 'bird', length: 20, position: { x: 0, y: 10 }, scale: 1, speed: 0.31 },
    { title: 'boy', length: 23, position: { x: 30, y: 0 }, scale: 1, speed: 0.31 },
    { title: 'dragon', length: 24, position: { x: -65, y: -50 }, scale: 1.5, playback: true, speed: 0.31 },
    { title: 'girl', length: 26, position: { x: -30, y: -75 }, scale: 1.35, playback: true, speed: 0.5 },
    { title: 'wild', length: 17, position: { x: -30, y: -50 }, scale: 1.4, speed: 0.1 },
    { title: 'J', length: 26, position: { x: 0, y: 0 }, scale: 1, speed: 0.3 },
    { title: 'K', length: 26, position: { x: 0, y: 0 }, scale: 1, speed: 0.3 },
    { title: 'Q', length: 28, position: { x: -20, y: 0 }, scale: 1.1, speed: 0.3 },
    // { title: 'sun', length: 29, position: { x: 0, y: 0 }, scale: 1, speed: 1 },
    // { title: 'triangle', length: 18, position: { x: 0, y: 0 }, scale: 1, speed: 1 },
]
export const slotReels = [
    [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        // 10,
        // 11
    ],
    [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        // 10,
        // 11,
        0,
    ],
    [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        // 10,
        // 11,
        0,
        1,
    ],
    [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        // 10,
        // 11,
        0,
        1,
        2,
    ],
    [
        4,
        5,
        6,
        7,
        8,
        9,
        // 10,
        // 11,
        0,
        1,
        2,
        3,
    ],
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
export function fadeInOut() {
    return (t: any) => 1 - Math.sin(t * Math.PI)
}