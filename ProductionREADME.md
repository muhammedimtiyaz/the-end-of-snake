# The End of Snake

The End of Snake is a puzzle platformer built with Vanilla JavaScript and Canvas.
This game was inspired by Sean Chowdhury’s [Hawk and the Minnow project](https://github.com/seanchowdhury/hawk-and-the-minnow).

### Functionality and MVP:
- [ ] User should be able to move left, right and jump,
- [ ] User should be able to toggle sound,
- [ ] Instructions will pop up at specific scenarios, as required,
- [ ] Mobile visual background


### Architecture and Technology



The game is built with the following technologies:

- `JavaScript` for handling movement and platform logic,
- `Canvas` for rendering game map,
- `HTML DOM/CSS` for styling

The game follows OOP and will be broken down into few major scripts:

- `game.js` to handle map traversal,
- `player.js` to manipulate player’s state and movements,
- `level.js` to deal with different levels of the game and the architecture of the obstacle course,
- `platform.js` and `exit.js` to organise other features.

### Implementation Timeline:

- [ ] Day1:  Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all scripts outlined above.

- [ ] Day2: Work on object collision physics, player object and obstacle course creation.

- [ ] Day 3: Incorporate sound and background visual. Install the controls for the user to interact with the game. Style the frontend.

Over the Weekend:
 - [ ] Test project for bugs
 - [ ] Deploy project on Github Pages
