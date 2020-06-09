/*
txt: val
SETTINGS OPTIONS:
-----------------
who-is-o:
    Player 1: ply1,
    Player 2: ply2
-----------------
who-is-moving-first:
    Player 1: ply1,
    Player 2: ply2
-----------------
player-2-mode:
    Easy Computer: esy
    Medium Computer: med
    Impossible Computer: imp
    Human: hum
-----------------
*/

import React from "react";

import ButtonGroup from "./ButtonGroup";
import Button from "../general_components/Button";

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {},
        };
    }

    render() {
        return (
            <div className="settings">
                <h2>Settings</h2>
                <ButtonGroup
                    id="who-is-o"
                    labelText="Who is O?"
                    color="purple"
                    buttons={[
                        { text: "Player 1", val: "ply1" },
                        { text: "Player 2", val: "ply2" },
                    ]}
                    logSelect={this.logSelect}
                />
                <ButtonGroup
                    id="who-is-moving-first"
                    labelText="Who is moving first?"
                    color="purple"
                    buttons={[
                        { text: "Player 1", val: "ply1" },
                        { text: "Player 2", val: "ply2" },
                    ]}
                    logSelect={this.logSelect}
                />
                <ButtonGroup
                    id="player-2-mode"
                    labelText="Player 2 is:"
                    color="purple"
                    buttons={[
                        { text: "Easy Computer", val: "esy" },
                        { text: "Medium Computer", val: "med" },
                        { text: "Impossible Computer", val: "imp" },
                        { text: "Human", val: "hum" },
                    ]}
                    logSelect={this.logSelect}
                />
                <Button
                    color="green"
                    content="Play!"
                    handleClick={() => {
                        this.props.submitWithOptions(this.state.options);
                    }}
                    largeButton="true"
                />
            </div>
        );
    }

    logSelect = (id, val) => {
        this.setState((oldState) => {
            let options = { ...oldState.options };
            options[id] = val;
            return { options };
        });
    };
}

export default Settings;
