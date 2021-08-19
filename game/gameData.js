// A KVP collection of (key) the game ID and (value) the game data associated with said ID
let gameInstances = [];

// Gets the game instance with the given ID
const getGameInstanceWithId = (gameId) => {
    return gameInstances[gameId];
};

// Sets the game instance with the given ID
const setGameInstanceWithId = (gameId, gameInstance) => {
    gameInstances[gameId] = gameInstance;
}

// Gets whether the game instance with the given ID is expired
const getIsGameWithIdExpired = (gameId) => {
    // Our game ID is a timestamp of when it was created
    // Check how long its been and return if it's past the expiration seconds duration
    return ((Date.now() - Number(gameId)) / 1000) > 999;
}

// Removes the game with the given ID
const removeGameWithId = (gameId) => {
    delete gameInstances[gameId];
}

module.exports = { getGameInstanceWithId, setGameInstanceWithId, getIsGameWithIdExpired, removeGameWithId }
