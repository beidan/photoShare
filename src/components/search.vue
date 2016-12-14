<template>
  <div class="search">
    <input class="box" v-model="searchValue" placeholder="搜索" type="text"/>
    <span class="icon iconfont icon-sousuo submit" @click="submit"></span>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router/router'

  export default{
    data: function () {
      return {
        searchValue: ''
      }
    },
    methods:{
      submit:function () {
        let context = this
        router.push('/search/sea?s='+context.searchValue)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/search.scss";
</style>
