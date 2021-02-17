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


        var bid =-1;

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
                var bid =-1;

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
               var name = document.getElementById("comment_name").value;
               var email = document.getElementById("comment_email").value;
               var content = document.getElementById("comment_content").value;
               axios({
                   method:"get",
                   url:"/addComment?bid="+bid+"&parent="+reply+"&userName="+name+"&email="+email+"&content="+content
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