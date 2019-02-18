class Level {
  constructor(player, platformArr, renderArr, exit) {
    this.player = player;
    this.renderArr = renderArr;
    this.platformArr = platformArr;
    this.exit = exit;
    this.respawn = [player.xPos, player.yPos];
  }
}

export default Level;