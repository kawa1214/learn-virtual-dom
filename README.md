**仮想DOM要素のオブジェクト**

'''javascript
const myButton = {
  tagName: 'button',
  attrs: {
      id: 'btn',
      class: 'save-btn'
  },
  children: ['save'],
};
'''

'''html
<button id="btn" class="save-btn">save</button>
'''

**dom methods**

- remove
https://developer.mozilla.org/ja/docs/Web/API/ChildNode/remove

- replaceWith
https://developer.mozilla.org/ja/docs/Web/API/ChildNode/replaceWith

- appendChild
https://developer.mozilla.org/ja/docs/Web/API/Node/appendChild