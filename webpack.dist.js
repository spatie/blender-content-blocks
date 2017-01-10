const path = require('path');
const config = Object.assign({}, require('./webpack.base'));

config.context = __dirname;

config.entry = './src/index.js';

config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'blender-content-blocks',
    libraryTarget: 'umd',
};

config.externals = {
    'vue': 'vue',
    'lodash': 'lodash',
    'spatie-dom': 'spatie-dom',
    'blender-media': 'blender-media',
};

module.exports = config;
