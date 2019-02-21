# The End of Snake

The End of Snake is a puzzle platformer built with Vanilla JavaScript and Canvas.

[Play it here!](http://muhammed-imtiyaz.com/the-end-of-snake/)

### Functionality and MVP:
- [ ] User should be able to move left, right and jump,
- [ ] User should be able to toggle sound,
- [ ] Instructions will pop up at specific scenarios, as required,
- [ ] Mobile visual background


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

