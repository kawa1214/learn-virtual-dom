import { createElement } from './vdom/createElement';
import { render, firstRender } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff'
/*
const createVApp = (count: number) => createElement({
  tagName: "div",
  attrs: { id: 'app' },
  children: [
    createElement({
      tagName: 'p',
      attrs: {
        test: "1",
      },
      children: [
        `count: ${count}`,
      ]
    }),
  ],
});
*/
const createVApp = (count: number) => createElement({
  tagName: "div",
  attrs: { id: 'app' },
  children: [
    createElement({
      tagName: 'p',
      attrs: {},
      children: [
        `count: ${String(count)}`,
      ]
    }),
    createElement({
      tagName: 'table',
      attrs: { border : "1" },
      children: [
        createElement({
          tagName: 'tr',
          attrs: {},
          children: [
            createElement({
              tagName: 'th',
              attrs: {},
              children: [
                "count"
              ]
            }),
            createElement({
              tagName: 'th',
              attrs: {},
              children: [
                "count * 2"
              ]
            }),
          ]
        }),
        createElement({
          tagName: 'tr',
          attrs: {},
          children: [
            createElement({
              tagName: 'td',
              attrs: {},
              children: [
                String(count)
              ]
            }),
            createElement({
              tagName: 'td',
              attrs: {},
              children: [
                String(count * 2)
              ]
            }),
          ]
        }),
      ]
    })
  ],
});

let count: number = 0;
let vApp = createVApp(count);
const $app = firstRender(vApp);
const $target = document.getElementById('app');
let $rootEl = mount({ $node: $app, $target: $target });


setInterval(() => {
  count++;
  if (count < 3) {
    console.log("count", count)
    const vNewApp = createVApp(count)
    const patch = diff(vApp, vNewApp);
    if ($rootEl !== undefined ) {
      $rootEl = patch($rootEl);
    }
    vApp = vNewApp;
  }
  
}, 1500);