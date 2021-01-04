const path = require('path');
const outputPath = path.resolve(__dirname, 'docs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = [
    {
        mode: 'production',
        entry: {
            index: './_dev/ts/index.ts',
            init: './_dev/ts/init.ts',
            hoge: './_dev/ts/index.ts'
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
            style: './_dev/scss/style.scss',
            hoge: './_dev/scss/style.scss',
        },
        output: {
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
                                sourceMap: true,
                                plugins: [
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
            new MiniCssExtractPlugin({filename: '[name].css'}),
            new FixStyleOnlyEntriesPlugin()
        ],
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})]
        }
    }
];
