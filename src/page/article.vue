<template>
	<div>
		<div class="com-article">
			<div class="user">
				<img :src="baseUrl + resData.memberAvatar" alt=""/>
				<div class="name">
					<p>{{resData.memberNickname}}
						<span v-bind:class="{ hasZan : !(resData.memberIsFavShared-1) }" class="Userstar"
						      @click="userstar(resData.memberId)"><span
							class="icon iconfont icon-jushoucang"></span> <span> 收藏</span></span>
					</p>
					<time>{{resData.sharedCreatetime}}</time>
				</div>
			</div>
			<div class="imgbox">
				<ul>
					<li v-for="value in resData.photos" v-bind:class="{r3:resData.photos.length<=1?true:false}">
						<img :src="baseUrl + value">
					</li>
				</ul>
			</div>
			<div class="art-detail">
				<p> {{resData.sharedContent}}</p>
			</div>
			<p class="operate">
				<span class="zan" v-bind:class="{ hasZan : !(resData.memberIsThumbs-1) }"
				      @click="zan(resData.sharedId)"><span class="icon iconfont icon-zans"></span><span>{{thumbNum}}</span></span>
				<span class="kanguo"><span class="icon iconfont icon-kanguos"></span><span>{{resData.sharedView}}</span></span>
				<span v-bind:class="{ hasZan : !(resData.memberIsFavShared-1) }" class="star"
				      @click="star(resData.sharedId,resData.memberId)"><span
					class="icon iconfont icon-jushoucang"></span> <span> 收藏</span></span>
			</p>
			<p class="starList">
				<span v-for="value in resData.thumbUps"> {{ value.memberNickname }}, </span>
			</p>
			<com-comment></com-comment>
		</div>
		<com-reply v-on:submit="handleSubmit"></com-reply>
	</div>
</template>


<script>
	import Comment from '../components/comment.vue'
	import Reply from '../components/reply'
	import axios from 'axios'

	export default {
		data: function () {
			return {
				content: null,
				resData: {},
				baseUrl: 'http://118.89.50.53:9091/filebase',
				memberId: localStorage.getItem('memberId')
			}
		},
		created: function () {
			let vm = this
			vm.$store.commit('isLoading', true)
			vm.$store.commit('changeIndexConf', {
				isFooter: false,
				isSearch: false,
				isBack: true,
				isShare: true,
				title: '详情页'
			})
			let id = this.$route.params.id

			vm.$store.commit('isLoading', true)

			this.$store.state.reply.articleId = id

			let url = 'http://118.89.50.53:9091/photosharing/sharedapi/viewShared'
			let memberId = localStorage.getItem('memberId')

			axios.get(url, {
				params: {
					sharedId: id,
					memberId: memberId
				}
			}).then(function (res) {
				if (res.data.result === 1) {
					vm.resData = res.data.data[0]
					vm.thumbNum = vm.resData.thumbUps.length || 0;
					vm.$store.state.reply.comment = vm.resData.comments
					vm.$store.commit('isLoading', false)
				}
			}).catch(function (error) {
				console.log(error)
			})
		},
		components: {
			comComment: Comment,
			comReply: Reply
		},
		methods: {
			handleSubmit: function (val) {
				this.content = val
			},
			zan: function (id) {
				let url = 'http://118.89.50.53:9091/photosharing/thumbsupapi/thumbsUp'
				let choice, num = event.target.parentNode;
				if (num.classList.contains('hasZan')) {
					choice = 2
				} else {
					choice = 1
				}
				axios.get(url, {
					params: {
						sharedId: id,
						memberId: this.memberId,
						memberNickname: 'test',
						choice: choice
					}
				}).then(function (res) {
					if (res.data.result === 1) {
						if (choice === 2) {
							num.childNodes[1].innerText = parseInt(num.innerText) - parseInt(1)
						} else {
							num.childNodes[1].innerText = parseInt(num.innerText) + parseInt(1)
						}
						num.classList.toggle('hasZan')
					} else {
						alert('请登陆后再操作！')
					}
				}).catch(function (error) {
					console.log(error)
				})
			},
			star: function (sid, mid) {
				let url = 'http://118.89.50.53:9091/photosharing/favoritesapi/collect'
				let choice, num = event.target.parentNode;
				if (num.classList.contains('operate')) {
					num = num.childNodes[4]
				}
				if (num.classList.contains('hasZan')) {
					choice = 2
				} else {
					choice = 1  //1是收藏
				}
				axios.get(url, {
					params: {
						type: 2,
						choice: choice,
						memberId: this.memberId,
						id: sid,
						colMemberId: mid
					}
				}).then(function (res) {
					if (res.data.result === 1) {

						num.classList.toggle('hasZan')
					} else {
						alert('操作失败！')
					}
				}).catch(function (error) {
					console.log(error)
				})
			},
			userstar: function (sid) {
				let url = 'http://118.89.50.53:9091/photosharing/favoritesapi/collect'
				let choice, num = event.target.parentNode;
				if (num.classList.contains('operate')) {
					num = num.childNodes[4]
				}
				if (num.classList.contains('hasZan')) {
					choice = 2
				} else {
					choice = 1  //1是收藏
				}
				axios.get(url, {
					params: {
						type: 1,
						choice: choice,
						memberId: this.memberId,
						id: sid,
					}
				}).then(function (res) {
					if (res.data.result === 1) {
						num.classList.toggle('hasZan')
					} else {
						alert('操作失败！')
					}
				}).catch(function (error) {
					console.log(error)
				})
			}
		}
	}
</script>
<style lang="scss">
	@import "../../static/css/article.scss";
</style>
