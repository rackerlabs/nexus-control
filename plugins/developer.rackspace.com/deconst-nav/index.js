module.exports = {
    templateFilters: [
        require('./filters/add-scroll-indicators'),
        require('./filters/limit-list-depth'),
        require('./filters/prune-root'),
        require('./filters/remove-anchor-links'),
        require('./filters/unwrap')
    ]
};
