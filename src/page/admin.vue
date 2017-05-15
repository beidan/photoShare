<template>
  <div class="com-homeuserinfo">
    <ul class="user-link" v-for="value in doList">
      <li class="user-icon">
        <router-link to="#" class="link-box ">
          <span class="txt">
            {{value.memberMobile}}  ({{value.memberNickname}})
            <span class="sex"> {{value.memberRole==2?'女':'男'}} </span>
          </span>
          <img :src="baseUrl + value.memberAvatar">
        </router-link>
      </li>
      <li>
        <router-link to="#" class="forbid">
          <span>{{value.memberCreatetime}}</span>
          <span class="forbidAction">
            <span @click="permit(value.memberId)"> 允许 <span class="icon iconfont icon-wancheng"></span></span>
            <span @click="forbit(value.memberId)"> 禁止 <span class="icon iconfont icon-cuowu"></span></span>
          </span>
          </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'

  export default{
    data: function () {
      return {
        doList:'',
        baseUrl: 'http://118.89.50.53:9091/filebase'
      }
    },
    created: function () {
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '管理页面'
      })
      this.fetchData()
    },
    methods:{
      fetchData:function () {
        let vm = this
        let url = 'http://118.89.50.53:9091/photosharing/administratirapi/listMember'
        axios.get(url).then(function (res) {
          vm.doList = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      forbit:function (id) {
        let url = 'http://118.89.50.53:9091/photosharing/administratirapi/authorityMember'
        axios.get(url,{
          params: {
            memberId: id,
            choice: 2
          }
        }).then(function (res) {
          if(res.data.result === 1){
            alert(res.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      permit:function (id) {
        let url = 'http://118.89.50.53:9091/photosharing/administratirapi/authorityMember'
        axios.get(url,{
          params: {
            memberId: id,
            choice: 1　
          }
        }).then(function (res) {
          if(res.data.result === 1){
            alert(res.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      }

    }
  }
</script>
<style lang="scss">
  @import "../../static/css/admin.scss";
</style>
