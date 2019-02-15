import Vue from 'vue'
import Router from 'vue-router'
// @就是src目录
// import HelloWorld from '@/components/HelloWorld'
import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import shopcarComponent from '../pages/shopcar'
import searchComponent from '../pages/search'
import newsListsComponent from '../pages/newsLists'
import newsInfoComponent from '../pages/newsInfo'
import photoListComponent from '../pages/photoList'
import photoInfoComponent from '../pages/photoInfo'

Vue.use(Router)

export default new Router({
  routes: [ // 路由的匹配规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/search', component: searchComponent },
    { path: '/home/newsLists', component: newsListsComponent },
    { path: '/home/newsInfo/:id', component: newsInfoComponent },
    { path: '/home/photoList', component: photoListComponent },
    { path: '/home/photoInfo/:id', component: photoInfoComponent }
    // {
    //   // 当用户访问 / 目录时  会在App.vue的router-view组件的地方显示HelloWorld组件
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ],
  linkActiveClass: 'mui-active' // 类库
})
