<template>
    <div v-show="showKeyboard" v-clickoutside="onClose">
        <div :class="{'keyboard pt3':true,'hide':!keyFlag}">
            <ul v-for="keys in keyList" class="letter">
                <template v-for="key in keys">
                    <li v-if="key === 'daxiaoxie'"  @click="clickKey">
                        <i :class="{'iconfont':true,'icon-turnLetters': status==0,'icon-turnLetters-active': status==1}"  :data-key="key"></i>
                    </li>
                    <li v-else-if="key === 'shanchu'"  v-longpress="onDel"  @click="clickKey">
                        <i class="iconfont icon-delete" :data-key="key"></i>
                    </li>
                    <li v-else-if="key === '123'"  @click="clickKey" class="tab-num" :data-key="key">123</li>
                    <li v-else-if="key==='anquanjianpan'" class="tab-font">安全键盘</li>
                    <li v-else-if="key === 'queding'"  @click="clickKey" class="tab-confirm" :data-key="key">确定</li>
                    <li v-else :class="key">
                        <p v-text="key"></p>
                        <span v-text="key" @click="clickKey"  :data-key="key" data-enlarge="true"></span>
                    </li>
                </template>
            </ul>
        </div>
        <div  :class="{'keyboard abc':true,'hide':keyFlag}">
            <table class="number">
                <tr  v-for="keys in keyNumList">
                    <template v-for="key in keys">
                        <td v-if="key==='queding'" @click="clickKey" rowspan="2" class="tab-confirm" :data-key="key">确定</td>
                        <td v-else-if="key==='guanbi'" @click="clickKey" :data-key="key">关闭</td>
                        <td v-else-if="key==='ABC'" @click="clickKey" data-key="ABC">ABC</td>
                        <td v-else-if="key==='shanchu'" @click="clickKey"><i class="iconfont icon-delete" :data-key="key"></i></td>
                        <td  v-else  @click="clickKey" :data-key="key" v-text="key"></td>
                    </template>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
	import Vue from 'vue'
	// 点击外界
	Vue.directive('clickoutside',{
	  bind(el, binding, vnode) {
		function documentHandler(e) {
		  if (el.contains(e.target)) {
			return false;
		  }
		  if (binding.expression) {
			binding.value(e);
		  }
		}
		el.__vueClickOutside__ = documentHandler;
		document.addEventListener('click', documentHandler);
	  },
	  update(el, binding, vnode) {},
	  unbind(el, binding) {
		document.removeEventListener('click', el.__vueClickOutside__);
		delete el.__vueClickOutside__;
	  }
	});
	//setInterval：持续按住;setTimeOut:长按
	Vue.directive('longpress', {
		bind: function(el, binding, vNode) {
			// 确保提供的表达式是函数
			if (typeof binding.value !== 'function') {
				// 获取组件名称
				const compName = vNode.context.name;
				// 将警告传递给控制台
				let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;
				if (compName) { warn += `Found in component '${compName}' `}
				console.warn(warn);
			}
			// 定义变量
			let pressTimer = null;
			// 定义函数处理程序
			// 创建计时器（ 1秒后执行函数 ）
			let start = (e) => {
				if (e.type === 'click' && e.button !== 0) {
					return;
				}
				if (pressTimer === null) {
					pressTimer = setInterval(() => {
						// 执行函数
						handler();
					}, 300)
				}
			}
			// 取消计时器
			let cancel = (e) => {
				// 检查计时器是否有值
				if ( pressTimer !== null ) {
					clearInterval(pressTimer);
					pressTimer = null;
				}
			}
			// 运行函数
			const handler = (e) => {
				// 执行传递给指令的方法
				binding.value(e)
			}
			// 添加事件监听器
			el.addEventListener("mousedown", start);
			el.addEventListener("touchstart", start);
			// 取消计时器
			el.addEventListener("click", cancel);
			el.addEventListener("mouseout", cancel);
			el.addEventListener("touchend", cancel);
			el.addEventListener("touchcancel", cancel);
		}
	})

	export default {
	  props: {
		  option: {
			  type: Object
		  }
	  },
		data() {
			return {
				keyFlag:true,
				keyList: [],
				keyNumList:[
					["1","2","3","guanbi"],
					["4","5","6",""],
					["7","8","9","queding"],
					["ABC", "0","shanchu",""]
				],
				status: 0,//0 小写 1 大写 2 数字 3 符号
				number:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				lowercase: [
					['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
					['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
					['daxiaoxie', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'shanchu'],
					['123', 'anquanjianpan', 'queding']
					// ['123', 'point', 'blank', 'symbol', 'enter']
				],
				uppercase: [
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
					['daxiaoxie', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'shanchu'],
					['123', 'anquanjianpan', 'queding']
//					['123', 'point', 'blank', 'symbol', 'enter']
				],
			}
		},
		computed: {
			showKeyboard(){
				return this.option.show
			}
		},
		mounted() {
			//字母
			this.keyList = this.lowercase;
			//数字
			this.number.sort(function(a, b) {
				return 0.5 - Math.random();
			});
			let mycars= this.number;
			this.keyNumList = [
				[mycars[0],mycars[1],mycars[2],"guanbi"],
				[mycars[3],mycars[4],mycars[5],""],
				[mycars[6],mycars[7],mycars[8],"queding"],
				["ABC",mycars[9],"shanchu",""],
			];
		},
		methods: {
			clickKey(event) {
				let vm = this;
				let value = event.srcElement.getAttribute('data-key');
				let enlarge = event.srcElement.getAttribute('data-enlarge');
				if(!value){
					console.log("键值错误"+value);
					return false;
				}
				// console.log(value);
				switch(value){
					case "queding":
						vm.emitValue('confirm');
						break;
					case "guanbi":
						this.$emit('close', false);
						break;
					case "shanchu":
						vm.emitValue('delete');
						break;
					case "daxiaoxie":
						if(vm.status === 0){
							vm.status = 1;
							vm.keyList = vm.uppercase;
						}else{
							vm.status = 0;
							vm.keyList = vm.lowercase;
						}
						break;
					case "ABC":
						vm.status = 0;
						vm.keyFlag = true;
						break;
					case "123":
						vm.status = 2;
			  		vm.keyList = vm.lowercase;
						vm.keyFlag = false;
						break;
					default:
						/**
						 * 字母显示放大效果
						 * data-enlarge true 为开启功能
						 */
						try {
							var p = event.path[1].childNodes[0];
							if(enlarge && p){
								p.style.display="block";
								setTimeout(function(){
									p.style.display="none";
								},100)
							}
						}catch(e){
							console.log(e)
						}
						vm.emitValue(value);
						break;
				}
			},
			emitValue(key) {
				this.$emit('keyVal', key)
			},
			onDel(){
				this.emitValue('delete');
			},
			onClose(e) {
				if (e.target !== this.option.sourceDom) {
					// this.showKeyboard = false
					this.$emit('close', false)
				}
			}
		}
	}
</script>

<style  lang="scss">
    .keyboard{
				-webkit-touch-callout:none;
				-webkit-user-select:none;
				user-select:none;
        width: 100%;
        position: fixed;
        bottom:0;
        left: 0;
        background: #fff;
        &.pt3{
            padding-top: .3rem;
        }
		&.hide{
		    display: none;
		}
        .letter{
			display: flex;
			align-items: center;
            margin: 0 auto .2rem;
			padding: 0;
            &:nth-child(2){
                width: 90%;
            }
            &:nth-child(3),&:nth-child(4){
                width: 95%;
            }
            li{
				-webkit-touch-callout:none; /*系统默认菜单被禁用*/
				-webkit-user-select:none; /*webkit浏览器*/
				user-select:none;
                flex: 1;
                position: relative;
				list-style: none;
                &.q,&.Q{
                    margin-left: .1rem;
                }
                &.tab-num,&.tab-confirm{
                    background: #fff;
                    padding: .2rem 0;
                    text-align: center;
                    border-radius: .08rem;
                    border:1px solid #eee;
                    font-size:.4rem;
                }
                &.tab-confirm{
                    background: #157CF8;
                    color: #fff;
                }
                &.tab-font{
                    margin: 0 1.5rem;
                    text-align: center;
					font-size: .24rem;
                }
                i {
                    display: block;
                    text-align: center;
                    font-size:.4rem;
                    background: #fff;
                    padding: .2rem 0;
                    width: .7rem;
                    border-radius: .08rem;
                    border:1px solid #eee;
                    &:active {
                        background-color: darken(#ccc, 10%);
                    }
                }
                p{
                    display: none;
                    position: absolute;
                    top: -1.2rem;
                    left: 0;
                    font-style: normal;
                    background: #fff;
                    text-align: center;
                    width: .8rem;
                    height: 1rem;
                    line-height: 1rem;
                    font-size:.5rem;
                    box-shadow:  0 0 5px #333;
                    border-radius: .08rem;
                }
                span{
                    display: block;
                    background: #fff;
                    text-align: center;
                    width: .65rem;
                    padding: .1rem 0;
                    font-size:.55rem;
                    border-radius: .08rem;
                    border:1px solid #eee;
                    &:active {
                        background-color: darken(#ccc, 10%);
                    }
                }
            }
        }
        .number{
            width: 100%;
            tr{
                border-bottom: 1px solid #eee;
            }
            td{
                border-left:1px solid #eee;
                width: 25%;
                background: #fff;
                text-align: center;
                line-height: 1.2rem;
								font-size:.5rem;
                &:first-child{
                    border-left:0;
                }
                &:active {
                    background-color: darken(#ccc, 10%);
                }
                &.tab-confirm{
                    background: #157CF8;
                    color:#fff;
                }
				.icon-delete{
					font-size:.6rem;
				}
            }
            i{
                display: block;
            }
        }
    }
</style>
