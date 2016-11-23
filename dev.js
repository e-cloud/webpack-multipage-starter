const webpack = require('webpack')
const config = require('./webpack.config')

webpack(config, function (err, stats) {
	console.log(stats.toString({
            chunks: true,
            colors: true
        }))
})

