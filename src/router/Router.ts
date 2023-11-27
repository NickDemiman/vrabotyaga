import { Component } from "../snail/component";
import { VDomNode, createElement, createText, renderVDomNode } from "../vdom/VirtualDOM";

import Navigate from "./Navigate";

export interface RouteProps {
    path: RegExp;
    node: VDomNode;
    routes: any;
};

export interface RouterProps {
    routes: Array<RouteProps>
};

export class Router extends Component<RouterProps, {}> {

    public componentDidMount(): void {
        Navigate.addCallback(() => {
            this.applyComponentChanges();
        });
    }

    render() {
        if (!this.props) {
            throw new Error('props are undefined');
        }

        const route = this.props.routes.find((r) => r.path.exec(location.pathname));
        if (route) {
            return route.node;
        }

        return createElement(
            'div',
            { key: 'error-router' },
            createText('Ошибка при роутинге')
        );
    };
}
