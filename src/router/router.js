import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../app'
import Index from '../page/index'
import Home from '../page/home'
import Article from '../page/article'
import HomeUserInfo from '../page/homeUserInfo'
import AddMsg from '../page/addMsg'
import SearchResult from '../page/reasonList'
import Login from '../page/login'
import Register from '../page/register'
import Modifi from '../page/modifiPsw'
import Admin from '../page/admin'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '/index/:type', name: 'index', component: Index},
      {path: '/home', name: 'home', component: Home},
      {path: '/HomeUserInfo/:uid', name: 'homeUserInfo', component: HomeUserInfo},
      {path: '/article/:id', name: 'article', component: Article},
      {path: '/addmsg', name: 'addMsg', component: AddMsg},
      {path: '/search/:types', name: 'searchresult', component: SearchResult},
      {path: '/login', name: 'login', component: Login},
      {path: '/register', name: 'register', component: Register},
      {path: '/modif', name: 'Modifi', component: Modifi},
      {path: '/admin', name: 'Admin', component: Admin},
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  history: true
})
router.beforeEach(function (to,from,next) {
  var userMsg = localStorage.getItem('userMsg')
  if(to.path === '/home'){
    if(!userMsg){
      next({ path: '/login' })
    }
  }
  next()
})
export default router
