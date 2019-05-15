export function drawPlayerPos(player: CPlayer | null, x: number, y: number) {
  if (!player) {
    return;
  }
  const str = 'p '
    + player.pos.x.formatNumber(7, 2) + 'x '
    + player.pos.y.formatNumber(7, 2) + 'y '
    + player.pos.z.formatNumber(7, 2) + 'z '
  ;

  drawText(str, x, y);
}
