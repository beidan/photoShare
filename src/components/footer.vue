<template>
  <div class="footer">
    <div>
      <router-link to="/index"><span class="icon-shouye iconfont "></span>
        <p>首页</p></router-link>
      <router-link to="/home"><span class="icon-myline iconfont "></span>
        <p>个人</p></router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {}
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
  .footer{
    position: fixed;
    bottom:0;
    left: 0;
    z-index: 100;
    width: 100%;
    height:px2rem(100);
    background-color: #f4f4f4;
  div{
    position: relative;
    border-top:1px solid #ddd;
  }
  a{
    position: relative;
    height: px2rem(100);
    display: block;
    float:left;
    width:50%;
    text-align: center;
    box-sizing: border-box;
  span{
    display: block;
    margin:  px2rem(10) auto 0;
    width: px2rem(40);
    height:px2rem(40);
    font-size: px2rem(40);
    color: #999;
  }
  p{
    color:#999;
    font-size:px2rem(22);
  }
  &.active {
  span,p{
    color: $bColor
  }

  }
  }
  }
</style>
