import { IConfig, game_global_vars_type } from "../@types";
export const config: IConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  autoStart: true,
  antialias: true,
  transparent: false,
  resolution: 1
};
export const game_global_vars: game_global_vars_type = {
  info_dialog_wrapper_scale_ratio: 1.5,
  auto_spin_val: 0,
  prev_won_line_index: -1,
  // won_lines: [],
  last_win: 0,
  cur_bet_val: 0,
  running: false,
  wonRes: null,
  floatSymbolStore:[
    [null,null,null],
    [null,null,null],
    [null,null,null],
    [null,null,null],
    [null,null,null],
  ]
}