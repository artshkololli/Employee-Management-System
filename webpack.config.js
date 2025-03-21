const path= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true, // Clean the output directory before emit
    },
    module: {
        rules: [
            {
                test: /\.CSS$/,
                use: ['style-loader', 'css-loader'] // Loaders to handle CSS files
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    targets: "defaults",
                    presets: [
                      ['@babel/preset-env']
                    ]
                  }
                }
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template HTML file
            filename: 'index.html', // Output HTML file
            chunks: ['index'] // Include only the 'index' chunk
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html', // Template HTML file
            filename: 'about.html', // Output HTML file
            chunks: ['about'] // Include only the 'about' chunk
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve files from the 'dist' directory
        },
        compress: true, // Enable gzip compression
        port: 3002, // Specify the port number
        open: true, // Automatically open the browser
        hot: true, // Enable Hot Module Replacement
    },
    mode: 'development', // Set the mode to development
    
}