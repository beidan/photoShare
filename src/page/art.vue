<template>
	<div class="exam">
		<div class="exam_section" style="transform: translate3d(0px, 0, 0);">
			<dl class="exam_item">
				<dd>{{title}}</dd>
				<dt>{{content}}</dt>
			</dl>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import router from '../router/router'

	export default{
		data: function () {
			return {
				title: '',
				content: ''
			}
		},
		created () {
			let vm = this
			vm.$store.commit('isLoading', true)

			this.$store.commit('changeIndexConf', {
				isFooter: false,
				isSearch: false,
				isBack: true,
				isShare: false,
				title: '我的课程'
			});

			let url = 'http://118.89.50.53:9091/photosharing/articleapi/getArticle'

			let id = this.$route.params.id

			axios.get(url, {
				params: {
					articleId: id
				}
			}).then(function (res) {
				vm.title = res.data.article.title;
				vm.content = res.data.article.text;
				vm.$store.commit('isLoading', false)
			}).catch(function (error) {
				console.log(error)
			})
		},
		methods: {}
	}
</script>

<style style="scss">
	@import "../../static/css/exam.scss";
</style>


