import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import Win from 'electron-vue-windows'
import electron from 'electron'
import './style/styleYY.scss'
import './style/styleZJ.scss'
import store from './store/index.js'
import Echarts from 'echarts'
// import '../../static/js/charting_library.min.js'
import pro from './assets/js/common.js'
import ElementUI from 'element-ui'
//  import 'jquery'

  // import 'signalr'
  import jq from 'jquery'
  import  '../../node_modules/signalr'

  import  {api,conn} from './assets/js/signalr.js'
import websocket from './store/websocketStore'//引入websocket.js文件
//引入对应的样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//初始化插件，要传入实例化的路由
Win.init(router,{
  freeWindowNum: 2, // 初始空闲窗口数量（选填：默认为1）
  // port: 9080 // 端口号（选填：默认9080）
})
Vue.prototype.$jq = jq 
Vue.prototype.$api = api 
Vue.prototype.$conn = conn
Vue.prototype.$Win =Win
Vue.prototype.$Echarts =Echarts
// Vue.prototype.$pako = pako //解压
Vue.prototype.$pro = pro
Vue.prototype.$electron = electron
Vue.prototype.$subEn = pro.subEn //字符串切割
Vue.prototype.$post = pro.post
Vue.prototype.$initHangqing = pro.initHangqing //初始化行情列表
Vue.prototype.$initChicang = pro.initChicang //初始化持仓列表
Vue.prototype.$initExchange = pro.initExchange //初始化所有汇率
Vue.prototype.$store = store
Vue.prototype.$http = axios
Vue.prototype.$websocket = websocket;
// Vue.prototype.resetSetItem = function (key, newVal) {
//   if (key === 'ycxUserLoginState_QXJF') {
//       // 创建一个StorageEvent事件
//       var newStorageEvent = document.createEvent('StorageEvent');
//       const storage = {
//           setItem: function (k, val) {
//               localStorage.setItem(k, val);
//               // 初始化创建的事件
//               newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
//               // 派发对象
//               window.dispatchEvent(newStorageEvent)
//           }
//       }
//       return storage.setItem(key, newVal);
//   }
// }


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')



