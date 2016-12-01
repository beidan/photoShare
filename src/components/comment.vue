<template>
  <div class="com-comment">
    <div class="title">评论区</div>
    <div class="content">
      <ul class="c-list clearfix">
        <li v-for="(v,k) in replyData">
          <div class="c-top clearfix">
            <img :src="v.fromMemberAvatar">
            <p class="name">{{v.fromMemberNickname}} 回复 {{v.toMemberNickname}}</p>
            <time>{{v.commentCreateTime}}</time>
            <a @click="doReply" :commentId="v.commentFromMemberId" :name="v.fromMemberNickname" class="reply"><span
              class="iconfont icon icon-more2"></span>回复</a>
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
  export default {
    data: function () {
      return {}
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
      }
    },
    watch: {}
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
  .com-comment{
    margin-top: px2rem(20);
  .title{
    background-color: #fff;
    text-align: center;
    font-size: px2rem(30);
    line-height: px2rem(80);
    color: #999;
    margin-bottom: px2rem(20);
  }
  .c-list{
    background-color: #fff;
    position: relative;
  li{
    position: relative;
    width: 100%;
    float: left;
    border-bottom:1px solid #ddd;
    padding:px2rem(40) px2rem(20);
    box-sizing: border-box;

  }
  .c-top{
    position: relative;
  }
  .reply{
    position: absolute;
    right: px2rem(40);
    font-size: px2rem(26);
    color: $bColor;
    top:px2rem(0);
    z-index: 3;
  span{
    padding-right: px2rem(10);
  }
  }
  .name{
    font-size: px2rem(30);
    line-height: px2rem(40);
    color: #666;
  }
  time{
    float:left;
  }
  img{
    margin-right: px2rem(15);
    display: block;
    width: px2rem(70);
    height: px2rem(70);
    border-radius: 100%;
    float:left;
  }
  .c-bottom{
    position: relative;
    margin-top: px2rem(20);
    font-size: px2rem(28);
    color: #333;
  }
  .r-p{
    color: #333;
  span{
    color: #bbb;
    padding-right:px2rem(10);
  }
  }
  }
  .comment-btn{
    margin: px2rem(30) auto 0;
  }

  }
  .cc{
    background: url("/src/images/icon-1.png") no-repeat;
    width:px2rem(44);
    height:px2rem(44);
  }
</style>
