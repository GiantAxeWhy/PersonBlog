var every_day = new Vue({
    el:'#every_day',
    data:{
        content:"222222"
    },
    computed:{
        getContent:function(){
            return this.content
        }
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryEveryDay"
        }).then(function(resp){
            every_day.content = resp.data.data[0].content
        }).catch(function (resp) {
            console.log("请求失败")
        })
    }
})

var articleList = new Vue({
    el:'#article_list',
    data:{
        page:1,
        pageSize:5,
        articleList:[
        ]
    },
    computed:{
        getPage:function () {
            return function (page,pageSize) {
                axios({
                    method: "get",
                    url:"/queryBlogByPage?page="+(page-1)+"&pageSize="+pageSize
                }).then(function(resp){
                    var result = resp.data.data
                    var list=[]
                    for(let i = 0;i<result.length;i++){
                        var temp={}
                        temp.title=result[i].title;
                        temp.content= result[i].content
                        temp.date = result[i].ctime;
                        temp.views= result[i].views
                        temp.tags = result[i].tags
                        temp.id = result[i].id
                        temp.link = ""+result[i].id
                        list.push(temp)
                    }
                    articleList.articleList =list
                    console.log(resp)

                }).catch(function(resp){
                    console.log("请求错误")
                })
            }
        }
    },
    created:function(){
        this.getPage(this.page,this.pageSize)
    }
})