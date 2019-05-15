import {Menu, MenuItem, MenuItemSubmenu} from "./menu";
import {WARP_MENU} from "./warps";
import {drawInputs} from "./drawInputs";
import {drawIGT} from "./drawIGT";
import {drawPlayerSpeed} from "./drawPlayerSpeed";
import {drawRoomTimers} from "./drawRoomTimers";
import {CONFIG, CONFIG_MENU} from "./config";
import {INVENTORY_MENU} from "./inventory";
import {CEntity_VTables, CHAR_DIM, GXPrimitive, LINE_HEIGHT, PAUSE_MENU_OFFSET} from "./constants";
import {PLAYER_MENU} from "./player";
import {CTrigger} from "./CTrigger";
import {drawPlayerPos} from "./drawPlayerPos";
import {drawPlayerHighPPos} from "./drawHighPPlayerPos";

const mainMenu = new Menu([
  new MenuItem('Room Options [soon]'),
  new MenuItemSubmenu('Inventory', INVENTORY_MENU),
  new MenuItemSubmenu('Player', PLAYER_MENU),
  new MenuItem('Cheats [soon]'),
  new MenuItemSubmenu('Warp', WARP_MENU),
  new MenuItem('Reload [soon]'),
  new MenuItem('Save [soon]'),
  new MenuItem('Change Layer [soon]'),
  new MenuItemSubmenu('Config', CONFIG_MENU),
  ...(DEBUG ? [new MenuItem('Reload scripts', () => nativeRequire('/mod.js'))] : [])
], 10, PAUSE_MENU_OFFSET);
mainMenu.active = true;

global.CONFIG = CONFIG;

global.onFrame = function () {
  try {
    // Don't repeat if we don't need to
    global.gameState = getGameState();
    global.player = getPlayer();
    global.world = getWorld();

    setTextColor(1, 1, 1, 1);
    let y = 10;
    if (CONFIG.showInput) {
      drawText('Prime Practice Mod', 10, y);
      drawIGT(global.gameState, 165, 10);
      if (global.pads) {
        drawInputs(global.pads[0], 275, 10);
      }
      y += LINE_HEIGHT;
    }
    if (CONFIG.showSpeed) {
      drawPlayerSpeed(global.player, 10, y);
      y += LINE_HEIGHT;
    }
    if (CONFIG.showPos) {
      drawPlayerPos(global.player, 10, y);
      y += LINE_HEIGHT;
    }
    if (CONFIG.showHighPPos) {
      drawPlayerHighPPos(global.player, 10, y);
      y += LINE_HEIGHT;
    }
    if (CONFIG.showRoomTimers) {
      drawRoomTimers(global.gameState, global.world, 10, y);
      y += LINE_HEIGHT;
    }
    if (CONFIG.showFPS) {
      drawFPS(610, 452);
    }

    if (isPauseScreen()) {
      drawPauseScreen()
    }
    setTextColor(1, 1, 1, 1);
  } catch (error) {
    setTextColor(1, 0, 0, 1);
    drawText('Error: ' + error + error.stack, 5, 100);
  }
  Duktape.gc();
};

global.onInput = function () {
  global.pads = readPads();
  if (!global.pads[0]) {
    return;
  }

  if (isPauseScreen()) {
    mainMenu.handleInput(global.pads[0]);
  }

  if (global.pads[0].digital.lDigital
    && global.pads[0].digital.rDigital
    && global.pads[0].pressed.start) {
    nativeRequire('/mod.js')();
  }
};

Number.prototype.formatNumber = function (len, decimal, filler) {
  let f = filler || ' ';
  if (f.length == 0) {
    f = ' ';
  }
  let res = this.toFixed(decimal);
  while (res.length < len) {
    res = f + res;
  }
  return res;
};

function drawPauseScreen() {
  drawRect(0, 37, 640, 2, 1, 1, 1, 1);
  drawCentered('Menu', 640 / 2, 40);

  mainMenu.draw();
}

function drawCentered(text: string, x: number, y: number): void {
  const w = text.length * CHAR_DIM;
  drawText(text, x - w / 2, y);
}

function drawRect(x: number, y: number, w: number, h: number, r: number, g: number, b: number, a: number) {
  drawBegin(GXPrimitive.GX_QUADS);
  drawColor(r, g, b, a);
  drawVertex(x, 0, y);
  drawColor(r, g, b, a);
  drawVertex(x, 0, y + h);
  drawColor(r, g, b, a);
  drawVertex(x + w, 0, y + h);
  drawColor(r, g, b, a);
  drawVertex(x + w, 0, y);
  drawEnd();
}

function drawFPS(x: number, y: number) {
  let fps = getFPS();
  drawText(Math.round(fps).toFixed(0), x, y);
}

