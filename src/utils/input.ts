import { PIXI } from "../renderer";
import { Input } from "@pixi/ui"
export const getInputSprite = ({ text, onChange }: { text: string, onChange: (value:string) => void }) => {
    const wrapper = new PIXI.Container()
    const inputSprite = new Input({
        bg: PIXI.Sprite.from('/assets/image/input-back.png'),
    });
    wrapper.addChild(inputSprite)
    const MAX_TEXT_LENGTH = 20
    const inputText = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 20, fill: 0x000000 });
    inputText.x = 140
    inputText.y = 50
    inputText.anchor.set(0.5);
    inputSprite.value = text
    inputText.text = text.trim().length > 0 ? text : "Enter Text";
    // Update the inputText whenever there's a change in the input field
    inputSprite.onChange.connect(() => {
        const value = inputSprite.value = inputSprite.value.replace(/\D/g, "")
        if (value.length > MAX_TEXT_LENGTH) {
            inputText.text = value.substring(0, MAX_TEXT_LENGTH);
        } else {
            inputText.text = value.trim().length > 0 ? value : "Enter Text";
        }
        onChange(value)
    });
    const setText = (text: string) => {
        inputSprite.value = text
        inputText.text = text
    }
    const getText = () => inputSprite.value
    wrapper.addChild(inputSprite)
    wrapper.addChild(inputText)
    return { wrapper, setText, getText }
}