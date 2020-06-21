import React from "react";
import FakeTypedHeader from "./general_components/FakeTypedHeader";
import Game from "./game_components/Game";
import Options from "./settings_components/Settings";
import { SettingsInterface } from "./general_components/Types";
import Button from "./general_components/Button";

interface State {
    showSettings: boolean;
    showGame: boolean;
    settings: SettingsInterface;
    colorMode: "light" | "dark";
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
            colorMode: "light",
        };
    }

    render() {
        return (
            <div className={`window ${this.state.colorMode}`}>
                <FakeTypedHeader content="tic tac toe" />
                <hr className="divider" />
                {this.state.showSettings && (
                    <Options submitWithSettings={this.submitWithOptions} />
                )}
                {this.state.showGame && <Game settings={this.state.settings} />}
                <Button
                    color={
                        this.state.colorMode === "light"
                            ? "filled-dark"
                            : "filled-light"
                    }
                    handleClick={() => {
                        this.toggleDarkMode();
                    }}
                    position="br"
                >
                    Dark Mode!{" "}
                    <span role="img" aria-label="emoji">
                        😎
                    </span>
                </Button>
            </div>
        );
    }

    toggleDarkMode = () => {
        console.log("Toggling dark mode");
        this.setState((oldState) => {
            return {
                colorMode: oldState.colorMode === "light" ? "dark" : "light",
            };
        });
    };

    submitWithOptions = (settings: SettingsInterface) => {
        this.setState({
            showSettings: false,
            showGame: true,
            settings: settings,
        });
    };
}

export default Window;
