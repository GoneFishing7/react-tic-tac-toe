import React from "react";

class Square extends React.Component {
    render() {
        return (
            <td
                onClick={this.props.clickHandler}
                className={
                    "cell" + (this.props.isMidVert ? " middle-vert" : "")
                }
            >
                {this.props.symbol}
            </td>
        );
    }
}

export default Square;
