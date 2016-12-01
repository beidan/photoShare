<template>
  <div class="com-list">
    <ul>
      <li class="list-li" v-for="value in doList">
        <div class="user">
          <a :href="route + value.memberId"><img :src="baseUrl + value.memberAvatar" alt=""/></a>
          <div class="name">
            <p>{{value.memberNickname}}</p>
            <p class="createtime">{{value.sharedCreatetime}}</p>
          </div>
          <router-link :to="{  name: 'article', params: { id: value.sharedId }}" class="btn-d btn-s">详情</router-link>
        </div>
        <div class="detail">
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
    baseUrl: 'http://www.sherlochao.com:9091/filebase',
    memberId: localStorage.getItem('memberId'),
    route:'#/search/user?id='
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
      del:function (id) {
        let url = 'http://www.sherlochao.com:9091/photosharing/sharedapi/sharedHide'

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
        console.log('e')
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
  .com-list{
    position: relative;
    margin-top: px2rem(20);
    margin-bottom: px2rem(120);
    background-color: #f4f4f4;
  .title{
    position: relative;
    height:px2rem(60);
    background: #fff;
    font-size: px2rem(30);
    color: $fontC;
    line-height: px2rem(60);
    text-align: center;
    border-bottom:1px solid #eee;
  }
  .list-li{
    background-color: #fff;
    margin-top: px2rem(20);
    position: relative;
    padding: 0 px2rem(15) px2rem(30);
    box-sizing: border-box;
  &:first-child{
     margin-top: 0;
   }
  .user{
    position: relative;
    height: px2rem(120);

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
    padding-top: 0;
    line-height: 1.6rem;
    color: #333;
    font-size: 0.8rem;
  }
  .createtime{
    font-size: .01rem;
    color: gray;
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
    background-color: #6ac577;
    width: px2rem(100);
    height: px2rem(50);
    line-height:px2rem(50);
    text-align: center;
    color: #fff;
    font-size: px2rem(22);
    border-radius: px2rem(8);
    top:px2rem(25);
  }
  }
  .detail{
    position: relative;
  p{
    font-size: px2rem(26);
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    color: #666;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .img-box{
    position: relative;
    width: 100%;

  li{
    float: left;
    width: 100%;
    height: px2rem(710);
  }

  &.r3{
  li{
    margin: 0 px2rem(5) px2rem(10);
    width: px2rem(230);
    height: px2rem(230);
  }
  }
  }
  }
  }
  }
  .action{
    color: #f9696c;
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
    span{
      padding: 0 .1rem;
    }
  }
</style>
