import { Component } from "../snail/component";
import { VDomNode, createElement, createText, renderVDomNode } from "../vdom/VirtualDOM";

import Navigate from "./Navigate";

export interface RouteProps {
    path: RegExp;
    node: VDomNode;
    routes: any;
};

export interface RouterProps {
    baseUrl: string,
    routes: Array<RouteProps>
};

interface RouterState { };

export class Router extends Component<RouterProps, RouterState> {

    public componentDidMount(): void {
        Navigate.addCallback(() => {
            this.setState((state) => { 
                return state || {}; 
            });
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
