import './todo-item.js';
import './todo-input.js';
const templateTodo = document.createElement('template');
templateTodo.innerHTML = `
    <section>
        <todo-input></todo-input>
        <ul id="list-container"></ul>
    </section>
`;
class ToDoItem {
}
class MyTodo extends HTMLElement {
    constructor() {
        super();
        this._list = [
            { text: 'my initial todo', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];
        // Do not use shadow DOM to avoid problems when testing with selenium
        // this._root = this.attachShadow({ 'mode': 'open' });
        // initial state
        // Performance testing...
        //for (let i=0; i<1000; i++)
        //    this._list.push( { text:'This is my to item #' + i, checked: false } );
    }
    connectedCallback() {
        this.appendChild(templateTodo.content.cloneNode(true));
        this.$input = this.querySelector('todo-input');
        this.$listContainer = this.querySelector('#list-container');
        this.$input.addEventListener('onSubmit', this.addItem.bind(this));
        this._render();
    }
    addItem(e) {
        this._list.push({ text: e.detail, checked: false, });
        this._render();
    }
    removeItem(e) {
        this._list.splice(e.detail, 1);
        this._render();
    }
    toggleItem(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, {
            checked: !item.checked
        });
        this._render();
    }
    disconnectedCallback() { }
    _render() {
        if (!this.$listContainer)
            return;
        // empty the list
        this.$listContainer.innerHTML = '';
        this._list.forEach((item, index) => {
            let $item = document.createElement('todo-item');
            $item.setAttribute('text', item.text);
            $item.checked = item.checked;
            $item.index = index;
            $item.addEventListener('onRemove', this.removeItem.bind(this));
            $item.addEventListener('onToggle', this.toggleItem.bind(this));
            this.$listContainer.appendChild($item);
        });
    }
}
window.customElements.define('my-todo', MyTodo);
//# sourceMappingURL=my-todo.js.map