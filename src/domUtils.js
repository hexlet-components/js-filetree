export const noop = () => {};
export const removeChildren = (node) => {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};
