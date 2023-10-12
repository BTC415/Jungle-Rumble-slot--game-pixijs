import { PIXI } from "../renderer";

export interface IReel {
  reel: PIXI.Container,
  animated_symbols: PIXI.Container[],
  card_backs:PIXI.Sprite[],
  cards: PIXI.Container[],
  url_ids: number[],
  position: number,
  previousPosition: number,
  blur: PIXI.BlurFilter,
};
