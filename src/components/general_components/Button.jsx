import React from "react";
import PropTypes from "prop-types";

class Button extends React.Component {
    render() {
        const classes = ["button"];
        if (this.props.color) {
            classes.push("button-" + this.props.color);
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
        return (
            <button
                onClick={this.props.handleClick}
                className={classes.join(" ")}
            >
                {this.props.content}
            </button>
        );
    }
}

Button.propTypes = {
    color: PropTypes.string,
    content: PropTypes.string,
    handleClick: PropTypes.func,
    roundedLeft: PropTypes.bool,
    roundedRight: PropTypes.bool,
    roundedNone: PropTypes.bool,
    staticOnHover: PropTypes.bool,
};

export default Button;
