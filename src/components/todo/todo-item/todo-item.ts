import { CustomElement, Property, Attribute, Event, EventEmitter } from '@framejs/core';
import { html, withLitHtml } from '@framejs/renderer-lit-html';

@CustomElement({
    tag: 'todo-item',
    style: require('./todo-item.scss')
})
export class TodoItem extends withLitHtml(HTMLElement) {
    @Attribute() checked: boolean = false;
    @Property() index: number;
    @Event() onTodoItemChecked: EventEmitter;
    @Event() onTodoItemRemove: EventEmitter;
    

    handleOnRemove = () => this.onTodoItemRemove.emit(this.index);
    handleOnChecked = () => this.onTodoItemChecked.emit(this.index);

    render(): any {
        return html`
            <li class$=${this.checked ? 'completed' : ''}>
                <input type="checkbox" checked=${this.checked} on-change=${() => this.handleOnChecked()}>
                <label><slot></slot></label>
                <button on-click=${() => this.handleOnRemove()}>x</button>
            </li>
        `;
    }
}