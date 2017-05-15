#vue

### 运行方式
1. 在根目录下 npm install  下载依赖
2. npm run dev 

## 整体项目采用  vue +  vue-router +  vuex （传说中的vue 全家桶 ），构建工具使用尤大大推出的vue-cli

## vue-cli构建工具必知 

我选用的vue-cli 是基于webpack的版本 ，不了解webpack的可以先粗略看下下面的基本知识

 
webpack 基本知识点：

- entry：入口点，webpack会从入口点设置的js文件开始对项目进行构建，过程中，所有入口点通过import或者require依赖的包，都会被打包到output中制定的文件和路径；

- output：中设置打包好的文件的输出路径还有文件名；

- module：主要是loaders，loaders是webpack进行打包的解析器，css、vue、babel、scss都需要用npm安装相应的loader，webpack才能对该格式的文件进行解析和处理；

- plugins：是一些webpack的打包插件，跟解析的语言无关，用来辅助构建，提供丰富的附加功能。

 

2. vue-cli 安装

1. 首先，安装 vue-cli。(确保你有 node 和 npm)
```
npm i -g vue-cli
```

2. 创建一个 webpack 项目并且下载依赖
```
vue init webpack demo
cd demo
npm i
```

3. 运行

```
npm run dev    //npm run xxx 是执行配置在package.json中的脚本，e.g: 它会去找到package.json的scripts对象，执行node bulid/dev-server.js
```

4. 构建
```
npm run build   //运行结束后，在当前目录下会在生成 dist 目录，将dist目录放在服务器上，使用服务器上访问index.html的url即可
若打包之后，项目的静态文件出现引用路径问题，可于项目目录 config/index.js 修改以下数据
module.exports = {
 build:{
     assetsSubDirectory: 'static',  //修改这里成你项目放置静态文件的目录
    assetsPublicPath: './',     //修改这里成你项目放置静态文件的目录
}
}
```
在静态文件 index.html 文件下， 引用静态文件

```
<link rel="stylesheet" href="static/css/icon/iconfont.css"/>
```

3. vue支持scss 配置

1. 安装以下模块
```
npm install node-sass --save-dev
npm install sass-loader --save-dev   //--save-dev 会将该依赖写入package.json，方便别人安装依赖
```

2. 打开webpack.base.config.js在loaders里面加上
```
{
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
 }
```

3. 在需要用到scss的地方写上
```
<style lang="scss"> </style>
```

##  项目整体架构 

1. 项目整体目录如下

```
 --build   
 --config  
 --dist   //npm run build 之后再生成的目录
 --src  
   --components   // 用于存放组件
   --page    //页面组件，由vue-router引入
   --router  //路由
   --store   // 数据流管理
   main.js   //入口文件
   app.vue   //主组件 
 --static   //静态文件目录
 .babelrc    
 .gitignore  //git忽略上传文件
 index.html  //静态文件入口
 package.json
```

2. main.js
入口文件，主要作用是初始化vue实例并使用需要的插件

```
  import Vue from 'vue'
  import router from './router/router'
  import store from './store/store'
  
  Vue.config.debug = true  //开启debug模式
  window.log = console.log
  let data = {
    router,
   store
}
 new Vue(data).$mount('#app')    //创建一个app实例，并且挂载到选择符#app匹配的元素上   在根目录html里面
```

 挂载到#app ，假如new vue 的时候，有显示的 el 属性
```
let data = {
  el:'#app', 
  router,
  store
}
```
则无须手动挂载到选择符#app匹配的元素上

 

3. app.vue

app.vue是我们的主组件，所有页面都是在App.vue下进行切换的,由于app.vue在所有页面都有，我们将会在app.vue上面写一些初始化全局方法。

考虑到 组件 header，footer，loading动画基本整个项目都会使用到，app.vue代码如下

```
  <template>
    <div class="com-app">
      <com-header></com-header>    
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
      <com-footer v-show="isFooter"></com-footer>
      <com-loading v-show="loading"></com-loading>
   </div>
 </template>
```
由于footer，loading在整个项目中会频繁地改变，故v-show
```
v-if       如果条件为false，它什么也不做，加载速度较快。当条件为真时，v-if 才会真正编译渲染页面结构
v-show 渲染页面结构后，通过 "display:none" 控制元素状态
``` 

4. router    根据不同路由跳转目录,按需加载相应的组件

```
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
       {path: '/admin', name: 'Admin', component: Admin}
     ]
   }
 ]
 const router = new VueRouter({
   routes: routes, // short for routes: routes
   linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
   history: true
 })
```


1.  vue 组件的说明和使用

一个组件实质上是一个拥有预定义选项的一个 Vue 实例
在header组件内部允许外部使用，需要导出属性，有2种导出方法

