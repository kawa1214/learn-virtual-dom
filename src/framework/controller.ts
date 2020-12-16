import { elementAttribute } from '../types/index'
import { render, firstRender } from '../vdom/render';
import { mount } from '../vdom/mount';


export const CreateApp = (element:  ((state: any) => elementAttribute), state: any, actions: Array<any>) => {
  let vApp = element(state);
  const $app = firstRender(element(state));
  const $target = document.getElementById('app');
  let $rootEl = mount({ $node: $app, $target: $target });
  
  
}