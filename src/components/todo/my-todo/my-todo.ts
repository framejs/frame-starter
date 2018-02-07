import { CustomElement, Event, Property, Listen } from '@framejs/core';
import { withLitHtml, html } from '@framejs/renderer-lit-html';

import  '../todo-input/todo-input';
import '../todo-item/todo-item';

interface TodoItem {
    text: string;
    checked: boolean;
}

@CustomElement({
    tag: 'my-todo',
    style: require('./my-todo.scss')
})
class MyTodo extends withLitHtml(HTMLElement) {
    @Property() _list: TodoItem[] = [
        { text: 'my initial todo', checked: false },
        { text: 'Learn about Web Components', checked: true }
    ]

    @Listen('onTodoInputSubmit')
    todoInputSubmitHandler(e: CustomEvent) {
        this._list = [...this._list, { text: e.detail, checked: false, }];
    }

    @Listen('onTodoItemChecked')
    todoItemCheckedHandler(e: CustomEvent) {
        const list = [...this._list];
        const item = list[e.detail];
        list[e.detail] = Object.assign({}, item, { checked: !item.checked });
        this._list = list;
    }

    @Listen('onTodoItemRemove')
    todoItemRemoveHandler(e: CustomEvent) {
        this._list = [...this._list.slice(0, e.detail), ...this._list.slice(e.detail + 1)];
    }
    
    render() {
        return html`
          <div>
            <h1>Todos FrameJS</h1>
            <section>
              <todo-input></todo-input>
              <ul id="list-container">
                ${this._list.map((item, index) => (
                  html`
                    <todo-item
                        checked=${item.checked}
                        index=${index}>${item.text}</todo-item>`
                ))}
              </ul>
            </section>
          </div>
        `;
      }
}