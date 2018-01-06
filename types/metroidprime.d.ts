declare enum GXPrimitive {
  GX_POINTS = 0xB8,
  GX_LINES = 0xA8,
  GX_LINESTRIP = 0xB0,
  GX_TRIANGLES = 0x90,
  GX_TRIANGLESTRIP = 0x98,
  GX_TRIANGLEFAN = 0xA0,
  GX_QUADS = 0x80,
}

declare function nativeRequire(path: string): any;

declare function drawText(str: string, x: number, y: number): void;

declare function setTextColor(r: number, g: number, b: number, a: number): void;

declare function readPads(): PADInfo[]

declare function getGameState(): CGameState | null;

declare function getPlayer(): CPlayer | null;

declare function isPauseScreen(): boolean;

declare function warp(worldID: number, areaID: number): void;

declare function drawBegin(primitive: GXPrimitive): void;

declare function drawEnd(): void;

declare function drawColor(r: number, g: number, b: number, a: number): void;

declare function drawVertex(x: number, y: number, z: number): void;

declare function OSReport(msg: string): void;

declare function require<T>(path: string): T;

declare function getWorld(): CWorld | null;

declare function setInventory(player: CPlayer): void;

interface Global {
  onFrame(): void;
  onInput(): void;
  pads: PADInfo[];
  gameState: CGameState | null;
  player: CPlayer | null;
  world: CWorld | null;
}

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
