const express = require('express')
const http = require('http')
const bodyParse = require('body-parser')
const cookieParse = require('cookie-parser')


const app = express()
let port = 8888

// 通过 require 引用中间件模块
// let auth = require('./middleware/auth.js')
// app.use(auth)


// parse request body and cookie in request.headers
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: true}))
app.use(cookieParse())

// 定义中间件函数
function mw1(req, res, next) {
    console.log('you got middleware no.1')
    req.duang = 1
    next()
}

function mw2(req, res) {
    console.log('you got middleware no.2')
    console.log(`req.duang: ${req.duang}`)
    console.log('req.body: ', req.body)
    console.log('req.cookies: ', req.cookies)

    res.json(req.body)
}

function errorHandleMW(err, req, res, next) {
    console.log('进入错误处理中间件')
    console.log(err)
    res.end(err)
}

// 绑定中间件
app.use('/', mw1)
app.use(mw2)

// 绑定错误处理中间件
app.use(errorHandleMW)

const server = http.createServer(app)

server.listen(port)
console.log('请访问服务器: http://localhost:8888')

