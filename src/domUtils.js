//

export const noop = () => {};
export const removeChildren = (node) => {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};

export const fetchAttribute = (node, name) => {
  const value = node.getAttribute(name);
  if (!value) {
    throw new Error();
  }

  return value;
};
