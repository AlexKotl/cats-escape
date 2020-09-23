var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackFreeTexPacker = require('webpack-free-tex-packer');

module.exports = env => {
    var definePlugin = new webpack.DefinePlugin({
        WEBGL_RENDERER: true,
        CANVAS_RENDERER: false,
        LEVEL_EDITOR: env ? (env.LEVEL_EDITOR || false) : false,
    });

    return {
        entry: {
            index: [
                'babel-polyfill',
                path.resolve(__dirname, 'src/index.js')
            ],
            vendor: ['phaser']
        },
        mode: 'development',
        devtool: 'source-map',
        output: {
            pathinfo: true,
            path: path.resolve(__dirname, 'public'),
            filename: '[name].js'
        },
        watch: true,
        plugins: [
            definePlugin,
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: './src/index.html',
                chunks: ['vendor', 'index'],
                chunksSortMode: 'manual',
                minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
                },
                hash: false
            }),
            new BrowserSyncPlugin({
                host: process.env.IP || 'localhost',
                port: process.env.PORT || 3000,
                server: {
                baseDir: "./public"
                }
            }),
            new CopyPlugin([
                { from: './assets/sounds', to: './assets/sounds' },
                { from: './assets/sprites', to: './assets/sprites' },
                { from: './assets/fonts', to: './assets/fonts' },
            ]),
            // new WebpackFreeTexPacker(path.resolve(__dirname, 'assets/tiles'), 'assets', {
            //     textureName: 'tilemap',
            //     removeFileExtension: true,
            //     prependFolderName: false,
            // }),
        ],
        module: {
            rules: [
                { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
                { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
            ]
        }
    }
}