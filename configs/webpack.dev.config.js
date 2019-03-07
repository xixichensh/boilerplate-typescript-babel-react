const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//srcDir为当前开发目录(默认:/src)
const srcDir = resolve(process.cwd(), 'src');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    mode: 'development',

    entry: {
        index: ['./src/index.tsx', 'react-hot-loader/patch', 'webpack-dev-server/client?http://0.0.0.0:3121', 'webpack/hot/only-dev-server']
    },

    output: {
        path: resolve(process.cwd(), 'assets'),//打包后的文件存放的地方
        filename: 'dist/js/[name].js', //打包后输出文件的文件名
        publicPath: "/",
        pathinfo: true //输入代码添加额外的路径注释，提高代码可读性
    },

    devServer: {
        hot: true, // enable HMR on the server
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['index'],
            chunksSortMode: 'none',
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(), // enable HMR globally

        new CheckerPlugin(),

        new webpack.ProvidePlugin({
            "React": 'react',
            "ReactDOM": 'react-dom',
            "Component": ['react', 'Component'],
            "PropTypes": 'prop-types'
        }),

        //默认添加NODE_ENV为development
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })

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
            'base64': resolve(srcDir, 'libs/base64')
        }
    },

    performance: {
        hints: false,
    },

    //开发环境下默认启用cache，在内存中对已经构建的部分进行缓存
    //避免其他模块修改，但是该模块未修改时候，重新构建，能够更快的进行增量构建
    //属于空间换时间的做法
    cache: true,

    optimization: {
        namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
        namedChunks: true,
        minimize: false
    }
};