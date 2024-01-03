<template>
    <view class="dengLoadingVue" >
        <view class="maskVueHiddenShow" v-if="is_loading" @touchmove.stop.prevent="preventTouchMove">
            <view class="maskVueHiddenShowWrapper">
                <image src="/static/icon_img/loading.gif" class="maskVueHiddenShowWrapperGif"></image>
            </view>
        </view>
    </view>
</template>

<script>
	
    export default {
        computed: {
        	is_loading(){
        		return this.$store.state.is_loading
        	},
        	
        },
        methods:{
        	preventTouchMove(){
        		console.log('stop user scroll it!');
        		return;
        	}
        }
    }
</script>

<style lang="scss">
    .dengLoadingVue {
        .maskVueHiddenShow {
            z-index: 101;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #fff;
            opacity: 0.8;
            //
            display: flex;
            align-items: center;
            justify-content: center;
            .maskVueHiddenShowWrapper {
                width: 80%;
                height: 300rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                .maskVueHiddenShowWrapperGif {
                    width: 400rpx;
                    height: 300rpx;
                }
            }
        }
    }
</style>
