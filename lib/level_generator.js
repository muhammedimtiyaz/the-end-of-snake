import Level from './levels';
import Platform from './platform';
import Player from './player';
import Exit from './exit';

const levelOne = new Level(
  new Player(50, -3000), [
    new Platform(0, 200, 700, 300),
    new Platform(150, 250, 600, 400),
    new Platform(300, 230, 680, 200),
    new Platform(450, 190, 450, 200),
    new Platform(600, 160, 300, 200)
  ],
  [
    [450, 190, 340, 100, true],
    [600, 160, 300, 100, true],
    [300, 230, 280, 80, true],
    [150, 270, 150, 60, true],
    [0, 300, 150, 50, true],
  ],
  new Exit(815, 120)
)

const levelTwo = new Level(
  new Player(50, 200), [
    new Platform(695, 26, 200, 100),
    new Platform(300, 215, 280, 80),
    new Platform(450, 125, 450, 100),
    new Platform(170, 260, 150, 60),
    new Platform(0, 300, 150, 50)
  ],
  [
    [695, 26, 200, 100, true],
    [300, 215, 280, 80, true],
    [450, 125, 450, 100, true],
    [170, 260, 150, 60, true],
    [0, 300, 150, 50, true]
  ],
  new Exit(815, 0)
)

const levelThree = new Level(
  new Player(50,  0), [
    new Platform(0, 300, 120, 100),
    new Platform(150, 270, 120, 100),
    new Platform(300, 230, 120, 100),
    new Platform(500, 300, 120, 100),
    new Platform(725, 500, 160, 100)
  ],
  [
    [0, 300, 120, 100, true],
    [150, 270, 120, 100, true],
    [300, 230, 120, 100, true],
    [500, 300, 120, 100, true],
    [725, 500, 160, 100, true]
  ],
  new Exit(793, 525)
)

const levelFour = new Level(
  new Player(50, -3000), [
    new Platform(0, 300, 100, 100),
    new Platform(185, 275, 100, 100),
    new Platform(390, 230, 100, 250),
    new Platform(600, 190, 100, 250),
    new Platform(910, -1000, 50, 1500),
    new Platform(840, 465, 100, 50),
    new Platform(650, -1275, 80, 50)
  ],
  [
    [0, 300, 100, 100, true],
    [185, 275, 100, 100, true],
    [390, 230, 100, 250, true],
    [600, 190, 100, 250, true],
    [910, -1000, 50, 1500, true],
    [840, 465, 100, 50, true],
    [650, -1275, 80, 50, true]
  ],
  new Exit(600, -1325)
)

const levelFive = new Level(
  new Player(825, 0), [
    new Platform(725, 500, 150, 100),
    new Platform(600, 460, 100, 100),
    new Platform(500, 305, 120, 100),
    new Platform(225, 230, 280, 30),
    new Platform(250, 150, 236, 30),
    new Platform(275, 70, 188, 30),
    new Platform(300, -10, 140, 30),
    new Platform(325, -90, 96, 30),
    new Platform( 350, -170, 50, 30)
  ],
  [
    [725, 500, 150, 100, true],
    [600, 460, 100, 100, true],
    [500, 305, 120, 100, true],
    [225, 230, 280, 30, true],
    [250, 150, 236, 30, true],
    [275, 70, 188, 30, true],
    [300, -10, 140, 30, true],
    [325, -90, 96, 30, true],
    [350, -170, 50, 30, true]
  ],
  new Exit(365, -262)
)

const levelSix = new Level (
  new Player(825, 0), [
    new Platform(725, 500, 150, 100),
    new Platform(600, 460, 100, 100),
    new Platform(-100, -100, 500, 400),
    new Platform(400, 175, 175, 275),
    new Platform(-50, 465, 375, 15),
    new Platform(-275, 175, 175, 275)
  ],
  [
    [725, 500, 150, 100, true],
    [600, 460, 100, 100, true],
    [-100, -100, 500, 400, true],
    [400, 175, 175, 275, true],
    [-50, 465, 325, 15, true],
    [-275, 175, 175, 275, true]
    ],
  new Exit(200, 400)
)

const levelSeven = new Level (
  new Player(495, -900), [
    new Platform(450, 590, 100, 10),
    new Platform(370, 275, 50, 275),
    new Platform(650, 50, 50, 350),
    new Platform(370, -300, 50, 280),
    new Platform(650, -600, 50, 320),
    new Platform(370, -900, 50, 280),
    new Platform(455, -950, 100, 20),
  ],
  [
    [450, 590, 100, 10, true],
    [370, 275, 50, 275, true],
    [650, 50, 50, 350, true],
    [370, -300, 50, 280, true],
    [650, -600, 50, 280, true],
    [370, -900, 50, 280, true],
    [455, -950, 100, 20, true]
  ],
  new Exit(495, -1000)
)

const finalLevel = new Level (
  new Player(50, 200), [
    new Platform(725, 500, 150, 100),
    new Platform(0, 400, 400, 20),
    new Platform(300, 200, 100, 50),
    new Platform(300, 350, 100, 50),
    new Platform(200, 0, 700, 20),
    new Platform(150, 470, 420, 200),
    new Platform(1100, 10, 50, 500),
    new Platform(550, 200, 200, 200),
    new Platform(200, -400, 700, 20),
  ],
  [
    [725, 500, 150, 100, true],
    [0, 400, 400, 20, true],
    [300, 200, 100, 50, true],
    [300, 350, 100, 50, true],
    [200, 0, 700, 20, true],
    [150, 470, 420, 200, true],
    [1100, 10, 50, 500, true],
    [550, 200, 200, 200, true],
    [200, -400, 700, 20, true]
  ],
  new Exit(-4000, -3000)
)
export const levels = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, finalLevel]
