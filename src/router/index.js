import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 页面组件
import index from 'components/index'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index/'
		},
		{
			path: '/index/',
			component: index
		}
	]
})
