export class Print {
  showNoneStyle = {
    display: 'none!important',
    height: '0!important',
    width: '0!important',
    overflow: 'hidden!important'
  };

  constructor() {}

  

  addStyle(name, styleObj) {
    const style = document.createElement('style')
    const strobj = JSON.stringify(styleObj).replace(/,|"/g, function(e) {
      if(e === ',') return ';'
      else if (e === '"') return ''    
    })
    style.innerText = `@media print{${name} ${strobj}}`
    document.head.appendChild(style)
  }

  printElement(el) {
    // 初始化类名
    const hideclass = 'print' + Date.now()
    // 添加 隐藏样式
    this.addStyle('.' + hideclass, this.showNoneStyle)

    // 隐藏其他不相关元素
    document.body.childNodes.forEach(item => {
      if(!item.nodeName.startsWith('#')) {
        item.classList.add(hideclass)
      } else if(item.nodeName === '#text') {
          const span = document.createElement('span')
          span.innerText = item.wholeText
          span.classList.add(hideclass)
          document.body.replaceChild(span, item)
      }
    })

    // 获取要打印的元素
    const ele = document.querySelector(el)

    // 创建 外壳元素并将打印元素加入
    const otherbox = document.createElement('div')
    otherbox.appendChild(ele.cloneNode(true))
    // 将外壳元素添加的文档
    document.body.appendChild(otherbox)


    //当完成或取消后， 复原
    window.onafterprint = function() {
      document.body.removeChild(otherbox)
        document.querySelectorAll('.' + hideclass).forEach(item => {
          item.classList.remove(hideclass)
        })
    }

    
    // 打印
    window.print()
    
  }

}