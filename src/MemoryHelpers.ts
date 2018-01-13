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
