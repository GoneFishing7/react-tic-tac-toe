import React from "react";
import FakeTypedHeader from "./general_components/FakeTypedHeader";
import Game from "./game_components/Game";
import Options from "./settings_components/Settings";
import { SettingsInterface } from "./general_components/Types";
import Button from "./general_components/Button";

type PossibleColorMode = "light" | "dark";

interface State {
    showSettings: boolean;
    showGame: boolean;
    settings: SettingsInterface;
    colorMode: PossibleColorMode;
}

class Window extends React.Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        // @ts-ignore: Type 'string' is not assignable to type '"light" | "dark"'
        let cM: PossibleColorMode = localStorage.getItem("colorMode");
        if (!cM) {
            localStorage.setItem("colorMode", "light");
            cM = "light";
        }

        this.state = {
            showSettings: true,
            showGame: false,
            settings: {
                whoIsO: null,
                whoIsMovingFirst: null,
                playerTwoMode: null,
            },
            colorMode: cM,
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

    componentDidUpdate() {
        // Update localstorage colorMode if needed
        localStorage.setItem("colorMode", this.state.colorMode);
    }

    toggleDarkMode = () => {
        let nextColorMode: PossibleColorMode =
            this.state.colorMode === "light" ? "dark" : "light";
        this.setState({
            colorMode: nextColorMode,
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
