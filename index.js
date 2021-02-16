const express= require('express');
var globalConfig = require('./config')
var loader = require("./loader")
const app = new express();
app.use(express.static("./page/"))
app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))
app.post("/editBlog",loader.get("/editBlog"))
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"))

app.listen(globalConfig.port,function (){
    console.log('服务器已启动')
})