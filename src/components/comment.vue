<template>
  <div class="comments">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要bb的内容,不超过120字" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="comments-list">
      <div class="cmt-item"  v-for="(item, i) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{ i + 1}}楼&nbsp;&nbsp;用户：{{ item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat}}</div>
        <div class="cmt-body">{{ item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getNewComments">加载更多</mt-button>
  </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        data(){
            return {
                pageindex:1,
                comments: [],
                msg:''
            }
        },
        created(){
            this.getComments()
        },
        methods: {
            getComments(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(result=>{
                    if(result.body.status === 0){
                       this.comments = this.comments.concat(result.body.message)
                    }
                })
            },
            getNewComments(){
              this.pageindex++
              this.getComments()
            },
            postComment(){
                //先判断内容是否为空
                if(this.msg.trim().length === 0){
                   return Toast("评论内容不能为空！");
                }

                this.$http.post("api/postcomment/"+this.id,{
                  content:this.msg.trim()
                }).then(result => {
                  if(result.body.status === 0){
                      var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                      }

                      this.comments.unshift(cmt)
                      this.msg = ""
                  }else{
                      return Toast("评论失败,请稍后重试！");
                  }
                })
            }
        },
        props:['id']
    };
</script>

<style lang="less" scoped>
.comments {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .comments-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
