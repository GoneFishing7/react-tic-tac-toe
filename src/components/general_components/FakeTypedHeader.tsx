import React from "react";

interface Props {
    content: string
}
interface State {
    toType: string,
    typed: string
}

class FakeTypedHeader extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            toType: props.content,
            typed: "",
        };
        let currentTime = 100;
        for (let i = 0; i < this.state.toType.length; i++) {
            let newWaitingTime = Math.random() * 200;
            setTimeout(() => {
                this.setState((oldState) => {
                    return {
                        toType: oldState.toType.slice(1, oldState.toType.length),
                        typed: oldState.typed + oldState.toType.slice(0, 1),
                    };
                });
            }, currentTime + newWaitingTime);
            currentTime += newWaitingTime;
        }
    }
    render() {
        return (
            <h1>
                &gt;{this.state.typed}
                <span className="blinking unselectable">_</span>
            </h1>
        );
    }
}

export default FakeTypedHeader;
