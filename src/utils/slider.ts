// import { Slider } from "@pixi/ui"
import { FederatedPointerEvent } from "pixi.js";
import { PIXI, app } from "../renderer";
import { media_stop_tablet } from "./utils";
import { App_Dimension, game_global_vars } from "../config";
let dragTarget: {
    type: "slider_bar" | "scroll_content",
    sprite: PIXI.Sprite,
    payload?: number,
    scroll_bar_sprite?: PIXI.Sprite,
} | null;
let onChangeCallback: ((value: number) => void) | null = null;
function onDragMove(event: FederatedPointerEvent) {
    if (dragTarget?.type === "slider_bar") {
        dragTarget.sprite.parent.toLocal(event.global, undefined, dragTarget.sprite.position)
        dragTarget.sprite.x = Math.max(Math.min(dragTarget.sprite.x, 300), 0)
        dragTarget.sprite.y = 0
        localStorage.setItem('slider', Math.round(dragTarget.sprite.x / 3).toString())
        if (onChangeCallback) {
            onChangeCallback(dragTarget.sprite.x / 3)
        }
    } else if (dragTarget?.type === "scroll_content") {
        const info_dialog_wrapper_scale_ratio = (app.screen.width > app.screen.height * media_stop_tablet) ? 1 : game_global_vars.info_dialog_wrapper_scale_ratio
        const APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height) * info_dialog_wrapper_scale_ratio

        const cur_pos: PIXI.Point = event.global;
        cur_pos.y -= dragTarget.payload || 0
        dragTarget.sprite.parent.toLocal(cur_pos, undefined, dragTarget.sprite.position)
        dragTarget.sprite.x = 0
        dragTarget.sprite.y = Math.max(Math.min(dragTarget.sprite.y, 0), Math.min(-(dragTarget.sprite.height - app.screen.height / APP_SCALE), 0))


        const info_content_sprite_height = Math.max(dragTarget.sprite.height - app.screen.height / APP_SCALE, 0)
        if (dragTarget.scroll_bar_sprite) {
            dragTarget.scroll_bar_sprite.y = (app.screen.height / APP_SCALE * (-dragTarget.sprite.y / (info_content_sprite_height + 0.001)) + 150) * 0.8
        }
    }
}
function onDragEnd() {
    if (dragTarget) {
        app.stage.eventMode = 'auto';
        app.stage.off('pointermove', onDragMove);
        dragTarget.sprite.alpha = 1;
    }
    dragTarget = null;
    onChangeCallback = null
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
        dragTarget = { type: "slider_bar", sprite: slider }
        onChangeCallback = onChange;
        dragTarget.sprite.alpha = 0.5;
        app.stage.on('pointermove', onDragMove);
    })
    return sliderWrapper
}
export const getInfoContentSprite = (scroll_bar_sprite: PIXI.Sprite) => {


    const info_content_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/info-content.png'))
    info_content_sprite.eventMode = 'static'
    info_content_sprite.cursor = 'pointer'
    info_content_sprite.on('pointerdown', (event) => {
        const info_dialog_wrapper_scale_ratio = (app.screen.width > app.screen.height * media_stop_tablet) ? 1 : game_global_vars.info_dialog_wrapper_scale_ratio
        const APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height) * info_dialog_wrapper_scale_ratio

        app.stage.eventMode = 'static';
        dragTarget = { type: "scroll_content", sprite: info_content_sprite, payload: event.global.y - info_content_sprite.y * APP_SCALE, scroll_bar_sprite }
        app.stage.on('pointermove', onDragMove);
    })



    return info_content_sprite
}
