import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置接口地址
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

// css reset  css初始化
import './styles/common.css'
// 引入mui的css文件
import './libs/mui/css/mui.css'
// 引入mui扩展字体的css文件
import './libs/mui/css/icons-extra.css'

// 1.导入mint-ui和其样式文件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 2.安装mint-ui(全局注册所有的组件)
Vue.use(MintUI)

//定义全局过滤器
import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern="YY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

//定义全局评论组件
import comments from './components/comment.vue'
Vue.component('comment',comments)

//定义缩略图
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)
// require('./config') // 表示引入config目录下的 : index.js index.json index.node index

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render函数的作用是将APP组件替换掉#app盒子
  render: h => h(App) 
})
