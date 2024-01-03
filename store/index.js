import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		is_loading:false,
		is_open_im:false,
		is_login:false,
		isLoginStatus:false,		//	用户登陆状态
		userFind:{
			area_id:38,
			area_name:'北京市',
			map_lat:'38.03599',
			map_lng:'114.46979',
		},				//	用户信息
		doorFind:{
			id:0,
			door_name:'',
			door_logo:'',
			mobile:'',
		},
		windowHeight:0,
		bgColorFind:'my-theme-bg'	//	bg-gradual-red		bg-pink
		// bgColorFind:'linear-gradient(117deg,#60DF9D,#31CB7B)'
    },
	// 
    mutations: {
		//	全局更新加载中的特效
		is_loading(state,data){
			state.is_loading = data
		},
		
		//	刷新商家信息
		refreshDoorFind(state,DoorFind){
			state.doorFind = DoorFind
		},
		color(state, bgColorFind) {
			state.bgColorFind = bgColorFind
		},
		
		setVuexImOpen(state,is_open_im){
			state.is_open_im = is_open_im
		},
		//	刷新用户信息
		refreshUserFind(state,userFind){
			state.userFind = userFind
			state.isLoginStatus = true
			
		},
		getStoreStorage (state) {
			for (let i in state) {
				if (state[i].then) {
					Promise.resolve(state[i]).then((value) => {
						state[i] = value
					})
				}
			}
		},
		//	登陆后
        login(state, paramArray) {
			api.setTokenStoreApi(paramArray.access_token)
			api.setTokenTwoStoreApi(paramArray.refresh_token)
			state.isLoginStatus = true
        },
        logout(state) {
			uni.removeStorageSync(config.webKeyToken);
			uni.removeStorageSync(config.webKeyTokenTwo);
			state.userFind = {}
			state.isLoginStatus = false
        },
		//	刷新订单数量
		
		setCarOrderNum(state,data) {
			state.order_num = data.order_num
		}
    }
})






export default store