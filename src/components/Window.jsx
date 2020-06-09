import React from "react";
import FakeTypedHeader from "./general_components/FakeTypedHeader";
import Game from "./game_components/Game";
import Settings from "./settings_components/Settings";

class Window extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSettings: true,
            showGame: false,
        };
    }

    render() {
        return (
            <div>
                <FakeTypedHeader>tic tac toe</FakeTypedHeader>
                <hr className="divider" />
                {this.state.showSettings && (
                    <Settings submitWithOptions={this.submitWithOptions} />
                )}
                {this.state.showGame && <Game settings={this.state.settings} />}
            </div>
        );
    }

    submitWithOptions = (settings) => {
        this.setState({
            showSettings: false,
            showGame: true,
            settings: settings,
        });
    };
}

export default Window;
