var city_name_data = ''
export let city_name = (() => {
	return new Promise(async (resolve, reject) => {
		let data = await uni.getStorageSync('city_name')
		if (data === '') {
			uni.setStorageSync('city_name', city_name_data)
			resolve(city_name_data)
		} else {
			resolve(data)
		}
	})
})()