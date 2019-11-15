const Joi = require('joi')
const GROUP_NAME = 'orders'

module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}`,
        handler: async (request, reply) => {
            reply()
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '创建订单',
            validate: {
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer().description('商品id'),
                            count: Joi.number().integer().description('商品数量')
                        })
                    ).description('商品列表')
                },
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        handler: async (request, reply) => {
            reply()
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '支付某条订单',
            validate: {
                params: {
                    orderId: Joi.string().required().description('订单id')
                }
            }
        }
    }
]