import { PIXI } from "../renderer";

const reelContainerMask = new PIXI.Graphics();
reelContainerMask.clear();
reelContainerMask.lineStyle(0);
reelContainerMask.beginFill(0x8bc5ff, 0.8).drawRect(0, 270, 1330, 810);

export const getReelContainerMask = () => reelContainerMask

const infoMask = new PIXI.Graphics();
infoMask.clear();
infoMask.lineStyle(0);
infoMask.beginFill(0x8bc5ff, 0.8).drawRect(380, 267, 1140, 685);

export const getInfoMask = () => infoMask