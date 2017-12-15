import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '../views/index.vue'
import login from '../views/login.vue'
import proprietors from '../views/pages/peopleMag/nowUserPeople/proprietors.vue'
import propertyOfc from '../views/pages/peopleMag/nowUserPeople/propertyOfc.vue'
import priCancelService from '../views/pages/serviceMag/private/priCancelService.vue'
import priDoneService from '../views/pages/serviceMag/private/priDoneService.vue'
import priNowService from '../views/pages/serviceMag/private/priNowService.vue'

import pubCancelService from '../views/pages/serviceMag/public/pubCancelService.vue'
import pubDoneSerivice from '../views/pages/serviceMag/public/pubDoneSerivice.vue'
import pubNowService from '../views/pages/serviceMag/public/pubNowService.vue'

import waitCheck from '../views/pages/serviceMag/waitCheck.vue'
import waitHanding from '../views/pages/serviceMag/waitHanding.vue'


import publicAcc from '../views/pages/accountMag/publicAcc.vue'
import proprietirsAcc from '../views/pages/accountMag/proprietirsAcc.vue'
import repairAcc from '../views/pages/accountMag/repairAcc.vue'


import inquiry from '../views/pages/voteMag/inquiry.vue'
import vote from '../views/pages/voteMag/proprietorsVote.vue'

import order from '../views/pages/business/order.vue'
import acceptance from '../views/pages/business/acceptance.vue'

import notice from '../views/pages/notice/notice.vue'
import setting from '../views/pages/settting/setting.vue'

import userInfo from '../views/userInfo.vue'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{auth:true}

    },
    
    {
      path: '/index',
      name: '人员管理',
      component: index,
      title: '正在使用人员',
      menu:true,
      children: [
        { path: '/index/proprietors', name: '业主', component: proprietors ,meta:{index:'1-1-1'}},
        { path: '/index/propertyOfc', name: '物业处人员', component: propertyOfc ,meta:{index:'1-1-2'} }
      ]
    },
    {
      path: '/index',
      name: '维修管理',
      component: index,
      title: '个人维修',
      menu:true,
      children: [
        { path: '/index/priNowService', name: '正在维修', component: priNowService ,meta:{index:'2-1-1'} },
        { path: '/index/priDoneService', name: '已完成维修', component: priDoneService ,meta:{index:'2-1-2'}},
        { path: '/index/priCancelService', name: '已取消维修', component: priCancelService ,meta:{index:'2-1-3'}},
      ]
    },
    {
      path: '/index',
      name: '维修管理',
      component: index,
      menu:true,

      children: [
        { path: '/index/waitCheck', name: '待审核维修单', component: waitCheck ,meta:{index:'2-3'}},
        { path: '/index/waitHanding', name: '待处理维修单', component: waitHanding ,meta:{index:'2-4'}}, 
      ]
    },
    {
      path: '/index',
      name: '维修管理',
      component: index,
      title: '公共维修',
      menu:true,
      children: [
        { path: '/index/pubNowService', name: '正在维修', component: pubNowService ,meta:{index:'2-2-1'}},
        { path: '/index/pubDoneService', name: '已完成维修', component: pubDoneSerivice ,meta:{index:'2-2-2'}},
        { path: '/index/pubCancelService', name: '已取消维修', component: pubCancelService ,meta:{index:'2-2-3'}},
      ]
    },
    {
      path: '/index',
      name: '统计管理',
      component: index,
      menu:true,
      children: [
        { path: '/index/publicAcc', name: '公共维修材料统计', component: publicAcc ,meta:{index:'3-1'}},
        { path: '/index/proprietirsAcc', name: '业主家中收费统计', component: proprietirsAcc ,meta:{index:'3-2'}},
        { path: '/index/repairAcc', name: '维修完成情况统计', component: repairAcc,meta:{index:'3-3'} }
      ]
    },
    {
      path: '/index',
      name: '投票管理',
      component: index,
      menu:true,
      children: [
        { path: '/index/inquiry', name: '大项维修意见征询', component: inquiry,meta:{index:'4-1'}},
        { path: '/index/vote', name: '业主投票', component: vote,meta:{index:'4-2'} }
      ]
    },
    {
      path: '/index',
      name: '业务收发',
      component: index,
      menu:true,
      children: [
        { path: '/index/order', name: '接单', component: order ,meta:{index:'5-1'}},
        { path: '/index/acceptance', name: '验收', component: acceptance,meta:{index:'5-2'} }
      ]
    },

    {
      path: '/index',
      name: '用户信息',
      component: index,
      children: [
        { path: '/index/userInfo', name: '个人信息', component: userInfo },
       
      ]
    },
    {
      path: '/index',
      name: '通知',
      component: index,
      children: [
        { path: '/index/notice', name: '通知', component: notice ,meta:{index:'6'}},
       
      ]
    },
    {
      path: '/index',
      name: '设置',
      component: index,
      children: [
        { path: '/index/setting', name: '设置', component: setting ,meta:{index:'7'}},
       
      ]
    },

  ]
})
