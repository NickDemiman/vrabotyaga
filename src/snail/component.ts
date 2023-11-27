import { VDomNodeUpdater, applyChanges, getDifference } from "../vdom/Difference";
import { VDomNode } from "../vdom/VirtualDOM";

export abstract class Component<PropsType, StateType> {

    protected props: PropsType | undefined;
    protected state: StateType | undefined;

    private node: VDomNode | undefined;
    private domElement: HTMLElement | Text | undefined;

    protected setState(updater: (state: StateType | undefined) => StateType) {
        if (!this.domElement) {
            throw new Error('domelement is undefined');
        };

        this.state = updater(this.state);
        applyChanges(this.domElement, this.getComponentDifference());
    };

    public setProps(props: PropsType): VDomNodeUpdater {
        if (!this.domElement) {
            throw new Error('domelement is undefined');
        }

        this.state = this.componentWillRecieveProps(props, this.state);
        this.props = props;
        return this.getComponentDifference();
    };

    public initProps(props: PropsType | undefined): VDomNode {
        this.props = props;
        this.node = this.render();
        return this.node;
    };

    public notifyMounted(element: HTMLElement | Text) {
        this.domElement = element;
        // необходимо для асинхронного выполнения
        setTimeout(() => {
            this.componentDidMount();
        });
    };

    public unmount() {
        this.componentWillUnmount();
        this.domElement = undefined;
    };

    public componentDidMount() {};
    public componentWillRecieveProps(
        props: PropsType, 
        state: StateType | undefined
    ): StateType | undefined 
    { 
        return state; 
    };
    public componentDidUpdate() {};
    public componentWillUnmount() {};

    private getComponentDifference(): VDomNodeUpdater {
        if (!this.node) {
            this.node = this.initProps(this.props);
        }

        const newNode = this.render();
        const difference = getDifference(this.node, newNode);
        if (difference.kind == 'replace') {
            // передаём стрелочную функцию, для сохранения контекста
            difference.callback = (element) => {
                this.domElement = element;
            };
        }
        this.node = newNode;
        // необходимо для асинхронного выполнения
        setTimeout(() => {
            this.componentDidUpdate();
        });

        return difference;
    };

    protected getChildrenByKey(key: string | number): Array<VDomNode> {
        if (!this.node) {
            throw new Error('node is undefined');
        }

        if (this.node.kind == 'text') {
            return [];
        }

        if (this.node.kind == 'element') {
            if (!this.node.children) {
                return [];
            }
            return this.node.children.filter((element) => element.key == key);
        }

        if (!this.node.instance) {
            throw new Error('this component is not mounted for search children');
        }
        
        return this.node.instance.getChildrenByKey(key);

    };

    public abstract render(): VDomNode;
};