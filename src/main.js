// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Post from '@/api/post'
import ECharts from 'vue-echarts'
// register component to use
Vue.component('chart', ECharts)
import store from './store'

import i18n from './i18n/i18n';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
/**/
Vue.config.productionTip = false
//Post({
//    url: 'log/login',
//    data: {
//        userName: 15719289905,
//        password: '96e79218965eb72c92a549dd5a330112',
//        isLogin: 'login',
//    },
//    success: res => {
//    }
//
//})

Post({
	url: 'log/getSessionUser',
	success: res => {
		if (res.code === 0) {
			store.state.isLogin = true;
			store.state.user.mainUsersId = res.data.mainUsersId + '';
			store.state.user = res.data;
			if (res.data.mainUsersId + '' === 'null') {
				Post({
					url: 'log/getKidUsers',
					success: res => {
						if (res.code === 0) {
							store.state.userAccount = res.data;
						}
					}
				})
			} else {
				store.state.userAccount = [];
			}
		} else {
			store.state.isLogin = false;
		}
	}
})

import * as filters from './filters' // 全局filter
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

import kline_api from './config'


/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	i18n,
	components: {
		App
	},
	template: '<App/>'
})
