interface mountInterface {
  $node: string | Node,
  $target: HTMLElement | null,
}
export const mount = (props: mountInterface) => {
  if (props.$target !== null) {
    props.$target.replaceWith(props.$node);
    return props.$node;
  }
};