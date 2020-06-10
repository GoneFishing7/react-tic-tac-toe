import BoardHelpers from "./BoardHelpers";
const MEDIUM_COMPUTER_DEPTH = 2;

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
            (mode === "med") ? (squares, symbols) => { return this.findBestMove(squares, symbols, MEDIUM_COMPUTER_DEPTH) } :
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
     * @param {"ply1"|"ply2"} turn Who's turn it is
     * @param {Object} symbols The symbols, eg. {ply1: X, ply2: O}
     * @memberof AI
     */
    static getEmotion = (squares, mode, turn, symbols) => {
        // Check for terminal state
        let boardState = BoardHelpers.evaluateSquares(squares, symbols);
        if (boardState) {
            if (boardState === "ply1") {
                return "(╯°□°）╯︵ ┻━┻";
            } else {
                return "(✿◠‿◠)";
            }
        }
        // Make sure there are still available squares
        if (BoardHelpers.getBlankSquares(squares).length === 0) {
            return "ᕕ( ᐛ )ᕗ";
        }
        // Give emotion based on com mode and evaluated state
        if (mode === "imp") {
            let minimaxEval = this.evaluateSquaresMinimax(
                squares,
                turn === "ply1" ? -1 : 1,
                symbols
            );
            if (minimaxEval === 1) {
                return "(ಠ.ಠ)";
            } else if (minimaxEval === 0) {
                return "(⊙ˍ⊙)";
            } else {
                return "╰(*°▽°*)╯";
            }
        } else if (mode === "med") {
            let basicEval = this.evaluateSquaresMinimax(
                squares,
                turn === "ply1" ? -1 : 1,
                symbols,
                MEDIUM_COMPUTER_DEPTH
            );
            if (basicEval === 1) {
                return "(っ °Д °;)っ";
            } else if (basicEval === 0) {
                return "┌༼ σ ‸ σ ༽┐";
            } else {
                return "（＾∀＾●）ﾉｼ";
            }
        } else if (mode === "esy") {
            return "༼ つ ◕_◕ ༽つ";
        }
    };

    static findBestMove = (squares, symbols, maxDepth = Infinity) => {
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
                symbols,
                maxDepth
            );
            console.log({ moveEval });
            if (moveEval > bestScore) {
                bestScore = moveEval;
                bestMoves = [move];
            } else if (moveEval === bestScore) {
                bestMoves.push(move);
            }
        }
        let randBestMove = BoardHelpers.randFromArr(bestMoves);
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
     * @param {Number} maxDepth THe maximum depth to analyze to.
     * @param {Number} currentDepth THe depth currently analyzed to
     * @returns {Number} 1 for com winning, -1 for player winning, 0 for equal
     * @memberof AI
     */
    static evaluateSquaresMinimax = (
        squares,
        turn,
        symbols,
        maxDepth = Infinity,
        currentDepth = 0
    ) => {
        if (currentDepth >= maxDepth) {
            console.log("Exceded depth");
            return null;
        }
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
                symbols,
                maxDepth,
                currentDepth + 1
            );
            if (boardWithMoveEval === null) {
                continue;
            }
            if (boardWithMoveEval > bestEval) {
                bestEval = boardWithMoveEval;
            }
        }
        if (possibleMoves.length === 0) {
            return 0;
        }
        return bestEval;
    };

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
