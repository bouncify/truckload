const webpack = require('webpack'); //to access built-in plugins
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        home: './App/Home.ts',
        admin: './App/Admin/Admin.ts',
        testGrid: './App/Admin/TestGrid.ts'//,
        //orderCentral: './App/OrderCentral/Main.ts'
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            // All font files will be handled here
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'knockout': path.join(__dirname, 'node_modules/knockout/build/output/knockout-latest.js'),
            'kendo' : '@progress/kendo-ui'
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'App_Dist/webpack'),
        libraryTarget: 'var',
        library: 'app'
    },
    plugins: [
        new CleanWebpackPlugin(["./App_Dist"], {
            "verbose": true // Write logs to console.
        }),

        new MiniCssExtractPlugin({
            filename: "../../App/Content/css/compiled-[name].css"
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    stats: { colors: true }
};