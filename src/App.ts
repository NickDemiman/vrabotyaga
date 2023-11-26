import { Component } from "./snail/component";
import { createElement, createText } from "./vdom/VirtualDOM";

interface AppProps { };

interface AppState {
    name: string,
    title: string,
};

export class App extends Component<AppProps, AppState> {

    state = { 
        name: 'App',
        title: 'Welcome to the App' 
    };

    render() {
        return createElement('div', { key: 'app-div' }, createText(this.state.title));
    };
};