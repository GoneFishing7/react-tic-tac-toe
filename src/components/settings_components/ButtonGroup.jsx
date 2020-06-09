import React from "react";
import PropTypes from "prop-types";
import Button from "../general_components/Button";

class ButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: null,
            selected: 0,
        };
        this.select(this.state.selected);
    }

    render() {
        return (
            <div className="button-group">
                <label htmlFor={this.props.id}>{this.props.labelText}</label>
                <div className="buttons" id={this.props.id}>
                    {this.state.buttons || <div>Loading...</div>}
                </div>
            </div>
        );
    }

    select(index) {
        const newButtons = this.props.buttons.map((btn, i) => {
            return (
                <Button
                    color={index === i ? "filled-" + this.props.color : "gray"}
                    handleClick={() => this.select(i)}
                    staticOnHover={true}
                    content={btn.text}
                    key={i}
                />
            );
        });
        if (this.state.buttons) {
            this.setState({
                buttons: newButtons,
                selected: index,
            });
        } else {
            // eslint-disable-next-line
            this.state.buttons = newButtons;
        }
        this.props.logSelect(this.props.id, this.props.buttons[index].val);
    }

    getSelected() {
        return this.props.buttons[this.state.selected].val;
    }
}

ButtonGroup.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.object),
};

export default ButtonGroup;
