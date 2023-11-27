import { Component } from "./snail/component";
import { createComponent, createElement, createText, createRouter } from "./vdom/VirtualDOM";
import { Router } from "./router/Router";
import Navigate from "./router/Navigate";

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
            ),
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