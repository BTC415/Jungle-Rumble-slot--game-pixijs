import { slotAnimateUrlType, tweenType } from "../@types"
import { PIXI } from "../renderer"
import { v4 as uuidv4 } from 'uuid';
export const assetUrls = [
    '/assets/image/background.png',
    '/assets/image/background-footer.png',
    '/assets/image/torch-base.png',
    '/assets/image/card-back.png',
    '/assets/image/info-content.png',
    '/assets/image/info-content-mobile.png',
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
export const slotAnimateUrls: slotAnimateUrlType[] = [
    { title: '10', length: 22, position: { x: -40, y: -30 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
    { title: 'A', length: 30, position: { x: -30, y: 0 }, scale: { x: 1.1, y: 1.1 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
    { title: 'bird', length: 30, position: { x: 0, y: 10 }, scale: { x: 1, y: 1 }, playback: false, speed: 0.31, hue: 0, saturate: 1, brightness: 1 },
    { title: 'boy', length: 14, position: { x: -47, y: -35 }, scale: { x: 1.35, y: 1.2 }, playback: false, speed: 0.31, hue: 60, saturate: 1, brightness: 1 },
    { title: 'dragon', length: 24, position: { x: 3, y: 23 }, scale: { x: 0.95, y: 0.95 }, playback: true, speed: 0.31, hue: 0, saturate: 1, brightness: 1 },
    { title: 'girl', length: 26, position: { x: -43, y: -95 }, scale: { x: 1.45, y: 1.45 }, playback: true, speed: 0.5, hue: -125, saturate: 0.8, brightness: 1.5 },
    { title: 'wild', length: 17, position: { x: -30, y: -50 }, scale: { x: 1.4, y: 1.4 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
    { title: 'J', length: 26, position: { x: 0, y: 0 }, scale: { x: 1, y: 1 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
    { title: 'K', length: 26, position: { x: 0, y: 0 }, scale: { x: 1, y: 1 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
    { title: 'Q', length: 28, position: { x: -20, y: 0 }, scale: { x: 1.1, y: 1.1 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
    { title: 'sun', length: 29, position: { x: 0, y: 18 }, scale: { x: 1, y: 1 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
    { title: 'triangle', length: 18, position: { x: -25, y: -15 }, scale: { x: 1.2, y: 1.2 }, playback: false, speed: 0.3, hue: 0, saturate: 1, brightness: 1 },
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
        10,
        11
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
        10,
        11,
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
        10,
        11,
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
        10,
        11,
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
        10,
        11,
        0,
        1,
        2,
        3,
    ],
]

export const show_dialog = (info_dialog_wrapper: PIXI.Container, close_button_sprite: PIXI.Sprite) => {
    if (info_dialog_wrapper.alpha === 0) {
        info_dialog_wrapper.y = 0
        tweenTo(info_dialog_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'static'
    } else if (info_dialog_wrapper.alpha === 1) {
        tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        tweenTo(info_dialog_wrapper, 'y', 0, 10000, 500, rectout(), null, null)
        close_button_sprite.eventMode = 'none'
    }
}
export const allTweenings: tweenType[] = [];
export const reelTweenings: tweenType[] = [];
export function tweenTo(
    object: Object,
    property: string,
    propertyBeginValue: number,
    target: number,
    time: number,
    easing: (t: number) => number,
    change: (() => Promise<void>) | null,
    complete: (() => Promise<void>) | null,
    willCreateReelTweening: boolean = false
) {
    const tween = {
        object,
        property,
        propertyBeginValue,
        target,
        easing,
        time,
        change,
        complete,
        start: Date.now(),
        uuid: uuidv4(),
        flow: !willCreateReelTweening
    };

    if (willCreateReelTweening) reelTweenings.push(tween);
    allTweenings.push(tween);
    return tween;
}
export function lerp(a1: any, a2: any, t: any) {
    return a1 * (1 - t) + a2 * t;
}
export function backout(b: number) {
    // return (t: any) => (t * t * ((amount + 1) * t + amount));
    return (t: number) => (Math.sin(b * Math.PI * t - Math.PI / 2) + 1) / (Math.sin(b * Math.PI - Math.PI / 2) + 1)
}
export function fadeInOut() {
    return (t: number) => 1 - Math.sin(t * Math.PI)
}
export function rectout() {
    return (t: number) => (t < 0.99) ? 1 : 0
}