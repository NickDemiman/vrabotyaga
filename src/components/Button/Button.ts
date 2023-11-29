import "./Button.scss";

import { Component } from "../../shared/services/snail/component";
import { createElement, createComponent, createText } from "../../shared/services/vdom/VirtualDOM";

import { Text, TextTypes } from "../Text/Text";
import { Svg, SvgProps } from "../Svg/Svg";

export type ButtonTypes = 'primary' | 'neutral' | 'secondary' | 'accent' | 'outlined' | 'base';

export interface ButtonProps {
    id?: string,
    variant?: ButtonTypes,
    subvariant?: string,
    text?: string | number,
    textvariant?: TextTypes,
    leftIcon?: SvgProps,
    rightIcon?: SvgProps,
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
            leftIcon, rightIcon,
            ...buttonProps 
        } = this.props;

        return createElement(
            'button',
            {
                ...buttonProps,
                class: 'button-' + (variant || 'base') + ' ' + (subvariant || ''),
            },

            (leftIcon) ?
                createComponent(
                    Svg, { ...leftIcon, id: 'left-icon' }
                ) 
                : createText(''),
            createComponent(
                Text,
                {
                    variant: textvariant || 'regular',
                    // проверка на undefined через !== не теряет при передаче число 0 (и другие подобные значения)
                    text: (text !== undefined) ? text : '',
                    style: 'text-align: center; text-wrap: nowrap;'
                }
            ),
            (rightIcon) ?
                createComponent(
                    Svg, { ...rightIcon, id: 'right-icon' }
                ) 
                : createText(''),
        );
    };
}
