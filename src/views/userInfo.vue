<template>
  <div >
    <div class="loginAccount">
      <span class="addBold">登录账号</span>  luban
    </div>
    <div class="passwordAccount">
      <span class="addBold">账号密码</span> *******
      <el-button type="text" @click="changePassword()">修改密码</el-button>      
      <!-- <p>修改密码请点击右边"修改密码"链接</p> -->
    </div>
    <div class="reviseName">
      <span class="addBold">修改姓名</span> luban
      <el-button type="text" @click="nameShow=true">修改姓名</el-button>
      <!-- <p>修改密码请点击右边"修改姓名"链接</p> -->

    </div>
    <div class="reviseBirth">
      <span class="addBold">设置生日</span> 2017-12-15
      <el-button type="text" @click="birthShow=true">设置生日</el-button>
      <!-- <p>修改密码请点击右边"设置生日"链接</p>             -->
    </div>
    <el-dialog title="修改密码" :visible.sync="passwordShow">
      <el-form :model="passwordForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="currentPassword">
          <el-input v-model="passwordForm.currentPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="passwordShow = false">返回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改姓名" :visible.sync="nameShow">
      <el-form :model="changeNameForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="changeName">
          <el-input v-model="changeNameForm.changeName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="okModel">确 定</el-button>
        <el-button @click="nameShow = false">返回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置生日" :visible.sync="birthShow">
      <el-form :model="birthForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="生日" prop="birthDate">
            <el-date-picker v-model="birthForm.birthDate" type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
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
        passwordForm: {
          oldPassword: "",
          newPassword: "",
          currentPassword: ""
        },
        changeNameForm:{
          changeName:''
        },
        birthForm:{
          birthDate:''
        }
      };
    },

    methods: {

      changePassword(){
        this.passwordShow=true
        this.passwordForm=utils.emptyObject(this.passwordForm) 
      },
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