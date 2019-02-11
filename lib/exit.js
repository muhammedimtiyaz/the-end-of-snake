const Rainbow = require('rainbowvis.js');
const rainbowOne = new Rainbow();
const tinycolor = require('tinycolor2');
let rainbowTwo = [];

for (let i = 0; i < 101; i++) {
  let colour = tinycolor(rainbowOne.colourAt(i)).toHsv();
  colour.setAlpha = 0.5;
  rainbowTwo.push(tinycolor(colour).toHexString());
}

class Exit {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 25;
    this.height = 25;
    this.rainbowCounter = 0;
    this.increment = 1;
    this.colour = rainbowTwo[this.rainbowCounter];
    this.borderColour = rainbowTwo[Math.abs(100 - this.rainbowCounter)];
  }

  swapColour() {
    if (this.rainbowCounter === 100) {
      this.increment = -1;
    } else if (this.rainbowCounter === 0) {
      this.increment = 1;
    }

    this.rainbowCounter += this.increment;
    this.colour = rainbowTwo[this.rainbowCounter];
    this.borderColour = rainbowTwo[Math.abs(100 - this.rainbowCounter)];
  }

  update () {
    this.swapColour();
  }
}

export default Exit;