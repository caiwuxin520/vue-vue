<template>
    <div class="goodslist">
        <div class="goodslist-content">
            <div class="goodslist-item" v-for="item in goodsList" :key="item.id" @click="getGoods(item.id)">
                <img :src="item.img_url">
                <div class="goodslist-box">
                    <h3>{{item.title}}</h3>
                    <div class="goodslist-info">
                        <p class="price">
                            <span class="now">￥{{item.sell_price}}</span>
                            <span class="old">￥{{item.market_price}}</span>
                        </p>
                        <p class="sell">
                            <span>热卖中</span>
                            <span>剩余{{item.stock_quantity}}件</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageindex:1,
            goodsList:[]
        }
    },
    created(){
       this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result => {
                if(result.body.status === 0){
                    this.goodsList =  this.goodsList.concat(result.body.message)   
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList()
        },
        getGoods(id){
            this.$router.push('/home/goodinfo/'+id)
        }
    }
}
</script>

<style lang="less" scoped>
.goodslist-content{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-between;
    .goodslist-item{
        width: 49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        padding: 2px;
        margin: 4px 0;
        min-height: 293px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            width: 100%;
        }
        .goodslist-box{
            h3{
                font-size: 16px;
                margin: 5px 0;
            }
            .goodslist-info{
                p{
                    margin-bottom: 0;
                    padding: 5px 0;
                }
                .price{
                    .now{
                        font-size: 15px;
                        color: red;
                        font-weight: 700;
                    }
                    .old{
                        font-size: 12px;
                        margin-left: 10px;
                        text-decoration:line-through;
                    }
                }
                .sell{
                    font-size: 13px;
                    display: flex;
                    justify-content: space-between;
                    padding-left: 5px;
                    padding-right: 5px;
                }
            }
        }
    }
}


</style>
