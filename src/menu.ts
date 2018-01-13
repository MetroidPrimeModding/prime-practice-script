import {CHAR_DIM, LINE_HEIGHT, LINE_PADDING} from "./constants";

export enum OnSelectResult {
  DO_NOTHING = 1,
  DESELECT
}

export class Menu {
  cursor = 0;
  x = 0;
  y = 0;
  hasSelected = false;
  active = false;
  parent: MenuItem | null;
  private scrollTimer = 0;

  constructor(private items: MenuItem[], x: number, y: number) {
    for (const item of items) {
      item.parent = this;
    }
    this.cursor = 0;
    this.x = x;
    this.y = y;
    this.hasSelected = false;
    this.active = false;
  }

  select(index: number): OnSelectResult {
    this.cursor = index;
    this.hasSelected = true;
    return this.items[this.cursor].onSelect() || OnSelectResult.DESELECT;
  }

  deselect(): void {
    this.hasSelected = false;
  }

  toString(): string {
    return '[Menu len ' + this.items.length + ']';
  }

  draw(): void {
    if (!this.active) {
      return;
    }
    let yOff = 0;
    const SCROLL_OFF = 30;
    if (this.cursor > SCROLL_OFF) {
      yOff = (this.cursor - SCROLL_OFF) * -LINE_HEIGHT
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.cursor == i) {
        if (this.hasSelected) {
          setTextColor(0.7, 0.7, 1, 1);
        } else {
          setTextColor(1, 1, 1, 1);
        }
      } else {
        setTextColor(0.4, 0.4, 0.4, 1);
      }
      this.items[i].draw(this.x, this.y + i * (CHAR_DIM + LINE_PADDING) + yOff);
    }
  }

  handleInput(pad: PADInfo): boolean {
    if (this.hasSelected) {
      return this.items[this.cursor].handleInput(pad);
    }
    if (this.scrollTimer > 0) {
      this.scrollTimer--;
    }
    if (pad.pressed.down || pad.pressed.stickDown || pad.pressed.cDown) {
      this.nextItem();
      this.scrollTimer = 15;
    }
    if (pad.pressed.up || pad.pressed.stickUp || pad.pressed.cUp) {
      this.prevItem();
      this.scrollTimer = 15;
    }
    if (pad.pressed.left || pad.pressed.stickLeft || pad.pressed.cLeft) {
      this.cursor -= 4;
      this.prevItem();
      this.scrollTimer = 15;
    }
    if (pad.pressed.right || pad.pressed.stickRight || pad.pressed.cRight || pad.pressed.rDigital) {
      this.cursor += 4;
      this.nextItem();
      this.scrollTimer = 15;
    }
    if (pad.pressed.lDigital) {
      this.cursor = 0;
      this.scrollTimer = 15;
    }
    if (pad.pressed.rDigital) {
      this.cursor = this.items.length - 1;
      this.scrollTimer = 15;
    }
    if (pad.digital.down || pad.digital.stickDown || pad.digital.cDown) {
      if (this.scrollTimer <= 0) {
        this.nextItem();
        this.scrollTimer = 4;
      }
    }
    if (pad.digital.up || pad.digital.stickUp || pad.digital.cUp) {
      if (this.scrollTimer <= 0) {
        this.prevItem();
        this.scrollTimer = 4;
      }
    }
    if (pad.pressed.a) {
      const result = this.select(this.cursor);
      switch (result) {
        case OnSelectResult.DESELECT:
          this.deselect();
          break;
        case OnSelectResult.DO_NOTHING:
        default:
          break;
      }
    }
    return true;
  }

  nextItem(): void {
    this.cursor++;
    while (this.cursor >= this.items.length) {
      this.cursor -= this.items.length;
    }
  }

  prevItem(): void {
    this.cursor--;
    while (this.cursor < 0) {
      this.cursor += this.items.length;
    }
  }
}

export type OnSelectCallback = (this: MenuItem) => OnSelectResult | void;
export type OnDrawCallback = (this: MenuItem) => void;

export class MenuItem {
  onSelectCB: OnSelectCallback;
  parent: Menu;

  constructor(public name: string, onSelect?: OnSelectCallback, private onDraw?: OnDrawCallback) {
    this.name = name;
    this.onSelectCB = onSelect || (() => {
    });
  }

  toString(): string {
    return '[MenuItem ' + this.name + ' ]';
  }

  draw(x: number, y: number) {
    if (this.onDraw) {
      this.onDraw.call(this);
    }
    drawText(this.name, x, y);
  }

  handleInput(pad: PADInfo): boolean {
    return true;
  }

  onSelect(): OnSelectResult | void {
    return this.onSelectCB.call(this);
  }
}

export class MenuItemSubmenu extends MenuItem {
  submenu: Menu;

  constructor(name: string, submenu: Menu) {
    super(name);

    this.submenu = submenu;
    this.submenu.parent = this;
  }

  onSelect(): OnSelectResult {
    this.submenu.active = true;
    this.submenu.deselect();
    return OnSelectResult.DO_NOTHING;
  }

  draw(x: number, y: number) {
    super.draw(x, y);
    if (this.submenu) {
      this.submenu.draw();
    }
  }

  handleInput(pad: PADInfo): boolean {
    super.handleInput(pad);
    if (!this.submenu.handleInput(pad)) {
      return false;
    }
    if (pad.pressed.b) {
      this.submenu.active = false;
      this.submenu.deselect();
      this.parent.deselect();
      OSReport("Deselecting a menu");
      return false;
    }
    return true;
  }
}
