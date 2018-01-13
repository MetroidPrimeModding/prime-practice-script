declare function nativeRequire(path: string): any;

declare function drawText(str: string, x: number, y: number): void;

declare function setTextColor(r: number, g: number, b: number, a: number): void;

declare function readPads(): PADInfo[]

declare function getGameState(): CGameState | null;

declare function getPlayer(): CPlayer | null;

declare function isPauseScreen(): boolean;

declare function warp(worldID: number, areaID: number): void;

declare function drawBegin(primitive: number): void;

declare function drawEnd(): void;

declare function drawColor(r: number, g: number, b: number, a: number): void;

declare function drawVertex(x: number, y: number, z: number): void;

declare function OSReport(msg: string): void;

declare function require<T>(path: string): T;

declare function getWorld(): CWorld | null;

declare function setInventory(player: CPlayer): void;

declare function readU32(addr: number): number;

declare function readS32(addr: number): number;

declare function readFloat(addr: number): number;

declare function readDouble(addr: number): number;

declare function writeU32(addr: number, value: number): number;

declare function writeS32(addr: number, value: number): number;

declare function writeFloat(addr: number, value: number): number;

declare function writeDouble(addr: number, value: number): number;


interface Global {
  onFrame(): void;

  onInput(): void;

  pads: PADInfo[];
  gameState: CGameState | null;
  player: CPlayer | null;
  world: CWorld | null;
}

declare var DEBUG: boolean;

interface CVector3f {
  x: number;
  y: number;
  z: number;
}

interface PADButtonInfo<T> {
  stickUp: T;
  stickDown: T;
  stickLeft: T;
  stickRight: T;
  a: T;
  b: T;
  x: T;
  y: T;
  start: T;
  z: T;

  lAnalog: T;
  lDigital: T;
  rAnalog: T;
  rDigital: T;

  up: T;
  down: T;
  left: T;
  right: T;
  cUp: T;
  cDown: T;
  cLeft: T;
  cRight: T;
}

interface PadButtonInfoAnalog<T> extends PADButtonInfo<T> {
  stickX: number;
  stickY: number;
  cX: number;
  cY: number;
}

interface PADInfo {
  digital: PADButtonInfo<boolean>;
  pressed: PADButtonInfo<boolean>;
  analog: PadButtonInfoAnalog<number>;
}

interface CGameState {
  playtime: number;
}

interface CPlayer {
  address: number;
  speed: CVector3f;
  rotation: CVector3f;
  itemAmount: number[]
  itemCapacity: number[];
  health: number;
  currentSuit: number;
}

interface CWorld {
  area: number;
}

interface Number {
  formatNumber(len: number, decimal: number, filler?: string): string;
}
