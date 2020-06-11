import React from "react";

interface Props {
    clickHandler: () => void,
    symbol: string,
    isMidVert: boolean
}

class Square extends React.Component<Props> {
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
