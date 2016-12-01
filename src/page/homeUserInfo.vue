<template>
  <div class="com-homeuserinfo">
    <ul class="user-link">
      <li class="user-icon">
        <router-link to="#" class="link-box ">
          <span class="txt">头像</span>
          <img :src="baseUrl + memberAvatar">
          <span class="iconfont icon-xiangyoujiantou icon-right"></span>
        </router-link>
      </li>
      <li>
        <router-link to="#" class="link-box">
          <span class="txt">昵称</span>
          <p>{{memberName}}</p>
          <span class="iconfont icon-xiangyoujiantou icon-right"></span>
        </router-link>
      </li>
      <li>
        <router-link to="#" class="link-box">
          <span class="txt">性别</span>
          <p>{{sex}}</p>
          <span class="iconfont icon-xiangyoujiantou icon-right"></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {
        memberAvatar:'',
        memberName:'',
        baseUrl:'',
        sex:''
      }
    },
    created: function () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '个人信息'
      })

      let userMsg = localStorage.getItem('userMsg')

      this.memberAvatar = JSON.parse(userMsg).memberAvatar
      if(JSON.parse(userMsg).memberRole === 1){
        this.sex = '女'
      }else{
        this.sex = '男'
      }
      this.memberName = JSON.parse(userMsg).memberName
      this.baseUrl = 'http://www.sherlochao.com:9091/filebase'
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
  .com-homeuserinfo{
  .user-icon{
    height: px2rem(150);
    line-height: px2rem(150);
  img{
    position: absolute;
    right: px2rem(60);
    width: px2rem(100);
    height: px2rem(100);
    border-radius: 100%;
    top:px2rem(25);
  }

  }
  p{
    position: absolute;
    right: px2rem(60);
    color: #999;
    font-size: px2rem(32);
    top:0;
    line-height: px2rem(90);
  }
  }
</style>
