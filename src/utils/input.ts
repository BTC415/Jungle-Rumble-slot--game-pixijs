import { PIXI, app } from "../renderer";
import { Input } from "@pixi/ui"
export const getInputSprite = ({ text, onChange }: { text: string, onChange: (value: string) => void }) => {
    const wrapper = new PIXI.Container()
    const inputSprite = new Input({
        bg: PIXI.Sprite.from('/assets/image/input-back.png'),
    });
    const MAX_TEXT_LENGTH = 20
    const inputText = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 20, fill: 0x000000 });
    inputText.eventMode = 'none'
    inputText.x = 140
    inputText.y = 50
    inputText.anchor.set(0.5);
    inputSprite.value = text
    inputText.text = text.trim().length > 0 ? text : "Enter Value";

    const cursorSprite = new PIXI.Graphics()
    cursorSprite.lineStyle(0);
    cursorSprite.beginFill(0x222222, 1).drawRect(0, 38, 1, 25);

    inputSprite.onChange.connect(() => {
        const value = inputSprite.value = inputSprite.value.replace(/\D/g, "")
        if (value.length > MAX_TEXT_LENGTH) {
            inputText.text = value.substring(0, MAX_TEXT_LENGTH);
        } else {
            inputText.text = value.trim().length > 0 ? value : "Enter Text";
        }
        onChange(value)
    });
    inputSprite.on('pointerdown', () => {
        app.ticker.add(blinkCursor);
    });

    inputSprite.onEnter.connect(() => {
        cursorSprite.visible = false
        app.ticker.remove(blinkCursor);
    });
    const setText = (text: string) => {
        inputSprite.value = text
        inputText.text = text
    }
    const getText = () => inputSprite.value
    wrapper.addChild(inputSprite)
    wrapper.addChild(cursorSprite)
    wrapper.addChild(inputText)
    function blinkCursor() {

        cursorSprite.x = 140 + inputText.text.trim().length * 6
        cursorSprite.visible = Date.now() % 1000 > 500;
    }
    return { wrapper, setText, getText }
}