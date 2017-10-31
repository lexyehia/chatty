let common = {
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    }
}

let frontend = {
    entry: [
        './client/src/index.tsx'
    ],
    output: {
        filename: 'bundle.js',
        path: './client/dist',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
}

let backend = {
    entry: [
        './server/src/app.ts'
    ],
    output: {
        filename: 'www',
        path: './server/bin',
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
}

module.exports = [
    Object.assign({}, common, frontend),
    Object.assign({}, common, backend)
]