- 默认导出（不用命名）

```
 export default {
   data () {
     return {
       msg: 'header'
     }
   }
}
```
以上代码实际上会自动生成一个 new vue

在父组件中导入

```
import Header from './components/header'
```
 
2.直接在任何变量或者函数前面加上一个关键字

``` 
export const sqrt = Math.sqrt;
```
在父组件中导入

```
import sqrt from './components/header';
```

引用一个组件  
```
import Header from './components/header'
```
在该组件中定义
```
  export default{
     data: function () {},   //data一定要是返回一个函数
     components: {
       comHeader: Header    //声明组件
     }
}
```
在template中使用
```
 <template>
   <div class="com-app">
     <com-header></com-header>   //注意，html不区分大小写，所以需要将  comHeader 写成 com-header 
   </div>
 </template>
 ```

一个vue对象通常包括下面几个属性
```
 data：      //vue对象的数据
 methods：  //vue对象的方法
 watch：    //对象监听的方法
 computed：  //计算逻辑放到computed中
 created：   //属性已绑定，dom未生成，一般在这里进行ajax处理以及页面初始化处理
 ```

2. vuex

所有的数据流都是单向的，并且actions只能通过分发mutations来修改 store 实例的状态

像一些全局信息通用，比如 header内容的渲染，是否显示，loading 什么时候显示，什么时候隐藏，以及接口api的固定值，都写在store记录组件的state。
```
 const store = new Vuex.Store({
   state: {
     comm: {
       loading: false,  //是否显示loading
       apiUrl: 'photosharing/',  //接口base url
       imgUrl: 'filebase',    //图片base url
       indexConf: {
         isFooter: true, // 是否显示底部
         isSearch: true, // 是否显示搜索
         isBack: false,  // 是否显示返回
         isShare: false, // 是否显示分享
         title: ''   // 标题
       }
     }
   }
 })
```
在mutations中改变state状态

```
 const store = new Vuex.Store({
 mutations: {
     //loading的显示
     isLoading: (state, status) => {
       state.comm.loading = status
     },
     //修改header的信息
     changeIndexConf: (state, data) => {
       Object.assign(state.comm.indexConf, data)
     }
 })
```
e.g 在 header.vue 中 控制是否显示

```
 export default {
     data: function () {
       return {}
     },
     computed: {
       isShowSearch: function () {
         return this.$store.state.comm.indexConf.isSearch   //获取vuex里面 state 状态值
       },
       title: function () {
         return this.$store.state.comm.indexConf.title
       },
       isBack: function () {
         return this.$store.state.comm.indexConf.isBack
       }
     }
 }
```
template代码

```
 <template>
   <div class="header">
     <div v-show="isShowSearch"></div>
     <div class="title" v-show="!isShowSearch">
       <a v-show="isBack" class="back t-icon" @click="goBack"><span
         class="iconfont icon icon-xiangzuojiantou"></span></a>
       <p>{{title}}</p>
     </div>
   </div>
 </template>
```
在其他地方控制 header 是否显示， e.g： 详情页面

```
 export default {   
    created: function () {
       vm.$store.commit('changeIndexConf', {
         isFooter: false,
         isSearch: false,
         isBack: true,
         isShare: true,
         title: '详情页'
       })    
     }
  }
```
  

3.开发实践总结

1. vue-router

由于整个项目list组件很多地方公用，并且‘我的收藏’，‘搜索结果页面’，‘我的圈子’，仅仅只是从  /search/own 到 /search/star
此时，原来的组件实例会被复用，意味着组件的生命周期钩子不会再被调用
解决方法：  复用组件时，想对路由参数的变化作出响应的话，可以简单地 watch（监测变化）  对象

```
 export default {
   watch: {
     '$route' (to, from) {
       // 对路由变化作出响应...
     }
   }
 }
```
 

2. 判断是否登陆

进入个人信息页面，由于需要判断是否已登陆，此时由 router 进行一个拦截，具体代码如下

```
 router.beforeEach(function (to,from,next) {
   var userMsg = localStorage.getItem('userMsg')
   if(to.path === '/home'){
     if(!userMsg){
       next({ path: '/login' })
     }
   }
   next()
 })
```
 

3. 常用api

- 点击事件获取当前对象

event.target ， this为vue 对象

 
- 和jquery类似获取当前dom对象
```
 <input type="submit" disabled="canSubmit" ref="isSubmit" @click="register" value="立即注册" class="button"/>
 this.$refs.isSubmit.removeAttribute('disabled')   //使用this.$refs 获取当前dom
```


#### 更详细的介绍
- 博客地址：
- http://www.cnblogs.com/beidan/p/6129891.html
- http://www.cnblogs.com/beidan/p/vue.html


 
