import { PIXI } from "../renderer";

export const loadingTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 2,
});
export const winTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 128,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 10,
});
export const gameMessageTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 96,
    fontWeight: 'bold',
    fill: ['#ffffff', '#ff2222'], // gradient
    stroke: '#4a1850',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 10,
});