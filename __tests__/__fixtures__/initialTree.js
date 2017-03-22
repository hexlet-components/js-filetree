export default {
  src: {
    type: 'folder',
    children: {
      adapters: {
        type: 'folder',
        children: {
          'webdav.js': {
            type: 'file',
            content: 'some code',
          },
        },
      },
      'index.js': {
        type: 'file',
        content: '{ name: "example" }',
      },
    },
  },
  'package.json': {
    type: 'file',
    content: '{ name: "example" }',
  },
  'yarn.lock': {
    type: 'file',
    content: 'list of deps',
  },
};
