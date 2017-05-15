<template>
	<div class="com-home">
		<div class="user-link">
			<ul>
				<li v-for="value in doList">
					<a :href="route + value.articleId" class="link-box">
						<span class="txt">{{value.title}}</span>
						<span class="iconfont icon-xiangyoujiantou icon-right"></span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import router from '../router/router'

	export default{
		data: function () {
			return {
				id: 1,
				memberAvatar: '',
				memberName: '',
				role: '',
				baseUrl: this.$store.state.comm.imgUrl,
				isAdmin: false,
				route: '#/exam/',
				doList: {}
			}
		},
		created: function () {
			let userMsg = localStorage.getItem('userMsg');
			let vm = this

			this.role = JSON.parse(userMsg).memberRole
			this.memberAvatar = JSON.parse(userMsg).memberAvatar
			this.memberName = JSON.parse(userMsg).memberName
			if (this.role === 3) {
				this.isAdmin = true
			}
			this.$store.commit('changeIndexConf', {
				isFooter: true,
				isSearch: false,
				isBack: true,
				title: '我的试卷'
			});

			let url = 'http://118.89.50.53:9091/photosharing/articleapi/listArticle'

			axios.get(url).then(function (res) {
				vm.doList = res.data.articles
				vm.$store.commit('isLoading', false)
			}).catch(function (error) {
				console.log(error)
			})
		},
		methods: {
			logout: function () {
				let vm = this
				let url = vm.$store.state.comm.apiUrl + 'loginapi/loginout'
				axios.get(url).then(function (res) {
					console.log(res.data.result)
					if (res.data.result === 1) {
						vm.$store.commit('logout')
						router.push('index/fresh')
					}
				}).catch(function (error) {
					console.log(error)
				})
			}
		},
		computed: {}
	}
</script>
<style lang="scss">
	@import "../../static/css/home.scss";
</style>
