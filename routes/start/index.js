const express = require('express');
const app = module.exports = express();
const gameLogic = require('../../game/gameLogic');
const gameData = require('../../game/gameData');

// The start endpoint that will be called when a new game is created
// Returns the unique game identifier for the new game
app.get('/start/:width/:height/:bombQuantity', (req, res) => {
    const gameId = gameLogic.generateGameId();

    // Create a new, empty game board
    gameData.setGameInstanceWithId(gameId, {
        width: req.params.width,
        height: req.params.height,
        bombQuantity: Number(req.params.bombQuantity),
        revealedSquares: []
    });

    // Return the unique Id of the game board we created
    res.json({ "gameId": gameId });
})
