import "./Text.scss";

import { Component } from "../../shared/services/snail/component";
import { createElement, createText } from "../../shared/services/vdom/VirtualDOM";

export interface TextProps {
    id?: string,
    variant: 'regular' | 'header' | 'subheader' | 'caption',
    tag?: 'div' | 'span' | 'p',
    text: string | number | boolean,
    style?: string,
    name?: string,
    type?: string,
};

export class Text extends Component<TextProps, {}> {

    render() {
        if (!this.props) {
            throw new Error('Text settings are undefined');
        };

        const { variant, tag, text, ...textProps } = this.props;

        return createElement(
            tag || 'span',
            {
                ...textProps,
                class: 'text-' + variant,
            },
            createText(this.props.text)
        );
    };
}
