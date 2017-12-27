export function drawPlayerSpeed(player: CPlayer | null, x: number, y: number) {
  if (!player) {
    return;
  }
  let hspeed = Math.sqrt(
    player.speed.x * player.speed.x
    + player.speed.y * player.speed.y
  );
  let rspeed = Math.sqrt(
    player.rotation.x * player.rotation.x
    + player.rotation.y * player.rotation.y
    + player.rotation.z * player.rotation.z
  );
  const str = 's '
    + player.speed.x.formatNumber(7, 2) + 'x '
    + player.speed.y.formatNumber(7, 2) + 'y '
    + player.speed.z.formatNumber(7, 2) + 'z '
    + hspeed.formatNumber(7, 2) + 'h '
    + 'r '
    + player.rotation.x.formatNumber(7, 2) + 'x '
    + player.rotation.y.formatNumber(7, 2) + 'y '
    + player.rotation.z.formatNumber(7, 2) + 'z '
    + rspeed.formatNumber(7, 2) + 't '
  ;

  drawText(str, x, y);
}
