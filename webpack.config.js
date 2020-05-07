const path = require('path');
const outputPath = path.resolve(__dirname, 'docs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [
    {
        mode: 'production',

        entry: {
            index: './_dev/ts/index.ts'
        },

        devServer: {
            contentBase: outputPath,
            inline: true,
            open: true
        },

        output: {
            filename: '[name].js',
            path: `${__dirname}/docs/shared/js`
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                }
            ]
        },
        resolve: {
            extensions: [
                '.ts', '.js'
            ]
        }
    },
    {
        mode: 'production',
        entry: {
            style: './_dev/scss/style.scss'
        },
        output: {
            filename: 'dist.txt',
            path: `${__dirname}/docs/shared/css`
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {
                            loader: 'postcss-loader',
                            options: {
                                // PostCSS側でもソースマップを有効にする
                                sourceMap: true,
                                plugins: [
                                    /*
                                     * Autoprefixerを有効化
                                     * ベンダープレフィックスを自動付与する
                                     */
                                    require('autoprefixer')({
                                        grid: true
                                    })
                                ]
                            }
                        },
                        {loader: 'sass-loader'}
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({filename: '[name].css'})
        ],
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})]
        }
    }
];
