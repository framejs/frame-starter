import { CustomElement, Event, EventEmitter } from '@framejs/core';
import { withLitHtml, html } from '@framejs/renderer-lit-html';

@CustomElement({
    tag: 'todo-input',
    style: require('./todo-input.scss')
})
export class TodoInput extends withLitHtml(HTMLElement) {
    public value: string = '';
    @Event() onTodoInputSubmit: EventEmitter;

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.value) return;
        this.onTodoInputSubmit.emit(this.value);
        this.value = '';
        (this as any)._invalidate();
    }
    
    handleInputChange = (event) => this.value = event.target.value;

    render(): any {
        return html`
            <form on-submit=${(e) => this.handleOnSubmit(e)}>
                <input
                    value=${this.value}
                    type="text"
                    placeholder="What needs to be done?"
                    on-input=${(e) => this.handleInputChange(e)}
                />
            </form>
        `;
    }
}