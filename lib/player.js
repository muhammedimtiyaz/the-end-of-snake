class Player {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = "rgb(255, 106, 7)";
    this.tailColor = "rgb(209, 255, 94)";
    this.width = 11;
    this.height = 11;
    this.isStopped = true;
    this.rightBlocked = false;
    this.leftBlocked = false;
    this.maxSpeed = 5;
    this.moveSpeed = 0.8;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.terminalVelocity = 20;
    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.enteringWater = false;
    this.isDiving = false;
    this.inWater = false;

    this.jump = this.jump.bind(this);

    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  }

  jump () {
    if (this.isStopped) {
      this.ySpeed = -7;
      this.isStopped = false;
    }
  }

  fall () {
    if (this.ySpeed < this.terminalVelocity) {
      this.ySpeed += 0.4;
    }
    this.yPos += this.ySpeed;
  }

  float () {
    if (this.ySpeed > -1 * this.terminalVelocity) {
      this.ySpeed -= 0.4;
    }
    this.yPos += this.ySpeed;
  }

  update () {
    if (this.inWater) {
      this.color = "rgb(255, 106, 7)";
      this.tailColor = "rgb(209, 255, 94)";
      this.fall();
    } else if (!this.isStopped) {
      this.tailColor = "rgb(255, 106, 7)";
      this.color = "rgb(209, 255, 94)";
      this.fall();
    }
  }

  handleKeyDown (e) {
    switch (e.key) {
      case "ArrowLeft":
        this.leftPressed = true;
        break;
      case "ArrowUp":
        this.jump();
        break;
      case "ArrowRight":
        this.rightPressed = true;
        break;
      case " ":
        if (!this.isStopped) {
          this.isDiving = true;
        }
        break;
    }
  }

  handleKeyUp (e) {
    switch (e.key) {
      case "ArrowLeft":
        this.leftPressed = false;
        break;
      case "ArrowRight":
        this.rightPressed = false;
        break;
      case " ":
        this.isDiving = false;
        break;
    }
  }

  xMove () {
    this.xSpeed = this.xSpeed * 0.85;

    if ((this.rightBlocked && this.xSpeed > 0) || (this.leftBlocked && this.xSpeed < 0)) {
      this.xSpeed = 0;
    }

    if (this.rightPressed && this.xSpeed < this.maxSpeed && !this.rightBlocked) {
      this.xSpeed += this.moveSpeed;
    }

    if (this.leftPressed && this.xSpeed > this.maxSpeed * -1 && !this.leftBlocked) {
      this.xSpeed -= this.moveSpeed;
    }

    this.rightBlocked = false;
    this.leftBlocked = false;
    this.xPos += this.xSpeed;
  }
}

export default Player;
