export function drawPlayerHighPPos(player: CPlayer | null, x: number, y: number) {
  if (!player) {
    return;
  }
  const str = 'p '
    + player.pos.x.formatNumber(7, 7) + 'x '
    + player.pos.y.formatNumber(7, 7) + 'y '
    + player.pos.z.formatNumber(7, 7) + 'z '
  ;

  drawText(str, x, y);
}
