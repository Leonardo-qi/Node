// fs模块       fs对文件进行读写        api:    readFile(读取文件)、writeFile(写入文件)
const fs = require('fs')

// __dirname    注：在读取文件路径时要使用 path.jion(__dirname,'路径')，__dirname不会出现错误始终是当前目录路径

// path模块     path对路径的处理        api:    join(拼接路径)、basename(获取文件名/可配置去掉扩展名)、extname(获取文件扩展名)
const path = require('path')