<template>
  <div v-show="isComment" class="b-reply">
    <input class="r-input" type="text" :placeholder="reply">
    <span @click="submit">回复</span>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data: function () {
      return {}
    },
    updated: function () {
      document.querySelector('.r-input').value = ''
    },
    computed: {
      isComment: function () {
        return this.$store.state.reply.isComment
      },
      reply: function () {
        if (this.$store.state.reply.name !== '') {
          return '回复 ' + this.$store.state.reply.name
        } else {
          return '评论'
        }
      }
    },
    methods: {
//      提交回复或评论
      submit: function (e) {
        let vm = this
        let val = e.target.parentNode.querySelector('input').value
        let url = 'http://www.sherlochao.com:9091/photosharing/commentapi/comment'
        let memberId = localStorage.getItem('memberId')

        let param;
        if(this.$store.state.reply.name !== ''){
          param = {
            commentContent: val,
            sharedId: this.$route.params.id,
            commentFromMemberId: memberId,
            commentToMemberId: this.$store.state.reply.commentId,
            fromMemberNickname: JSON.parse(localStorage.getItem('userMsg')).memberName,
            toMemberNickname: this.$store.state.reply.name,
            toMemberAvatar :'http://g',
            fromMemberAvatar: 'http://www.sherlochao.com:9091/filebase'+JSON.parse(localStorage.getItem('userMsg')).memberAvatar
          }
        }else{
          param = {
            commentContent: val,
            sharedId: this.$route.params.id,
            commentFromMemberId: memberId,
            fromMemberNickname: JSON.parse(localStorage.getItem('userMsg')).memberName,
            toMemberNickname: this.$store.state.reply.name,
            toMemberAvatar :'http://g',
            fromMemberAvatar: 'http://www.sherlochao.com:9091/filebase'+JSON.parse(localStorage.getItem('userMsg')).memberAvatar
          }
        }
        vm.$store.commit('isLoading', true)
        axios.get(url,{params:param} ).then(function (res) {
          if(res.data.result === 1){
            location.reload();
          }
//          vm.$store.state.reply.comment = vm.resData.comment
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
  .b-reply{
    position: absolute;
    width: 100%;
    background-color: #fff;
    bottom:px2rem(0);
    height: px2rem(100);
    line-height: px2rem(100);
    padding: px2rem(15);
    box-sizing: border-box;
    border-top:1px solid #ddd;
    z-index: 99;
    -webkit-transition:all 1s;
  span{
    display: block;
    position: absolute;
    background-color: #6ac577;
    text-align: center;
    color: #fff;
    border-radius: px2rem(8);
    width: px2rem(120);
    height: px2rem(70);
    font-size: px2rem(26);
    line-height: px2rem(70);
    right: px2rem(15);
    top:px2rem(15);
  }
  input{
    position: absolute;
    top:px2rem(15);
    left: px2rem(15);
    height: px2rem(70);
    line-height: px2rem(70);
    width: px2rem(500);
    border:1px solid #eee;
    padding-left: px2rem(10);
    box-sizing: border-box;
  }
  }
</style>
