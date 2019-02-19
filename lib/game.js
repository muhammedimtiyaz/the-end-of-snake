import { levels } from './level_generator';

const roundRect = (ctx, x, y, width, height, radius, fill, stroke) => {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, bl: radius, br: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, bl: 0, br: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }

  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
};

export const splashAudio = new Audio('app/assets/audio/splash2.wav');
splashAudio.volume = 0.15;
export const deathAudio = new Audio('app/assets/audio/deathsound.wav');
deathAudio.volume = 0.2;
export const completeAudio = new Audio('app/assets/audio/levelcomplete2.wav');
completeAudio.volume = 0.2;
const background = new Image();
background.src = "app/assets/images/starry-sky.jpg";

const clamp = (value, min, max) => {
  if(value < min) return min;
  else if(value > max) return max;
  return value;
};

let vx = 0;
const platformColour = 'rgb(65, 186, 28)';
let levelCounter = 0;
let level = levels[levelCounter];
let player = level.player;
let exit = level.exit;
let platformArr = level.platformArr;
let renderArr = level.renderArr;
let showHelp = [false, false, false, false, false, false, false, false];

export const game = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  background.onload = () => {
    var pattern = ctx.createPattern(background, 'repeat-x');
    ctx.fillStyle = pattern;
  };
  const renderLevel = () => {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw background
    ctx.drawImage(background,vx,0, canvas.width, canvas.height);
    ctx.drawImage(background, background.width - Math.abs(vx), 0, canvas.width, canvas.height);
    //control camera
    if (Math.abs(vx) > background.width) {
      vx = 0;
    }
    vx -= 0.1;
    var camX = clamp(-player.xPos + canvas.width/2, 0, 2000 - canvas.width);
    var camY = clamp(-player.yPos + canvas.height/2, 0, 2000 - canvas.height);
    //draw text
    ctx.translate( camX, camY );
    ctx.font="20px Permanent Marker";
    ctx.fillStyle = "white";
    renderText();
    //draw platforms
    ctx.fillStyle = "rgba(29, 163, 165, 0.8)";
    ctx.lineWidth = 2;
    if (player.inWater) {
      ctx.strokeStyle = `#${exit.colour}`;
    } else {
      ctx.strokeStyle = 'white';
    }
    renderArr.forEach((platform) => {
      roundRect(ctx, platform[0], platform[1], platform[2], platform[3], 8, platformColour, platform[4]);
    });
    //draw player
    ctx.fillStyle = "rgb(214, 12, 66)";
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
    //draw exit
    ctx.fillStyle = `${exit.colour}`;
    ctx.lineWidth = 2;
    ctx.strokeStyle = `${exit.borderColour}`;
    roundRect(ctx, exit.xPos, exit.yPos, exit.width, exit.height, 8, exit.colour, exit.borderColour);
  };

  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
    };
  })();

  const yCollisionCheck = () => {
    platformArr.some((platform) => {
      if (player.xPos+player.width > platform.xPos && player.xPos < platform.xPos + platform.width){
        if (player.yPos + player.height >= platform.yPos && player.yPos < platform.yPos + player.height) {
          player.yPos = platform.yPos - player.height;
          player.isStopped = true;
          player.ySpeed = 0;
          return true;
        } else if (player.yPos <= platform.yPos + platform.height && player.yPos > platform.yPos) {
          player.yPos = platform.yPos + platform.height;
          player.ySpeed = 0.5;
          return true;
        }
        player.isStopped = false;
      } else {
        player.isStopped = false;
      }
    });
  };

  const xCollisionCheck = () => {
    platformArr.some((platform) => {
      if (player.yPos + player.height > platform.yPos && player.yPos < platform.yPos + platform.height){
        if(player.xPos + player.width >= platform.xPos && player.xPos < platform.xPos + (platform.width / 2) ) {
          player.xPos = platform.xPos - player.width - 1;
          player.rightBlocked = true;
        }
        if(player.xPos <= platform.xPos + platform.width && player.xPos + player.width > platform.xPos){
          player.xPos = platform.xPos + platform.width + 1;
          player.leftBlocked = true;
        }
      }
    });
  };

  const divingCollisionCheck = () => {
    platformArr.some((platform) => {
      if (player.xPos + player.width >= platform.xPos && player.xPos <= platform.xPos + platform.width ) {
        if (player.yPos + player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          splashAudio.play();
          player.inWater = true;
          return true;
        }
        player.inWater = false;
      }
    });
  };

  const breachingCollisionCheck = () => {
    platformArr.some((platform) => {
      if (player.xPos + player.width >= platform.xPos && player.xPos <= platform.xPos + platform.width ) {
        if (player.yPos + player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          player.inWater = true;
          return true;
        }
      }
      player.inWater = false;
    });
  };

  const checkFinishLevel = () => {
    if (player.xPos + player.width > exit.xPos && player.xPos <= exit.xPos + exit.width ) {
      if (player.yPos + player.height >= exit.yPos && player.yPos < exit.yPos + exit.height) {
        completeAudio.play();
        level = levels[levelCounter += 1];
        player = level.player;
        exit = level.exit;
        platformArr = level.platformArr;
        renderArr = level.renderArr;
        player.xSpeed = 0;
        player.ySpeed = 0;
        switch (levelCounter) {
          case 1:
            document.getElementById('sub-header').style.display = 'block';
            break;
          case 7:
            window.setTimeout( () => {
              const congrats = new Audio('app/assets/sounds/congrats.mp3');
              congrats.volume = 0.3;
              congrats.play();
            }, 2000);
            break;
        default:
            break;
        }
      }
    }
  };

  const renderText = () => {
    switch (levelCounter) {
      case 0:
        ctx.fillText("Use the left and right arrow keys to move.",-140,400);
        ctx.fillText("Press the up arrow key to jump.", 170, 100);
        break;
      case 1:
        if (player.xPos >= 438) {
          window.setTimeout( () => {
            showHelp[1] = true;
          }, 3000);
        }
        if (showHelp[1] === true) {
          ctx.fillText("Ooops...forgot to mention that you can dive into the water", 325, 325);
          ctx.fillText("Try holding the spacebar or 'Z' key while", 325, 350);
          ctx.fillText("in air/jumping and dive into the water!", 325, 375);
        }
        break;
      case 2:
        if (player.xPos >= 793) {
          window.setTimeout( () => {
            showHelp[2] = true;
          }, 5000);
        }
        if (showHelp[2] === true) {
          ctx.fillText("pssst, use the 'Spacebar' key!", 715, 375 );
        }
        break;
      case 3:
        ctx.fillText("Don't panic!", -450, -1100);
        if (player.xPos >= 910 && player.yPos <= -1000) {
          window.setTimeout( () => {
            showHelp[3] = true;
          }, 3000);
        }
        if (showHelp[3] === true) {
          ctx.fillText("It almost looked like you were", 380, -1100);
          ctx.fillText('flying when you raced up here', 380, -1075);
          ctx.fillText('You got this!', 970, 450);
        }
        break;
      case 5:
        if (player.xPos >= 210 && player.xPos <= 230 && player.yPos >= 270 && player.yPos <= 300) {
          showHelp[5] = true;
        }
        if (showHelp[5] === true) {
          ctx.fillText("Brute force huh?", 30, 250);
          ctx.fillText("I mean that's one way", 0, 275);
        }
        break;
      case 7:
        ctx.fillText("Congrats on completing the game!", -470, 150);
        ctx.fillText("Here are some random platforms to mess around with.", -470, 175);
        ctx.fillText("Thanks so much for playing!", -470, 375);
        default:
        break;
      }
    };
    
    const checkBounds = () => {
      if (player.yPos > 1200) {
        deathAudio.play();
        player.xPos = level.respawn[0];
        player.yPos = 100;
        player.ySpeed = 0;
      }
    };

    const update = () => {
    player.xMove();
    if (player.inWater){
      player.update();
      breachingCollisionCheck();
    } else {
      if(!player.isDiving){
        xCollisionCheck();
      }

      player.update();
      exit.update();
      if (!player.isDiving) {
        yCollisionCheck();
      } else {
        divingCollisionCheck();
      }
    }
    checkBounds();
    checkFinishLevel();
    renderLevel();
    requestAnimFrame(() => {
      update();
    });
  };

  update();
};
