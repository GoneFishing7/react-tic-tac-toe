import React from "react";
import Square from "./Square";

class Board extends React.Component {
    renderSquare(rowIndex, cellIndex) {
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
                    {this.props.squares.map((row, rowIndex) => {
                        return (
                            <tr
                                key={rowIndex}
                                className={rowIndex === 1 ? "middle-row" : ""}
                            >
                                {row.map((cell, cellIndex) => {
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
