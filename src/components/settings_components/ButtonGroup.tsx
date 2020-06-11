import React from "react";

interface Props {
    label: string;
    id: string;
}
interface State {}

class ButtonGroup extends React.Component<Props, State> {
    render() {
        return (
            <div className="button-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div id={this.props.id}>{this.props.children}</div>
            </div>
        );
    }
}

export default ButtonGroup;
