<template>
    <div class="photoInfo">
        <h3>{{photoInfo.title}}</h3>
        <p>
            <span>发表时间:{{photoInfo.add_time | dataFormat}}</span>
            <span>点击:{{photoInfo.click}}次</span>
        </p>
        <hr />

        <!-- 缩略图 -->
        <div class="photoInfoImg">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>

        <!-- 内容 -->
        <div class="photoInfo_content" v-html="photoInfo.content"></div>

        <!-- 评论组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoInfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getPhotoImg()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.photoInfo = result.body.message[0]
                }
            })
        },
        getPhotoImg(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                    });
                    this.list =  result.body.message
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .photoInfo{
        margin: 5px;
        h3{
            font-size: 15px;
            color: #26A2FF;
            text-align: center;
            margin: 15px 0;
        }
        p{
            display: flex;
            justify-content: space-between;
            span{
                font-size:13px;
            }
        }
        .photoInfo_content{
            font-size:14px;
            line-height: 30px;
        }
        .photoInfoImg{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>
