import { Component } from "./snail/component";
import { createComponent, createElement, createText, createRouter } from "./vdom/VirtualDOM";
import { Router } from "./router/Router";
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
            // демонстрация работы setState
            createElement(
                'button',                
                {
                    key: 'app-button',
                    onclick: () => { this.incCount(); },
                },
                createText('Button count: '),
                createText(this.state.count),
            ),
            // демонатсрация работы store
            createElement(
                'button',                
                {
                    key: 'app-button',
                    onclick: () => { Dispatcher.dispatch({ name: 'INC_COUNT' }) },
                },
                createText('Count from store: '),
                createText(CounterStore.getCount()),
            ),
            // демонстрация работы роутинга
            createElement(
                'button',                
                {
                    key: 'app-button',
                    onclick: () => { Navigate.navigateTo('/signin'); },
                },
                createText('Вход'),
            ),
            createElement(
                'button',                
                {
                    key: 'app-button',
                    onclick: () => { Navigate.navigateTo('/'); },
                },
                createText('Главная страница'),
            ),
            createComponent(
                Router,
                {
                    key: 'Router',
                    routes: createRouter([
                        {
                            path: '^/$',
                            routeElement: createElement(
                                'div',
                                { key: 'main-page' },
                                createText('Главная страница')
                            ),
                        },
                        {
                            path: '^/signin$',
                            routeElement: createElement(
                                'div',
                                { key: 'signin-page' },
                                createText('Страница входа'),
                            ),
                        }
                    ])
                },
            )
        );
    };
};