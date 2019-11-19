const Joi = require('joi')
const multiparty = require('multiparty')
const GROUP_NAME = 'richeditor'
const fs = require('fs')
const config = require('../config/index.js')

module.exports = [
    {
        method: 'POST',
        path: `/re/${GROUP_NAME}/upload`,
       /*  handler: async (request, reply) => {
            var form = new multiparty.Form()
            form.parse(request.payload, function(err, fields, files) {
                if (err) {
                    return reply(err)
                } else {
                    upload(files, reply)
                }
            })
        }, */
        config: {
            tags: ['api', GROUP_NAME],
            description: '富文本图片上传',
            auth: false,
            payload: {
                output: 'stream',
                parse: false,
                maxBytes: 1048576 * 10,
            },
            handler: async (request, reply) => {
                var form = new multiparty.Form({ uploadDir: './images' })

                form.parse(request.payload, function(err, fields, files) {
                    /* if (err) {
                        return reply(err)
                    } else {
                        upload(files, reply)
                    } */
                })

                let ret = []

                form.on('file', (name, file, ...rest) => { // 接收到文件参数时，触发file事件
                    console.log(name, file)
                    ret.push(`http://${config.host}:${config.port}/${file.path}`)
                })

                form.on('close', () => {  // 表单数据解析完成，触发close事件
                    console.log('上传完成')

                    reply({
                        errno: 0,
                        data: ret
                    })
                })
            },
        }
    }
]

var upload = function(files, reply) {
    fs.readFile(files.file[0].path, function(err, data) {
        let filename = files.file[0].originalFilename + new Date().getTime()
        console.log(filename)
        fs.writeFile(filename, data, function(err) {
            if (err) {
                return reply(err)
            } else {
                return reply({
                    "errno": 0,
                    "data": [
                        `http://localhost:3456/images/${filename}`
                    ]
                })
            }
        })
    })
}