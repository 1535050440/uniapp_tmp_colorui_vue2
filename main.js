import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


console.log('☆☆☆☆☆☆________________全局挂载________________☆☆☆☆☆☆start')

import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
Vue.mixin(ZPMixin)


//	===================================================
import requesta from './common/_api.js'
import api from './common/_common.js'
import route from './common/_route.js'
import config from './common/_config.js'






import tabhome from './pages/home/tabhome.vue'
Vue.component('tabhome',tabhome)


import tabyuyue from './pages/home/tabyuyue.vue'
Vue.component('tabyuyue',tabyuyue)

import tabactivity from './pages/home/tabactivity.vue'
Vue.component('tabactivity',tabactivity)

import tabshow from './pages/home/tabshow.vue'
Vue.component('tabshow',tabshow)

import tabmy from './pages/home/tabmy.vue'
Vue.component('tabmy',tabmy)


//	===================================================


import store from './store'

Vue.prototype.$store = store
Vue.prototype.$bgColorFind = 'my-theme-bg'



import _global from './common/_global.js'
//	===================================================
// import uniloadmore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue'
// Vue.component('uni-load-more',uniloadmore)
// ==========

// main.js，注意要在use方法之后执行
// main.js
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

console.log('☆☆☆☆☆☆________________全局挂载________________☆☆☆☆☆☆end')


