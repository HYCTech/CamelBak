<template>
  <div >
    <div class="addVillage">
   
      <el-button type="success" @click="addShow=true" style="margin-right:10px;">添加小区</el-button>  
       <el-button type="success" @click="removeShow=true">移除小区</el-button>    

    </div>
   <el-dialog title="添加小区":visible.sync="addShow">
      <el-form label-width="80px" >
        <el-form-item label="小区姓名">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="addShow = false">返回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="移除小区":visible.sync="removeShow">
      <el-form label-width="80px" >
        <el-form-item label="小区姓名">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="removeShow = false">返回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import mixin from "@/minix/index.js";
  import * as utils from "@/utils/index";
  export default {
    name: "setting",
    mixins: [mixin],
    mounted() {
    },
    data() {
      return {
        addShow:false,
        removeShow:false
      };
    },

    methods: {


      //莫谈框点击确定
      okModel() {
          this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log("submit!");
          if (this.isAdd) {
            //添加操作
           
          } else {
           
          }
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      }
    }
  }

</script>


<style scoped lang='scss'>

 

 

</style>