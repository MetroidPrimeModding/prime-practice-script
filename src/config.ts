import {Menu, MenuItem} from "./menu";
import {MENU_2_OFFSET_X, PAUSE_MENU_OFFSET} from "./constants";

export let CONFIG = {
  showSpeed: true,
  showRoomTimers: true,
  showInput: true,
};

export const CONFIG_MENU = new Menu([
  new MenuItem('HUD: Hide Speed', function(this: MenuItem) {
    CONFIG.showSpeed = !CONFIG.showSpeed;
    if (CONFIG.showSpeed) {
      this.name = 'HUD: Hide Speed'
    } else {
      this.name = 'HUD: Show Speed'
    }
  }),
  new MenuItem('HUD: Hide Room Timers', function(this: MenuItem)  {
    CONFIG.showRoomTimers = !CONFIG.showRoomTimers;
    if (CONFIG.showRoomTimers) {
      this.name = 'HUD: Hide Room Timers'
    } else {
      this.name = 'HUD: Show Room Timers'
    }
  }),
  new MenuItem('HUD: Hide Input', function(this: MenuItem)  {
    CONFIG.showInput = !CONFIG.showInput;
    if (CONFIG.showInput) {
      this.name = 'HUD: Hide Input'
    } else {
      this.name = 'HUD: Show Input'
    }
  })
], MENU_2_OFFSET_X, PAUSE_MENU_OFFSET);
