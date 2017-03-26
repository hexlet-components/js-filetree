// @flow

export const noop = () => {};
export const removeChildren = (node: Node) => {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};

export const fetchAttribute = (node: HTMLElement, name: string) => {
  const value = node.getAttribute(name);
  if (!value) {
    throw new Error();
  }

  return value;
};
