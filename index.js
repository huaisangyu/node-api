/*
 * @Description  : 
 * @Author       : Sherlock
 * @Date         : 2026-01-20 14:23:29
 * @LastEditors  : Sherlock
 * @LastEditTime : 2026-01-23 19:07:17
 * @FilePath     : /index.js
 */
const express = require('express')
const app = express()
const port = 3000

/* ------------------------------- 允许跨域，方面前端调用 ------------------------------ */
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next()
})

/* ------------------------------- 用户接口，返回用户数据 ------------------------------ */
app.get('/api/user', (req, res)=>{
    const result = {
        status: 200,
        message: '成功返回用户数据',
        data: {
            age: 18,
            name: '测试家的淮桑榆',
            bobbies: ["编程", "服务器部署"]
        }
    }

    res.json(result)
})

app.listen(port, () => {
    console.log(`服务已启动，访问：http://localhost:${port}/api/user`);
})