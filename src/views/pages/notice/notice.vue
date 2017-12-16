<template>
    <div>
        <div class="addNotice">
        <el-input class="mt20 mb20" type="text" placeholder="请输入标题"></el-input>    
        <el-input 
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10}"
        placeholder="请输入内容"
        v-model="cotennt">
        </el-input>
         <div>
            <el-button class="fr mt20" type="success" @click="sentNotice">发送通知</el-button>
        </div>
        </div>
       
      
    </div>
</template>
<script>
  import mixin from "@/minix/index.js";
  import * as utils from "@/utils/index";
  export default {
    name: "notice",
    mixins: [mixin],
    mounted() {
    },
    data() {
      return {
        cotennt:''
      };
    },

    methods: {
        sentNotice(){
            if(this.cotennt===""){
                alert('请输入通知')
            }
            else{
                this.successMsg();
            }
        }
    }
  }

</script>
<style scoped lang='scss'>

 .addNotice{
     width: 80%;
     margin: 10px auto;
 }

 

</style>
