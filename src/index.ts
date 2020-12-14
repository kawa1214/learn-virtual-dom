import { createElement } from './vdom/createElement';
import { render, firstRender } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff'

const createVApp = (count: number) => createElement({
  tagName: "div",
  attrs: { id: 'app', test: `${count}`},
  children: [
    createElement({
      tagName: 'p',
      attrs: {
        value: `${count}`,
        value2: `${count}2`,
        
      },
      children: [
        //`count: ${String(count)}`,
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
                String(count),
                createElement({
                  tagName: 'div',
                  attrs: {},
                  children: [
                    createElement({
                      tagName: 'div',
                      attrs: {},
                      children: [
                        `${count}`,
                      ]
                    }),
                  ]
                }),
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
  if (count <= 5) {
    console.log("count", count)
    const vNewApp = createVApp(count)
    if ($rootEl !== undefined ) {
      const $newRootEl = diff(vApp, vNewApp, $rootEl);
      console.log("$rootEl", $rootEl)
      console.log("$newRootEl", $newRootEl)
      $rootEl = $newRootEl
    }
    vApp = vNewApp;
  }
}, 1500);

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