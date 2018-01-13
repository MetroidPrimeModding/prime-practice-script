import {MemoryEnumMenuItem, MemoryFloatMenuItem, MemoryMenuItem, MemoryU32MenuItem} from "./MemoryMenuItems";
import {Menu, MenuItem} from "./menu";
import {MENU_2_OFFSET_X, PAUSE_MENU_OFFSET} from "./constants";
import {readArray, writeArray} from "./MemoryHelpers";

function playerPlusOffset(offset: number) {
  return () => {
    if (!global.player) {
      return 0;
    }
    return global.player.address + offset;
  }
}

let savedPos: number[];
let savedVelocity: number[];
let savedAngularVelocity: number[];
let savedOrientation: number[];

export const POSITION_MENU_ITEMS = [
  new MenuItem('', () => {
    // Do nothing
  }, function (this: MenuItem) {
    if (savedPos) {
      this.name = 'Saved Position: ' +
        savedPos[3].formatNumber(7, 3, '') + ', ' +
        savedPos[7].formatNumber(7, 3, '') + ', ' +
        savedPos[11].formatNumber(7, 3, '');
    } else {
      this.name = 'No saved pos';
    }
  }),
  new MenuItem('Save Position', () => {
    savedPos = readArray(playerPlusOffset(0x34)(), 12, readFloat);
    savedVelocity = readArray(playerPlusOffset(0x138)(), 3, readFloat);
    savedAngularVelocity = readArray(playerPlusOffset(0x144)(), 3, readFloat);
    savedOrientation = readArray(playerPlusOffset(0x200)(), 4, readFloat);
  }),
  new MenuItem('Load Position', () => {
    if (!savedPos) {
      return;
    }
    writeArray(playerPlusOffset(0x34)(), savedPos, writeFloat);
    writeArray(playerPlusOffset(0x138)(), savedVelocity, writeFloat);
    writeArray(playerPlusOffset(0x144)(), savedAngularVelocity, writeFloat);
    writeArray(playerPlusOffset(0x200)(), savedOrientation, writeFloat);
  }),
  new MemoryFloatMenuItem('X', playerPlusOffset(0x34 + 0xC), {
    step: 1
  }),
  new MemoryFloatMenuItem('Y', playerPlusOffset(0x34 + 0x1C), {
    step: 1
  }),
  new MemoryFloatMenuItem('Z', playerPlusOffset(0x34 + 0x2C), {
    step: 1
  })
];


export const STATE_MENU_ITEMS = [
  new MemoryEnumMenuItem('Jump State', playerPlusOffset(0x258), [
    'OnGround',
    'Jump',
    'Starting Jump',
    'Falling',
    'Falling Morphed'
  ]),
  new MemoryEnumMenuItem('Morph State', playerPlusOffset(0x2F8), [
    'Unmorphed',
    'Morphed',
    'Morphing',
    'Unmorphing'
  ]),
  new MemoryEnumMenuItem('Camera State', playerPlusOffset(0x2f4), [
    'First Person',
    'Ball',
    'Two',
    'Transitioning',
    'Spawned'
  ]),
  new MemoryFloatMenuItem('SJ Timer', playerPlusOffset(0x28C), {
    min: 0,
    max: 3,
    step: 0.5
  }),
  new MemoryFloatMenuItem('Falling Time', playerPlusOffset(0x300), {
    step: 0.2
  })
];

export const PLAYER_MENU = new Menu([
  ...POSITION_MENU_ITEMS,
  ...STATE_MENU_ITEMS
], MENU_2_OFFSET_X, PAUSE_MENU_OFFSET);
