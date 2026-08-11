//

// import $ from 'jquery';
import { html } from 'js-beautify';
import { Component } from '../src';
import initialTree from './__fixtures__/initialTree';

window.addEventListener('error', (event) => console.error(event.error));
// window.onerror = (...args) => console.log(args);
// document.raise = (type, message, data) => {
//   if (data.error) {
//     throw data.error;
//   } else {
//     console.error('ERROR', message);
//   }
// };

const getItemByPath = (name) => {
  const element = document.querySelector(`li[data-path="${name}"] > a`);
  if (!element) {
    throw new Error();
  }

  return element;
};

const body = document.body;
if (!body) {
  throw new Error();
}

describe('filetree', () => {
  let component;
  beforeEach(() => {
    // document.body.addEventListener('click', e => console.log(e.target));
    const mountPoint = document.createElement('div');
    body.appendChild(mountPoint);
    component = new Component(document, mountPoint, initialTree);
    component.start();
  });

  afterEach(() => {
    if (!body.lastChild) {
      throw new Error();
    }
    body.removeChild(body.lastChild);
  });

  it('render', () => {
    expect(html(body.innerHTML)).toMatchSnapshot('initial tree');
  });

  it('toggle folders', () => {
    const buttonElement = document.querySelector('.toggle-folders-button');
    if (!buttonElement) {
      throw new Error();
    }

    buttonElement.click();
    expect(html(body.innerHTML)).toMatchSnapshot('all folders collapsed');

    buttonElement.click();
    expect(html(body.innerHTML)).toMatchSnapshot('all folders expanded again');

    buttonElement.click();
    expect(html(body.innerHTML)).toMatchSnapshot('all folders collapsed again');
  });

  it('toggle folder', () => {
    getItemByPath('src').click();
    expect(html(body.innerHTML)).toMatchSnapshot('src collapsed');

    getItemByPath('src').click();
    expect(html(body.innerHTML)).toMatchSnapshot('src expanded again');

    getItemByPath('src').click();
    expect(html(body.innerHTML)).toMatchSnapshot('src collapsed again');
  });

  it('open file', () => {
    getItemByPath('package.json').click();
    expect(html(body.innerHTML)).toMatchSnapshot('package.json selected');

    getItemByPath('yarn.lock').click();
    expect(html(body.innerHTML)).toMatchSnapshot('selection moved to yarn.lock');

    getItemByPath('package.json').click();
    expect(html(body.innerHTML)).toMatchSnapshot('selection back on package.json');
  });
});
