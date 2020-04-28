const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("html-webpack-plugin")
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },

            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true}
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkfilename: "[id].css"
        })
    ]
}