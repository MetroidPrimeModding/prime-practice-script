import {Menu, MenuItem, OnSelectResult} from "./menu";

const CHAR_DIM = 8;
const LINE_PADDING = 2;

interface InventoryItem {
  index: number
  name: string;
  max?: number;
  step?: number;
  hide?: boolean;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {index: 0, name: 'Power Beam', hide: true},
  {index: 1, name: 'Ice Beam'},
  {index: 2, name: 'Wave Beam'},
  {index: 3, name: 'Plasma Beam'},
  {index: 10, name: 'Charge Beam'},

  {index: 24, name: 'EnergyTank', max: 14},

  {index: 4, name: 'Missile', max: 250, step: 5},
  {index: 11, name: 'Super Missile'},
  {index: 28, name: 'Wavebuster'},
  {index: 14, name: 'Ice Spreader'},
  {index: 8, name: 'Flamethrower'},

  {index: 16, name: 'Morph Ball'},
  {index: 6, name: 'Morph Ball Bomb'},
  {index: 18, name: 'Boost Ball'},
  {index: 19, name: 'Spider Ball'},
  {index: 7, name: 'Power Bomb', max: 8},

  {index: 15, name: 'Space Jump'},
  {index: 12, name: 'Grapple Beam'},

  {index: 17, name: 'Combat Visor', hide: true},
  {index: 5, name: 'Scan Visor', hide: true},
  {index: 9, name: 'Thermal Visor'},
  {index: 13, name: 'X-Ray Visor'},


  {index: 20, name: 'Power Suit', hide: true},
  {index: 22, name: 'Varia Suit'},
  {index: 21, name: 'Gravity Suit'},
  {index: 23, name: 'Phazon Suit'},


  {index: 25, name: 'Unknown1', hide: true},
  {index: 26, name: 'HealthRefill', hide: true},
  {index: 27, name: 'Unknown2', hide: true},
  {index: 29, name: 'ArtifactOfTruth', hide: true},
  {index: 30, name: 'ArtifactOfStrength', hide: true},
  {index: 31, name: 'ArtifactOfElder', hide: true},
  {index: 32, name: 'ArtifactOfWild', hide: true},
  {index: 33, name: 'ArtifactOfLifegiver', hide: true},
  {index: 34, name: 'ArtifactOfWarrior', hide: true},
  {index: 35, name: 'ArtifactOfChozo', hide: true},
  {index: 36, name: 'ArtifactOfNature', hide: true},
  {index: 37, name: 'ArtifactOfSun', hide: true},
  {index: 38, name: 'ArtifactOfWorld', hide: true},
  {index: 39, name: 'ArtifactOfSpirit', hide: true},
  {index: 40, name: 'ArtifactOfNewborn', hide: true},
];

const TWENTY_ONE_PERCENT = [];

class MenuItemInventoryItem extends MenuItem {
  constructor(name: string, readonly max: number, readonly step: number, readonly index: number) {
    super(name);
  }

  draw(x: number, y: number) {
    super.draw(x, y);
    let amt = 0;
    let cap = 0;
    if (global.player) {
      amt = global.player.itemAmount[this.index];
      cap = global.player.itemCapacity[this.index]
    }
    drawText(`${amt}/${cap}`, x + (this.name.length + 1) * CHAR_DIM, y);
  }

  onSelect() {
    if (this.max > 1) {
      return OnSelectResult.DO_NOTHING;
    } else {
      if (!global.player) {
        return;
      }
      let amt = Math.max(global.player.itemAmount[this.index], global.player.itemCapacity[this.index]);
      if (amt == 0) {
        amt = 1;
      } else {
        amt = 0;
      }
      global.player.itemCapacity[this.index] = amt;
      global.player.itemAmount[this.index] = amt;
      setInventory(global.player);

      return OnSelectResult.DESELECT;
    }
  }

  handleInput(pad: PADInfo): boolean {
    if (pad.pressed.b) {
      this.parent.deselect();
      return false;
    }
    if (!global.player) {
      return true;
    }
    let amt = Math.max(global.player.itemAmount[this.index], global.player.itemCapacity[this.index]);
    let changed = false;
    if (pad.pressed.up || pad.pressed.stickUp || pad.pressed.cUp
      || pad.pressed.left || pad.pressed.stickLeft || pad.pressed.cLeft) {
      amt -= this.step;
      changed = true;
    }
    if (pad.pressed.down || pad.pressed.stickDown || pad.pressed.cDown
      || pad.pressed.right || pad.pressed.stickRight || pad.pressed.cRight) {
      amt += this.step;
      changed = true;
    }
    if (pad.pressed.lDigital) {
      amt = 0;
      changed = true;
    }
    if (pad.pressed.rDigital) {
      amt = this.max;
      changed = true;
    }
    if (amt > this.max) {
      amt = this.max;
    }
    if (amt < 0) {
      amt = 0;
    }
    if (changed) {
      global.player.itemCapacity[this.index] = amt;
      global.player.itemAmount[this.index] = amt;
    }
    setInventory(global.player);

    return true;
  }
}

class MenuItemHealth extends MenuItem {
  constructor(name: string) {
    super(name);
  }

  draw(x: number, y: number) {
    super.draw(x, y);
    let amt = 0;
    if (global.player) {
      amt = global.player.health;
    }
    drawText(`${amt}`, x + (this.name.length + 1) * CHAR_DIM, y);
  }

  onSelect() {
    return OnSelectResult.DO_NOTHING;
  }

  handleInput(pad: PADInfo): boolean {
    if (pad.pressed.b) {
      this.parent.deselect();
      return false;
    }
    if (!global.player) {
      return true;
    }
    let step = 100;
    let etanks = Math.max(global.player.itemAmount[24], global.player.itemCapacity[24]);
    let amt = global.player.health;
    let changed = false;
    if (pad.pressed.up || pad.pressed.stickUp || pad.pressed.cUp
      || pad.pressed.left || pad.pressed.stickLeft || pad.pressed.cLeft) {
      amt -= step;
      changed = true;
    }
    if (pad.pressed.down || pad.pressed.stickDown || pad.pressed.cDown
      || pad.pressed.right || pad.pressed.stickRight || pad.pressed.cRight) {
      amt += step;
      changed = true;
    }
    if (pad.pressed.lDigital) {
      amt = 1;
      changed = true;
    }
    if (pad.pressed.rDigital) {
      amt = etanks * 100 + 99;
      changed = true;
    }
    if (amt > etanks * 100 + 99) {
      amt = etanks * 100 + 99;
    }
    if (amt < 1) {
      amt = 1;
    }
    if (changed) {
      global.player.health = amt;
    }
    setInventory(global.player);

    return true;
  }
}

export const INVENTORY_MENU = new Menu([
  new MenuItemHealth('Health'),
  ...(INVENTORY_ITEMS
    .filter((v) => !v.hide)
    .map((v) => new MenuItemInventoryItem(v.name, v.max || 1, v.step || 1, v.index))),
], 170, 50);

