// @flow

import _ from 'lodash';
import debug from 'debug';

import { removeChildren } from './domUtils';

const log = debug('fm');

export default class {
  static foldersButtonMapping = {
    closeFolder: 'openFolder',
    openFolder: 'closeFolder',
  };
  static folderEntity = '&#128193;';
  static openFolderEntity = '&#128194;';

  contentPoint: HTMLElement;
  filetreePoint: HTMLElement;
  root: Document;
  data: Object;
  nextFoldersButtonAction: Bool = 'openFolder';

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

  buildFileBox(path: string) {
    const parts = path.split('/');
    const name = _.last(parts);
    const item = this.buildItem((box, link) => {
      box.className = 'file-box';
      box.setAttribute('data-path', path);

      const text = this.root.createTextNode(name);
      link.appendChild(text);
      link.className = 'file';
      link.addEventListener('click', () => {
        this.openFile(box);
      });
    });

    return item;
  }

  buildFolderBox(path: string) {
    const name = _.last(path.split('/'));
    const item = this.buildItem((box, link) => {
      box.className = 'folder-box';
      box.setAttribute('data-path', path);
      link.innerHTML = `${this.constructor.folderEntity} ${name}`;
      link.className = 'folder';
      link.setAttribute('data-path', path);
      link.addEventListener('click', () => {
        this.openFolder(box);
      });
    });

    return item;
  }

  openFile(box: Node) {
    const path = box.getAttribute('data-path');
    log('action', 'openFile', path);
    const parts = path.split('/');
    const node = this.getChildBy(parts);
    const boxes = this.filetreePoint.querySelectorAll('.file-box');
    boxes.forEach((b) => {
      b.style.backgroundColor = '#fff';
    });
    box.style.backgroundColor = '#eee';

    this.renderContent(path, node.content);
  }

  openFolder(box: Node) {
    const path = box.getAttribute('data-path');
    // log('action', 'openFolder');
    const parts = path.split('/');
    const name = _.last(parts);
    const node = this.getChildBy(parts);
    const link = this.root.createElement('a');
    // link.setAttribute('data-name', name);
    link.href = '#';
    link.innerHTML = `${this.constructor.openFolderEntity} ${name}`;

    removeChildren(box);

    box.appendChild(link);
    link.addEventListener('click', () => {
      this.closeFolder(box, path);
    });
    this.renderSubTree(node.children, box, path);
  }

  closeFolder(box: Node) {
    const path = box.getAttribute('data-path');
    const parts = path.split('/');
    const name = _.last(parts);
    const link = this.root.createElement('a');
    link.href = '#';
    link.innerHTML = `${this.constructor.folderEntity} ${name}`;

    removeChildren(box)

    box.appendChild(link);
    link.addEventListener('click', () => {
      this.openFolder(box, path);
    });
  }

  changeFoldersStatus() {
    log('action', 'changeFolderStatus');
    const folders = this.filetreePoint.querySelectorAll('.folder-box');
    folders.forEach((box) => {
      this[this.nextFoldersButtonAction](box);
    });
    this.nextFoldersButtonAction =
      this.constructor.foldersButtonMapping[this.nextFoldersButtonAction];
  }

  render() {
    const button = this.root.createElement('button');
    button.className = 'toggle-folders-button';
    button.innerHTML = 'toggle folders';
    button.addEventListener('click', () => {
      log('event', 'click', button.className);
      this.changeFoldersStatus();
    });
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
          el = this.buildFolderBox(path);
          break;
        }
        case 'file': {
          el = this.buildFileBox(path);
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

    removeChildren(this.contentPoint);
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
