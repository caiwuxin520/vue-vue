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

//安装vue x
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

//页面刚加载时候读取
let car = JSON.parse(localStorage.getItem('car') || "[]")

let store = new Vuex.Store({
  state:{
    car  // {id, price, count, selected}
  },
  mutations:{
    //从购物车添加
    addToCar(state, goodsInfo){
        //1.如果新添加的原来有,只需要添加购买数量,如果没有则需要新添加商品
        let index = state.car.findIndex(item => item.id === goodsInfo.id)

        if(index == -1){
          //表示没有找到相同的
          state.car.push(goodsInfo)
        }else{
          //表示找到了相同的
          state.car[index].count += parseInt(goodsInfo.count)
        }
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    //count加减操作
    updateCount(state,goodsInfo){
      state.car.some(item => {
        if(item.id == goodsInfo.id){
          item.count = goodsInfo.count
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    //删除操作
    removeFromCar(state,id){
      state.car.splice(state.car.findIndex(item => item.id === id),1)
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    //计算总购买数量
    totalCount(state){
      let sum = 0
      state.car.forEach(item => sum += item.count)
      return sum
    },
    //手动创造一个对应id的count
    goodsCount(state){
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      });
      return o
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // render函数的作用是将APP组件替换掉#app盒子
  render: h => h(App) 
})
