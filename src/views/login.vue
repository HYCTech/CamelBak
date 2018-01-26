<template>
    <div class="login">
        <div class="login-box" >
            <img src="../assets/image/a0.jpg">

            <el-form   class="mt30" >
                <el-form-item >
                    <el-input v-model="formData.user" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="formData.pwd" type="password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
                </el-form-item>
               
            </el-form>
            <el-button class="fr" @click.native="login"  type="primary" :loading="loading">登录</el-button>

        </div>

    </div>
</template>

<script>
import { mapState ,mapActions } from "vuex";
import * as api from "@/api/index.js";
import router from "@/router"
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
    ...mapActions(['setRouterList']),
    login() {
      if (this.formData.user && this.formData.pwd) {
        let loginForm=Object.assign({},this.formData)
        loginForm.pwd=md5(loginForm.pwd);
        api
          .login(loginForm)
          .then(res => {
            if (res.code == 0) {
              this.setRouterList(JSON.stringify(router.options.routes.filter((i)=> i.menu)))
              Cookies.set("Token", res.token);
              Cookies.set("UI", JSON.stringify(res.account));  
              this.$router.push("/index/proprietors");            
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