<template>
    <div class="photoList">
		<!-- 顶部导航 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',{'mui-active' : item.id == 0}]"  
					v-for="item of photoCatgro" 
					:key="item.id"
					@click="getPhotoList(item.id)">
						{{item.title}}
					</a>
				</div>
			</div>
		</div>
		<!-- 图文列表 -->
		<ul class="photoListContent">
			<router-link class="photoListImg" v-for="item of photoList" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<p>
					<span class="photoList_title">{{item.title}}</span><br/>
					<span class="photoList_content">{{item.zhaiyao}}</span>
				</p>
			</router-link>
		</ul>
    </div>
</template>

<script>
//导入mui
import mui from '@/libs/mui/js/mui.min.js'
export default {
	data(){
		return {
			photoCatgro:[],
			photoList:[]
		}
	},
	created(){
		this.getPhotoCatgro()
		this.getPhotoList(0)
	},
    mounted(){
        //mui横向滚动栏初始化
         mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
	},
	methods:{
		getPhotoCatgro(){
			this.$http.get('api/getimgcategory').then(result => {
				if(result.body.status === 0){
					result.body.message.unshift({
						id:0,
						title:'全部'
					})
					this.photoCatgro = result.body.message
				}
			})
		},
		getPhotoList(id){
			this.$http.get('api/getimages/'+id).then(result => {
				if(result.body.status ===0){
					this.photoList =  result.body.message
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
	*{
		touch-action: pan-y;
	}
	.photoListContent{
		padding: 10px;
		.photoListImg{
			margin-bottom: 5px;
			box-shadow:0 0 8px #999;
			background-color: #ccc;
			text-align: center;
			position: relative;
			img{
				width: 100%;
				vertical-align: middle;
			}
			img[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
			p{
				position: absolute;
				bottom: 0;
				margin: 0;
				color: #fff;
				text-align: left;
				background-color:rgba(0,0,0,.4);
				max-height: 84px;
				.photoList_title{
					font-size: 14px;
				}
				.photoList_content{
					font-size: 13px;
				}
			}
		}
	}
</style>
