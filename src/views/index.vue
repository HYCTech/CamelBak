<template>
    <div class="index">
        <div class="main">
            <div class="nav">
                <div class="nav-title">
                    <img src="../assets/image/logo.jpeg" />
                    <span class="logo-text">永兴</span>
                </div>
                
                <el-menu unique-opened :default-active="active"   class="" theme="dark">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>人员管理</template>
                         <el-submenu index="1-1">
                            <template slot="title">正在使用人员</template>
                            <el-menu-item index="1-1-1" @click="$router.push('/index/proprietors')">业主</el-menu-item>
                            <el-menu-item index="1-1-2" @click="$router.push('/index/propertyOfc')">物业处人员</el-menu-item>
                            <el-menu-item index="1-1-3" @click="$router.push('/index/maintenance')">维修工</el-menu-item>
                        </el-submenu>
                    </el-submenu>

                     <el-submenu index="2">
                        <template slot="title"><i class="el-icon-setting"></i>维修管理</template>
                         <el-submenu index="2-1">
                            <template slot="title">个人维修</template>
                            <el-menu-item index="2-1-1" @click="$router.push('/index/priNowService')">正在维修</el-menu-item>
                            <el-menu-item index="2-1-2" @click="$router.push('/index/priDoneService')">已完成维修</el-menu-item>
                            <el-menu-item index="2-1-3" @click="$router.push('/index/priCancelService')">已取消维修</el-menu-item>
                        </el-submenu>

                        <el-submenu index="2-2">
                            <template slot="title">公共维修</template>
                            <el-menu-item index="2-2-1"  @click="$router.push('/index/pubNowService')">正在维修</el-menu-item>
                            <el-menu-item index="2-2-2"  @click="$router.push('/index/pubDoneService')">已完成维修</el-menu-item>
                            <el-menu-item index="2-2-3"  @click="$router.push('/index/pubCancelService')">已取消维修</el-menu-item>
                        </el-submenu>
                         <!--<el-menu-item index="2-3"  @click="$router.push('/index/waitCheck')">待验收维修单</el-menu-item>-->
                          <el-menu-item index="2-4"  @click="$router.push('/index/waitHanding')">待处理维修单</el-menu-item>

                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-edit"></i>统计管理</template>
                         <el-menu-item index="3-1" @click="$router.push('/index/publicAcc')">公共维修材料统计</el-menu-item>
                         <el-menu-item index="3-2" @click="$router.push('/index/proprietirsAcc')">业主家中收费统计</el-menu-item>
                         <el-menu-item index="3-3" @click="$router.push('/index/repairAcc')">维修完成情况统计</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>投票管理</template>
                         <el-menu-item index="4-1"  @click="$router.push('/index/inquiry')">大项维修意见征询</el-menu-item>
                         <el-menu-item index="4-2"  @click="$router.push('/index/vote')">业主投票</el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-message"></i>业务收发</template>
                         <el-menu-item index="5-1" @click="$router.push('/index/order')">接单</el-menu-item>
                         <el-menu-item index="5-2" @click="$router.push('/index/acceptance')">验收</el-menu-item>
                    </el-submenu>
                     <el-menu-item index="6" @click="$router.push('/index/notice')"><i class="el-icon-warning"></i>通知</el-menu-item>
                      <el-menu-item index="7" @click="$router.push('/index/setting')"><i class="el-icon-setting"></i>设置</el-menu-item>
                 

                </el-menu>

            </div>
            <div class="content">
                <div class="userInfo">
                   <el-button class="mt10 pr10 pl10" type="text" :loading="loading"></el-button>
                 
                  <div class="fr userInfo-c">
                  <span class="mr25">小区</span>

                   <el-dropdown trigger="click">
                      <span class="el-dropdown-link">   
                        <i class="el-icon-message"> <el-badge class="mark" :value="waitHandCount" /></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <!--<el-dropdown-item class="clearfix" @click.native="got('/index/waitCheck','2-3')" >
                          待验收维修单
                          <el-badge class="mark" :value="waitHandNum" />
                        </el-dropdown-item>-->
                        <el-dropdown-item class="clearfix" @click.native="got('/index/waitHanding','2-4')" >
                          待处理维修单
                          <el-badge class="mark" :value="waitHandCount" />
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>

                      <el-dropdown>
                        <span class="el-dropdown-link">
                         <img src="../assets/image/a0.jpg"> {{ui.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="got('/index/userInfo',0)"><i class="el-icon-document"></i>个人资料</el-dropdown-item>
                          <el-dropdown-item><i class="el-icon-plus"></i> 锁屏</el-dropdown-item>
                          <el-dropdown-item @click.native="logOut" ><i class="el-icon-circle-cross"></i>退出</el-dropdown-item>
                          
                        </el-dropdown-menu>
                      </el-dropdown>
                      
                  </div>
                </div>
                <div class="body-title">{{$route.name}}</div>
                <div class="view">
                    <div class="router">
                      <router-view></router-view>
                    </div>


                </div>
            </div>
        </div>
        <div class="bottom"><span>2017 © bullstech</span></div>
    </div>
</template>

<script>
import router from "../router/index";
import * as utils from "../utils/index";
import {  mapState ,mapGetters } from 'vuex'
import mixin from "@/minix/index.js";
export default {
  name: "index",
  mixins: [mixin],
  mounted() {
    //this.PATH= utils.changeNav(router.options.routes)
    //console.log(this.PATH, 1);
    this.getwaitHandNum()
  },
  data() {
    return {
      PATH: [],
      ui:JSON.parse(Cookies('UI')),
      userPic: "",
      active: this.$route.meta.index
    };
  },

  methods: {
    //退出登录
    logOut() {
      Cookies.set('Token','')
      Cookies.set('UI','')
      this.$router.push("/login");
    },
    got(url,i){
      this.$router.push(url)
      this.active=i

    }
  },
  computed:{
    ...mapState(['loading','routerList']),
    ...mapGetters(['loading','routerList'])
  },
};
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;
  .main {
    height: 100%;

    .nav {
      padding-bottom: 30px;
      width: 200px;
      position: fixed;

      height: 100%;
      background: #33485c;
      .nav-title {
        padding: 12px 0;
        height: 30px;
        background: #2f4355;
        line-height: 30px;
        img {
          float: left;
          margin-left: 17px;
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }
        .logo-text {
          float: left;
          font-size: 18px;
          color: white;
          font-weight: 700;
        }
      }
    }
    .content {
      padding-bottom: 30px;
      width: 100%;

      height: 100%;
      background: rgb(240, 242, 245);

      .userInfo {
       
        padding: 0px 20px 0px 220px;
        background: rgb(42, 59, 76);
        height: 50px;
        .userInfo-c {
          span {
            float: left;
            line-height: 50px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
          }
          img {
            float: left;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin: 13px 5px 13px 13px;
          }
        }
      }
      .body-title {
        background: #ffffff;
        border-bottom: 1px solid rgb(217, 219, 222);
        padding: 0px 20px 0px 220px;
        font-size: 25px;
        height: 50px;
        line-height: 50px;
      }
      .view {
        background: rgb(240, 242, 245);
        padding: 15px 15px 45px 215px;
        overflow: auto;

        .router {
          background: #fff;
          border: 1px solid #cccccc;
          border-radius: 4px;
          padding-bottom: 50px;
        }
      }
    }
  }

  .bottom {
    height: 30px;
    position: fixed;
    background: #2a3b4c;
    width: 100%;
    z-index: 100;
    bottom: 0;
    text-align: right;
    box-sizing: border-box;
    padding: 7px 20px;
    font-size: 12px;
    color: #ffffff;
  }
}

.el-dropdown-menu {
  font-size: 12px;
}
</style>