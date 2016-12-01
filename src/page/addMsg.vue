<template>
  <div class="add-pet">
    <div class="c-Publish">
      <div class="Pu-text">
        <textarea rows="6" placeholder="这一刻的想法..." v-model="message"></textarea>
        <span class="limit">{{ message.length }}／100</span>
      </div>
      <div class="Pu-img">
                <span v-for="value in imgArr">
                    <a href="javascript:;">
                    <img :src="value.src" alt="img">
                </a>
                </span>
        <a href="javascript:;" class="Pu-Add-img">
          <div class="addImg">+</div>
          <input type="file" v-on:change="addImg">
        </a>
      </div>
    </div>
    <a @click="submitInfo" class="btn-b">发 布</a>
    <div id="myCanvas" style="display: none"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router/router'

  export default{
    data: function () {
      return {
        message: '',
        imgArr: []
      }
    },
    created: function () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '发布圈子'
      })
    },
    methods: {
      submitInfo: function () {
        if (this.message.length > 100) {
          console.log('字数不能超过100！')
        }else{
          let url = 'http://www.sherlochao.com:9091/photosharing/sharedapi/publishShared'

          let i=0,len = this.imgArr.length,urlArr=[];
          for(i;i<len;i++){
            urlArr.push(this.imgArr[i].src.substring(23));
          }
          let memberId = localStorage.getItem('memberId');

          this.$store.commit('isLoading', false)
          var xhr = new XMLHttpRequest()
          xhr.open("POST", url, true)
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function () {
            var XMLHttpReq = xhr;
            if (XMLHttpReq.readyState == 4) {
              if (XMLHttpReq.status == 200) {
                var text = XMLHttpReq.responseText
                var res = JSON.parse(text)

                if(res.result === 0){
                  alert(res.msg)
                }else if(res.result === 1){
                  alert('发布成功')
                  router.push('/index')
                }else{
                  alert('请先登陆')
                  router.push('/login')
                }
                this.$store.commit('isLoading', false)
              }
            }
          }
          xhr.send('sharedContent=' + this.message + '&memberId=' + memberId + '&sharedPhoto=' + urlArr)


//          axios.post(url, {
//            params: {
//              sharedContent: this.message,
//              memberId: memberId,
//              sharedPhoto: urlArr,
//            }
//          }).then(function (res) {
//            if(res.data.result === 0){
//              console.log('请先登陆')
//              router.push('/login')
//            }else{
//              alert('发布成功')
//              router.push('/search/fresh')
//            }
//            vm.$store.commit('isLoading', false)
//          }).catch(function (error) {
//            console.log(error)
//          })
        }
      },
      addImg: function (event) {
        let self = this
        if (self.imgArr.length < 9) {
          var file = event.target.files[0]
          if (!/image\/\w+/.test(file.type)) {
            console.log('文件必须为图片！')
            return false
          }
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (e) {

            self.imgArr.push({src: this.result})
          }
        } else {
          console.log('一次最多只能上传9张图片！')
        }
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
  @function px2rem($n){
  @return #{$n/($screen*$font/320)}rem
  }
  .add-pet {

  .c-Publish {
    padding-top: .5rem;
    border-bottom: 1px solid #f1f1f1;

  .Pu-text {
    padding: .2rem .6rem;
    background-color: white;

  .limit{
    font-size: .3rem;
    position: absolute;
    top: 7.3rem;
    right: .8rem;
    color: #f9696c;
  }

  textarea {
    padding: 0;
    margin-bottom: .5rem;
    border: 0;
    font-size: .8rem;
  }
  }
  .Pu-img {
    margin: 1rem 0px;
    overflow: hidden;
    padding: 0px 0.5rem;

  .Pu-Add-img input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }

  a {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    float: left;
    margin: 0 1.9% .4rem 1.9%;

  .addImg {
    width: 3.888rem;
    height: 3.9rem;
    text-align: center;
    line-height: 3.3rem;
    font-size: 3.5rem;
    color: #f9696c;
    border: 1px solid #c7c7c7;
  }

  > img {
      height: 4rem;
    }
  }
  }
  }

  .btn-b {
    margin-top: px2rem(50);
  }
  }

  textarea {
    resize: none;
    width: 100%;
    -webkit-appearance: none;
    line-height: 1.2rem;
    background-color: #fff;
    border-radius: 3px;
    outline: 0;
  }

  img {
    width: 100%;
  }

</style>
