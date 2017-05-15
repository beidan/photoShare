<template>
  <div class="add-pet">
    <div class="c-Publish">
      <div class="Pu-text">
        <textarea rows="6" placeholder="这一刻的想法..." v-model="message"></textarea>
        <span class="limit">{{ message.length }}／300</span>
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
    components: {},
    methods: {
      submitInfo: function () {
        if (this.message.length > 300) {
          alert('字数不能超过300！')
        }else if(this.message.length === 0 && this.imgArr.length === 0){
          alert('发布消息不能为空')
        }else{
          let url = 'http://118.89.50.53:9091/photosharing/sharedapi/publishShared'

          let i=0,len = this.imgArr.length,urlArr=[];
          for(i;i<len;i++){
            urlArr.push(encodeURIComponent(this.imgArr[i].src.substring(23)));
          }

          let memberId = localStorage.getItem('memberId');

          this.$store.commit('isLoading', false)

          let params = 'sharedContent=' + this.message + '&memberId=' + memberId + '&sharedPhoto=' + urlArr
          this.post(url,params,function (res) {
            if(res.result === 0){
              alert(res.msg)
            }else if(res.result === 1){
              alert('发布成功')
              router.push('/index/fresh')
            }else{
              alert('请先登陆')
              router.push('/login')
            }
            this.$store.commit('isLoading', false)
          })
        }
      },
      addImg: function (event) {
        let self = this
        if (self.imgArr.length < 6) {
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
  @import "../../static/css/addMsg.scss";
</style>
