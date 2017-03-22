// @flow

import FileManager from './FileManager';

export class Component {
  mountElement: HTMLElement;
  root: Document;
  initialTree: Object;
  filemanager: FileManager;

  constructor(root: Document, mountElement: HTMLElement, initialTree: Object) {
    this.initialTree = initialTree;
    this.mountElement = mountElement;
    this.root = root;
  }

  start() {
    this.mountElement.innerHTML = `
    <table>
      <tr>
        <td class="filetree"></td> <td class="editor"></td>
      </tr>
    </table>
    `;

    const filetree = this.mountElement.querySelector('.filetree');
    if (!filetree) {
      throw new Error();
    }
    const content = this.mountElement.querySelector('.editor');
    if (!content) {
      throw new Error();
    }
    this.filemanager = new FileManager(this.root, filetree, content, this.initialTree);
    this.filemanager.render();
  }
}
