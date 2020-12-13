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
  ],
});
let count: number = 0;
let vApp = createVApp(count);
const $app = render(vApp);
const $target = document.getElementById('app');
let $rootEl = mount({ $node: $app, $target: $target });


setInterval(() => {
  count++;
  const vNewApp = createVApp(count)
  const patch: any = diff(vApp, vNewApp);
  //console.log(patch)
  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  console.log(patch);
  if (patch !== undefined && $rootEl !== undefined) {
    console.log(patch);
    //patch($rootEl);
    $rootEl = patch($rootEl);

  }
  //$rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1500);