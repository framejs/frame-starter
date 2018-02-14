import { mount } from '@skatejs/bore';
import { h } from '@skatejs/val';

require('components/todo/todo-item/todo-item');

test('todo-item is checked by attribute', () => {
    const wrapper = mount(<todo-item checked/>)

    // Set timeout to make sure the renderer has run, 
    // bore .waitFor(selector) doesn't work for some reason.
    wrapper.wait(setTimeout(() => { 
        expect(wrapper.node.checked).toEqual(true);
    }));
});

test('todo-item shadowRoot renders content', () => {
    const wrapper = mount(<todo-item>hello</todo-item>)
    wrapper.wait(setTimeout(() => { 
        expect(wrapper.node.shadowRoot.childNodes[0].localName).toEqual('li');
    }));
});