import React from "react";
import Board from "./Board";
import AI from "./AI";
import BoardHelpers from "./BoardHelpers";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isP1sTurn: props.settings["who-is-moving-first"] === "ply1",
            symbols: {
                ply1: props.settings["who-is-o"] === "ply1" ? "O" : "X",
                ply2: props.settings["who-is-o"] === "ply1" ? "X" : "O",
            },
            isFinished: false,
            squares: Array(3).fill(Array(3).fill(null)),
            // squares: [
            //     ["O", null, "X"],
            //     ["X", null, null],
            //     ["X", "O", "O"],
            // ],
            winner: null,
        };
    }

    render() {
        return (
            <div>
                <h2>
                    {this.state.winner === "Draw"
                        ? "Draw!"
                        : this.state.winner
                        ? `${this.state.winner} wins!`
                        : ""}
                </h2>
                <Board
                    squares={this.state.squares}
                    handleClick={this.handleClick}
                />
                <p>
                    Current turn:{" "}
                    {this.state.isP1sTurn ? "Player 1" : "Player 2"} (
                    {this.state.symbols[this.state.isP1sTurn ? "ply1" : "ply2"]}
                    )
                </p>
            </div>
        );
    }

    componentDidMount() {
        this.AiTurnCheck();
    }

    componentDidUpdate() {
        this.AiTurnCheck();
    }

    AiTurnCheck = () => {
        // Make sure we're still playing
        if (!this.state.isFinished) {
            // Check if either playing is winning
            let winner = BoardHelpers.evaluateSquares(
                this.state.squares,
                this.state.symbols
            );
            if (winner) {
                this.setState({
                    isFinished: true,
                    winner: winner,
                });
                return;
            }
            // Make sure it isn't a draw
            if (BoardHelpers.getBlankSquares(this.state.squares).length === 0) {
                this.setState({
                    isFinished: true,
                    winner: "Draw",
                });
                return;
            }
            this.makeAiMove();
        }
    };

    makeAiMove = () => {
        if (
            !this.state.isP1sTurn &&
            this.props.settings["player-2-mode"] !== "hum"
        ) {
            this.setState((prevState) => {
                let comMove = AI.getMove(
                    this.state.squares,
                    this.props.settings["player-2-mode"],
                    this.state.symbols
                );
                let newSquares = BoardHelpers.copyWithMove(
                    this.state.squares,
                    this.state.symbols["ply2"],
                    comMove
                );
                let newState = {
                    ...prevState,
                    squares: newSquares,
                    isP1sTurn: true,
                };
                return newState;
            });
        }
    };

    handleClick = (rowIndex, cellIndex) => {
        // Make sure we're still going
        if (this.state.isFinished) {
            return;
        }
        // Make sure square is empty
        if (this.state.squares[rowIndex][cellIndex]) {
            return;
        }
        // Make sure the com isn't thinking
        if (
            !this.state.isP1sTurn &&
            this.props.settings["player-2-mode"] !== "hum"
        ) {
            return;
        }
        // Human moving
        let squares = BoardHelpers.copyWithMove(this.state.squares);
        squares[rowIndex][cellIndex] = this.state.symbols[
            this.state.isP1sTurn ? "ply1" : "ply2"
        ];
        this.setState({
            squares: squares,
            isP1sTurn: !this.state.isP1sTurn,
        });
    };
}

export default Game;
