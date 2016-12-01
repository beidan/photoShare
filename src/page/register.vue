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
          <!--<a href="#" class="fl">《用户协议》</a>-->
          <a href="#/login" class="fr">已有账号，登陆</a>
        </li>
        <li>
          <input type="submit" disabled="disabled" ref="isSubmit" @click="register" value="立即注册" class="button"/>
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
        let url = 'http://www.sherlochao.com:9091/photosharing/memberapi/register'
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
                alert('注册成功，请登陆！')
                router.push('login')
              }else{
                alert('注册失败：用户名已存在')
              }
            }
          }
        }
        var uname = 'Donald Duck', psw = 'Duckburg';
        xhr.send('name=' + this.phone + '&password=' + this.pwd)
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
<style scoped>
  .fr {
    float: right;
  }

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
    font-size: .8rem;
  }

  .formarea li .textbox {
    width: 94%;
    border: none;
    text-indent: 4rem;
  }

  .formarea li input {
    font-size: .8rem;
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
