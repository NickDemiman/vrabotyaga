import { Component } from "./shared/services/snail/component";
import { createComponent, createElement, createText } from "./shared/services/snail/vdom/VirtualDOM";

import { Router, Route } from "./shared/services/router/Routing";
import Navigate from "./shared/services/router/Navigate";

import Dispatcher from "./shared/services/store/Dispatcher";

import CounterStore from "./CounterStore";

import { Button } from "./components/Button/Button";
import { Text } from "./components/Text/Text";
import { Svg } from "./components/Svg/Svg";

import logo from './assets/icons/logo.svg';
import cart from './assets/icons/cart.svg';
import { TextArea } from "./components/TextArea/TextArea";

interface AppState {
    title: string,
    count: number,
};

const initAppState: AppState = {
    title: 'Welcome to the App',
    count: 0 
};

export class App extends Component<{}, AppState> {

    state = { ...initAppState };

    // функция для демонстрации работы setState
    incCount() {
        this.setState((state) => {
            // к сожалению здесь придётся делать подобные проверки
            if (!state) {
                state = { ...initAppState };
            };
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
                createComponent(
                    Text,
                    {
                        variant: 'header',
                        text: this.state.title
                    }
                )
            ),
            createComponent(
                Svg, { content: logo }
            ),
            // демонстрация работы setState
            createComponent(
                Button,
                { 
                    id: 'button', 
                    leftIcon: {
                        height: 28,
                        width: 28,
                        content: cart,
                    },
                    text: this.state.count,
                    onclick: () => { this.incCount(); console.log('click'); },
                }
            ),
            // демонатсрация работы store
            createComponent(
                Button,
                {
                    variant: 'primary',
                    text: 'Count from store: ' + CounterStore.getCount(),
                    onclick: () => { Dispatcher.dispatch({ name: 'INC_COUNT' }) },
                },
            ),
            // демонстрация работы роутинга
            createComponent(
                Button,
                {
                    variant: 'outlined',
                    text: 'Вход',
                    onclick: () => { Navigate.navigateTo('/signin'); },
                },
            ),
            createComponent(
                Button,
                {
                    variant: 'outlined',
                    text: 'Главная страница',
                    onclick: () => { Navigate.navigateTo('/'); },
                },
            ),
            createComponent(
                Router, { },
                createComponent(
                    Route,
                    { path: new RegExp('^/$') },
                    createElement(
                        'div', { },
                        createComponent(
                            Text,
                            {
                                variant: 'subheader',
                                text: 'Главная страница'
                            }
                        )
                    ),
                ),
                createComponent(
                    Route, { path: new RegExp('^/signin$') },
                    createElement(
                        'div', { },
                        createComponent(
                            Text,
                            {
                                variant: 'subheader',
                                text: 'Вход'
                            }
                        )
                    ),
                ),
            ),
            createComponent(
                TextArea,
                {}
            ),
        );
    };
};