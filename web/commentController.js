var blogDao = require("../dao/BlogDao")
var tagsDao = require("../dao/TagDao")
var tagBlogMappingDao = require("../dao/TagBlogMappingDao")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")
var url  = require("url")
var CommentDao = require("../dao/CommentDao")
var captcha = require("svg-captcha")
var path = new Map()
function addComment(request,response){
    var params=url.parse(request.url,true).query
    CommentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.userName,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","插入成功",null))
        response.end()
    })
}
path.set("/addComment",addComment)

function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34})
    console.log(img)
    response.writeHead(200)
    response.write(respUtil.writeResult("success","评论成功",img))
    response.end()
}
path.set("/queryRandomCode",queryRandomCode)
module.exports.path = path;