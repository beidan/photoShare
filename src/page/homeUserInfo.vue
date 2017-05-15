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
        baseUrl:'http://118.89.50.53:9091/filebase',
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
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/homeuserinfo.scss";
</style>
