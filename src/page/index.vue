<template>
	<div class="index">
		<img src="static/images/03.jpg" alt="">
		<div class="center">
			<a href="#/index/fresh" class="list" types="fresh" v-bind:class="{ actived: isActive }"
			   @click="toggle('fresh')"><p>
				最新动态</p></a>
			<a href="#/index/hot#1" class="list" types="hot" v-bind:class="{ actived: !isActive }"
			   @click="toggle('hot')"><p>
				热门话题</p></a>
		</div>
		<div v-show="isHot">
			<select @change="change">
				<option value="1">全部</option>
				<option value="2">最近一周</option>
				<option value="3">今天</option>
			</select>
			<span class="arrow"></span>
		</div>
		<com-list v-bind:list-data="resData"></com-list>
	</div>
</template>

<script>
	import list from '../components/list'
	import axios from 'axios'

	export default{
		data: function () {
			return {
				data: 'index',
				num: 1,
				resData: {},
				isActive: true,
				isHot: false
			}
		},
		created () {
			let type = this.$route.params.type
			let hash = this.$route.hash

			if (hash !== '') {
				this.isHot = true
				this.fetchData('hot', hash.substring(1))
				this.isActive = false
			} else {
				this.fetchData(type)
			}
			// head的修改
			this.$store.commit('changeIndexConf', {
				isFooter: true,
				isSearch: true,
				isBack: false,
				title: ''
			})
		},
		components: {
			comList: list
		},
		computed: {},
		watch: {
			'$route' (to, from) {
				let hash = this.$route.hash
				if (hash === '') {
					this.isHot = false
					this.fetchData(this.$route.params.type)
				} else {
					this.fetchData('hot', hash.substring(1))
					this.isHot = true
				}
			}
		},
		methods: {
			fetchData: function (type, cho) {
				let vm = this
				vm.$store.commit('isLoading', true)

				let url, params
				let baseUrl = vm.$store.state.comm.apiUrl
				let memberId = localStorage.getItem('memberId')

				if (type === 'hot') {
					url = baseUrl + 'thumbsupapi/listThumbs'
					params = {
						'choice': 1,
						'memberId': memberId
					}
				}
				else if (type === 'fresh') {
					url = baseUrl + 'sharedapi/listOneMinuteShared'
					params = {
						memberId: memberId
					}
				}

				/*获取最新列表信息*/
				axios.get(url, {
					params: params
				}).then(function (res) {
					vm.resData = res.data;
					vm.$store.commit('isLoading', false)
				}).catch(function (error) {
					console.log(error)
				})
			},
			toggle: function () {
				let node = event.target, types
				if (node.attributes.class) {
					types = node.attributes.class.value
				} else if (node.parentNode.attributes.class) {
					types = node.parentNode.attributes.class.value
				}
				if (types === 'list') {
					this.isActive = !this.isActive
				}
			},
			change: function () {
				let value = event.target.value
				location.hash = 'index/hot#' + value
			}
		}
	}

</script>
<style lang="scss">
	@import "../../static/css/index.scss";
</style>
