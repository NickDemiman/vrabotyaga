export class Navigate {
    callbacks: Array<Function> = [];

    addCallback(newCallback: Function) {
        this.callbacks.push(newCallback);
    }

    navigateTo(url: string, state: any = {}) {
        history.pushState(state, "", url);
        this.callbacks.forEach((callback) => {
            callback();
        });  
    };
};

export default new Navigate();