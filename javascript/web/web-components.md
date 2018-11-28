### Web Components

[Web components](https://www.webcomponents.org/introduction) are a set of web APIs that let you create custom HTML components. To use a web component, you just
import it and then use it as if it was a normal elements.

To define a new web component:

```javascript
class NewComponent extends HTMLElement { ... }
window.customElements.define('new-component', NewComponent);
```
