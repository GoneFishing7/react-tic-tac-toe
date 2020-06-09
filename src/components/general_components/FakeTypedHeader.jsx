import React from "react";

class FakeTypedHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: props.children,
            text: "",
        };
        let currentTime = 100;
        for (let i = 0; i < this.state.words.length; i++) {
            let newWaitingTime = Math.random() * 200;
            setTimeout(() => {
                this.setState((oldState) => {
                    return {
                        words: oldState.words.slice(1, oldState.words.length),
                        text: oldState.text + oldState.words.slice(0, 1),
                    };
                });
            }, currentTime + newWaitingTime);
            currentTime += newWaitingTime;
        }
    }
    render() {
        return (
            <h1>
                >{this.state.text}
                <span className="blinking unselectable">_</span>
            </h1>
        );
    }
}

export default FakeTypedHeader;
