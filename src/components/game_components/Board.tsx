import React from "react";
import Square from "./Square";

interface Props {
    squares: string[][],
    handleClick: (rowIndex: number, cellIndex: number) => void,
}

class Board extends React.Component<Props> {
    renderSquare(rowIndex: number, cellIndex: number) {
        const square = this.props.squares[rowIndex][cellIndex];
        return (
            <Square
                symbol={square}
                clickHandler={() => {
                    this.props.handleClick(rowIndex, cellIndex);
                }}
                isMidVert={cellIndex === 1}
                key={cellIndex + ", " + rowIndex}
            />
        );
    }

    render() {
        return (
            <table className="board">
                <tbody>
                    {this.props.squares.map((row: string[], rowIndex: number) => {
                        return (
                            <tr
                                key={rowIndex}
                                className={rowIndex === 1 ? "middle-row" : ""}
                            >
                                {row.map((cell: string, cellIndex: number) => {
                                    return this.renderSquare(
                                        rowIndex,
                                        cellIndex
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default Board;
