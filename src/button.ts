import { Component } from "./snail/component";
import template from './button.hbs';
import { stringToElement } from "./utility/stringToElem";

export class Button extends Component {
    constructor(props?: Props) {
        super(template, props);
    }
    render(): HTMLElement {
        return stringToElement(this.tmpl());
    }
}