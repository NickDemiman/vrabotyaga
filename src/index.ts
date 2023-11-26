import { App } from "./App";

import { renderToElementDyId, createComponent } from "./vdom/VirtualDOM";

renderToElementDyId('root', createComponent(App, { key: 'app' }));