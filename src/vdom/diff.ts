import { render } from './render';
import { elementAttribute, elementAttrs, elementChildren } from '../types/index'
/*
const zip = (xs: string | any[], ys: string | any[]) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs: elementAttrs, newAttrs: elementAttrs) => {
  const patches: { ($node: { setAttribute: (arg0: string, arg1: string) => void; }): { setAttribute: (arg0: string, arg1: string) => void; }; ($node: any): any; }[] = [];

  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node: { setAttribute: (arg0: string, arg1: string) => void; }) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node: any) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node: any) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren: elementChildren, newVChildren: elementChildren) => {
  const childPatches: ((($node: { remove: () => void; }) => undefined) | (($node: { replaceWith: (arg0: Text | HTMLElement) => void; }) => Text | HTMLElement) | (($node: any) => any))[] = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches: (($node: any) => any)[] = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node: { appendChild: (arg0: Text | HTMLElement) => void; }) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return ($parent: { childNodes: any; }) => {
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

export const diff = (oldVTree:  elementAttribute| string, newVTree:  elementAttribute | string) => {
  // let's assume oldVTree is not undefined!
  if (newVTree === undefined) {
    return ($node: { remove: () => void; }) => {
      $node.remove();
      // the patch should return the new root node.
      // since there is none in this case,
      // we will just return undefined.
      return undefined;
    }
  }

  if (typeof oldVTree === 'string' ||
    typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      // could be 2 cases:
      // 1. both trees are string and they have different values
      // 2. one of the trees is text node and
      //    the other one is elem node
      // Either case, we will just render(newVTree)!
      return ($node: { replaceWith: (arg0: Text | HTMLElement) => void; }) => {
         const $newNode = render(newVTree);
         $node.replaceWith($newNode);
         return $newNode;
       };
    } else {
      // this means that both trees are string
      // and they have the same values
      return ($node: any) => $node;
    }
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    // we assume that they are totally different and 
    // will not attempt to find the differences.
    // simply render the newVTree and mount it.
    return ($node: { replaceWith: (arg0: Text | HTMLElement) => void; }) => {
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

*/

interface diffNodeInterface {
  remove: () => void,
  replaceWith: (arg: Text | HTMLElement) => void,
  appendChild: (arg: Text | HTMLElement) => void,
}

const zip = (xs: string | any[], ys: string | any[]) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs: elementAttrs, newAttrs: elementAttrs) => {
  const patches: { ($node: any): any; ($node: any): any; }[] = [];

  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node: any) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node: any) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node: any) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren: elementChildren, newVChildren: elementChildren) => {
  const childPatches: any[] = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches: any[] = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node: diffNodeInterface) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return ($parent: { childNodes: string | any[]; }) => {
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