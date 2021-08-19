const express = require('express');
const app = module.exports = express();
const gameLogic = require('../../game/gameLogic');
const gameData = require('../../game/gameData');

// The endpoint that will be called when a user clicks a new space on
// the game board. Returns the current state of all game board squares
// as an array
app.get("/select/:gameId/:xPosition/:yPosition", (req, res) => {
    const targetGameId = req.params?.gameId;
    const gameInstance = gameData.getGameInstanceWithId(targetGameId);
    const xPosition = req.params?.xPosition;
    const yPosition = req.params?.yPosition;

    // Ensure the given game ID exists
    if (gameInstance === undefined) {
        return res.sendStatus(500).send(`Game ID ${targetGameId} does not exist`);
    }

    if (gameData.getIsGameWithIdExpired(targetGameId)) {
        return res.sendStatus(400).send(`Game ID ${targetGameId} expired`);
    }

    // Check if this is the first move for this game instance
    const isFirstMove = gameLogic.getIsFirstMove(targetGameId);

    if (isFirstMove) {
        // Create a new game by defining bomb indices
        gameLogic.createNewGame(targetGameId, gameInstance, xPosition, yPosition);
    }

    if (gameLogic.getDidClickBomb(targetGameId, xPosition, yPosition)) {
        // Return game over state to client
        return res.status(202).json({ "gameInstance": gameInstance });
    }

    const squaresToReveal = gameLogic.getSquaresToRevealForClick(targetGameId, xPosition, yPosition, gameInstance.revealedSquares);

    gameInstance.revealedSquares = squaresToReveal;

    // Detect if we won, and send 201 if so
    if (gameLogic.getDidWinGame(targetGameId)) {
        // Return game win state to client
        return res.status(201).json({ "gameInstance": gameInstance });
    }

    return res.status(200).json({ "gameInstance": gameInstance });
})
