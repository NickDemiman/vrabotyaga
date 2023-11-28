import { Component } from "./snail/component";
import { createComponent, createElement, createText } from "./vdom/VirtualDOM";
import { Router, Route } from "./router/Routing";
import Navigate from "./router/Navigate";
import Dispatcher from "./store/Dispatcher";

import CounterStore from "./CounterStore";

interface AppState {
    name: string,
    title: string,
    count: number,
};

export class App extends Component<{}, AppState> {

    state = { 
        name: 'App',
        title: 'Welcome to the App',
        count: 0 
    };

    // функция для демонастрации работы setState
    incCount() {
        this.setState((state) => {
            if (!state) {
                throw new Error('state is undefined');
            }
            state.count = this.state.count + 1;
            return state;
        });
    };

    // связка стора и компонента
    public componentDidMount() {
        CounterStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    };

    render() {
        return createElement(
            'div', { id: 'root' }, 
            createElement(
                'div', { },
                createText(this.state.title)
            ),
            // демонстрация работы setState
            createElement(
                'button',                
                {
                    onclick: () => { this.incCount(); },
                },
                createText('Button count: '),
                createText(this.state.count),
            ),
            // демонатсрация работы store
            createElement(
                'button',                
                {
                    onclick: () => { Dispatcher.dispatch({ name: 'INC_COUNT' }) },
                },
                createText('Count from store: '),
                createText(CounterStore.getCount()),
            ),
            // демонстрация работы роутинга
            createElement(
                'button',                
                {
                    onclick: () => { Navigate.navigateTo('/signin'); },
                },
                createText('Вход'),
            ),
            createElement(
                'button',                
                {
                    onclick: () => { Navigate.navigateTo('/'); },
                },
                createText('Главная страница'),
            ),
            createComponent(
                Router, { },
                createComponent(
                    Route,
                    { path: new RegExp('^/$') },
                    createElement(
                        'div', { },
                        createText('Главная страница')
                    ),
                ),
                createComponent(
                    Route, { path: new RegExp('^/signin$') },
                    createElement(
                        'div', { },
                        createText('Вход')
                    ),
                ),
            )
        );
    };
};