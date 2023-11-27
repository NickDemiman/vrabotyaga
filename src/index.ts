import { App } from "./App";

import { renderToElementDyId, createComponent } from "./vdom/VirtualDOM";

const renderApp = () => {
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
}

window.addEventListener('popstate', () => {
    console.log('popstate');
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
});

renderToElementDyId('root', createComponent(App, { key: 'app' }));