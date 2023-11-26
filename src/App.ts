import { Component } from "./snail/component";
import { createElement, createText } from "./vdom/VirtualDOM";

interface AppProps { };

interface AppState {
    name: string,
    title: string,
    count: number,
};

export class App extends Component<AppProps, AppState> {

    state = { 
        name: 'App',
        title: 'Welcome to the App',
        count: 0 
    };

    incCount() {
        this.setState((state) => {
            if (!state) {
                throw new Error('state is undefined');
            }
            state.count = this.state.count + 1;
            return state;
        });
    }

    render() {
        return createElement(
            'div', 
            { 
                id: 'root', 
                key: 'app-div' 
            }, 
            createElement(
                'div',
                { key: 'app-title' },
                createText(this.state.title)
            ),
            createElement(
                'button',                
                {
                    key: 'app-button',
                    onclick: () => { this.incCount(); },
                },
                createText('Button count: '),
                createText(this.state.count),
            )
        );
    };
};