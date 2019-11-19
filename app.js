require('env2')('./.env')

const Hapi = require('hapi')

const config = require('./config/index.js')
const pluginHapiSwagger = require('./plugins/hapi-swagger')
const pluginHapiPagination = require('./plugins/hapi-pagination')
const hapiAuthJWT2 = require('hapi-auth-jwt2')
const pluginHapiJWT = require('./plugins/hapi-auth-jwt2')

const route_hello = require('./routes/users.js')
const route_shops = require('./routes/shops.js')
const route_orders = require('./routes/orders.js')
const route_re = require('./routes/richeditor.js')

const server = new Hapi.Server()

// 配置服务器启动 host 与端口
server.connection({
    host: config.host,
    port: config.port
})

const init = async () => {
    await server.register([
        ...pluginHapiSwagger,
        pluginHapiPagination,
        hapiAuthJWT2
    ])

    pluginHapiJWT(server)

    server.route({
        method: 'GET',
        path: '/images/{param*}',
        handler: {
            directory: {
                path: 'images'
            }
        },
        config: {
            auth: false
        }
    })

    server.route([
        ...route_hello,
        ...route_shops,
        ...route_orders,
        ...route_re
    ])

    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init()