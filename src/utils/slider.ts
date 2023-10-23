// import { Slider } from "@pixi/ui"
import { FederatedPointerEvent } from "pixi.js";
import { PIXI, app } from "../renderer";
let dragTarget: PIXI.Sprite | null;
let onChangeCallback: ((value: number) => void) | null = null;
function onDragMove(event: FederatedPointerEvent) {
    if (dragTarget) {
        dragTarget.parent.toLocal(event.global, undefined, dragTarget.position)
        dragTarget.x = Math.max(Math.min(dragTarget.x, 300), 0)
        dragTarget.y = 0
        localStorage.setItem('slider', Math.round(dragTarget.x / 3).toString())
        if (onChangeCallback) {
            onChangeCallback(dragTarget.x / 3)
        }
    }
}
function onDragEnd() {
    if (dragTarget) {
        app.stage.eventMode = 'auto';
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
        onChangeCallback = null
    }
}

app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);
export const getSliderSprite = (onChange: (value: number) => void) => {
    const sliderWrapper = PIXI.Sprite.from('/assets/image/slider-track.png')
    const slider = PIXI.Sprite.from('/assets/image/slider-slider.png')
    slider.position.set(parseInt(localStorage.getItem('slider') || '50') * 3, 0)
    sliderWrapper.addChild(slider)
    slider.anchor.set(0.5);
    slider.eventMode = 'static'
    slider.cursor = 'pointer'
    slider.on('pointerdown', () => {
        app.stage.eventMode = 'static';
        dragTarget = slider
        onChangeCallback = onChange;
        (dragTarget as PIXI.Sprite).alpha = 0.5;
        app.stage.on('pointermove', onDragMove);
    })
    return sliderWrapper
}
