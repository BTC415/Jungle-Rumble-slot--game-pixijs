
export interface IConfig {
  width: number;
  height: number;
  backgroundColor: number | string;
  autoStart?: boolean;
  antialias?: boolean;
  transparent?: boolean;
  resolution?: number;
};
export type game_global_vars_type = {
  info_dialog_wrapper_scale_ratio:number,
  auto_spin_val: number,
  prev_won_line_index: number,
  last_win: number,
  cur_bet_val: number,
  // won_lines: Array<{
  //   won_line_number_arr: Array<number>,
  //   pay_line_id: number,
  //   cur_win: number
  // }>,
  running: boolean,
  wonRes: any,
}