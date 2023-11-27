import { App } from "./App";

import { renderToElementDyId, createComponent } from "./vdom/VirtualDOM";

const renderApp = () => {
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
}

renderApp();