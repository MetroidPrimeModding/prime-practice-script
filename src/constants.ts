export const CHAR_DIM = 8;
export const LINE_PADDING = 2;
export const LINE_HEIGHT = CHAR_DIM + LINE_PADDING;
export const MENU_2_OFFSET_X = 170;
export const MENU_3_OFFSET_X = 310;
export const PAUSE_MENU_OFFSET = 50;

export enum GXPrimitive {
  GX_POINTS = 0xB8,
  GX_LINES = 0xA8,
  GX_LINESTRIP = 0xB0,
  GX_TRIANGLES = 0x90,
  GX_TRIANGLESTRIP = 0x98,
  GX_TRIANGLEFAN = 0xA0,
  GX_QUADS = 0x80,
}

export enum CEntity_VTables {
  CTrigger = -0x7FC25B28 //0x805a6f94
}
