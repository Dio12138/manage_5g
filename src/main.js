import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import BScroll from 'better-scroll'
import ElTableBar from 'el-table-bar-base'


//Vue.use(axios) axios不能用use 只能修改原型链 

// import  from 'element-china-area-data'
import 'element-ui/lib/theme-default/index.css'
import 'el-table-bar-base/lib/ElTableBar.css'
import Api from './api/index.js'

Vue.prototype.$api = Api;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(ElTableBar);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
