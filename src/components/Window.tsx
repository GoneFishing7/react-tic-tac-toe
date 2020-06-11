import React from "react";
import FakeTypedHeader from "./general_components/FakeTypedHeader";
import Game from "./game_components/Game";
import Options from "./settings_components/Settings";
import { SettingsInterface } from "./general_components/Types";

interface State {
    showSettings: boolean;
    showGame: boolean;
    settings: SettingsInterface;
}

class Window extends React.Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            showSettings: true,
            showGame: false,
            settings: {
                whoIsO: null,
                whoIsMovingFirst: null,
                playerTwoMode: null,
            },
        };
    }

    render() {
        return (
            <div>
                <FakeTypedHeader content="tic tac toe" />
                <hr className="divider" />
                {this.state.showSettings && (
                    <Options submitWithSettings={this.submitWithOptions} />
                )}
                {this.state.showGame && <Game settings={this.state.settings} />}
            </div>
        );
    }

    submitWithOptions = (settings: SettingsInterface) => {
        this.setState({
            showSettings: false,
            showGame: true,
            settings: settings,
        });
    };
}

export default Window;
