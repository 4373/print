import {Print} from './print'
import './print.css'

window.onload = function() {
  // Print.printElement('.box')
  const print = new Print()
  // print.setShowNoneStyle({
  //   'height': '100px'
  // })
  print.printElement('.box-item')
}