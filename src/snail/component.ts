export abstract class Component {

    protected tmpl: Function;
    protected domElement?: HTMLElement | undefined;
    protected props?: Props | undefined;

    constructor(tmpl: Function, props?: Props) {
        this.tmpl = tmpl;
        this.props = props;
    }

    update() {
        if (!this.domElement) {
            throw new Error('domElement is null');
        }

        this.replace(this.domElement);
    }

    appendTo(element: HTMLElement): void {
        element.appendChild(this.render());
        this.domElement = Array.from(element.childNodes).at(-1) as HTMLElement;

        this.postRender();
    }

    replace(element: HTMLElement): void {
        element.after(this.render());
        this.domElement = element.nextSibling as HTMLElement;
        element.remove();

        this.postRender();
    }

    postRender(): void {
        if (!this.isRendered) {
            this.isRendered = true;
            this.onMount();
        }

        this.didMount();
    }

    public onMount() { }
    public didMount() { }
    public onUpdate() { }
    public onDestroy() { }

    public abstract render(): HTMLElement;

    // protected triggerEvent<D>(eventName: string, detail?: D) {
    //     this.domElement.dispatchEvent(
    //         new CustomEvent(eventName, {
    //             bubbles: true,
    //             detail,
    //         })
    //     );

    //     return false;
    // }

    private isRendered = false;
}

export const useState = (value: any, component: Component) => {
    function callback (newValue: any) {
        value = newValue;
        component.update();
    }

    return [value, callback];
}

// export const snail = {
//     Component,
//     useState
// }