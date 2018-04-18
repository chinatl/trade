// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ECharts from 'vue-echarts'
// register component to use
Vue.component('chart', ECharts)
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
/**/
var islogin = sessionStorage.getItem('isLogin');
var type = sessionStorage.getItem('type');
var id = sessionStorage.getItem('id');
if (islogin + '' === 'null') {
	store.state.user.isLogin = false;
	store.state.user.type = 0;
} else {
	store.state.user.isLogin = true;
	store.state.user.type = type - 0;
	store.state.user.id = id;
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	components: {
		App
	},
	template: '<App/>'
})
