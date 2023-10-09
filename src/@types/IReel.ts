import { PIXI } from "../renderer";

export interface IReel {
  reel: PIXI.Container,
  symbols: PIXI.Sprite[],
  cards: PIXI.Container[]
  url_ids:number[],
  position: number,
  previousPosition: number,
  blur: PIXI.BlurFilter,
};
