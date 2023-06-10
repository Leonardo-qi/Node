document.querySelector('#btn').addEventListener('click', () => {
  var fileName = document.getElementById('fileName').value
  var value = document.getElementById('value').value

  // 通过出发预加载的方法来实现调用🐷进程方法
  myApi.handleSend({
    fileName,
    value,
  })
})
