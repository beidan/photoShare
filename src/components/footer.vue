<template>
  <div class="footer">
    <div>
      <router-link to="/index/fresh"><span class="icon-shouye iconfont "></span>
        <p>首页</p></router-link>
      <router-link to="/home"><span class="icon-myline iconfont "></span>
        <p>个人</p></router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {}
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/footer.scss";
</style>
