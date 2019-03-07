const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//srcDir为当前开发目录(默认:/src)
const srcDir = resolve(process.cwd(), 'src');

module.exports = {
    devtool: false,

    mode: 'production',

    entry: {
        index: ['@babel/polyfill', './src/index.tsx'],
        vendor: ['jquery', 'md5', 'base64', 'common', 'ttfund', 'react', 'react-dom', 'redux', 'react-redux', 'react-router']
    },

    output: {
        path: resolve(process.cwd(), './public'),
        filename: 'dist/js/[name]-[hash:5].min.js',
        chunkFilename: 'dist/js/[name]-[hash:5].min.js',
        publicPath: "./"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            filename: 'index.html',
            //要把script插入到标签里
            inject: 'body',
            chunksSortMode: 'none',
            chunks: ['index', 'vendor', 'runtime']
        }),

        new CheckerPlugin(),

        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd',
            "React": 'react',
            "ReactDOM": 'react-dom',
            "Component": ['react', 'Component'],
            "PropTypes": 'prop-types'
        }),


        //默认添加NODE_ENV为production
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })

    ],

    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]-[local]-[hash:base64:5]',
                        importLoaders: 2,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                }, {
                    loader: "less-loader",
                    options: { sourceMap: true }
                }]
            },
            {
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.(gif|jpg|png|woff|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192 // 图片小于8k就转化为 base64, 或者单独作为文件
                        }
                    }
                ]
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less', '.scss'],
        modules: ['node_modules', 'components', 'views', 'resources', 'plugins', 'libs'],
        alias: {
            'jquery': resolve(srcDir, 'libs/zepto'),
            'md5': resolve(srcDir, 'libs/md5'),
            'base64': resolve(srcDir, 'libs/base64'),

            'common': resolve(srcDir, 'plugins/common'),
            'ttfund': resolve(srcDir, 'plugins/ttfund'),
            'requestmodel': resolve(srcDir, 'plugins/requestmodel'),
            'nativebridge': resolve(srcDir, 'plugins/nativebridge')
        }
    },


    performance: {
        hints: 'warning',
        maxAssetSize: 250000, //单文件超过250k，命令行告警
        maxEntrypointSize: 250000, //首次加载文件总和超过250k，命令行告警
    },

    optimization: {
        minimize: true, //取代 new UglifyJsPlugin(/* ... */)
        providedExports: true,
        usedExports: true,
        //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
        //依赖于optimization.providedExports和optimization.usedExports
        sideEffects: true,
        //取代 new webpack.optimize.ModuleConcatenationPlugin()
        concatenateModules: true,
        //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
        noEmitOnErrors: true,

        minimize: true, //是否进行代码压缩

        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                }
            }
        },

        runtimeChunk: {
            name: "runtime"
        }

    }
};