// initial state
const state = {
  loginStatus: true
}

// getters
const getters = {
  loginStatus: state => state.loginStatus
}

// actions
const actions = {

}

// mutations
const mutations = {
	updateLoginStatus(state){
		state.loginStatus = !state.loginStatus
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}