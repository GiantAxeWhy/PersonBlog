var randomTags = new Vue ({
    el:"#random_tags",
    data:{
        tags:["asd","wer" ,"aqr","fsdgs","qrfqr","fgdfge","utyiyi","ddvg","tewrwqer","eqwe"]
    },
    computed:{
        randomColor:function () {
            return function () {
                var red =Math.random()*255;
                var green =Math.random()*255;
                var blue = Math.random()*255;
                return "rgb("+red+","+green+","+blue+")";

            }
        },
        randomSize:function () {
            return function () {
                var size = (Math.random()*20+12)+"px"
                return size
            }
        }
    },

})


var newHot = new Vue ({
    el:"#new_hot",
    data:{
        titleList:[
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接2",link:"http://www.baidu.com"},
            {title:"这是一个链接3",link:"http://www.baidu.com"},
            {title:"这是一个链接4",link:"http://www.baidu.com"},
            {title:"这是一个链接5",link:"http://www.baidu.com"},
            {title:"这是一个链接6",link:"http://www.baidu.com"},

        ]
    }

})

var newComments=new Vue({
    el:"#new_comments",
    data:{
        commentList:[
            {name:"用户名1",date:'2010-10-01',comment:"这里是一大串评论"},
            {name:"用户名1",date:'2010-10-01',comment:"这里是一大串评论"},
            {name:"用户名1",date:'2010-10-01',comment:"这里是一大串评论"},
            {name:"用户名1",date:'2010-10-01',comment:"这里是一大串评论"},
            {name:"用户名1",date:'2010-10-01',comment:"这里是一大串评论"},
            {name:"用户名1",date:'2010-10-01',comment:"这里是一大串评论"},
        ]
    }

})