import "./Button.scss";

import { Component } from "../../shared/services/snail/component";
import { createElement, createComponent } from "../../shared/services/vdom/VirtualDOM";

import { Text, TextTypes } from "../Text/Text";

export interface ButtonProps {
    id?: string,
    variant: 'primary' | 'neutral' | 'secondary' | 'accent' | 'outlined',
    subvariant?: string,
    text?: string | number,
    textvariant?: TextTypes,
    style?: string,
    name?: string,
    type?: string,
    onclick?: Function
};

export class Button extends Component<ButtonProps, {}> {

    render() {
        if (!this.props || !this.children) {
            throw new Error('Button settings are undefined');
        };

        // отделение параметров для тега и пользовательских параметров
        const { 
            variant, subvariant, 
            text, textvariant, 
            ...buttonProps 
        } = this.props;

        return createElement(
            'button',
            {
                ...buttonProps,
                class: 'button-' + variant + ' ' + (subvariant || ''),
            },
            createComponent(
                Text,
                {
                    variant: textvariant || 'regular',
                    text: text || '',
                    style: 'text-align: center; text-wrap: nowrap;'
                }
            ),
        );
    };
}
