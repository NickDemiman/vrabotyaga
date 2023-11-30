import "./assets/css/index.scss";
import { App } from "./App";

import { renderToElementDyId, createComponent } from "./shared/services/snail/vdom/VirtualDOM";

const renderApp = () => {
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
}

renderApp();