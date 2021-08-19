const gameData = require('../game/gameData');

// Returns whether the user has selected their first move yet
const getIsFirstMove = (gameId) => {
    return gameData.getGameInstanceWithId(gameId).revealedSquares.length < 1;
}

// Generates a unique ID to associate game data with
const getNewGameId = () => {
    // Use the milliseconds since epoch start as our unique ID
    return Date.now();
};

const getDidWinGame = (gameId) => {
    const targetGameData = gameData.getGameInstanceWithId(gameId);

    // Get the number revealed squares
    const revealedSquareCount = targetGameData.revealedSquares.length;

    // Get the number of bombs for the given game
    const bombQuantity = targetGameData.bombQuantity;

    // Get the total number of squares on the game board grid
    const totalSquareCount = targetGameData.width * targetGameData.height;

    // Return whether bomb squares are the only ones left on the board
    return totalSquareCount - revealedSquareCount === bombQuantity;
}

// Generates a collection of random indices to place bombs at and saves it to the game data instance
const createNewGame = (gameId, { width, height, bombQuantity }, xPosition, yPosition) => {
    let result = [];
    let clickedPosition = { x: Number(xPosition), y: Number(yPosition) };

    while (result.length < bombQuantity) {
        // Generate a random index to put a bomb on
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const randomIndex = { x, y };

        // If we have already added or just clicked that index, try again
        if (result.includes(randomIndex) ||
            randomIndex.x == clickedPosition.x && randomIndex.y === clickedPosition.y) {
            continue;
        }
        else {
            // Add the bomb index to the result
            result.push(randomIndex);
        }
    }

    // Update our game data
    const targetGameData = gameData.getGameInstanceWithId(gameId);
    targetGameData.width = Number(width);
    targetGameData.height = Number(height);
    targetGameData.bombIndices = result;
}

// Gets whether the clicked coordinates match a bomb coordinate for the given game ID
const getDidClickBomb = (gameId, xPosition, yPosition) => {
    // Get the bomb indices for our game instance
    const bombIndices = gameData.getGameInstanceWithId(gameId).bombIndices;

    let isBomb = false;

    bombIndices.forEach(index => {
        if (index.x === Number(xPosition) && index.y === Number(yPosition)) {
            isBomb |= true;
        }
    });

    // Return whether the user clicked a bomb
    return isBomb;
}

// Takes the position that the selected and checks surrounding squares for non-bombs
const getSquaresToRevealForClick = (gameId, xPosition, yPosition, revealedSquares) => {
    // Get our game / board data
    const targetGameData = gameData.getGameInstanceWithId(gameId);
    const boardWidth = targetGameData.width;
    const boardHeight = targetGameData.height;
    const bombIndices = targetGameData.bombIndices;

    // If the position is off the board..
    if (getIsIndexOffBoard({ x: xPosition, y: yPosition }, boardWidth, boardHeight) ||
        // Or if it's the same index as an already-revealed square..
        getIsIndexRevealed({ x: xPosition, y: yPosition }, revealedSquares) ||
        // Or if the index is a bomb index..
        getIsBombIndex({ x: xPosition, y: yPosition }, bombIndices)) {
        // Exit early
        return revealedSquares;
    }

    // Get the array of all neighboring indices for the target  position
    const neighborIndices = getNeighborIndices(Number(xPosition), Number(yPosition));

    // Count how many of those neighbors' indices have bombs
    const neighborBombCount = getBombCountForNeighbors(bombIndices, neighborIndices);

    // Add the target square to the revealed squares
    const targetSquare = { gridPosition: { x: Number(xPosition), y: Number(yPosition) }, state: neighborBombCount };
    revealedSquares.push(targetSquare);

    // If there were any bomb neighbors..
    if (neighborBombCount > 0) {
        return revealedSquares;
    }

    // For each of the clicked indices' neighbors..
    neighborIndices.forEach(neighborIndex => {
        // Check the neighbor's surrounding squares recursively
        getSquaresToRevealForClick(gameId, neighborIndex.x, neighborIndex.y, revealedSquares);
    });

    // Return only the newly revealed squares
    return revealedSquares;
}

const getNeighborIndices = (xPosition, yPosition) => {
    return [
        // Above ↑
        { x: xPosition, y: yPosition + 1 },
        // Above to the right ↗
        { x: xPosition + 1, y: yPosition + 1 },
        // To the right →
        { x: xPosition + 1, y: yPosition },
        // Below to the right ↘
        { x: xPosition + 1, y: yPosition - 1 },
        // Below ↓
        { x: xPosition, y: yPosition - 1 },
        // Below to the left ↙
        { x: xPosition - 1, y: yPosition - 1 },
        // Left ←
        { x: xPosition - 1, y: yPosition },
        // Above to the left ↖
        { x: xPosition - 1, y: yPosition + 1 },
    ];
}

// Gets whether the given coordinates are off the game board
const getIsIndexOffBoard = ({ x, y }, boardWidth, boardHeight) => {
    const isOffBoard = (x > boardWidth - 1 || y > boardHeight - 1 || x < 0 || y < 0);
    return isOffBoard;
};

// Gets whether the given coordinate is that of a square that has already been revealed
const getIsIndexRevealed = ({ x, y }, revealedSquares) => {
    let isRevealed = false;

    revealedSquares.forEach(square => {
        if (square.gridPosition.x === x && square.gridPosition.y === y) {
            isRevealed |= true;
        }
    });
    return isRevealed;
};

// Gets the number of overlapping elements in bombIndices and neighborIndices
const getBombCountForNeighbors = (bombIndices, neighborIndices) => {
    let count = 0;

    neighborIndices.forEach(neighborIndex => {
        if (getIsBombIndex({ x: neighborIndex.x, y: neighborIndex.y }, bombIndices)) {
            count++;
        }
    });

    return count;
};


// Gets whether the given index is a bomb index
const getIsBombIndex = ({ x, y }, bombIndices) => {
    let isBombIndex = false;

    bombIndices.forEach(index => {
        if (index.x === x && index.y === y) {
            isBombIndex |= true;
        }
    });

    return isBombIndex;
}

module.exports = {
    getIsFirstMove,
    getDidWinGame,
    getNewGameId,
    createNewGame,
    getDidClickBomb,
    getSquaresToRevealForClick
};
