<template>
  <div>
    <com-list v-bind:list-data="resData"></com-list>
    <div class="tip" v-show="empty">暂无数据{{tip}}～</div>
  </div>
</template>

<script>
  import list from '../components/list.vue'
  import axios from 'axios'

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
      } else if (type === 'userStar') {
        titles = '收藏用户'
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
      this.$store.commit('isLoading', true)
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
      comList: list
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
        let baseUrl = 'http://118.89.50.53:9091/photosharing/'
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
              'choice': '2'
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
            'otherMemberId': this.$route.query.id
          }
        }else if(type === 'userStar'){
          url = baseUrl + 'sharedapi/viewCollect'
          params = {
            'memberId' : memberId,
            'choice': '1'
          }
        }
        axios.get(url, {
          params: params
        }).then(function (res) {
          vm.$store.commit('isLoading', false)

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
<style lang="scss" scope>
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
