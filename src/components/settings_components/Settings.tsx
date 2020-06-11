import React from "react";
import { SettingsInterface } from "../general_components/Types";
import ButtonGroup from "./ButtonGroup";
import Button from "../general_components/Button";

interface Props {
    submitWithSettings: (settings: SettingsInterface) => void;
}
interface State {
    buttonGroups: {
        [buttonGroupId: string]: {
            labelText: string;
            buttons: {
                [buttonId: string]: {
                    isSelected: boolean;
                    text: string;
                };
            };
        };
    };
}

class Settings extends React.Component<Props, State> {
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
            },
        };
    }
    render() {
        return (
            <div className="settings">
                <h2>Settings</h2>
                {Object.entries(this.state.buttonGroups).map(
                    ([buttonGroupId, buttonGroupData], index) => {
                        console.log({ buttonGroupId, buttonGroupData, index });
                        return (
                            <ButtonGroup
                                id={buttonGroupId}
                                label={buttonGroupData.labelText}
                            >
                                {Object.entries(buttonGroupData.buttons).map(
                                    ([buttonId, buttonData], index) => {
                                        console.log({
                                            buttonId,
                                            buttonData,
                                            index,
                                        });
                                        return (
                                            <Button
                                                handleClick={() => {
                                                    console.log(
                                                        `Clicked ${buttonId}`
                                                    );
                                                }}
                                                color={
                                                    buttonData.isSelected
                                                        ? "filled-purple"
                                                        : "gray"
                                                }
                                                key={index}
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
                <Button
                    handleClick={() => {
                        console.log("Time to play!");
                    }}
                    color="filled-green"
                    largeButton={true}
                >
                    Play!
                </Button>
            </div>
        );
    }
    logSelect = () => {};
}

export default Settings;
