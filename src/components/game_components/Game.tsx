import React from "react";
import Board from "./Board";
import AI from "./AI";
import BoardHelpers from "./BoardHelpers";
import { SettingsInterface, Symbols } from "../general_components/Types";

interface Props {
    settings: SettingsInterface;
}

interface State {
    winner: string | null;
    isP1sTurn: boolean;
    symbols: Symbols;
    isFinished: boolean;
    squares: string[][];
    AiEmotion: string | null;
}

class Game extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            isP1sTurn: props.settings["whoIsMovingFirst"] === "ply1",
            symbols: {
                ply1: props.settings["whoIsO"] === "ply1" ? "O" : "X",
                ply2: props.settings["whoIsO"] === "ply1" ? "X" : "O",
            },
            isFinished: false,
            squares: Array(3).fill(Array(3).fill(null)),
            // squares: [
            //     ["O", null, "X"],
            //     ["X", null, null],
            //     ["X", "O", "O"],
            // ],
            winner: null,
            AiEmotion: null,
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
                {this.props.settings["playerTwoMode"] !== "hum" ? (
                    <p>AI: {this.state.AiEmotion || "ㄟ( ▔, ▔ )ㄏ"}</p>
                ) : (
                    ""
                )}
            </div>
        );
    }

    componentDidMount() {
        this.AiTurnCheck();
        this.updateAiEmotion();
    }

    componentDidUpdate() {
        this.AiTurnCheck();
        this.updateAiEmotion();
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

    updateAiEmotion = () => {
        // Make sure AI is used
        if (this.props.settings["playerTwoMode"] === "hum") {
            return;
        }
        let emotion = AI.getEmotion(
            this.state.squares,
            this.props.settings["playerTwoMode"],
            this.state.isP1sTurn ? "ply1" : "ply2",
            this.state.symbols
        );
        if (this.state.AiEmotion === emotion) {
            return;
        }
        this.setState({
            AiEmotion: emotion,
        });
    };

    makeAiMove = () => {
        if (
            !this.state.isP1sTurn &&
            this.props.settings["playerTwoMode"] !== "hum"
        ) {
            this.setState((prevState) => {
                let comMove = AI.getMove(
                    this.state.squares,
                    this.props.settings["playerTwoMode"],
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

    handleClick = (rowIndex: number, cellIndex: number) => {
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
            this.props.settings["playerTwoMode"] !== "hum"
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
