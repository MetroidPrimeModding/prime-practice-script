import {Menu, MenuItem} from "./menu";
import {MENU_2_OFFSET_X, PAUSE_MENU_OFFSET} from "./constants";

export let CONFIG = {
  showSpeed: false,
  showPos: false,
  showHighPPos: false,
  showRoomTimers: false,
  showIGT: true,
  showInput: true,
  showFPS: true,
  showUnknownTriggers: false,
  showLoadTriggers: false,
  showDoorTriggers: false,
  showForceTriggers: false,
  showCameraHintTriggers: false
};

export const CONFIG_MENU = new Menu([
  new MenuItem('HUD: Show Speed', function(this: MenuItem) {
    CONFIG.showSpeed = !CONFIG.showSpeed;
    if (CONFIG.showSpeed) {
      this.name = 'HUD: Hide Speed'
    } else {
      this.name = 'HUD: Show Speed'
    }
  }),
  new MenuItem('HUD: Show Pos', function(this: MenuItem) {
    CONFIG.showPos = !CONFIG.showPos;
    if (CONFIG.showPos) {
      this.name = 'HUD: Hide Pos'
    } else {
      this.name = 'HUD: Show Pos'
    }
  }),
  new MenuItem('HUD: Show High-Precision Pos', function(this: MenuItem) {
    CONFIG.showHighPPos = !CONFIG.showHighPPos;
    if (CONFIG.showHighPPos) {
      this.name = 'HUD: Hide High-Precision Pos'
    } else {
      this.name = 'HUD: Show High-Precision Pos'
    }
  }),
  new MenuItem('HUD: Show Room Timers', function(this: MenuItem)  {
    CONFIG.showRoomTimers = !CONFIG.showRoomTimers;
    if (CONFIG.showRoomTimers) {
      this.name = 'HUD: Hide Room Timers'
    } else {
      this.name = 'HUD: Show Room Timers'
    }
  }),
  new MenuItem('HUD: Hide IGT', function(this: MenuItem)  {
    CONFIG.showIGT = !CONFIG.showIGT;
    if (CONFIG.showIGT) {
      this.name = 'HUD: Hide IGT'
    } else {
      this.name = 'HUD: Show IGT'
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
  new MenuItem('Triggers: Show Other', function(this: MenuItem)  {
    CONFIG.showUnknownTriggers = !CONFIG.showUnknownTriggers;
    if (CONFIG.showUnknownTriggers) {
      this.name = 'Triggers: Hide Other'
    } else {
      this.name = 'Triggers: Show Other'
    }
  }),
  new MenuItem('Triggers: Show Loading', function(this: MenuItem)  {
    CONFIG.showLoadTriggers = !CONFIG.showLoadTriggers;
    if (CONFIG.showLoadTriggers) {
      this.name = 'Triggers: Hide Loading'
    } else {
      this.name = 'Triggers: Show Loading'
    }
  }),
  new MenuItem('Triggers: Show Door', function(this: MenuItem)  {
    CONFIG.showDoorTriggers = !CONFIG.showDoorTriggers;
    if (CONFIG.showDoorTriggers) {
      this.name = 'Triggers: Hide Door'
    } else {
      this.name = 'Triggers: Show Door'
    }
  }),
  new MenuItem('Triggers: Show Force', function(this: MenuItem)  {
    CONFIG.showForceTriggers = !CONFIG.showForceTriggers;
    if (CONFIG.showForceTriggers) {
      this.name = 'Triggers: Hide Force'
    } else {
      this.name = 'Triggers: Show Force'
    }
  }),
  new MenuItem('Triggers: Show Camera Hint', function(this: MenuItem)  {
    CONFIG.showCameraHintTriggers = !CONFIG.showCameraHintTriggers;
    if (CONFIG.showCameraHintTriggers) {
      this.name = 'Triggers: Hide Camera Hint'
    } else {
      this.name = 'Triggers: Show Camera Hint'
    }
  })
], MENU_2_OFFSET_X, PAUSE_MENU_OFFSET);
