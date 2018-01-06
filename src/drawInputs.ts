export function drawInputs(pad: PADInfo, x: number, y: number) {
  if (!pad) {
    return;
  }

  let inp = '';
  inp += pad.digital.stickUp ? '\x18' : ' ';
  inp += pad.digital.stickDown ? '\x19' : ' ';
  inp += pad.digital.stickLeft ? '\x1B' : ' ';
  inp += pad.digital.stickRight ? '\x1A' : ' ';

  inp += pad.digital.a ? 'a' : ' ';
  inp += pad.digital.b ? 'b' : ' ';
  inp += pad.digital.x ? 'x' : ' ';
  inp += pad.digital.y ? 'y' : ' ';
  inp += pad.digital.start ? 's' : ' ';
  inp += pad.digital.z ? 'z' : ' ';

  inp += pad.digital.lAnalog ? 'l' : ' ';
  inp += pad.digital.lDigital ? 'L' : ' ';
  inp += pad.digital.rAnalog ? 'r' : ' ';
  inp += pad.digital.rDigital ? 'R' : ' ';

  inp += (
    pad.digital.up ||
    pad.digital.down ||
    pad.digital.left ||
    pad.digital.right
  ) ? 'd' : ' ';

  inp += pad.digital.up ? '\x18' : ' ';
  inp += pad.digital.down ? '\x19' : ' ';
  inp += pad.digital.left ? '\x1B' : ' ';
  inp += pad.digital.right ? '\x1A' : ' ';

  inp += (
    pad.digital.cUp ||
    pad.digital.cDown ||
    pad.digital.cLeft ||
    pad.digital.cRight
  ) ? 'c' : ' ';
  inp += pad.digital.cUp ? '\x18' : ' ';
  inp += pad.digital.cDown ? '\x19' : ' ';
  inp += pad.digital.cLeft ? '\x1B' : ' ';
  inp += pad.digital.cRight ? '\x1A' : ' ';

  inp += pad.analog.stickX.formatNumber(6, 3, '');
  inp += pad.analog.stickY.formatNumber(6, 3, '');
  const len = Math.sqrt(
    pad.analog.stickX * pad.analog.stickX +
    pad.analog.stickY * pad.analog.stickY
  );
  inp += len.formatNumber(6, 3, '');

  drawText(inp, x, y);
}
