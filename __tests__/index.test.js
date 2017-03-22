// @flow

import { html } from 'js-beautify';
import { Component } from '../src';
import initialTree from './__fixtures__/initialTree';

describe('filetree', () => {
  let component;
  beforeEach(() => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    component = new Component(document, mountPoint, initialTree);
    component.start();
  });

  it('should work', () => {
    expect(html(document.body.innerHTML)).toMatchSnapshot();
  });

  it('should work', () => {
    console.log(document.body.innerHTML);
  });
});
