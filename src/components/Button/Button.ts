import "./Button.scss";

import { Component } from "../../shared/services/snail/component";
import { createElement } from "../../shared/services/vdom/VirtualDOM";

export interface ButtonProps {
    id?: string,
    variant: 'primary' | 'neutral' | 'secondary' | 'accent' | 'outlined',
    subvariant?: string,
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
        const { variant, subvariant, ...buttonProps } = this.props;

        return createElement(
            'button',
            {
                ...buttonProps,
                class: 'button-' + variant + ' ' + (subvariant || ''),
            },
            ...this.children
        );
    };
}
