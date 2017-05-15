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
        let url = 'http://118.89.50.53:9091/photosharing/commentapi/comment'
        let memberId = localStorage.getItem('memberId')

        if(val.length > 100) {
          alert('评论不能多于100字！')
        }else{

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
              fromMemberAvatar: 'http://118.89.50.53:9091/filebase'+JSON.parse(localStorage.getItem('userMsg')).memberAvatar
            }
          }else{
            param = {
              commentContent: val,
              sharedId: this.$route.params.id,
              commentFromMemberId: memberId,
              fromMemberNickname: JSON.parse(localStorage.getItem('userMsg')).memberName,
              toMemberNickname: this.$store.state.reply.name,
              toMemberAvatar :'http://g',
              fromMemberAvatar: 'http://118.89.50.53:9091/filebase'+JSON.parse(localStorage.getItem('userMsg')).memberAvatar
            }
          }
          vm.$store.commit('isLoading', true)
          axios.get(url,{params:param} ).then(function (res) {
            if(res.data.result === 1){
              location.reload();
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/reply.scss";
</style>
