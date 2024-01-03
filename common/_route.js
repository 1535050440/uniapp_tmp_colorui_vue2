import Vue from 'vue'

const route = {
	//	=================================================
	//	不需要token
	//	=================================================
	_loginApi:'/login',
	
	//	=================================================
	//	需要token
	//	=================================================
	getUserFind:'/user/get_user_find',
	updateUserFind:'/user/update_user_find',
	
	
}

Vue.prototype._Router = route
