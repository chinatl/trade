import Vue from 'vue'
import Vuex from 'vuex'
import kline from './kline'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		kline,
		user
	}
})

export default store
