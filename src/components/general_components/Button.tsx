import React from "react";

interface Props {
    handleClick?: () => void;
    color?: string;
    largeButton?: boolean;
    roundedLeft?: boolean;
    roundedRight?: boolean;
    roundedNone?: boolean;
    staticOnHover?: boolean;
    position?: string;
}

class Button extends React.Component<Props> {
    render() {
        const classes = ["button"];
        if (this.props.color) {
            classes.push("button-" + this.props.color);
        } else {
            classes.push("button-gray");
        }
        if (this.props.largeButton) {
            classes.push("button-large");
        }
        if (this.props.roundedLeft) {
            classes.push("button-rounded-left");
        }
        if (this.props.roundedRight) {
            classes.push("button-rounded-right");
        }
        if (this.props.roundedNone) {
            classes.push("button-rounded-none");
        }
        if (this.props.staticOnHover) {
            classes.push("button-static");
        }
        if (this.props.position) {
            classes.push(this.props.position);
        }
        return (
            <button
                onClick={this.props.handleClick}
                className={classes.join(" ")}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;
