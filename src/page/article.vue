<template>
  <div>
    <div class="com-article">
      <div class="user">
        <img :src="baseUrl + resData.memberAvatar" alt=""/>
        <div class="name">
          <p>{{resData.memberNickname}}</p>
          <time>{{resData.sharedCreatetime}}</time>
        </div>
      </div>
      <div class="imgbox">
        <img :src="baseUrl + resData.photos[0]">
      </div>
      <div class="art-detail">
        <p> {{resData.sharedContent}}</p>
      </div>
      <p class="operate">
        <span class="zan" v-bind:class="{ hasZan : !(resData.memberIsThumbs-1) }" @click="zan(resData.sharedId)"><span class="icon iconfont icon-zans"></span><span>{{resData.thumbUps.length}}</span></span>
        <span class="kanguo"><span class="icon iconfont icon-kanguos"></span><span>{{resData.sharedView}}</span></span>
        <span class="star" @click="star(resData.memberId)"  v-bind:class="{ hasZan : !(resData.memberIsFavShared-1) }"><span class="icon iconfont icon-jushoucang"></span> 收藏</span>
      </p>
      <p class="starList" v-for="value in resData.thumbUps">
        <span>{{value.memberNickname}},</span>
      </p>
      <com-comment></com-comment>
    </div>
    <com-reply v-on:submit="handleSubmit"></com-reply>
  </div>
</template>


<script>
  import Comment from '../components/comment.vue'
  import Reply from '../components/reply'
  import axios from 'axios'
  export default {
    data: function () {
      return {
        content: null,
        resData: {},
        baseUrl: 'http://www.sherlochao.com:9091/filebase',
        memberId: localStorage.getItem('memberId')
      }
    },
    created: function () {
      let vm = this
      vm.$store.commit('isLoading', true)
      vm.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: true,
        title: '详情页'
      })
      let id = this.$route.params.id

      this.$store.state.reply.articleId = id

      let url = 'http://www.sherlochao.com:9091/photosharing/sharedapi/viewShared'
      let memberId = localStorage.getItem('memberId')

      axios.get(url, {
        params: {
          sharedId: id,
          memberId: memberId
        }
      }).then(function (res) {
        if(res.data.result === 1){
          vm.resData = res.data.data[0]
          vm.$store.state.reply.comment = vm.resData.comments
          vm.$store.commit('isLoading', false)
        }
//        vm.$store.state.reply.comment = vm.resData.comment
      }).catch(function (error) {
        console.log(error)
      })
//        vm.$store.state.reply.comment = vm.resData.comment
    },
    components: {
      comComment: Comment,
      comReply: Reply
    },
    methods: {
      handleSubmit: function (val) {
        console.log('eee')
        this.content = val
      },
      zan:function (id) {
        let url = 'http://www.sherlochao.com:9091/photosharing/thumbsupapi/thumbsUp'
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
      star: function (sid,mid) {
        let url = 'http://www.sherlochao.com:9091/photosharing/favoritesapi/collect'
        let choice,num = event.target;
        console.log(num)
        console.log(num)
        console.log(num.classList.contains('hasZan'))



        if(num.classList.contains('hasZan')){
          //1是收藏
          choice = 1
        }else{
          choice = 2
        }
        axios.get(url, {
          params: {
            type: 2,
            choice: choice,
            memberId: this.memberId,
            id: sid,
            colMemberId: mid
          }
        }).then(function (res) {
          if(res.data.result === 1){
            num.classList.toggle('hasZan')
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
  .com-article{
    position: relative;
    background-color: #f4f4f4;
    margin-bottom: px2rem(120);
  .box{
    position: relative;
  }
  .imgbox{
  img{
    width: 100%;
    height: px2rem(400);
  }
  }
  .art-detail{
    position: relative;
    margin-top: px2rem(20);
    background-color: #fff;
    padding:  px2rem(15);
    box-sizing: border-box;
  }

  .user{
    position: relative;
    height: px2rem(120);
    background-color: #fff;
  time{
    position: absolute;
    right: px2rem(15);
    bottom:px2rem(15);
  }
  img{
    display: block;
    width: px2rem(100);
    height: px2rem(100);
    margin:px2rem(10) 0 0 px2rem(10);
    border-radius: 100%;
    float: left;
  }
  .name{
    width: px2rem(400);
    float: left;
    margin-left: px2rem(20);
  p{
    padding-top: px2rem(15);
    line-height: 2.3rem;
    color: #333;
    font-size: px2rem(30);
  }

  }
  .tag{
    position: relative;
    top:0;
    width: 100%;
  span{
    display: inline-block;
    width: px2rem(60);
    height: px2rem(30);
    line-height: px2rem(30);
    font-size: px2rem(14);
    text-align: center;
    border:1px solid $bColor;
    background-color: #fff;
    border-radius: px2rem(5);
    color: $bColor;
    margin-right: px2rem(10);
  }
  }
  .btn-d{
    position: absolute;
    right: px2rem(15);

    top:px2rem(25);
  }
  }
  }
  .operate{
    font-size: .8rem;
    padding: 5px 10px;
    background-color: white;
    margin-top: .2rem;
    color: gray;
  }
  .zan{
    padding-right: 1.4rem;

  span{
    padding: 0 .1rem;
  }
  }
  .hasZan{
  span:first-child{
    color: #f9696c;
  }
  }
  .kanguo{
    margin-right: 25px;
  span{
    padding: 0 .1rem;
  }
  }
  .starList{
    background-color: white;
    margin-top: 1px;
    padding: 5px 10px;
    font-size: 0.7rem;
    color: #f9696c;
  }
</style>
