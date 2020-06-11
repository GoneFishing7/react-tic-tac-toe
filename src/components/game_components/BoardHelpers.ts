import { Symbols, Square } from "../general_components/Types";

class BoardHelpers {
    /**
     * Evaluate squares passed in
     *
     * @static
     * @param squares The squares to evaluate
     * @param symbols The symbols to check for, eg. {ply1: X,ply2: O}
     * @returns The winning player, else null
     * @memberof BoardHelpers
     */
    static evaluateSquares(
        squares: string[][],
        symbols: Symbols
    ): string | null {
        for (const symbolKey of Object.keys(symbols)) {
            const symbol = symbols[symbolKey];
            // Check horizontals
            for (let row of squares) {
                if (
                    row[0] === symbol &&
                    row[1] === symbol &&
                    row[2] === symbol
                ) {
                    return symbolKey;
                }
            }
            // Check verticals
            for (let colIndex = 0; colIndex < squares.length; colIndex++) {
                if (
                    squares[0][colIndex] === symbol &&
                    squares[1][colIndex] === symbol &&
                    squares[2][colIndex] === symbol
                ) {
                    return symbolKey;
                }
            }
            // Check diagonals
            if (
                squares[0][0] === symbol &&
                squares[1][1] === symbol &&
                squares[2][2] === symbol
            ) {
                return symbolKey;
            }
            if (
                squares[0][2] === symbol &&
                squares[1][1] === symbol &&
                squares[2][0] === symbol
            ) {
                return symbolKey;
            }
        }
        return null;
    }

    /**
     * Get all the blank squares of the board (squares that are null or have a falsy value)
     *
     * @static
     * @param squares The squares to check
     * @returns The squares found, in form {row: x, col: y}
     * @memberof BoardHelpers
     */
    static getBlankSquares(squares: string[][]): Square[] {
        let blanks = [];
        for (let rowIndex = 0; rowIndex < squares.length; rowIndex++) {
            for (
                let cellIndex = 0;
                cellIndex < squares[rowIndex].length;
                cellIndex++
            ) {
                if (!squares[rowIndex][cellIndex]) {
                    blanks.push({
                        row: rowIndex,
                        cell: cellIndex,
                    });
                }
            }
        }
        return blanks;
    }

    /**
     * Returns a random element from an array
     *
     * @static
     * @param arr The array to find an element from
     * @returns A random element
     * @memberof BoardHelpers
     */
    static randFromArr(arr: Array<any>): any {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Deep copies a Two-Dimensional Array of Squares with a move
     *
     * @static
     * @param arr The 2D array of squares
     * @param symbol The symbol of the move
     * @param move The position of the move, in form {row: x, cel: y}
     * @returns A new 2D array of squares with the move applied
     * @memberof BoardHelpers
     */
    static copyWithMove(
        arr: string[][],
        symbol?: string,
        move?: Square
    ): string[][] {
        let newArray = [];
        for (let i = 0; i < arr.length; i++) {
            newArray.push(arr[i].slice());
        }
        if (symbol && move) {
            newArray[move.row][move.cell] = symbol;
        }
        return newArray;
    }

    /**
     * Takes the board and converts it to a nice string
     *
     * @static
     * @param squares The board
     * @returns The board to string
     * @memberof BoardHelpers
     */
    static boardToString(squares: string[][]): string {
        let horizontalLine = "-------------\n";
        let returnString = "\n    1   2   3\n  " + horizontalLine;
        /*
         *     1   2   3
         *   -------------
         * 1 | - | - | - |
         *   -------------
         * 2 | - | - | - |
         *   -------------
         * 3 | - | - | - |
         *   -------------
         *
         */
        for (let i = 0; i < squares.length; i++) {
            returnString += i + 1 + " |";
            for (let j = 0; j < squares[i].length; j++) {
                returnString +=
                    " " + (squares[i][j] ? squares[i][j] : " ") + " |";
            }
            returnString += "\n  " + horizontalLine;
        }
        return returnString;
    }
}

export default BoardHelpers;
