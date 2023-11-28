import { App } from "./App";

import { renderToElementDyId, createComponent } from "./shared/services/vdom/VirtualDOM";

const renderApp = () => {
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
}

renderApp();