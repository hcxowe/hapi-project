const JWT = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const { jwtHeaderDefine } = require('../utils/router-helper')

const GROUP_NAME = 'users'

module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}/createJWT`,
        handler: async (request, reply) => {
            const generateJWT = (jwtInfo) => {
                const payload = {
                    userId: jwtInfo.userId,
                    exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
                }

                return JWT.sign(payload,config.jwtSecret)
            }

            reply(generateJWT({
                userId: 1
            }))
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '用于测试的用户 JWT 签发',
            auth: false // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/getUserId`,
        handler: (request, reply) => {
            reply(request.auth.credentials)
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取用户id',
            validate: {
                ...jwtHeaderDefine // 增加需要 jwt auth 认证的接口 header 校验
            },
        },
    },
]