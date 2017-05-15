<template>
	<div class="exam">
		<div class="exam_section" style="transform: translate3d(0px, 0, 0);">
			<ul class="exam_item" v-for="(item, index) in doList">
				<li class="exam_item_sub">{{index+1}}. {{item.subject}}</li>
				<li v-bind:class="{ TURE : item.answer==='A'&&isShow }" class="exam_item_choice" name="A"
				    @click="select">
					A.{{item.optionA}}
				</li>
				<li v-bind:class="{ TURE : item.answer==='B'&&isShow }" class="exam_item_choice" name="B"
				    @click="select">
					B.{{item.optionB}}
				</li>
				<li v-bind:class="{ TURE : item.answer==='C'&&isShow }" class="exam_item_choice" name="C"
				    @click="select">C.{{item.optionC}}
				</li>
				<li v-bind:class="{ TURE : item.answer==='D'&&isShow }" class="exam_item_choice" name="D"
				    @click="select">D.{{item.optionD}}
				</li>
			</ul>
		</div>
		<div class="exam_submit" @click="submit">提交答案</div>
	</div>
</template>

<script>
	import router from '../router/router'
	import axios from 'axios'

	export default{
		data: function () {
			return {
				doList: [],
				answer: [],
				isShow: false
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
				title: '我的试卷'
			});

			let url = 'http://118.89.50.53:9091/photosharing/measurementapi/findMeasurement'
			let id = this.$route.params.id

			axios.get(url, {
				params: {
					articleId: id
				}
			}).then(function (res) {
				vm.doList = res.data.topics;
				var len = res.data.topics.length;

				for (var i = 0; i < len; i++) {
					vm.answer.push(res.data.topics[i].answer);
				}
				localStorage.setItem('answer', vm.answer)

				vm.$store.commit('isLoading', false)

			}).catch(function (error) {
				console.log(error)
			})
		},
		computed: {
			countGrade: function (choice, ans) {
				console.log(ans)
				var len = ans.length, i, count = 0;
				for (i = 0; i < len; i++) {
					if (choice[i] === ans[i]) {
						count += 10;
					}
				}
				return count;
			}
		},
		methods: {
			select: function (e) {
				e.target.classList.toggle('on');
				var p = e.target.parentNode.children;
				for (var i = 0, pl = p.length; i < pl; i++) {
					if (p[i] !== e.target) p[i].classList.remove('on');
				}
			},
			submit: function () {
				var target = document.querySelectorAll('.on'),
					arr = [], len = target.length, i;

				for (i = 0; i < len; i++) {
					arr.push(target[i].getAttribute('name'))
				}

				if (arr.length < this.answer.length) {
					alert('请作答全部题目!');
				} else {
					var ans = localStorage.getItem('answer').split(",");
					var len = ans.length, i, count = 0;
					for (i = 0; i < len; i++) {
						if (arr[i] === ans[i]) {
							count += 10;
						}
					}
					alert('你的最后得分为' + count + '分');
					this.isShow = true;
				}
			}
		}
	}
</script>

<style style="scss">
	@import "../../static/css/exam.scss";
</style>
