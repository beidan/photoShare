<template>
  <div class="com-home">
    <div class="user-info clearfix">
      <router-link to="/homeUserInfo/123" class="link-box clearfix">
        <img :src="baseUrl + memberAvatar">
        <p>{{memberName}}</p>
        <span class="iconfont icon-xiangyoujiantou icon-right"></span>
      </router-link>
    </div>
    <div class="user-link">
      <ul>
        <li v-if="isAdmin">
          <router-link to="/admin" class="link-box">
            <span class="icon iconfont icon-shezhi"></span>
            <span class="txt">管理页面</span>
            <span class="iconfont icon-xiangyoujiantou icon-right "></span>
          </router-link>
        </li>
        <li>
          <router-link to="/search/own" class="link-box">
            <span class="iconfont Hui-iconfont-feedback1 icon-detail"></span>
            <span class="txt">我的圈子</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="examlist" class="link-box">
            <span class="iconfont Hui-iconfont-feedback1 icon-detail"></span>
            <span class="txt">我的试卷</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="course" class="link-box">
            <span class="iconfont Hui-iconfont-feedback1 icon-detail"></span>
            <span class="txt">我的课程</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/search/star" class="link-box">
            <span class="iconfont Hui-iconfont-star icon-shoucang"></span>
            <span class="txt">我的收藏</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/search/userStar" class="link-box">
            <span class="iconfont Hui-iconfont-star icon-shoucang"></span>
            <span class="txt">用户收藏</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/modif" class="link-box">
            <span class="icon iconfont icon-yijianfankui"></span>
            <span class="txt">修改密码</span>
            <span class="iconfont icon-xiangyoujiantou icon-right "></span>
          </router-link>
        </li>
      </ul>
    </div>
    <button class="logout" @click="logout">退出登陆</button>
  </div>
</template>
<script>
  import axios from 'axios'
  import router from '../router/router'

  export default{
    data: function () {
      return {
        id: 1,
        memberAvatar:'',
        memberName:'',
        role: '',
        baseUrl: this.$store.state.comm.imgUrl,
        isAdmin: false
      }
    },
    created: function () {
      let userMsg = localStorage.getItem('userMsg')
      this.role = JSON.parse(userMsg).memberRole
      this.memberAvatar = JSON.parse(userMsg).memberAvatar
      this.memberName = JSON.parse(userMsg).memberName
      if(this.role === 3){
        this.isAdmin = true
      }
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: false,
        isBack: false,
        title: '个人首页'
      })
    },
    methods: {
      logout:function () {
        let vm = this
        let url = vm.$store.state.comm.apiUrl + 'loginapi/loginout'
        axios.get(url).then(function (res) {
          console.log(res.data.result)
          if(res.data.result === 1){
            vm.$store.commit('logout')
            router.push('index/fresh')
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    computed:{}
  }
</script>
<style lang="scss">
  @import "../../static/css/home.scss";
</style>
