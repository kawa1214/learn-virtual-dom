import { createElement } from './vdom/createElement';
import { render, firstRender } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff'

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
