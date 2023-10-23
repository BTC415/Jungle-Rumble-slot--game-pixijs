import { CheckBox } from "@pixi/ui"
import { PIXI } from "../renderer";

export const getCheckSprite = (type: 'music' | 'fx', onChange: (value: number | boolean) => void) => {

    const checkBox = new CheckBox({
        style: {
            unchecked: PIXI.Sprite.from(`/assets/image/${type}-false.png`),
            checked: PIXI.Sprite.from(`/assets/image/${type}-true.png`),
        },
        checked: (localStorage.getItem(`${type}`) || 'true') === 'true'
    });
    checkBox.onChange.connect((val) => {
        localStorage.setItem(`${type}`, val.toString())
    })
    checkBox.onChange.connect(onChange);
    return checkBox
}
