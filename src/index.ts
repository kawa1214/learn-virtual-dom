import { createElement } from './vdom/createElement';
import { render, firstRender } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff'
import { CreateApp } from './framework/index';
import { elementAttribute, setStateInterface } from './types/index'

const view = (state: any) => createElement({
  tagName: "div",
  attrs: { id: 'app'},
  children: [
    createElement({
      tagName: "input",
      attrs: {
        type: "text",
        value: `${state.todoInput}`,
        oninput: (event: Event) => {
          const target = event.target as HTMLInputElement
          setState({actionType: 'todoInputTextChange', state: target.value})
        }
      },
      children: [
        createElement({
          tagName: "p",
          attrs: {},
          children: [
            `${state.todos[0]}`
          ]
        }),
      ],
    }),
    createElement({
      tagName: "button",
      attrs: {
        type: "button",
        onclick: () => {
          setState({actionType: 'addTodo', state: state.todoInput})
        }
      },
      children: [
      ],
    }),
    ...todosMap(state.todos),
  ],
});

const todosMap = (todos: Array<String>) => {
  return todos.map((todo, index) => {
    return createElement({
      tagName: "p",
      attrs: {
        key: `${index}`,
      },
      children: [
        `${todo}`
      ]
    });
  })
}

let state: any = {
  todoInput: "input todo",
  todos: ["todo1", "todo2", "todo3"],
}

let vApp = view(state);
const $app = firstRender(view(state));
const $target = document.getElementById('app');
let $rootEl = mount({ $node: $app, $target: $target });


const setState = (actionState: setStateInterface) => {
  switch(actionState.actionType) {
    case 'todoInputTextChange':
      state.todoInput = actionState.state
      reRender()
      break;
    case 'addTodo':
      state.todos.push(actionState.state)
      reRender()
      break;
  }
}

const reRender = () => {
  
  const vNewApp = view(state)
    if ($rootEl !== undefined ) {
      const $newRootEl = diff(vApp, vNewApp, $rootEl);
      $rootEl = $newRootEl
    }
    vApp = vNewApp;
}