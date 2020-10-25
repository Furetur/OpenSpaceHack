module.exports = function override(config) {
    config.module.rules.push({
        test: /\.html$/i,
        loader: 'html-loader',
    })
    return config
}
