import { Component } from "./component";
import template from './button.hbs';
// import Handlebars from "handlebars/runtime";


export class Button extends Component {
    constructor(attrs?: Object) {
        // const template = () => `<button>Press Me</button>`;
        // const template = Handlebars.compile('./button.hbs');
        super(template, attrs);
    }
    render() {
        return this.tmpl();
    }
}