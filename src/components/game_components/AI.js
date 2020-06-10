import BoardHelpers from "./BoardHelpers";

class AI {
    /**
     * Returns a move from the AI based on the mode
     *
     * @method
     * @static
     * @param {string[][]} squares The board
     * @param {"esy" | "med" | "imp"} mode The mode
     * @param {Object} symbols The symbols, eg. {ply1: X, ply2: O}
     * @memberof AI
     */
    static getMove = (squares, mode, symbols) => {
        // Make sure there are still blank squares
        if (!BoardHelpers.getBlankSquares(squares).length) {
            return null;
        }
        // Redirect to move generator based on mode inputted
        // prettier-ignore
        let moveFunction =
            (mode === "med") ? this.findBasicMove :
            (mode === "imp") ? this.findBestMove : 
            this.findRandomMove
        return moveFunction(squares, symbols);
    };

    /**
     * Returns an kaomoji based on the computer's evaluation
     *
     * @method
     * @static
     * @param {string[][]} squares The board
     * @param {"esy" | "med" | "imp"} mode The mode
     * @param {Object} symbols The symbols, eg. {ply1: X, ply2: O}
     * @memberof AI
     */
    static getEmotion = (squares, mode, symbols) => {
        // Check for terminal state
        let boardState = BoardHelpers.evaluateSquares(squares, symbols);
        if (boardState) {
            if (boardState === "ply1") {
                return "(╯°□°）╯︵ ┻━┻";
            } else {
                return "(✿◠‿◠)";
            }
        }
    };

    static findBestMove = (squares, symbols) => {
        // debugger;
        let possibleMoves = BoardHelpers.getBlankSquares(squares);
        let bestMoves = [];
        let bestScore = -2;
        for (const move of possibleMoves) {
            let squaresWithMove = BoardHelpers.copyWithMove(
                squares,
                symbols["ply2"],
                move
            );
            let moveEval = -this.evaluateSquaresMinimax(
                squaresWithMove,
                -1,
                symbols
            );
            if (moveEval > bestScore) {
                bestScore = moveEval;
                bestMoves = [move];
            } else if (moveEval === bestScore) {
                bestMoves.push(move);
            }
        }
        let randBestMove = BoardHelpers.randFromArr(bestMoves);
        console.log(
            `Minimax eval: ${AI.evaluateSquaresMinimax(
                BoardHelpers.copyWithMove(
                    squares,
                    symbols["ply2"],
                    randBestMove
                ),
                -1,
                symbols
            )}`
        );
        return randBestMove;
    };

    /**
     * Evaluate the board and future boards from the board with the minimax algorithm.
     *
     * @method
     * @static
     * @param {string[][]} squares The squares to evaluate.
     * @param {Number} turn The turn 1 for com, -1 for player
     * @param {Object} symbols The symbols, eg. [ply1: X, ply2: O]
     * @returns {Number} 1 for com winning, -1 for player winning, 0 for equal
     * @memberof AI
     */
    static evaluateSquaresMinimax = (squares, turn, symbols) => {
        // Check for terminal positions
        let currentBoardState = BoardHelpers.evaluateSquares(squares, symbols);
        if (currentBoardState) {
            return (currentBoardState === "ply1" ? -1 : 1) * turn; // NOTE: Adjusted for minimizer
        }
        // Check current player
        let currentPlayer = turn === 1 ? "ply2" : "ply1";
        // Get blank squares
        let possibleMoves = BoardHelpers.getBlankSquares(squares);
        let bestEval = -2;
        for (const move of possibleMoves) {
            let boardWithMove = BoardHelpers.copyWithMove(
                squares,
                symbols[currentPlayer],
                move
            );
            let boardWithMoveEval = -this.evaluateSquaresMinimax(
                boardWithMove,
                -turn,
                symbols
            );
            if (boardWithMoveEval > bestEval) {
                bestEval = boardWithMoveEval;
            }
        }
        if (bestEval === -2 || possibleMoves.length === 0) {
            return 0;
        }
        return bestEval;
    };

    /**
     * Find a basic move. Only looks at immediate replies/moves
     *
     * @method
     * @static
     * @param {string[][]} squares The squares to search
     * @param {string[]} symbols The symbols, eg. [ply1: X, ply2: O]
     * @returns {Object} Returns move in form {row: x, col: y}
     * @memberof AI
     */
    static findBasicMove(squares, symbols) {
        let possibleMoves = BoardHelpers.getBlankSquares(squares);
        let winningMoves = [];
        let neutralMoves = [];
        let losingMoves = [];
        comMoveLoop: for (const move of possibleMoves) {
            let squaresWithNewMove = BoardHelpers.copyWithMove(
                squares,
                symbols["ply2"],
                move
            );
            let boardStateAfterComMove = BoardHelpers.evaluateSquares(
                squaresWithNewMove,
                symbols
            );
            if (boardStateAfterComMove === "ply2") {
                winningMoves.push(move);
            } else {
                let possibleReplies = BoardHelpers.getBlankSquares(
                    squaresWithNewMove
                );
                for (const reply of possibleReplies) {
                    let squaresWithReply = BoardHelpers.copyWithMove(
                        squaresWithNewMove,
                        symbols["ply1"],
                        reply
                    );
                    let boardStateAfterReply = BoardHelpers.evaluateSquares(
                        squaresWithReply,
                        symbols
                    );
                    if (boardStateAfterReply === "ply1") {
                        losingMoves.push(move);
                        continue comMoveLoop;
                    }
                }
                neutralMoves.push(move);
            }
        }
        console.log({ winningMoves, neutralMoves, losingMoves });
        if (winningMoves.length) {
            return BoardHelpers.randFromArr(winningMoves);
        } else if (neutralMoves.length) {
            return BoardHelpers.randFromArr(neutralMoves);
        } else {
            return BoardHelpers.randFromArr(losingMoves);
        }
    }

    /**
     * Returns a random move from the squares
     *
     * @method
     * @static
     * @param {string[][]} squares The squares
     * @returns A random move in form {ply1: x, ply2: y}
     * @memberof AI
     */
    static findRandomMove(squares) {
        const blankSquares = BoardHelpers.getBlankSquares(squares);
        return BoardHelpers.randFromArr(blankSquares);
    }
}

export default AI;
