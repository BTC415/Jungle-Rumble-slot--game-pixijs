import { Slider } from "@pixi/ui"
import { PIXI } from "../renderer";
export const getSliderSprite = () => {

    const singleSlider = new Slider({
        bg: PIXI.Sprite.from('/assets/image/slider-track.png'),
        fill: PIXI.Sprite.from('/assets/image/slider-back.png'),
        slider: PIXI.Sprite.from('/assets/image/slider-slider.png'),
        min: 0,
        max: 100,
        value: 50,
    });

    singleSlider.onChange.connect((value) => {
        console.log(`Slider changed to ${value}`);
    });
    return singleSlider
}
