export function drawIGT(gameState: CGameState | null, x: number, y: number) {
  if (!gameState) {
    return;
  }
  const time = gameState.playtime;
  const ms = Math.floor((time * 1000) % 1000);
  const sec = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 60 / 60) % 60;

  const text = hours.formatNumber(2, 0, '0') + ':'
    + minutes.formatNumber(2, 0, '0') + ':'
    + sec.formatNumber(2, 0, '0') + '.'
    + ms.formatNumber(3, 0, '0');

  drawText(text, x, y)
}
