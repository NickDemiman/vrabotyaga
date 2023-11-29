import { Component } from "../../shared/services/snail/component";
import { createElement, createText } from "../../shared/services/vdom/VirtualDOM";

export interface SvgProps {
    id?: string,
    content: string,
    width?: number,
    height?: number,
};

export class Svg extends Component<SvgProps, {}> {

    render() {
        if (!this.props) {
            throw new Error('Svg props are undefined');
        };

        const parser = new DOMParser();
        const svgElement = parser.parseFromString(this.props.content, 'image/svg+xml').documentElement;
        svgElement.setAttribute('height', (this.props.height || 60).toString() + 'px');
        svgElement.setAttribute('width', (this.props.width || 60).toString() + 'px');

        return createElement(
            'svg-element',
            {
                svgcontent: svgElement.outerHTML
            },
        );
    };
}
