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

module.exports = { getGameInstanceWithId, setGameInstanceWithId }
