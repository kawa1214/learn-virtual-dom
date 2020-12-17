interface mountInterface {
  $node: Element,
  $target: Element | null,
}
export const mount = (props: mountInterface) => {
  if (props.$target !== null) {
    props.$target.replaceWith(props.$node)
    return props.$node;
  }
}
