<template>
  <div class="index">
    <com-list v-bind:list-data="resData"></com-list>
    <com-loading v-if="loading"></com-loading>
  </div>
</template>

<script>
  import list from '../components/list.vue'
  import loading from '../components/loading.vue'
  import axios from 'axios'

  export default{
    data: function () {
      return {
        data: 'index',
        num: 1,
        resData: {}
      }
    },
    created () {
      this.fetchData()
      // head的修改
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: true,
        isBack: false,
        title: ''
      })
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
      randomNum: function () {
        return {}
      },
      dothis: function () {
//                console.log('eee');
      },
      fetchData: function () {
        var vm = this
        vm.$store.commit('isLoading', true)
        /*获取最新列表信息*/
        let memberId = localStorage.getItem('memberId')
        let url = 'http://www.sherlochao.com:9091/photosharing/sharedapi/listOneMinuteShared'
        axios.get(url,{
          params: {
            memberId : memberId
          }
        }).then(function (res) {
          vm.resData = res.data
          vm.$store.commit('isLoading', false)
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
</style>
