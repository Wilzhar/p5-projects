var logicMatrix;
var cols;
var rows;

function generateLogicMatrix() {
    logicMatrix = new Array(rows);

    for (i = 0; i < rows; i++) {
        logicMatrix[i] = new Array(cols);
        for (j = 0; j < cols; j++) {
            logicMatrix[i][j] = 0;
        }
    }
}

function generateRandomValue(num) {
    for (let i = 0; i < num; i++) {
        if (!isThereFreeSpace()) return;
        isValidValue = false;

        value = Math.random() > 0.5 ? 2 : 4;
        while (!isValidValue) {
            randomPosI = getRandomArbitrary(0, rows);
            randomPosJ = getRandomArbitrary(0, cols);
            if (logicMatrix[randomPosI][randomPosJ] == 0) {
                logicMatrix[randomPosI][randomPosJ] = value;
                isValidValue = true;
            }
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isThereFreeSpace() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (logicMatrix[i][j] == 0) {
                return true;
            }
        }
    }

    return false;
}

/**
 * [2, 0, 0, 0] = [2, 0, 0, 0]
 * [0, 2, 0, 0] = [2, 0, 0, 0]
 * [0, 0, 2, 0] = [2, 0, 0, 0]
 * [0, 0, 0, 2] = [2, 0, 0, 0]
 * [2, 2, 0, 0] = [4, 0, 0, 0]
 * [2, 2, 2, 0] = [4, 2, 0, 0]
 * [2, 2, 2, 2] = [4, 4, 0, 0]
 * [2, 0, 2, 0] = [4, 0, 0, 0]
 * [2, 0, 0, 2] = [4, 0, 0, 0]
 * [2, 0, 2, 2] = [4, 2, 0, 0]
 * [0, 0, 0, 0] = [4, 0, 0, 0]
 * [2, 2, 0, 0] = [4, 0, 0, 0]
 * [2, 2, 0, 0] = [4, 0, 0, 0]
 * [2, 2, 0, 0] = [4, 0, 0, 0]
 */
function moveLeft() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

        }
    }
}

function printMatrix() {
    let msg = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            msg += logicMatrix[i][j] + " ";
        }
        msg += "\n";
    }
    return msg;
}