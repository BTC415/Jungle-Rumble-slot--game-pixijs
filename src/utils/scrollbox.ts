import { ScrollBox } from "@pixi/ui"
// import { PIXI } from "../renderer";
import { Graphics } from "pixi.js";

export const getScrollBox = () => {

    const scrollBox = new ScrollBox({
        background: 0XFFFFFF,
        width: 200,
        height: 300,
        items: [
            new Graphics().beginFill(0xff0000).drawRect(0, 0, 200, 150),
            new Graphics().beginFill(0x00ff00).drawRect(0, 0, 200, 150),
            new Graphics().beginFill(0x0000ff).drawRect(0, 0, 200, 50),
            new Graphics().beginFill(0x0ff000).drawRect(0, 0, 200, 50),
            new Graphics().beginFill(0x000ff0).drawRect(0, 0, 200, 50),
            new Graphics().beginFill(0x000000).drawRect(0, 0, 200, 50),
            new Graphics().beginFill(0x000000).drawRect(0, 0, 200, 50),
        ],
    });

    // scrollBox.onChange.connect((value) => {
    //     console.log(`Checkbox changed to ${value}`);
    // });
    return scrollBox
}

