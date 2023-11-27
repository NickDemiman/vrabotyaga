import { ActionInterface } from "./Store";

class Dispatcher {
    callbacks: Array<Function>;

    constructor() {
        this.callbacks = [];
    };

    register(callback: Function) {
        this.callbacks.push(callback);
    };

    dispatch(action: ActionInterface) {
        this.callbacks.forEach((callback) => {
            callback(action);
        });
    };
}

export default new Dispatcher();