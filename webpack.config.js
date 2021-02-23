const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    todo: './practice/todo-list/index.js',
  },
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'public'),
  }
};