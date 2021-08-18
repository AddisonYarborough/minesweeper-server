# minesweeper-server

## Installation
-  Inistall [node.js](https://nodejs.org/en/) / [express.js](https://expressjs.com/)
-  Pull this repo and `cd` to it via terminal/command prompt
-  Use `npm run dev` to start the server in development mode

## Overview
  This is a [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) inspired game that uses a [node.js](https://nodejs.org/en/) / [express.js](https://expressjs.com/) server
  to perform all of the game logic.
  
  It's important to note that this is a server that doesn't contain any view. The view for this project is handled via a Unity3D app which you can find [here](https://github.com/Addyarb/minesweeper-client)
  
  ## Structure
  While the code is fairly well documented, here's what you need to know to get started
  - All routes are found in `/routes` folder
  - Each folder beneath `/routes` has a folder that contains an `index.js` file with the route itself
  - The data/game state is stored in `gameData.js`
  - The logic is performed by `gameLogic.js`

## Notes
  - Due to https/SSL certificate issues, this project currently uses `GET` requests instead of `POST`. There are ways around this by generating your own .csr file - but since I wanted this to be a plug-n-play demo with no lengthy setup process, I chose to go with `GET`. Know that this is not best practice and should be avoided for a production app
