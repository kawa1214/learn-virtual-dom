import { createElement } from './vdom/createElement';
import { render } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff'

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
const $app: any = render(vApp);
const $target = document.getElementById('app');
let $rootEl: any = mount({ $node: $app, $target: $target });


setInterval(() => {
  count++;
  /*
  const vNewApp: any = createVApp(count)
  const $newApp: any = render(vNewApp)
  $rootEl = mount({$node: $newApp, $target:  $rootEl});
  */
  const vNewApp = createVApp(count)
  const patch = diff(vApp, vNewApp);

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1500);

/*
import { render } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff'
console.log("test")


const createVApp = (count: number) => createElement('div', {
  attrs: {
    id: 'app',
    //dataCount: count, // we use the count here
  },
  children: [
    'The current count is: ',
    createElement('a', {
      children: [
        String(count),
      ],
    }),
    createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
      },
    }),
  ],
});

let count: number = 0;
let vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById('app'));



setInterval(() => {
  count++;

  const vNewApp = createVApp(count)
  const patch = diff(vApp, vNewApp);

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 500);
*/