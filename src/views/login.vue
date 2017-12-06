<template>
    <div class="login">
        <div class="login-box">
            <img src="../assets/image/a0.jpg">

            <el-form   class="mt30" >
                <el-form-item >
                    <el-input v-model="formData.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
               
            </el-form>
            <el-button class="fr" @click="login" type="primary">登录</el-button>

        </div>

    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formData:{
                    username:'',
                    password:''
                }
            };
        },

        methods:{
            login(){
                if(this.formData.username=='luban'&&this.formData.password==123456){
                    this.$router.push('/index');
                }else{
                    this.$message.error('账号密码错误');
                }
            } 
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