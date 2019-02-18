<template>
    <div class="goodsinfo">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
             <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in banners" :key="index">
            <img :src="item.src">
        </mt-swipe-item>
        </mt-swipe>
        <!-- 中间购物数量区 -->
        <div class="goosinfo-content">
            <h3>{{gooslist.title}}</h3>
            <hr>
            <div class="goosinfo-price">
                <span class="old">
                    市场价:￥{{gooslist.market_price}}
                </span>
                <span class="now">
                    现价:￥{{gooslist.sell_price}}
                </span>
            </div>
            <div class="numbox">
                <span>购买数量:</span>
                <input type="button" value="-" @click="buyCount >= 2 && buyCount--" :disabled="buyCount == 1">
                <input type="num" v-model="buyCount" @change="filterMaxCount">
                <input type="button" value="+" @click="buyCount < gooslist.stock_quantity && buyCount++" :disabled="buyCount == gooslist.stock_quantity">
            </div>
            <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p>
        </div>

        <div class="goosinfo-box">
            <div class="goosinfo-subtitle">商品参数</div>
            <hr>
            <div class="goosinfo-boxcontent">
                <p>商品货号:{{gooslist.goods_no}}</p>
                <p>库存情况:{{gooslist.stock_quantity}}件</p>
                <p>上架时间:{{gooslist.add_time | dataFormat}}</p>
            </div>
            <hr>
            <div class="goosinfo-box-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            banners:[],
            gooslist:{},
            id:this.$route.params.id,
            buyCount:1,
            ballFlag:false
        }
    },
    created(){
        this.getBanners()
        this.getGoodsList()
    },
    methods:{
        getBanners(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.banners = result.body.message
                }
            })
        },
        getGoodsList(){
             this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.gooslist = result.body.message[0]
                }
            })
        },
        goDesc(id){
            this.$router.push('/home/goosDesc/'+id)
        },
        goComment(id){
             this.$router.push('/home/goodsComment/'+id)
        },
        filterMaxCount(){
           if(this.buyCount > this.gooslist.stock_quantity){
               this.buyCount = this.gooslist.stock_quantity
           }
        },
        addToShopCar(){
            this.ballFlag = ! this.ballFlag
            this.$store.commit('addToCar',{
                id:this.id,
                price:this.gooslist.sell_price,
                count:this.buyCount,
                selected:true
            })
        },
        // 开始执行动画之前所执行的钩子函数
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        // 开始执行动画后的钩子函数
        enter(el,done){
            el.offsetWidth
            //思路 求出input的坐标 和 徽标的坐标getBoundingClientRect()
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            const badgePosition = document.getElementById('badge').getBoundingClientRect()
            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top
         
            el.style.transform = `translate(${xDist}px,${yDist}px)`
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        //函数执行完成后
        afterEnter(el){
              this.ballFlag = ! this.ballFlag
        }
    }
}
</script>

<style lang="less" scoped>
    .goodsinfo{
        padding: 10px;
        .mint-swipe{
            height: 230px;
            background-color: #fff;
            text-align: center;
            padding: 15px;
            box-shadow: 0 0 15px #ccc;
            margin-bottom: 15px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .goosinfo-content{
            background-color: #fff;
            box-shadow: 0 0 10px #ccc;
            padding: 15px;
            margin-bottom: 15px;
            h3{
                text-align: center;
                font-size: 18px;
            }
            .goosinfo-price{
                margin-bottom: 10px;
                .old{
                     text-decoration:line-through;
                     font-size:14px;
                     color: #bbb;
                }
                .now{
                    font-size: 18px;
                    color: red;
                    margin-left: 10px;
                    font-weight: 700;
                }
            }
            .numbox{
                height: 50px;
                input{
                    width: 30px;
                    height: 30px;
                    margin-bottom: 0;
                    line-height: 50px;
                    padding: 0;
                    text-align: center;
                    line-height: 30px;
                    font-size: 12px;
                    color: #bbb;
                }
            }
        }
        .goosinfo-box{
            background-color: #fff;
            padding: 15px;
            .goosinfo-boxcontent{
                p{
                    line-height: 30px;
                }
            }
            .goosinfo-box-footer{
                margin: 25px 0;
                button{
                    margin-bottom: 15px;
                }
            }
        }
        .ball{
             width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 390px;
            left: 146px;
        }
    }
</style>
