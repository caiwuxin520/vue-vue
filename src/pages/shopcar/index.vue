<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}}</h1>
              <!-- 问题：如何从购物车中获取商品的数量呢 -->
              <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
              <div class="numbox">
                <span class="price">￥{{item.sell_price}}</span>
                <div class="num">
                  <input type="button" value="-" @click="subtract(item.id)">
                  <input type="number" v-model="goodsCount[item.id]">
                  <input type="button" value="+" @click="increment(item.id)">
                </div>
                <a href="#" @click.prevent ="remove(item.id,i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red"></span> 件， 总价
              <span class="red">￥</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        goodslist:[], //商品数据
        goodsCount:this.$store.getters.goodsCount
      }
    },
    created(){
      this.getGoodsList()
    },
    methods:{
      getGoodsList(){
        let idArr = [] //商品id数组
        this.$store.state.car.forEach(item => idArr.push(item.id));
        //如果没有idArr不要请求 否则会报错
        if( idArr.length <= 0){
          return  
        }

        //获取购物车列表
        this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result => {
          this.goodslist = result.body.message
        })

      },
      subtract(id){
        this.goodsCount[id] > 1 && this.goodsCount[id]--
        this.$store.commit('updateCount',{id:id,count:this.goodsCount[id]})
       },
      increment(id){
        this.goodsCount[id] ++
        this.$store.commit('updateCount',{id:id,count:this.goodsCount[id]})
      },
      remove(id,index){
        this.goodslist.splice(index,1)
        this.$store.commit('removeFromCar',id)
      }
    }
}
</script>

<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    .numbox {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      input {
        float: left;
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        text-align: center;

        &[type="number"] {
          border-left: 0;
          border-right: 0;
          font-size: 12px;
          color: gray;
        }
      }
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
