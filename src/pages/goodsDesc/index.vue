<template>
    <div class="goodsDesc">
        <h3>{{goodsDesclist.title}}</h3>
        <hr>
        <div class="goodsDesc-content" v-html="goodsDesclist.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodsDesclist:{}
        }
    },
    created() {
        this.getGoodsDescList()
    },
    methods:{
        getGoodsDescList(){
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsDesclist = result.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="less">
.goodsDesc{
    padding: 5px;
    h3{
         text-align: center;
        font-size: 18px;
        color:#2233ff;
        margin: 15px 0;
    }
    .goodsDesc-content{
        img{
            width: 100%;
        }
    }
}
</style>
