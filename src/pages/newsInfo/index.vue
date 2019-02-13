<template>
    <div class="newsInfo">
        <h3 class="newsInfo-title">{{newsInfo.title}}</h3>
        <p class="newsInfo-subtitle">
            <span>发表时间:{{newsInfo.add_time | dataFormat}}</span>
            <span>点击:{{newsInfo.click}}次</span>
        </p>

        <hr />

        <div class="newsInfo-content" v-html="newsInfo.content"></div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.newsInfo = result.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="less">
    .newsInfo{
        padding: 4px;
        .newsInfo-title{
            color: red;
            font-size: 16px;
            text-align: center;
            margin: 10px 0;
        }
        .newsInfo-subtitle{
            color: blue;
            font-size: 12px;
            display: flex;
            justify-content:space-between;
        }
        .newsInfo-content{
            img{
                width: 100%;
            }
        }
    }
</style>
