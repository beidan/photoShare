<template>
  <div class="center">
    <p @click="dothis">test</p>
    <router-link to="/hot" class="list actived"><p>热门话题</p></router-link>
    <router-link to="/new" class="list"><p>最新动态</p></router-link>
  </div>
</template>

<script>
//  require('../css/index.scss')

  export default{}

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
  .index {
    position: relative;

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
  .btn {
    width: px2rem(100);
    height: px2rem(40);
    display: block;
    margin: 0 auto;
  }
  }



</style>
