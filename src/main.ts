import {Menu, MenuItem} from "./menu";

enum GXPrimitive {
  GX_POINTS = 0xB8,
  GX_LINES = 0xA8,
  GX_LINESTRIP = 0xB0,
  GX_TRIANGLES = 0x90,
  GX_TRIANGLESTRIP = 0x98,
  GX_TRIANGLEFAN = 0xA0,
  GX_QUADS = 0x80,
}

const CHAR_DIM = 8;
const LINE_PADDING = 2;
const LINE_HEIGHT = CHAR_DIM + LINE_PADDING;

let pads: PADInfo[];
let gameState: CGameState;
let player: CPlayer;

const warpMenu = new Menu([
  new MenuItem('Landing Site', function () {
    warp(0x39F2DE28, 0xB2701146);
  })
], 140, 45);

const mainMenu = new Menu([
  new MenuItem('Room Options'),
  new MenuItem('Inventory'),
  new MenuItem('Cheats'),
  new MenuItem('Warp', warpMenu),
  new MenuItem('Reload'),
  new MenuItem('Save'),
  new MenuItem('Change Layer'),
  new MenuItem('Reload scripts', () => nativeRequire('/mod.js'))
], 5, 45);
mainMenu.active = true;


global.onFrame = function () {
  try {
    // Don't repeat if we don't need to
    pads = readPads();
    gameState = getGameState();
    player = getPlayer();

    setTextColor(1, 1, 1, 1);
    drawText('Prime Practice Mod', 5, 5);
    drawIGT(160, 5);
    drawInputs(270, 5);
    drawPlayerSpeed(5, 15);

    if (isPauseScreen()) {
      drawPauseScreen()
    }
    setTextColor(1, 1, 1, 1);
  } catch (error) {
    setTextColor(1, 0, 0, 1);
    drawText('Error: ' + error + error.stack, 5, 100);
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


function drawIGT(x: number, y: number) {
  if (!gameState) {
    return;
  }
  const time = gameState.playtime;
  const ms = Math.floor((time * 1000) % 1000);
  const sec = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 60 / 60) % 60;

  const text = hours.formatNumber(2, 0, '0') + ':'
    + minutes.formatNumber(2, 0, '0') + ':'
    + sec.formatNumber(2, 0, '0') + '.'
    + ms.formatNumber(3, 0, '0');

  drawText(text, x, y)
}

function drawPlayerSpeed(x: number, y: number) {
  if (!player) {
    return;
  }
  let hspeed = Math.sqrt(
    player.speed.x * player.speed.x
    + player.speed.y * player.speed.y
  );
  let rspeed = Math.sqrt(
    player.rotation.x * player.rotation.x
    + player.rotation.y * player.rotation.y
    + player.rotation.z * player.rotation.z
  );
  const str = 's '
    + player.speed.x.formatNumber(7, 2) + 'x '
    + player.speed.y.formatNumber(7, 2) + 'y '
    + player.speed.z.formatNumber(7, 2) + 'z '
    + hspeed.formatNumber(7, 2) + 'h '
    + 'r '
    + player.rotation.x.formatNumber(7, 2) + 'x '
    + player.rotation.y.formatNumber(7, 2) + 'y '
    + player.rotation.z.formatNumber(7, 2) + 'z '
    + rspeed.formatNumber(7, 2) + 't '
  ;

  drawText(str, x, y);
}

function drawInputs(x: number, y: number) {
  const pad = pads[0].digital;
  let inp = '';
  inp += pad.stickUp ? '\x18' : ' ';
  inp += pad.stickDown ? '\x19' : ' ';
  inp += pad.stickLeft ? '\x1B' : ' ';
  inp += pad.stickRight ? '\x1A' : ' ';

  inp += pad.a ? 'a' : ' ';
  inp += pad.b ? 'b' : ' ';
  inp += pad.x ? 'x' : ' ';
  inp += pad.y ? 'y' : ' ';
  inp += pad.start ? 's' : ' ';
  inp += pad.z ? 'z' : ' ';

  inp += pad.lAnalog ? 'l' : ' ';
  inp += pad.lDigital ? 'L' : ' ';
  inp += pad.rAnalog ? 'r' : ' ';
  inp += pad.rDigital ? 'R' : ' ';

  inp += (pad.up || pad.down || pad.left || pad.right) ? 'd' : ' ';

  inp += pad.up ? '\x18' : ' ';
  inp += pad.down ? '\x19' : ' ';
  inp += pad.left ? '\x1B' : ' ';
  inp += pad.right ? '\x1A' : ' ';

  inp += (pad.cUp || pad.cDown || pad.cLeft || pad.cRight) ? 'c' : ' ';
  inp += pad.cUp ? '\x18' : ' ';
  inp += pad.cDown ? '\x19' : ' ';
  inp += pad.cLeft ? '\x1B' : ' ';
  inp += pad.cRight ? '\x1A' : ' ';

  drawText(inp, x, y);
}

function drawPauseScreen() {
  drawRect(0, 32, 640, 2, 1, 1, 1, 1);
  drawCentered('Menu', 640 / 2, 35);

  mainMenu.handleInput(pads[0]);
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


