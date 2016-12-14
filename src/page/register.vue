<template>
  <div class="register">
    <form role="form" class="form-horizontal">
      <ul class="formarea">
        <li>
          <label class="lit">账号：</label>
          <input type="tel" placeholder="手机号码" class="textbox" required v-model="phone"/>
        </li>
        <li>
          <label class="lit">密码：</label>
          <input type="password" placeholder="设置密码" class="textbox" required v-model="pwd"/>
        </li>
        <li>
          <label class="lit">确认密码：</label>
          <input type="password" placeholder="确认密码" class="textbox" required @blur="canEdit" v-model="pwdAgain"/>
        </li>
        <li class="liLink">
          <a href="#/login" class="fr">已有账号，登陆</a>
        </li>
        <li>
          <input type="button" disabled="disabled" ref="isSubmit" @click="register" value="立即注册" class="button"/>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
  import router from '../router/router'

  export default{
    data: function () {
      return {}
    },
    created () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        title: '注册'
      })
    },
    methods: {
      register: function () {
        let url = this.$store.state.comm.apiUrl + 'memberapi/register'
        let params = 'name=' + this.phone + '&password=' + this.pwd
        this.post(url,params,function (res) {
          if(res.result === 1){
            alert('注册成功，请登陆！')
            router.push('login')
          }else{
            alert('注册失败：用户名已存在')
          }
        })
      },
      canEdit: function () {
        if (this.pwd === this.pwdAgain) {
          this.$refs.isSubmit.removeAttribute('disabled')
        } else {
          console.log('2次密码不一致')
        }
      }
    }
  }
</script>
<style >
  @import "../../static/css/login.scss";
</style>
