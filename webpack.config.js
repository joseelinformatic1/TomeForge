const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  mode: 'production',
  externalsPresets: { node: true }, //  Indica que estamos construyendo para Node.js
  module: {
    rules: [
      {
        test: /\.node$/, //  Regla para archivos .node
        loader: 'node-loader', //  Usa node-loader para empaquetar archivos .node
      },
    ],
  },
};