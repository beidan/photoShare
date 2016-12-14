<template>
  <div class="com-comment">
    <div class="title">评论区</div>
    <div class="content">
      <ul class="c-list clearfix">
        <li v-for="(v,k) in replyData">
          <div class="c-top clearfix">
            <img :src="v.fromMemberAvatar">
            <p class="name">{{v.fromMemberNickname}} 回复 {{v.toMemberNickname}}</p>
            <time>{{v.commentCreateTime}}</time><span v-if="id==v.commentFromMemberId" class="icon iconfont icon-lajixiang delete" @click="del(v.commentId)"></span>
            <a @click="doReply" :commentId="v.commentFromMemberId" :name="v.fromMemberNickname" class="reply"><span
              class="iconfont icon icon-more2" :commentId="v.commentFromMemberId" :name="v.fromMemberNickname"></span>回复</a>
          </div>
          <div class="c-bottom">
            <p>{{v.commentContent}}</p>
          </div>
        </li>
      </ul>
      <a @click="doComment" class="comment-btn btn-b">评 论</a>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        id: localStorage.getItem('memberId')
      }
    },
    props: ['content'],
    computed: {
      replyData: function () {
        return this.$store.state.reply.comment
      }
    },
    methods: {
      doReply: function (event) {
        let p = event.target
        let name = p.getAttribute('name')
        let id = p.getAttribute('commentId')

        this.$store.commit('reply', {name: name, commentId: id})
      },
      doComment: function () {
        this.$store.commit('reply', {name: '', commentId: ''})
      },
      del: function (id) {
        let baseUrl = this.$store.state.comm.apiUrl
        let url,param
        url = baseUrl + 'commentapi/delcomment'

        param = {
          commentId: id
        }
        axios.get(url,{params:param} ).then(function (res) {
          if(res.data.result === 1){
            location.reload();
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    watch: {}
  }
</script>
<style lang="scss">
  @import "../../static/css/comment.scss";
</style>
