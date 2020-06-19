import BoardHelpers from "./BoardHelpers";
import { Symbols, Square } from "../general_components/Types";
const MEDIUM_COMPUTER_DEPTH = 2;

interface findMove {
    (squares: string[][], symbols: Symbols): Square;
}

class AI {
    /**
     * Returns a move from the AI based on the mode
     *
     * @method
     * @static
     * @param squares The board
     * @param mode The mode
     * @param symbols The symbols, eg. {ply1: X, ply2: O}
     * @memberof AI
     */
    static getMove = (
        squares: string[][],
        mode: string | null | undefined,
        symbols: Symbols
    ): Square => {
        // Make sure there are still blank squares
        if (!BoardHelpers.getBlankSquares(squares).length) {
            return {
                row: -1,
                cell: -1,
            };
        }
        // Redirect to move generator based on mode inputted
        // prettier-ignore
        let moveFunction =
            (mode === "med") ? (squares: string[][], symbols: Symbols) => { return AI.findBestMove(squares, symbols, MEDIUM_COMPUTER_DEPTH) } :
            (mode === "imp") ? AI.findBestMove : 
            AI.findRandomMove
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
    static getEmotion = (
        squares: string[][],
        mode: string | null | undefined,
        turn: "ply1" | "ply2",
        symbols: Symbols
    ): string => {
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
            let minimaxEval = AI.evaluateSquaresMinimax(
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
            let basicEval = AI.evaluateSquaresMinimax(
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
        return "w(ﾟДﾟ)w";
    };

    static findBestMove = (
        squares: string[][],
        symbols: Symbols,
        maxDepth = Infinity
    ): Square => {
        // debugger;
        let possibleMoves = BoardHelpers.getBlankSquares(squares);
        let bestMoves: Square[] = [];
        let bestScore = -2;
        for (const move of possibleMoves) {
            let squaresWithMove = BoardHelpers.copyWithMove(
                squares,
                symbols["ply2"],
                move
            );
            let moveEval = -AI.evaluateSquaresMinimax(
                squaresWithMove,
                -1,
                symbols,
                maxDepth
            );
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
     * @param squares The squares to evaluate.
     * @param turn The turn 1 for com, -1 for player
     * @param symbols The symbols, eg. [ply1: X, ply2: O]
     * @param maxDepth THe maximum depth to analyze to.
     * @param currentDepth THe depth currently analyzed to
     * @returns 1 for com winning, -1 for player winning, 0 for equal. -2 for something went wrong
     * @memberof AI
     */
    static evaluateSquaresMinimax = (
        squares: string[][],
        turn: number,
        symbols: Symbols,
        maxDepth = Infinity,
        currentDepth = 0
    ): number => {
        if (currentDepth >= maxDepth) {
            return -2;
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
            let boardWithMoveEval = -AI.evaluateSquaresMinimax(
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
     * @param squares The squares
     * @returns A random move in form {ply1: x, ply2: y}
     * @memberof AI
     */
    static findRandomMove(squares: string[][]): Square {
        const blankSquares = BoardHelpers.getBlankSquares(squares);
        return BoardHelpers.randFromArr(blankSquares);
    }
}

export default AI;
