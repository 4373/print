export class Print {
  constructor() {}



  static printElement(el, style) {
    const ele = document.querySelector(el)
    const otherbox = document.createElement('div')
    otherbox.classList.add('print-box')
    otherbox.appendChild(ele)
    document.body.childNodes.forEach(item => {
      // console.log(item.classList)
      if(item.nodeName !== '#text') {
        item.classList.add('hide')
      }
    })
    document.body.appendChild(otherbox)
  }

}