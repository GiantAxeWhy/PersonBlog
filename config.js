var fs =  require("fs")
var globalConfig = {}
var conf =fs.readFileSync("./server.conf")
var configArr = conf.toString().split("\n")

for(let i = 0 ;i<configArr.length;i++){
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim()
}

console.log('globalConfig',globalConfig)


module.exports = globalConfig;