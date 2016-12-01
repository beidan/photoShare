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
        let url = 'http://www.sherlochao.com:9091/photosharing/loginapi/login';

        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
          var XMLHttpReq = xhr;
          if (XMLHttpReq.readyState == 4) {
            if (XMLHttpReq.status == 200) {
              var text = XMLHttpReq.responseText
              var res = JSON.parse(text)
              if(res.result === 1){
                localStorage.setItem('memberId',res.data[0].memberId)
                localStorage.setItem('userMsg',JSON.stringify(res.data[0]))
                alert('登陆成功！')
                router.push('index')
              }else{
                alert('用户名错误')
              }
            }
          }
        }
        xhr.send('username=' + this.name + '&password=' + this.psw)
      },
      canEdit:function () {
//        if (this.name === null || this.psw === null) {
//          this.$refs.isSubmit.removeAttribute('disabled')
//            alert('不能为空！')
//        } else {
//          this.$refs.isSubmit.removeAttribute('disabled')
//        }
      }
    }
  }
</script>

<style scoped>

  .button {
    width: 100%;
    height: 2.8rem;
    line-height: 2.8rem;
    background: #f9696c;
    border: none;
    text-align: center;
    font-size: 1rem;
    color: white;
    border-radius: 3px;
  }

  .button:active {
    background: #f95255;
  }

  .button:focus {
    border: none;
    outline: none;
  }

  .formarea {
    margin-top: .5rem;
    overflow: hidden;
  }

  .formarea li {
    height: 2.5rem;
    line-height: 2.5rem;
    position: relative;
    margin: .5rem 0;
    background: white;
    padding: 0 3%;
    overflow: hidden;
    font-size: .8rem;
  }

  .formarea li .lit {
    position: absolute;
    left: 3%;
    top: 0;
  }

  .formarea li .textbox {
    width: 94%;
    border: none;
    text-indent: 3rem;
    font-size: .8rem;
  }

  .formarea li input {
    outline: none;
  }

  .formarea li:last-child {
    background: none;
  }

  .formarea li select {
    box-flex: button;
    -webkit-box-flex: button;
    -moz-box-flex: button;
    background: none;
    border: none;
    outline: none;
    width: 100%;
    text-indent: 5.4rem;
    padding: .32rem 3%;
    color: #999;
  }

  .formarea .liLink {
    background: none;
    height: 2rem;
    line-height: 2rem;
  }

  .formarea .liLink a {
    color: #999;
  }

  .formarea .lg_liLink {
    display: box;
    display: -webkit-box;
    display: -moz-box;
  }

  .formarea .lg_liLink span {
    font-size: .8rem;
    display: inline-block;
    box-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    color: #999;
    text-align: left;
    width: 6rem;
  }

</style>
