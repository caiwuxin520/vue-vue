<template>
  <div class="newsLists">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsLists" :key="item.id">
        <router-link :to="'/home/newsInfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h3>{{item.title}}</h3>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dataFormat}}</span>
              <span>点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsLists: []
    };
  },
  created() {
    this.getNewsLists();
  },
  methods: {
    getNewsLists() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          this.newsLists = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.newsLists {
  .mui-media-body {
    h3 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: blue;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
