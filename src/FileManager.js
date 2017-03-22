// @flow

import _ from 'lodash';

export default class {
  static folderEntity = '&#128193;';
  static openFolderEntity = '&#128194;';

  contentPoint: HTMLElement;
  filetreePoint: HTMLElement;
  root: Document;
  data: Object;

  constructor(root: Document, filetreePoint: HTMLElement, contentPoint: HTMLElement, initialData: Object) {
    this.root = root;
    this.filetreePoint = filetreePoint;
    this.contentPoint = contentPoint;
    this.data = initialData;
  }

  buildItem(cb: Function) {
    const box = this.root.createElement('li');
    const link = this.root.createElement('a');
    link.href = '#';
    box.appendChild(link);
    cb(box, link);
    return box;
  }

  addFile(path: string) {
    const parts = path.split('/');
    const name = _.last(parts);
    const item = this.buildItem((box, link) => {
      const text = this.root.createTextNode(name);
      link.appendChild(text);
      link.className = 'file';
      link.addEventListener('click', () => {
        this.openFile(link, path);
      });
    });

    return item;
  }

  openFile(link: HTMLElement, path: string) {
    const parts = path.split('/');
    const node = this.getChildBy(parts);
    const files = this.filetreePoint.querySelectorAll('a.file');
    files.forEach((file) => {
      file.style.backgroundColor = '#fff';
    });
    link.style.backgroundColor = '#eee';

    this.renderContent(path, node.content);
  }

  addFolder(path: string) {
    const name = path.split('/').reverse()[0];
    const item = this.buildItem((box, link) => {
      link.innerHTML = `${this.constructor.folderEntity} ${name}`;
      link.className = 'folder';
      link.setAttribute('data-name', name);
      link.addEventListener('click', () => {
        this.openFolder(box, path);
      });
    });

    return item;
  }

  openFolder(box: Node, path: string) {
    const parts = path.split('/');
    const name = _.last(parts);
    const node = this.getChildBy(parts);
    const link = this.root.createElement('a');
    link.setAttribute('data-name', name);
    link.href = '#';
    link.innerHTML = `${this.constructor.openFolderEntity} ${name}`;

    const range = this.root.createRange();
    range.selectNodeContents(box);
    range.deleteContents();

    box.appendChild(link);
    link.addEventListener('click', () => {
      this.closeFolder(box, path);
    });
    this.renderSubTree(node.children, box, path);
  }

  closeFolder(box: Node, path: string) {
    const parts = path.split('/');
    const name = _.last(parts);
    const link = this.root.createElement('a');
    link.href = '#';
    link.innerHTML = `${this.constructor.folderEntity} ${name}`;

    const range = this.root.createRange();
    range.selectNodeContents(box);
    range.deleteContents();

    box.appendChild(link);
    link.addEventListener('click', () => {
      this.openFolder(box, path);
    });
  }

  render() {
    const button = this.root.createElement('button');
    button.innerHTML = 'open folders';
    this.filetreePoint.appendChild(button);
    this.renderSubTree(this.data, this.filetreePoint);
  }

  renderSubTree(data: Object, mountPoint: Node, ancestry: ?string) {
    const keys = Object.keys(data);
    const container = this.root.createElement('ul');
    mountPoint.appendChild(container);
    keys.forEach((key) => {
      const { type } = data[key];
      const path = ancestry ? `${ancestry}/${key}` : key;
      let el;
      switch (type) {
        case 'folder': {
          el = this.addFolder(path);
          break;
        }
        case 'file': {
          el = this.addFile(path);
          break;
        }
        default:
          throw new Error('!!!');
      }
      container.appendChild(el);
    });
  }

  renderContent(path: string, content: string) {
    const div = this.root.createElement('div');
    const textarea = this.root.createElement('textarea');
    const text = this.root.createTextNode(content);
    textarea.cols = 40;
    textarea.rows = 10;
    textarea.appendChild(text);
    div.appendChild(textarea);

    const range = this.root.createRange();
    range.selectNodeContents(this.contentPoint);
    range.deleteContents();
    this.contentPoint.appendChild(div);

    const button = this.root.createElement('button');
    button.innerHTML = 'save';
    button.addEventListener('click', () => {
      this.saveContent(path, textarea);
    });
    this.contentPoint.appendChild(button);
  }

  saveContent(path: string, textarea: HTMLTextAreaElement) {
    const parts = path.split('/');
    const node = this.getChildBy(parts);
    node.content = textarea.value;
  }

  getChildBy(ancestry: Array<string>) {
    const iter = ([key, ...rest], acc) =>
      (rest.length === 0 ? acc[key] : iter(rest, acc[key].children));

    return iter(ancestry, this.data);
  }
}
