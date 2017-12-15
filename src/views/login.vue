<template>
    <div class="login">
        <div class="login-box">
            <img src="../assets/image/a0.jpg">

            <el-form   class="mt30" >
                <el-form-item >
                    <el-input v-model="formData.user" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="formData.pwd" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
               
            </el-form>
            <el-button class="fr" @click="login" type="primary" :loading="loading">登录</el-button>

        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";
import * as api from "@/api/index.js";
import md5 from "md5";

export default {
  name: "login",
  data() {
    return {
      formData: {
        user: "",
        pwd: ""
      }
    };
  },

  methods: {
    login() {
      if (this.formData.user && this.formData.pwd) {
        this.formData.pwd = md5(this.formData.pwd);
        api
          .login(this.formData)
          .then(res => {
            if (res.code == 0) {
              Cookies.set("Token", res.token);
              Cookies.set("UI", JSON.stringify(res.account));
              this.$router.push("/index");
              
            } else {
              this.$message.error("账号密码错误");
              this.formData.pwd=""
            }
          })
          .catch(err => {
            this.$message.error("系统出错啦");
          });
      } else {
        this.$message.error("请输入账号密码");
      }
    }
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: rgb(48, 67, 86);

  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 250px;
    img {
      display: block;
      margin: 0 auto;
      width: 128px;
      height: 128px;
      border-radius: 50%;
    }
  }
}
</style>