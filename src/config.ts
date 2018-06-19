import {Menu, MenuItem} from "./menu";
import {MENU_2_OFFSET_X, PAUSE_MENU_OFFSET} from "./constants";

export let CONFIG = {
  showSpeed: true,
  showRoomTimers: true,
  showInput: true,
  showFPS: true,
  showLoadingTriggers: true
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
  }),
  new MenuItem('HUD: Hide FPS', function(this: MenuItem)  {
    CONFIG.showFPS = !CONFIG.showFPS;
    if (CONFIG.showFPS) {
      this.name = 'HUD: Hide FPS'
    } else {
      this.name = 'HUD: Show FPS'
    }
  }),
  new MenuItem('Triggers: Show loading', function(this: MenuItem)  {
    CONFIG.showLoadingTriggers = !CONFIG.showLoadingTriggers;
    if (CONFIG.showLoadingTriggers) {
      this.name = 'Triggers: Hide Loading'
    } else {
      this.name = 'Triggers: Show loading'
    }
  })
], MENU_2_OFFSET_X, PAUSE_MENU_OFFSET);
