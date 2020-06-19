import React from "react";
import { SettingsInterface } from "../general_components/Types";
import ButtonGroup from "./ButtonGroup";
import Button from "../general_components/Button";

interface SettingsButtonGroupsInterface {
    [buttonGroupId: string]: {
        labelText: string;
        buttons: {
            [buttonId: string]: {
                isSelected: boolean;
                text: string;
            };
        };
    };
}

interface Props {
    submitWithSettings: (settings: SettingsInterface) => void;
}
interface State {
    buttonGroups: SettingsButtonGroupsInterface;
}

class Settings extends React.Component<Props, State> {
    DEFAULT_SETTINGS: { [id: string]: string } = {}; // Defaults to every first option

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            buttonGroups: {
                whoIsO: {
                    labelText: "Who is O?",
                    buttons: {
                        ply1: {
                            isSelected: false,
                            text: "Player 1",
                        },
                        ply2: {
                            isSelected: false,
                            text: "Player 2",
                        },
                    },
                },
                whoIsMovingFirst: {
                    labelText: "Who is moving first?",
                    buttons: {
                        rnd: {
                            isSelected: false,
                            text: "Random",
                        },
                        ply1: {
                            isSelected: false,
                            text: "Player 1",
                        },
                        ply2: {
                            isSelected: false,
                            text: "Player 2",
                        },
                    },
                },
                playerTwoMode: {
                    labelText: "Player Two is:",
                    buttons: {
                        esy: {
                            isSelected: false,
                            text: "Easy Computer",
                        },
                        med: {
                            isSelected: false,
                            text: "Medium Computer",
                        },
                        imp: {
                            isSelected: false,
                            text: "Impossible Computer",
                        },
                        hum: {
                            isSelected: false,
                            text: "Human",
                        },
                    },
                },
            },
        };
    }

    componentDidMount() {
        this.selectDefaultSettings();
    }

    selectDefaultSettings = () => {
        this.setState((oldState: Readonly<State>) => {
            let newState = { ...oldState };
            Object.entries(this.DEFAULT_SETTINGS).forEach(
                ([settingId, defaultSetting]) => {
                    if (newState.buttonGroups[settingId] === undefined) {
                        console.log("Error");
                        return;
                    }
                    newState.buttonGroups[settingId].buttons[
                        defaultSetting
                    ].isSelected = true;
                }
            );
            Object.keys(oldState.buttonGroups).forEach((settingId) => {
                newState.buttonGroups[settingId].buttons[
                    this.DEFAULT_SETTINGS[settingId] ||
                        Object.keys(newState.buttonGroups[settingId].buttons)[0]
                ].isSelected = true;
            });
            return newState;
        });
    };

    render() {
        return (
            <div className="settings">
                <h2>Settings</h2>
                {/* Button groups */}
                {this.getButtonGroups()}

                {/* Play button */}
                <Button
                    handleClick={() => {
                        this.submit();
                    }}
                    color="filled-green"
                    largeButton={true}
                >
                    Play!
                </Button>
            </div>
        );
    }

    submit = () => {
        let toSubmit: { [index: string]: string | undefined } = {};
        Object.entries(this.state.buttonGroups).forEach(
            ([settingId, settingData]) => {
                let selectedOption = Object.keys(settingData.buttons).find(
                    (buttonId) => settingData.buttons[buttonId].isSelected
                );
                toSubmit[settingId || "Error"] = selectedOption;
            }
        );
        this.props.submitWithSettings(toSubmit);
    };

    getButtonGroups = () => {
        return (
            <div className="button-groups">
                {Object.entries(this.state.buttonGroups).map(
                    ([buttonGroupId, buttonGroupData], index) => {
                        return (
                            <ButtonGroup
                                id={buttonGroupId}
                                label={buttonGroupData.labelText}
                                key={index}
                            >
                                {Object.entries(buttonGroupData.buttons).map(
                                    ([buttonId, buttonData], index) => {
                                        return (
                                            <Button
                                                handleClick={() => {
                                                    this.logSelect(
                                                        buttonGroupId,
                                                        buttonId
                                                    );
                                                }}
                                                color={
                                                    buttonData.isSelected
                                                        ? "filled-purple"
                                                        : "gray"
                                                }
                                                key={index}
                                                staticOnHover={
                                                    buttonData.isSelected
                                                }
                                            >
                                                {buttonData.text}
                                            </Button>
                                        );
                                    }
                                )}
                            </ButtonGroup>
                        );
                    }
                )}
            </div>
        );
    };

    logSelect = (settingId: string, toSetTo: string) => {
        this.setState((oldState) => {
            let newState = { ...oldState };
            Object.entries(newState.buttonGroups[settingId].buttons).forEach(
                ([id, data]) => {
                    data.isSelected = false;
                }
            );
            newState.buttonGroups[settingId].buttons[toSetTo].isSelected = true;
            return newState;
        });
    };
}

export default Settings;
