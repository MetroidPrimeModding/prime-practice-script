import {MenuItem, OnSelectResult} from "./menu";
import {CHAR_DIM, MENU_3_OFFSET_X} from "./constants";
import {readBit, writeBit} from "./MemoryHelpers";

interface MemoryMenuItemOptions {
  step: number;
  editable: boolean;
  min?: number;
  max?: number;
  hex?: boolean;
}

const FLOAT_MEMORY_MENU_ITEM_DEFAULT_OPTIONS: MemoryMenuItemOptions = {
  step: 1,
  editable: true,
};

export class MemoryMenuItem extends MenuItem {
  readonly opts: MemoryMenuItemOptions;

  constructor(name: string,
              public address: () => number,
              public readFn: (addr: number) => number,
              public writeFn: (addr: number, val: number) => void,
              opts: Partial<MemoryMenuItemOptions> = {}) {
    super(name);
    this.opts = {
      ...FLOAT_MEMORY_MENU_ITEM_DEFAULT_OPTIONS,
      ...opts
    };
    let msg = 'name: ' + name;
    for (let key in this.opts) {
      msg += `${key}:${(this.opts as any)[key]},`;
    }
    OSReport(msg);
  }

  draw(x: number, y: number) {
    super.draw(x, y);
    let amt = this.read();
    let str = '';
    if (this.opts.hex) {
      str = amt.toString(16);
    } else {
      str = amt.formatNumber(11, 4, ' ');
    }
    drawText(str, MENU_3_OFFSET_X, y);
  }

  read(): number {
    return this.readFn(this.address());
  }

  write(amt: number) {
    this.writeFn(this.address(), amt)
  }

  onSelect() {
    return OnSelectResult.DO_NOTHING;
  }

  handleInput(pad: PADInfo): boolean {
    if (pad.pressed.b) {
      this.parent.deselect();
      return false;
    }
    if (!this.opts.editable) {
      return true;
    }
    let amt = this.read();
    let changed = false;
    if (pad.pressed.up || pad.pressed.stickUp || pad.pressed.cUp) {
      amt -= this.opts.step;
      changed = true;
    }
    if (pad.pressed.left || pad.pressed.stickLeft || pad.pressed.cLeft) {
      amt -= this.opts.step * 5;
      changed = true;
    }
    if (pad.pressed.down || pad.pressed.stickDown || pad.pressed.cDown) {
      amt += this.opts.step;
      changed = true;
    }
    if (pad.pressed.right || pad.pressed.stickRight || pad.pressed.cRight) {
      amt += this.opts.step * 5;
      changed = true;
    }
    if (pad.pressed.lDigital) {
      if (typeof this.opts.min == 'number') {
        amt = this.opts.min;
      } else {
        amt -= this.opts.step * 10;
      }
      changed = true;
    }
    if (pad.pressed.rDigital) {
      if (typeof this.opts.max == 'number') {
        amt = this.opts.max;
      } else {
        amt += this.opts.step * 10;
      }
      changed = true;
    }
    if (this.opts.max && amt > this.opts.max) {
      amt = this.opts.max;
    }
    if (this.opts.min && amt < this.opts.min) {
      amt = this.opts.min;
    }
    if (changed) {
      this.write(amt);
    }
    return true;
  }
}

export class MemoryU32MenuItem extends MemoryMenuItem {
  constructor(name: string,
              address: () => number,
              opts: Partial<MemoryMenuItemOptions> = {}) {
    super(name, address, readU32, writeU32, opts);
  }
}

export class MemoryS32MenuItem extends MemoryMenuItem {
  constructor(name: string,
              address: () => number,
              opts: Partial<MemoryMenuItemOptions> = {}) {
    super(name, address, readS32, writeS32, opts);
  }
}

export class MemoryFloatMenuItem extends MemoryMenuItem {
  constructor(name: string,
              address: () => number,
              opts: Partial<MemoryMenuItemOptions> = {}) {
    super(name, address, readFloat, writeFloat, opts);
  }
}

export class MemoryDoubleMenuItem extends MemoryMenuItem {
  constructor(name: string,
              address: () => number,
              opts: Partial<MemoryMenuItemOptions> = {}) {
    super(name, address, readDouble, writeDouble, opts);
  }
}

interface MemoryEnumValue {
  name: string;
  value: number;
  index: number;
}

export class MemoryEnumMenuItem extends MenuItem {
  private valueArray: MemoryEnumValue[] = [];
  private valToStr: { [key: number]: string } = {};
  private strToVal: { [key: string]: number } = {}

  constructor(name: string,
              public address: () => number,
              values: { [key: string]: number } | string[],
              public readFn: (addr: number) => number = readU32,
              public writeFn: (addr: number, val: number) => number = writeU32) {
    super(name);
    if (values instanceof Array) {
      this.valueArray = values.map((val, index) => {
        return {
          name: val,
          value: index,
          index: index
        };
      });
    } else {
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          let val = values[key];
          this.valueArray.push({
            name: key,
            value: val,
            index: this.valueArray.length
          });
        }
      }
    }

    for (let item of this.valueArray) {
      this.strToVal[item.name] = item.value;
      this.valToStr[item.value] = item.name;
    }
  }

  draw(x: number, y: number) {
    super.draw(x, y);
    let val = this.read();
    let str = this.valToStr[val];
    drawText(str, MENU_3_OFFSET_X, y);
  }

  read(): number {
    return this.readFn(this.address());
  }

  write(amt: number) {
    this.writeFn(this.address(), amt)
  }

  onSelect() {
    return OnSelectResult.DO_NOTHING;
  }

  handleInput(pad: PADInfo): boolean {
    if (pad.pressed.b) {
      this.parent.deselect();
      return false;
    }
    let val = this.read();
    let curValIdx = (this.valueArray.filter((v) => v.value == val)[0] || {index: 0}).index;

    let changed = false;
    if (pad.pressed.up || pad.pressed.stickUp || pad.pressed.cUp) {
      curValIdx -= 1;
      changed = true;
    }
    if (pad.pressed.left || pad.pressed.stickLeft || pad.pressed.cLeft) {
      curValIdx -= 5;
      changed = true;
    }
    if (pad.pressed.down || pad.pressed.stickDown || pad.pressed.cDown) {
      curValIdx += 1;
      changed = true;
    }
    if (pad.pressed.right || pad.pressed.stickRight || pad.pressed.cRight) {
      curValIdx += 5;
      changed = true;
    }
    if (pad.pressed.lDigital) {
      curValIdx = 0;
      changed = true;
    }
    if (pad.pressed.rDigital) {
      curValIdx = this.valueArray.length - 1;
      changed = true;
    }
    if (curValIdx >= this.valueArray.length) {
      curValIdx = this.valueArray.length - 1;
    }
    if (curValIdx < 0) {
      curValIdx = 0;
    }
    if (changed) {
      val = this.valueArray[curValIdx].value;
      this.write(val);
    }
    return true;
  }
}

export class MemoryBitMenuItem extends MenuItem {
  constructor(name: string,
              public address: () => number,
              public bit: number,
              writable: boolean = true) {
    super(name);
  }

  draw(x: number, y: number) {
    super.draw(x, y);
    let val = this.read();
    drawText(val ? 'On' : 'Off', MENU_3_OFFSET_X, y);
  }

  read(): boolean {
    return readBit(this.address(), this.bit) > 0;
  }

  write(state: boolean) {
    writeBit(this.address(), this.bit, state ? 1 : 0);
  }

  onSelect() {
    this.write(!this.read());
    return OnSelectResult.DO_NOTHING;
  }
}
