import { PIXI } from "../renderer";

const reelContainerMask = new PIXI.Graphics();
reelContainerMask.clear();
reelContainerMask.lineStyle(0);
reelContainerMask.beginFill(0x8bc5ff, 0.8);
reelContainerMask.moveTo(0, 260);
reelContainerMask.lineTo(1330, 260);
reelContainerMask.lineTo(1330, 1075);
reelContainerMask.lineTo(0, 1075);

export const getReelContainerMask = () => reelContainerMask

const infoMask = new PIXI.Graphics();
infoMask.clear();
infoMask.lineStyle(0);
infoMask.beginFill(0x8bc5ff, 0.8);
infoMask.moveTo(380, 265);
infoMask.lineTo(1520, 265);
infoMask.lineTo(1520, 950);
infoMask.lineTo(380, 950);

export const getInfoMask = () => infoMask