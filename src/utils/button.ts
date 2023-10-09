import { PIXI } from "../renderer";
import {Button} from "@pixi/ui"

const container = new PIXI.Container();
const button = new Button(
    new PIXI.Graphics()
        .beginFill(0xFFFFFF)
        .drawRoundedRect(0, 0, 100, 50, 15)

);

button.onPress.connect(() => console.log('onPress'));

container.addChild(button.view);
// appStage.addChild(container)