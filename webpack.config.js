const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
    }
}