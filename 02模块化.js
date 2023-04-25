/**
 * 注：使用node时版本13.3.0以上也可以用import导入，旧版只能使用require 
 *      
 *     Node.js遵循的是CommonJS模块化规范
 * 
 * 
 * 1、require                                   注：require加载模块会执行加载模块的代码
 * 
 * 2、Node.js中的模块化作用域                    模块中定义的数据无法再模块外访问，不像引入js文件可以全局访问 
 * 
 * 3、module.exports                            向外暴露模块中内容，简写exports，module.exports === exports
 *   
 *      误区：
 *              导入的始终以module.exports的对象为准  如：module.exports = {name:'zhangsan'}
 *                                                      exports.userage = 25
 *                                                      输出    {name:'zhangsan'}
 */ 

