<template>
    <div>
        <el-dialog title="大图" :visible.sync="dialogShow" :fullscreen="true" top="1vh" :show-close="false">
            <div class="img-box">
                <img :src="imgUrl" :style="{height}">            
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogShow = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'bigImg',
  props:['imgUrl','dialogShow'],
  data () {
    return {
    }
  },
  computed:{
      height(){
          return (document.documentElement.clientHeight-200)+'px'
      }
  }
}
</script>
<style lang="scss" scoped>
 .img-box {
     text-align:center;
 }
 img {
    width:90%;
    height:80%;
}
</style>