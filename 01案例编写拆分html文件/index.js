const { log } = require('console')
const fs = require('fs')
const path = require('path')

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, '/index.html'), 'utf-8', (err, dataStr) => {
    if (err) return
    let cssStr = regStyle.exec(dataStr)[0]
    let jsStr = regScript.exec(dataStr)[0]
    resetCss(cssStr)
    resetJs(jsStr)
    resetHtml(dataStr,cssStr,jsStr)
})

function resetCss(cssStr) {
    let newCss = cssStr.replace('<style>', '').replace('</style>', '')
    writeFn('./case/index.css',newCss,'Css')
}

function resetJs(jsStr) {
    let newJs = jsStr.replace('<script>', '').replace('</script>', '')
    writeFn('./case/index.js',newJs,'Js')
}

function resetHtml(dataStr,cssStr,jsStr) {
    let data = dataStr.replace(cssStr, '<link rel="stylesheet" href="./index.css">').replace(jsStr, '<script src="./index.js"></script>')
    writeFn('./case/index.html',data,'Html')
}

function writeFn(url, data, name) {
    fs.writeFile(path.join(__dirname, url), data, (err) => {
        if (err) return console.log('写入' + name + '页面失败：' + err.message);
        console.log(name + '写入成功');
    })
}