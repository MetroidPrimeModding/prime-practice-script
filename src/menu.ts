const CHAR_DIM = 8;
const LINE_PADDING = 2;
const LINE_HEIGHT = CHAR_DIM + LINE_PADDING;

export class Menu {
  cursor = 0;
  x = 0;
  y = 0;
  hasSelected = false;
  active = false;
  parent: MenuItem | null;

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

  toString(): string {
    return '[Menu len ' + this.items.length + ']';
  }

  draw(): void {
    if (!this.active) {
      return;
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.cursor == i) {
        setTextColor(1, 1, 1, 1);
      } else {
        setTextColor(0.5, 0.5, 0.5, 1);
      }
      this.items[i].draw(this.x, this.y + i * (CHAR_DIM + LINE_PADDING));
    }
  }

  handleInput(pad: PADInfo): void {
    if (this.hasSelected) {
      this.items[this.cursor].handleInput(pad);
      return;
    }
    if (pad.pressed.down || pad.pressed.stickDown) {
      this.nextItem();
    }
    if (pad.pressed.up || pad.pressed.stickUp) {
      this.prevItem();
    }
    if (pad.pressed.a) {
      this.hasSelected = true;
      this.items[this.cursor].onSelect();
    }
  }

  nextItem(): void {
    this.cursor++;
    if (this.cursor >= this.items.length) {
      this.cursor = 0;
    }
  }

  prevItem(): void {
    this.cursor--;
    if (this.cursor < 0) {
      this.cursor = this.items.length - 1;
    }
  }
}

export type OnSelectCallback = () => void;

export class MenuItem {
  onSelect: OnSelectCallback;
  submenu: Menu;
  parent: Menu;

  constructor(private name: string, onSelectOrSubmenu?: OnSelectCallback | Menu) {
    this.name = name;
    if (typeof onSelectOrSubmenu == 'function') {
      this.onSelect = onSelectOrSubmenu;
    } else if (onSelectOrSubmenu instanceof Menu) {
      OSReport('Selected a submenu');
      this.submenu = onSelectOrSubmenu;
      this.submenu.parent = this;
      this.onSelect = function onSelect() {
        this.submenu.active = true;
        this.submenu.hasSelected = false;
      }
    } else {
      this.onSelect = function onSelect() {
        this.parent.hasSelected = false;
      }
    }
  }

  toString(): string {
    return '[MenuItem ' + this.name + ' ]';
  }

  draw(x: number, y: number) {
    drawText(this.name, x, y);
    if (this.submenu) {
      this.submenu.draw();
    }
  }

  handleInput(pad: PADInfo) {
    if (this.submenu) {
      if (pad.pressed.b) {
        this.submenu.active = false;
        this.submenu.hasSelected = false;
        this.parent.hasSelected = false;
      } else {
        this.submenu.handleInput(pad);
      }
    }
  }
}
