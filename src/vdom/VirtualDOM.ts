import { Component } from "../snail/component";
import { RouteProps } from "../router/Router";

// формирует ключи для элементов вместо пользователя
import KeyManager from "./KeyManager";

export type VDomPropType = string | number | boolean | Function; 

export type VDomPropsType = {
    [key: string]: VDomPropType
};

export interface VDomElement {
    kind: 'element'
    tag: string
    children?: Array<VDomNode>
    props?: VDomPropsType
    key: string | number
};

export interface VDomText {
    kind: 'text'
    value: string
    key: string | number
};

export interface VDomComponent {
    kind: 'component',
    instance?: Component<any, any>,
    props: object,
    component: { new(): Component<any, any> },
    key: string | number
};

export type VDomNode = VDomText | VDomElement | VDomComponent;

export const createText = (
    value: string | number | boolean,
    key: string = ''
): VDomText => {
    return ({
        kind: 'text',
        value: value.toString(),
        key: key
    });  
};

export const createElement = (
    tag: string,
    props: VDomPropsType,
    ...children: Array<VDomNode>
): VDomElement => {
    const key: string = KeyManager.addKey(tag);

    return ({
        kind: 'element',
        tag: tag,
        props: props,
        children: [...children],
        key: key
    });
};

export const createComponent = <PropsType extends object>(
    component: { new(): Component<PropsType, any> },
    props: PropsType
): VDomComponent => {
    const key: string = KeyManager.addKey(component.name);

    return ({
        kind: 'component',
        props: props,
        component: component,
        key: key
    });
};

export const createRouter = (routes: Array<{ path: string, routeElement: VDomNode }>): Array<RouteProps> => {
    let result: Array<RouteProps> = [];

    routes.forEach((route) => {
        result.push({
            path: new RegExp(route.path),
            node: route.routeElement,
            routes: null
        });
    });

    return result;
}

export const renderVDomNode = (rootNode: VDomNode): HTMLElement | Text => {
    if (rootNode.kind == 'text') {
        return document.createTextNode(rootNode.value);
    };

    if (rootNode.kind == 'element') {
        const element = document.createElement(rootNode.tag);

        Object.keys(rootNode.props || {}).forEach((prop) => {
            if (rootNode.props) {
                (element as any)[prop] = rootNode.props[prop];
            }
        });

        (rootNode.children || []).forEach((child) => {
            element.appendChild(renderVDomNode(child));
        });

        return element;
    }

    if (rootNode.instance) {
        const element = renderVDomNode(rootNode.instance.render());
        rootNode.instance.notifyMounted(element as HTMLElement);
        return element;
    }

    rootNode.instance = new rootNode.component();
    const element = renderVDomNode(rootNode.instance.initProps(rootNode.props));
    rootNode.instance.notifyMounted(element as HTMLElement);
    return element;
};


export const renderToElementDyId = (elementId: string, node: VDomNode): HTMLElement => {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element with this id is undefined');
    }
  
    const parentElement = element.parentElement;
    if (!parentElement) {
        throw new Error('Parent elment is undefined');
    }

    element.replaceWith(renderVDomNode(node));

    return parentElement.children[0] as HTMLElement;
};