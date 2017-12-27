let currentRoom = 0;
let lastRoomTime = 0;
let currentRoomStart = 0;

function timeToFrames(time: number) {
  return Math.round(time * 60);
}

export function drawRoomTimers(gameState: CGameState | null, world: CWorld | null, x: number, y: number) {
  if (!gameState || !world) {
    return;
  }

  let time = gameState.playtime;
  let room = world.area;
  if (room != currentRoom) {
    currentRoom = room;
    lastRoomTime = time - currentRoomStart;
    currentRoomStart = time;
  }
  let currentRoomTime = time - currentRoomStart;
  const text = `Room Time: ${currentRoomTime.formatNumber(8, 3)}/${timeToFrames(currentRoomTime).formatNumber(6, 0)}`
    + `| Last Room: ${lastRoomTime.formatNumber(8, 3)}/${timeToFrames(lastRoomTime).formatNumber(6, 0)}`
  drawText(text, x, y);
}
