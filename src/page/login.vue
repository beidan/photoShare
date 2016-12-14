<template>
  <div class="login">
    <form role="form" class="form-horizontal" name="RegisterForm">
      <ul class="formarea">
        <li>
          <label class="lit">账号：</label>
          <input type="text" placeholder="手机号码" class="textbox" required v-model="name"/>
        </li>
        <li>
          <label class="lit">密码：</label>
          <input type="password" placeholder="登陆密码" class="textbox" required v-model="psw"/>
        </li>
        <li class="liLink lg_liLink">
          <span><label><input type="checkbox"/>记住密码</label></span>
          <span><a href="#/register">新用户注册</a></span>
          <span><a href="#/find_pwd">忘记密码?</a></span>
        </li>
        <li>
          <input type="button" @click="loginAction" value="立即登陆" class="button"/>
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
        title: '登陆页面'
      })
    },
    methods: {
      loginAction: function () {
        let vm = this
        let url = vm.$store.state.comm.apiUrl + 'loginapi/login';
        let params = 'username=' + this.name + '&password=' + this.psw

        this.post(url,params,function (res) {
          if(res.result === 1){
            vm.$store.commit('isLogin', res.data[0])
            alert('登陆成功！')
            router.push('index/fresh')
          }else{
            alert('用户名错误')
          }
        })
      }
    }
  }
</script>

<style style="scss">
  @import "../../static/css/login.scss";
</style>
