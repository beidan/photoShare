<template>
  <div class="com-list">
    <ul>
      <li class="list-li" v-for="value in doList">
        <div class="user">
          <a :href="route + value.memberId"><img :src="baseUrl + value.memberAvatar" alt=""/></a>
          <div class="name">
            <p>{{value.memberNickname}}</p>
            <p v-if="value.favoriteMemberCreatetime"  class="createtime">{{value.favoriteMemberCreatetime}}</p>
            <p class="createtime"  v-if="value.sharedCreatetime">{{value.sharedCreatetime}}</p>
          </div>
          <router-link :to="{  name: 'article', params: { id: value.sharedId }}" class="btn-d btn-s"  v-if="value.photos">详情</router-link>
        </div>
        <div class="detail" v-if="value.photos">
          <p>{{value.sharedContent}}</p>
          <ul :class="['clearfix','img-box',{r3:value.photos.length>1?true:false}]">
            <li v-for="item in value.photos">
              <img :src="baseUrl + item">
            </li>
          </ul>
          <p class="action">
            <span class="zan" v-bind:class="{ hasZan : !(value.memberIsThumbs-1) }" @click="zan(value.sharedId)"><span class="icon iconfont icon-zans"></span><span>{{value.sumThumbs}}</span></span>
            <span class="kanguo"><span class="icon iconfont icon-kanguos"></span><span>{{value.sharedView}}</span></span>
            <span v-if="canDelet" @click="del(value.sharedId)"><span class="icon iconfont icon-lajixiang"></span></span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'

  let data = {
    doListData: {},
    baseUrl: 'http://118.89.50.53:9091/filebase',
    memberId: localStorage.getItem('memberId'),
    route:'#/search/user?id=',
    user: ''
  }

  export default{
    data: function () {
      return data
    },
    props: ['listData'],
    computed: {
      doList: function () {
        if (this.listData.result === 1) {
          this.doListData = this.listData.data
          return this.doListData
        }
      },
      canDelet:function () {
        if(this.$route.params.types === 'own'){
          return true
        }else{
          return false
        }
      }
    },
    methods: {
      zan:function (id) {
        let url = 'http://118.89.50.53:9091/photosharing/thumbsupapi/thumbsUp'
        let choice,num = event.target.parentNode;
        if(num.classList.contains('hasZan')){
          choice = 2
        }else{
          choice = 1
        }
        axios.get(url, {
          params: {
            sharedId: id,　
            memberId: this.memberId,
            memberNickname:'test',
            choice: choice
          }
        }).then(function (res) {
          if(res.data.result === 1){
            if(choice === 2){
              num.childNodes[1].innerText = parseInt(num.innerText) - parseInt(1)
            }else{
              num.childNodes[1].innerText = parseInt(num.innerText) + parseInt(1)
            }
            num.classList.toggle('hasZan')
          }else{
            alert('请登陆后再操作！')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      del:function (id) {
        let url = 'http://118.89.50.53:9091/photosharing/sharedapi/sharedHide'

        axios.get(url, {
          params: {
            sharedId: id,
            choice: 3
          }
        }).then(function (res) {
          if(res.data.result === 1){
            alert('删除成功！')
            location.reload()
          }else{
            alert('操作失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../static/css/list.scss";
</style>
