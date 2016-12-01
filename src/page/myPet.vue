<template>
  <div class="my-pet">
    <ul class="clearfix">
      <li>

        <img src="/src/images/cc.jpg">
        <p class="p1">名字</p>
        <div class="info">
          <span class="kinds">什么种类</span>
          <span class="ages">1个月</span>
        </div>
        <span class="iconfont icon-xiangyoujiantou icon-right"></span>
      </li>
    </ul>
    <router-link to="/home/mypet/addpet" class="add-pet">添加宠物</router-link>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {}
    },
    created: function () {
      //head的修改
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '我的宠物'
      })
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
  .my-pet{
  ul li{
    position: relative;
    width: 100%;
    float: left;
    height: px2rem(130);
    line-height: px2rem(130);
    background-color: #fff;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: px2rem(20);
  }
  .p1{
    font-size: px2rem(30);
    width: 60%;
    line-height: px2rem(40);
    float: left;
    margin-left: px2rem(20);
  }
  .info{
    position: relative;
    float: left;
    margin-left: px2rem(20);
    margin-top: px2rem(10);
  span{
    font-size: px2rem(26);
    color: #999;
    line-height: 150%;
    float: left;
  }
  span:first-child{
    font-size: px2rem(24);
    border:1px solid $bColor;
    color: $bColor;
    box-sizing: border-box;
    padding: 0 px2rem(10);
    border-radius: px2rem(5);
    margin-right: px2rem(30);
  }
  }
  img{
    position: relative;
    width: px2rem(90);
    height: px2rem(90);
    float: left;
    border-radius:100%;

  }
  .add-pet{
    display: block;
    text-align: center;
    height: px2rem(110);
    line-height: px2rem(110);
    font-size: px2rem(30);
    background-color: #fff;
    color: #666;
  }
  }
</style>
