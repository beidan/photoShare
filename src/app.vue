<template>
  <div class="com-app">
    <com-header></com-header>
    <img src="static/images/03.jpg" v-if="isNav" alt="">
    <div class="center" v-if="isNav">
      <a href="#/index" class="list" types="fresh" v-bind:class="{ actived: isActive }"
         @click="toggle('fresh')"><p>
        最新动态</p></a>
      <a href="#/search/hot" class="list" types="hot" v-bind:class="{ actived: !isActive }"
         @click="toggle('hot')"><p>
        热门话题</p></a>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <com-footer v-show="isFooter"></com-footer>
  </div>
</template>
<script>
  import Header from './components/header'
  import Footer from './components/footer'
  import Index from './page/index'
  export default{
    data: function () {
      return {
        transitionName: 'slide-left',
        isActive: ''
      }
    },
    created: function () {
      if (this.$route.name === undefined) {
        this.$router.push('/index')
      }
      if(this.$route.name === 'index'){
        this.isActive = true
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    computed: {
      isFooter: function () {
        return this.$store.state.comm.indexConf.isFooter
      },
      isNav: function () {
        let type = this.$route.name
        if (this.$route.path === '/search/hot' || this.$route.path === '/search/fresh' || type === 'index') {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      comHeader: Header,
      comFooter: Footer,
      comIndex: Index
    },
    methods: {
      toggle: function () {
        let node = event.target,types

        if (node.attributes.class) {
          types = node.attributes.class.value
        } else if (node.parentNode.attributes.class) {
          types = node.parentNode.attributes.class.value
        }
        if (types === 'list') {
          this.isActive = !this.isActive
        }
      }
    }
  }
</script>
<style lang="scss">
  /*基础font-size*/
  $font:16;
  /*设计稿宽度*/
  $screen:750;
  /*主色*/
  $bColor: #f9696c;
  $fontC:#666;
  @function px2rem($n){
  @return #{$n/($screen*$font/320)}rem
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .child-view {
    position: absolute;
    width: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
  .com-app{
    position: relative;
  }

  .center {
    display: flex;
    margin-top: px2rem(20);
    justify-content: center;
    align-items: center;
    background-color: #fff;
  .actived {
  p {
    color: $bColor !important;
  }
  }
  .list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: px2rem(20) 0;
  p {
    text-align: center;
    color: $fontC;
    font-size: px2rem(30);
  }
  span {
    display: block;
    margin: 0 auto;
    font-size: px2rem(60);
    line-height: px2rem(60);
  }
  }
  }
  html,body{
    width: 100%;
    overflow-x:hidden;
    min-width: 320px;
    height:100%;
    background-color:#f4f4f4;
  .iconfont{
    font-size: px2rem(36);
  }
  }

  .btn-s{
    display: block;
    background-color: #6ac577;
    width: px2rem(100);
    height: px2rem(50);
    line-height:px2rem(50);
    text-align: center;
    color: #fff;
    font-size: px2rem(22);
    border-radius: px2rem(8);
  }
  .btn-b{
    display: block;
    background-color: $bColor;
    width: 90%;
    height: px2rem(80);
    line-height:px2rem(80);
    text-align: center;
    color: #fff;
    font-size: px2rem(32);
    border-radius: px2rem(8);
    margin: 0 auto;
  }
  time{
    color: #999;
    font-size: px2rem(20);
    line-height: px2rem(20);
  }
  .user-link{
    position:relative;
    margin-top: px2rem(20);
    background-color:#fff;
  li{
    position:relative;
    height: px2rem(90);
    line-height: px2rem(90);
    padding: 0 px2rem(20);
    border-bottom:1px solid #eee;
    box-sizing: border-box;
  a{
    position: relative;
    display: block;
  }
  }
  .Hui-iconfont-yiguanzhu{
    color: #5197f9;
  }
  .Hui-iconfont-feedback1{
    color: #f9616d;
  }
  .Hui-iconfont-star{
    color: #ffd256;
  }
  .Hui-iconfont-comment{
    color: #90883c;
  }
  .txt{
    color: #333;
    font-size: px2rem(32);
  }

  }
  .icon-right {
    position: absolute;
    right: px2rem(20);
    top: 50%;
    margin-top: px2rem(-15);
    font-size: px2rem(30);
    line-height: px2rem(30);
    color: #999;
  }

</style>
