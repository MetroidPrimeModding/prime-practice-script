export function writeArray(addr: number, array: number[], writeFn: (addr: number, val: number) => void): void {
  for (let i = 0; i < array.length; i++) {
    writeFn(addr + i * 4, array[i]);
  }
}

export function readArray(addr: number, len: number, readFn: (addr: number) => number): number[] {
  let res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = readFn(addr + i * 4);
  }
  return res;
}

export function readBit(addr: number, bit: number): number {
  return ((readU32(addr) >> (bit)) & 0x1)
}

export function writeBit(addr: number, bit: number, state: number) {
  let val = readU32(addr);
  let bitVal = 1 << (bit);
  if (state > 0) {
    val |= bitVal
  } else {
    val &= ~bitVal;
  }
  writeU32(addr, val);
}


export function readBits(addr: number, start: number, count: number): number {
  let mask = (1 << count) - 1;
  return ((readU32(addr) >> (start)) & mask)
}

export function writeBits(addr: number, start: number, count: number, val: number) {
  for (let i = 0; i < count; i++) {
    let bit = (val >> i) & 0x1;
    writeBit(addr, start + i, bit);
  }
}
