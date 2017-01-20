// @flow

const folderEntity = '&#128193;';

export class Component {
  mountElement: HTMLElement;
  root: Document;
  tree: Object;

  constructor(root: Document, mountElement: HTMLElement, initialTree: Object) {
    this.root = root;
    this.mountElement = mountElement;
    this.tree = initialTree;
  }

  start() {
    // const element = this.root.createElement('p');
    // const text = this.root.createTextNode('hello');
    // element.appendChild(text);
    // this.mountElement.appendChild(element);
    this.renderTree(this.tree);
  }

  renderTree = (tree: Object) => {
    const keys = Object.keys(tree);
    keys.forEach((key) => {
      const { type, children, value } = tree[key];
      const div = this.root.createElement('div');
      const link = this.root.createElement('a');

      switch (type) {
        case 'folder': {
          link.innerHTML = `${folderEntity} ${key}`;
          break;
        }
        case 'file': {
          const text = this.root.createTextNode(key);
          link.appendChild(text);
          break;
        }
        default:
          throw new Error('!!!');
      }
      link.href = '#';
      div.appendChild(link);
      this.mountElement.appendChild(div);
    });
  };
}
