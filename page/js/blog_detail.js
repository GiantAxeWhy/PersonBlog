var blogDetail = new Vue({
    el:"#blog_detail",
    data:{
        title:"",
        views:"",
        content:"",
        ctime:"",
        tags:""
    },
    computed:{

    },
    created:function(){
        var searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("&"):""


        var bid =-10;

        for(let i =0;i<searchUrlParams.length;i++){

            if(searchUrlParams[i].split("=")[0] =="bid"){
                try{
                    bid =parseInt(searchUrlParams[i].split("=")[1])
                }catch (e) {
                    console.log(e)
                }
            }
        }

        axios({
            method:"get",
            url:"queryBlogById?bid="+bid
        }).then(function(resp){
            console.log(resp)
            result = resp.data.data[0]
            blogDetail.title = result.title
            blogDetail.content = result.content
            blogDetail.ctime = result.ctime
            blogDetail.views = result.views
        }).catch(function(){
            console.log("qingqiushibai1")
        })
    }
})

var sendComment = new Vue({
    el:"#send_comment",
    data:{
        vcode:"",
        rightCode:"",
    },
    computed: {
        sendComment:function(){
            return function(){
                var code = document.getElementById("comment_code").value;
                if(code!=sendComment.rightCode){
                    alert("请输入正确的验证码！")
                    return
                }
                var searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("&"):""
                var bid =-10;

                for(let i =0;i<searchUrlParams.length;i++){

                    if(searchUrlParams[i].split("=")[0] =="bid"){
                        try{
                            bid =parseInt(searchUrlParams[i].split("=")[1])
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
               var reply = document.getElementById("comment_reply").value;
               var replyName = document.getElementById("comment_reply_name").value;
               var name = document.getElementById("comment_name").value;
               var email = document.getElementById("comment_email").value;
               var content = document.getElementById("comment_content").value;
               axios({
                   method:"get",
                   url:"/addComment?bid="+bid+"&parent="+reply+"&userName="+name+"&email="+email+"&content="+content+"&parentName="+replyName
               }).then(function (resp) {
                   console.log(resp)
                   alert("提交成功！")
               })
            }
        },
        changeCode:function () {
            return function () {
                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function (resp) {
                    console.log(resp)
                    sendComment.vcode = resp.data.data.data
                    sendComment.rightCode = resp.data.data.text
                })
            }
        }
    },
    created:function(){
       this.changeCode()
    }
})

var blogComments = new Vue({
    el:"#blog_comments",
    data:{
       total:0,
        comments:[]
    },
    computed: {
        reply:function () {
            return function (commentId,userName) {
                document.getElementById("comment_reply").value = commentId
                document.getElementById("comment_reply_name").value = userName
                location.href="#send_comment"
            }
        }
    },
    created:function () {
        var searchUrlParams = location.search.indexOf("?")>-1?location.search.split("?")[1].split("&"):""
        var bid =-10;

        for(let i =0;i<searchUrlParams.length;i++){

            if(searchUrlParams[i].split("=")[0] =="bid"){
                try{
                    bid =parseInt(searchUrlParams[i].split("=")[1])
                }catch (e) {
                    console.log(e)
                }
            }
        }
            axios({
                method:"get",
                url:"/queryCommentsByBlogId?bid="+bid
            }).then(function (resp) {
                console.log(resp)
                blogComments.comments = resp.data.data
                for(let i =0 ;i<blogComments.comments.length;i++){
                    if(blogComments.comments[i].parent> -1 ){
                        blogComments.comments[i].options="回复@"+blogComments.comments[i].parent_name
                    }
                }
            })
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid="+bid
        }).then(function (resp) {
            console.log(resp)
            blogComments.total = resp.data.data[0].count
        }).catch(function (resp) {
            console.log(resp)
        })
    }

})