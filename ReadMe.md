# The End of Snake

The End of Snake is a puzzle platformer built with Vanilla JavaScript and Canvas. The objective is to traverse the obstacles (platforms) to reach the exit to complete the levels. There are seven levels to the game. I have implemented custom collision detection, which allows the player to dive into the platforms. I hope you enjoy the game! :)

[Play it here!](http://muhammed-imtiyaz.com/the-end-of-snake/)

### Architecture and Technology

![wireframe](/app/assets/images/wireframe.png)

The game is built with the following technologies:

- `JavaScript` for handling movement and platform logic,
- `Canvas` for rendering game map,
- `HTML DOM/CSS` for styling

The game follows OOP and will be broken down into few major scripts:

- `game.js` to handle map traversal,
- `player.js` to manipulate player’s state and movements,
- `level.js` to deal with different levels of the game and the architecture of the obstacle course,
- `platform.js` and `exit.js` to organise other features.

### Collision Detection Code Snippet

```JS
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
```

### Portfolio and Contact
[Linkedin](https://www.linkedin.com/in/muhammed-imtiyaz)
[Angel List](https://angel.co/muhammed-imtiyaz)
[Portfolio](http://muhammed-imtiyaz.com)