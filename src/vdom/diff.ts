import { render } from './render';
import { elementAttribute, elementAttrs, elementChildren } from '../types/index'

type diffNodeInterface = Element

type diffChildrenType = Array<Element>

const zip = (xs: string | Array<Function>, ys: string | Array<any>) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs: elementAttrs, newAttrs: elementAttrs) => {
  const patches: Array<Function> = [];
  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node: Element) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  console.log("paches", patches);

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node: Element) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node: Element) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren: elementChildren, newVChildren: elementChildren) => {
  const childPatches: Array<Function> = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });
  //console.log("childPatches", childPatches)
  const additionalPatches: Array<Function> = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node: diffNodeInterface) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return ($parent: { childNodes: diffChildrenType; }) => {
    // since childPatches are expecting the $child, not $parent,
    // we cannot just loop through them and call patch($parent)
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

export const diff = (oldVTree: elementAttribute|string , newVTree: elementAttribute|string) => {
  //console.log(oldVTree, newVTree)
  // newTreeがない場合 未定義を返す
  if (newVTree === undefined) {
    return ($node: diffNodeInterface) => {
      $node.remove();
      return undefined;
    }
  }

  // string type の場合は置き換えて Text type を返す
  if (typeof oldVTree === 'string' ||
    typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return ($node: diffNodeInterface) => {
         const $newNode = render(newVTree);
         $node.replaceWith($newNode);
         return $newNode;
       };
    } else {
      // 同じテキストの場合はそのままで返す
      return ($node: diffNodeInterface) => $node;
    }
  }

  // 差分を見つけずに，新しいnewVtreeをレンダリングして返す
  if (oldVTree.tagName !== newVTree.tagName) {
    return ($node: diffNodeInterface) => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }
  
  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);

  return ($node: any) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};