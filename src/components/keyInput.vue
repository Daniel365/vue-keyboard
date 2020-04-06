<style lang="scss">
	h2{
		font-size: .3rem;
	}
	.form-group{
		display: flex;
		align-items: center;
		text-align: center;
		border: 1px solid #e4e4e4;
		padding: 0 .2rem;
		input{
			height: .6rem;
			flex: 1;
			margin-right: .2rem;
			border: 0;
			outline: 0;
		}
		.icon-eye{
			&.active{
				color: #ccc;
			}
		}
		.icon-cancel{
			margin-right: .1rem;
		}
	}
</style>
<template>
	<div>
		<h2>自制键盘</h2>
		<div class="form-group">
			<input :id="name" :type="(passwordFlag? 'text':'password')" ref="keyboard" v-model="inputValue" @focus="onFocus" :placeholder="placeholder"  readonly>
			<label class="border" :for="name"></label>
			<i class="iconfont icon-cancel" v-if="deleteFlag" @click="getInputValue('deleteAll')"></i>
			<i :class="'iconfont icon-eye '+(passwordFlag? 'active':'')" @click="passwordFlag= !passwordFlag"></i>
			<Keyboard :option="option" @keyVal="getInputValue"  @close="option.show = false"></Keyboard>
		</div>
	</div>
</template>
<script>
	import Keyboard from './keyboard'
	export default {
		props: {
			placeholder:{
				type: String,
				default: ''
			},
			name:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				option: {
					show: false,
					sourceDom: ''
				},
				inputValue: '',
				passwordFlag:false,
				deleteFlag:false,
				plusOsName:'Android'
			}
		},
		components: {
			Keyboard
		},
		watch:{
			inputValue(val){
				this.deleteFlag = val ? true:false
			}
		},
		methods: {
			getInputValue(val) {
				switch (val) {
					case "delete":
						this.inputValue = this.inputValue.slice(0,this.inputValue.length -1)
						break;
					case "deleteAll":
						this.inputValue = ''
						break;
					case "confirm":
						console.log("确定");
						this.$set(this.option, 'show', false)
						break;
					default:
						this.inputValue += val
						this.$emit('keyVal', this.inputValue,this.name)
						break;
				}
			},
			onFocus() {
				this.$set(this.option, 'show', true)
				this.$set(this.option, 'sourceDom', this.$refs['keyboard'])
			},
		}
	}
</script>
