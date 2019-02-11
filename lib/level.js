class Level {
  constructor(player, platform, render, exit) {
    this.player = player;
    this.render = render;
    this.platform = platform;
    this.exit = exit;
    this.reSpawn = [player.xPos, player.yPos];
  }
}

export default Level;