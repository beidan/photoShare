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
        <li>
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
          <router-link to="/search/star" class="link-box">
            <span class="iconfont Hui-iconfont-star icon-shoucang"></span>
            <span class="txt">我的收藏</span>
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
        memberId:'',
        memberName:'',
        baseUrl:''
      }
    },
    created: function () {
      if(localStorage.getItem('memberId') === null){
        alert('请先登陆!')
        router.push('login')
      }
      if(localStorage.getItem('userMsg') !== null){
        let userMsg = localStorage.getItem('userMsg')
        this.memberAvatar = JSON.parse(userMsg).memberAvatar
        this.memberId = JSON.parse(userMsg).memberId
        this.memberName = JSON.parse(userMsg).memberName
      }
      this.baseUrl = 'http://www.sherlochao.com:9091/filebase'
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: false,
        isBack: false,
        title: '个人首页'
      })
    },
    methods: {
      logout:function () {
        let memberId = localStorage.getItem('memberId')
        let url = 'http://www.sherlochao.com:9091/photosharing/loginapi/loginout'
        axios.get(url).then(function (res) {
          console.log(res.data.result)
          if(res.data.result === 1){
            localStorage.removeItem('memberId')
            router.push('index')
          }
//        vm.$store.state.reply.comment = vm.resData.comment
        }).catch(function (error) {
          console.log(error)
        })
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
  $ontC:#666;
  @function px2rem($n) {
  @return #{$n/($screen*$font/320)}rem
  }
  .com-home {

  .link-box {
    width: 100%;
    display: block;
    height: 100%;
    position: relative;
  }

  .user-info {
    background-color: #fff;
    padding: px2rem(20);
    box-sizing: border-box;
    height: px2rem(180);

  img {
    border-radius: 100%;
    width: px2rem(120);
    height: px2rem(120);
    float: left;
  }

  p {
    color: #333;
    float: left;
    font-size: px2rem(42);
    padding-left: px2rem(20);
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
  }

  .logout{
    background-color: #f9696c;
    color: white;
    width: 100%;
    outline: none;
    border: none;
    padding: 13px;
    font-size: .8rem;
    margin-top: 5px;
  }

</style>
