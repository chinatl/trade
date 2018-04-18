const user = {
	state: {
		type: '',
		isLogin:false
	},

	mutations: {
		SET_TYPEN: (state, data) => {
			state.type = data.isMerchant;
			state.id = data.id;
			state.isLogin = true;
			sessionStorage.setItem('type', data.isMerchant)
			sessionStorage.setItem('id', data.id)
			sessionStorage.setItem('isLogin', 'true')
		}
	}
}

export default user
