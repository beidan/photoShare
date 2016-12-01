<template>
  <div>
    <com-list v-bind:list-data="resData"></com-list>
    <div class="tip" v-show="empty">暂无数据{{tip}}～</div>
    <com-loading v-if="loading"></com-loading>
  </div>
</template>

<script>
  import list from '../components/list.vue'
  import axios from 'axios'
  import loading from '../components/loading.vue'

  export default{
    data: function () {
      return {
        data: 'index',
        num: 1,
        resData: {},
        tip:'',
        empty: false
      }
    },
    created () {
      let type = this.$route.params.types
      let titles, search, back
      if (type === 'own') {
        titles = '我的圈子'
        search = false
        back = true
        this.tip = '赶紧去发布动态'
      } else if (type === 'star') {
        titles = '我的收藏'
        search = false
        back = true
        this.tip = '赶紧去收藏'
      } else if (type === 'msg') {
        titles = '最新动态'
        search = false
        back = true
      }else if(type === 'user'){
        titles = '动态'
        search = false
        back = true
      } else {
        search = true
        back = false
      }
      this.fetchData(type)
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: search,
        isBack: back,
        title: titles
      })
    },
    watch: {
      '$route' (to, from) {
        this.fetchData(this.$route.params.types)
      }
    },
    components: {
      comList: list,
      comLoading: loading
    },
    computed: {
      loading: function () {
        return this.$store.state.comm.loading
      }
    },
    methods: {
      fetchData: function (type) {
        var vm = this
        let url,params
        let baseUrl = 'http://www.sherlochao.com:9091/photosharing/'
        let memberId = localStorage.getItem('memberId')

        if(type === 'sea'){
          url = baseUrl + 'sharedapi/searchShared'
          params = {
            content: this.$route.query.s
          }
        }else if (type === 'own') {
            url = baseUrl + 'sharedapi/viewOwnShared'
            params = {
              'memberId' : memberId,
              'choice': '1'
            }
        }else if (type === 'star') {
            url = baseUrl + 'sharedapi/viewCollect'
            params = {
              'memberId' : memberId,
              'choice': '1'
            }
        }else if (type === 'msg') {
            url = baseUrl + 'sharedapi/listOneMinuteShared'
        }else if(type === 'hot'){
            url = baseUrl + 'thumbsupapi/listThumbs'
            params = {
              'choice' : 1,
              'memberId': memberId
            }
        }else if(type === 'user'){
          url = baseUrl + 'sharedapi/viewOwnShared'
          params = {
            'choice' : 2,
            'othermemberid': this.$route.query.id
          }
        }
        axios.get(url, {
          params: params
        }).then(function (res) {
          if(res.data.data.length === 0){
            vm.empty = true
          }else{
            vm.empty = false
          }
          vm.resData = res.data
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
  $fontC:#666 ;
  @function px2rem($n) {
  @return #{$n/($screen*$font/320)}rem
  }
  .index {
    position: relative;

  .center {
    display: flex;
    margin-top: px2rem(20);
    justify-content: center;
    align-items: center;
    background-color: #fff;

  .actived {

  p {
    color: $bColor !important;
  }

  }
  .list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: px2rem(20) 0;

  p {
    text-align: center;
    color: $fontC;
    font-size: px2rem(30);
  }

  span {
    display: block;
    margin: 0 auto;
    font-size: px2rem(60);
    line-height: px2rem(60);
  }

  }
  }
  .btn {
    width: px2rem(100);
    height: px2rem(40);
    display: block;
    margin: 0 auto;
  }

  }
  .tip{
    position: fixed;
    top: 180px;
    left: 50%;
    z-index: 99;
    margin-left: -3.8em;
    width: 7.6em;
    min-height: 4.6em;
    border-radius: 5px;
    background: rgba(40, 40, 40, 0.75);
    color: #fff;
    text-align: center;
    padding-top: 2rem;
  }
</style>
