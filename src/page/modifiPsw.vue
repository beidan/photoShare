<template>
  <div class="login">
    <form role="form" class="form-horizontal" name="RegisterForm">
      <ul class="formarea">
        <li>
          <label class="lit">密码：</label>
          <input type="password" placeholder="修改前密码" class="textbox" required v-model="psw"/>
        </li>
        <li>
          <label class="lit">密码：</label>
          <input type="password" placeholder="修改后密码" class="textbox" required v-model="newpsw"/>
        </li>
        <li>
          <input type="button" @click="loginAction" value="确认修改" class="button"/>
        </li>
      </ul>
    </form>
  </div>

</template>

<script>
  import router from '../router/router'

  export default{
    created () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '修改密码'
      })
    },
    methods: {
      loginAction: function () {
        let url = 'http://118.89.50.53:9091/photosharing/memberapi/updatePassword'
        let memberId = localStorage.getItem('memberId')

        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
          var XMLHttpReq = xhr;
          if (XMLHttpReq.readyState == 4) {
            if (XMLHttpReq.status == 200) {
              var text = XMLHttpReq.responseText
              var res = JSON.parse(text)
              console.log(res)
              if(res.result === 1){
                alert('修改成功！')
                router.push('index')
              }else{
                alert(res.msg)
              }
            }
          }
        }
        xhr.send('password=' + this.psw + '&newPasswd=' + parseInt(this.newpsw) + '&memberId=' + memberId)
      }
    }
  }
</script>

<style style="scss">
  @import "../../static/css/login.scss";
</style>
