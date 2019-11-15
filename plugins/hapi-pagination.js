const hapiPagination = require('hapi-pagination')

const options = {
    query: {

    },
    meta: {
        name: 'meta',
    },
    results: {
        name: 'results'
    },
    reply: {
        paginate: 'paginate'
    },
    routes: {
        include: [
            '/shops', // 店铺列表支持分页特性
            '/shops/{shopId}/goods'
        ],
        exclude: []
    }
}

module.exports = {
    register: hapiPagination,
    options: options
}