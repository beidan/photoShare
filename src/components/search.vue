<template>
  <div class="search">
    <input class="box" v-model="searchValue" placeholder="搜索" type="text"/>
    <span class="icon iconfont icon-sousuo submit" @click="submit"></span>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router/router'

  export default{
    data: function () {
      return {
        searchValue: ''
      }
    },
    methods:{
      submit:function () {
        let context = this
        router.push('/search/sea?s='+context.searchValue)
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
  .search{
    position: relative;
    width: 80%;
    height:px2rem(100);
    margin-left: 50px;
  .box{
    color: white !important;
    position: relative;
    display: block;
    width: 90%;
    height: px2rem(60);
    top:px2rem(20);
    background-color: $bColor*1.5;
    border-radius: px2rem(10);
    font-size: px2rem(28);
    line-height: px2rem(60);
    padding-left: px2rem(32);
    box-sizing: border-box;
    color: #666;
    border:0;

  &::-webkit-input-placeholder{
     color: #fff;
   }
  }
  }
  .submit{
    position: absolute;
    top: .1rem;
    right: 2rem;
    font-weight: bold;
    color: white;
  }
</style>
