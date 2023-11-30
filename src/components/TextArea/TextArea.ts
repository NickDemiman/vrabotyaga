import { Component } from "../../shared/services/snail/component";
import { createElement, createComponent, createText } from "../../shared/services/snail/vdom/VirtualDOM";

export interface TextAreaProps {

}

export class TextArea extends Component<TextAreaProps, {}> {
    render() {
        const { ...textAreaProps } = this.props;

        return createElement(
            'textarea',
            {
                ...textAreaProps
            },
        )
    }
}