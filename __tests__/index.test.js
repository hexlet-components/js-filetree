// @flow

import $ from 'jquery';
import { html } from 'js-beautify';
import { Component } from '../src';
import initialTree from './__fixtures__/initialTree';

window.addEventListener('error', event => console.error(event.error));

describe('filetree', () => {
  let component;
  beforeEach(() => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    component = new Component(document, mountPoint, initialTree);
    component.start();
  });

  it('render', () => {
    expect(html(document.body.innerHTML)).toMatchSnapshot();
  });

  it('toggle folders', () => {
    const buttonElement = $('.toggle-folders-button');
    buttonElement.click();
    expect(html(document.body.innerHTML)).toMatchSnapshot();

    buttonElement.click();
    expect(html(document.body.innerHTML)).toMatchSnapshot();

    buttonElement.click();
    expect(html(document.body.innerHTML)).toMatchSnapshot();
  });
});
