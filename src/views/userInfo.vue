<template>
  <div >
    <div class="loginAccount">
      <span class="addBold">登录账号</span>  luban
    </div>
    <div class="passwordAccount">
      <span class="addBold">账号密码</span> *******
      <el-button type="success" @click="passwordShow=true">修改密码</el-button>      
      <!-- <p>修改密码请点击右边"修改密码"链接</p> -->
    </div>
    <div class="reviseName">
      <span class="addBold">修改姓名</span> luban
      <el-button type="success" @click="nameShow=true">修改姓名</el-button>
      <!-- <p>修改密码请点击右边"修改姓名"链接</p> -->

    </div>
    <div class="reviseBirth">
      <span class="addBold">设置生日</span> 2017-12-15
      <el-button type="success" @click="birthShow=true">设置生日</el-button>
      <!-- <p>修改密码请点击右边"设置生日"链接</p>             -->
    </div>
    <el-dialog title="修改密码":visible.sync="passwordShow">
      <el-form label-width="80px" >
        <el-form-item label="原始密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="passwordShow = false">返回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改姓名":visible.sync="nameShow">
      <el-form label-width="80px" >
        <el-form-item label="姓名">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="nameShow = false">返回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置生日":visible.sync="birthShow">
      <el-form label-width="80px" >
        <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="birthShow = false">返回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import mixin from "@/minix/index.js";
  import * as utils from "@/utils/index";
  export default {
    name: "userInfo",
    mixins: [mixin],
    mounted() {
    },
    data() {
      return {
        passwordShow:false,
        nameShow:false,
        birthShow:false,
        form: {
          oldPassword: "",
          newPassword: "",
          currentPassword: ""
        },
        rules: {
        oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        currentPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
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

  .loginAccount,.passwordAccount ,.reviseName ,.reviseBirth{
    margin-top:30px;
    margin-bottom: 20px;
    margin-left: 30%;
    .addBold{
            font-weight: 800;
    }
     }

 

</style>