var blogDao = require("../dao/BlogDao")
var tagsDao = require("../dao/TagDao")
var tagBlogMappingDao = require("../dao/TagBlogMappingDao")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/RespUtil")
var url  = require("url")

var path = new Map()
function queryRandomTags(request,response) {
    tagsDao.queryAllTag(function(result){
        result.sort(function () {
            return Math.random() - 0.5
        })
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()

    })
}
path.set("/queryRandomTags",queryRandomTags)

function querybyTag(request,response){
    var params = url.parse(request.url,true).query

    tagsDao.queryTag(params.tag,function(result){
        if(result == null|| result.length==0){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功",result))
            response.end()
        }else{
            tagBlogMappingDao.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize),function (result) {

                let blogList=[]
                for(let i =0;i<result.length;i++){
                    blogDao.queryBlogById(result[i].blog_id,function (result) {

                        blogList.push(result[0])
                    })
                }
                getResult(blogList,result.length,response )
               /* while(true){
                    if(blogList.length === result.length){
                        break
                    }
                }*/

            })
        }

    })

}
path.set("/querybyTag",querybyTag)

function getResult(blogList,len,response){
    if(blogList.length<len){
        setTimeout(function (){
            getResult(blogList,len,response)
        },10)
    }else{
        for(let i =0;i<blogList.length;i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/,"" );
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g,"" );
            blogList[i].content = blogList[i].content.substring(0,300);
        }
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",blogList))
        response.end()
    }
}

function querybyTagCount(request,response){
    var params = url.parse(request.url,true).query

    tagsDao.queryTag(params.tag,function(result){
        tagBlogMappingDao.queryByTagCount(result[0].id,function (result) {
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功",result))
            response.end()
        })

    })

}
path.set("/querybyTagCount",querybyTagCount)

module.exports.path = path
