<template>
  <div class="header">
    <div v-show="isShowSearch">
      <com-search></com-search>
      <router-link :to="{name: 'addMsg'}" class="add-msg" @click="add">+</router-link>
    </div>
    <div class="title" v-show="!isShowSearch">
      <a v-show="isBack" class="back t-icon" @click="goBack"><span
        class="iconfont icon icon-xiangzuojiantou"></span></a>
      <p>{{title}}</p>
    </div>
  </div>
</template>

<script>
  import Search from './search.vue'
//  require('../css/header.scss')
  export default{
    data: function () {
      return {}
    },
    computed: {
      isShowSearch: function () {
        return this.$store.state.comm.indexConf.isSearch
      },
      title: function () {
        return this.$store.state.comm.indexConf.title
      },
      isBack: function () {
        return this.$store.state.comm.indexConf.isBack
      }
    },
    methods: {
      goBack: function () {
        history.go(-1)
      },
      add: function () {
        console.log('ee')
      }
    },
    components: {
      comSearch: Search
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
  .header{
    position: relative;
    top:0;
    width: px2rem(750);
    height:px2rem(100);
    text-align: center;
    box-sizing: border-box;
    line-height: px2rem(100);
    background-color: $bColor;

  .add-msg{
    position: absolute;
    right: .8rem;
    top: 0.001rem;
    font-size: 1.4rem;
    color: white;
  }

  .title{
  p{
    color: #fff;
    text-align: center;
    font-size: px2rem(32);
  }
  }
  .t-icon{
    width:px2rem(50);
    height:px2rem(50);
    display: block;
    top:px2rem(25);
  span{
    width: 100%;
    height: 100%;
    display: block;
    line-height: px2rem(50);
    color: #fff;
  }
  }
  .back{
    position: absolute;
    left: px2rem(20);
  }
  .share{
    position: absolute;
    right: px2rem(20);
  }
  .place{
    position: relative;
    left:0;
    float: left;
    width: px2rem(150);
    line-height: px2rem(100);
    text-align: center;
    color: #fff;
    font-size: px2rem(30);
  }
  }
</style>

