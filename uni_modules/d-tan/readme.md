# d-tan

### 使用方法：



````

<d-tan v-model="is_tan" :is_scroll="false"></d-tan>

v-model 是否显示弹框   true  |  false
is_scroll 是否底部可以滑动    true  |  false


````


````

<!-- 弹框用法 -->
		<d-tan v-model="is_tan">
			<view style="width: 100%;min-height: 300rpx;background-color: #fff;border-radius: 30rpx 30rpx 0 0;display: flex;
			flex-direction: column;align-items: center;overflow: hidden;">
				
				<view style="width: 100%;height: 100rpx;display: flex;align-items: center;justify-content: space-between;">
					<view style="margin-left: 30rpx;display: flex;">
						<view>选择会员</view>
						<!-- <view style="color: red;margin-left: 20rpx;" @click="_JumpVue('/pagesa/door/goods/list')">（商品管理）</view> -->
					</view>
					<view style="width: 150rpx;text-align: right;display: flex;align-items: center;;padding-right: 30rpx;
					justify-content: flex-end;height: 100rpx; " @click="is_show=false">关闭</view>
				</view>
				
				<view style="width: 90%;height: 1px;background-color: #f2f2f2;"></view>
				
				
				<view style="width: 100%;height: 450rpx;background-color: pink;">
					
					
					
				</view>
				
				
				<!-- <view style="width: 90%;height: 30rpx;"></view> -->
				
			</view>
		</d-tan>
		

````