import { CheckBox } from "@pixi/ui"
import { PIXI } from "../renderer";

export const getCheckSprite = () => {

    const checkBox = new CheckBox({
        style: {
            unchecked: PIXI.Sprite.from('/assets/image/check-false.png'),
            checked: PIXI.Sprite.from('/assets/image/check-true.png'),
        }
    });

    checkBox.onChange.connect((value) => {
        console.log(`Checkbox changed to ${value}`);
    });
    return checkBox
}
