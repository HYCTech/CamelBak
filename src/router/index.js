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
import priWaitCheck from '../views/pages/serviceMag/private/priWaitCheck.vue'
import pubCancelService from '../views/pages/serviceMag/public/pubCancelService.vue'
import pubDoneSerivice from '../views/pages/serviceMag/public/pubDoneSerivice.vue'
import pubNowService from '../views/pages/serviceMag/public/pubNowService.vue'
import pubWaitCheck from '../views/pages/serviceMag/public/pubWaitCheck.vue'

import publicAcc from '../views/pages/accountMag/publicAcc.vue'
import proprietirsAcc from '../views/pages/accountMag/proprietirsAcc.vue'
import repairAcc from '../views/pages/accountMag/repairAcc.vue'


import inquiry from '../views/pages/voteMag/inquiry.vue'
import vote from '../views/pages/voteMag/proprietorsVote.vue'

import order from '../views/pages/business/order.vue'
import acceptance from '../views/pages/business/acceptance.vue'

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
      component: login

    },
    
    {
      path: '/index',
      name: '人员管理',
      component: index,
      title: '正在使用人员',
      children: [
        { path: '/index/proprietors', name: '业主', component: proprietors },
        { path: '/index/propertyOfc', name: '物业处人员', component: propertyOfc }
      ]
    },
    {
      path: '/index',
      name: '维修管理',
      component: index,
      title: '个人维修',
      children: [
        { path: '/index/priWaitCheck', name: '待审核维修单', component: priWaitCheck },
        { path: '/index/priNowService', name: '正在维修', component: priNowService },
        { path: '/index/priDoneService', name: '已完成维修', component: priDoneService },
        { path: '/index/priCancelService', name: '已取消维修', component: priCancelService },
      ]
    },
    {
      path: '/index',
      name: '维修管理',
      component: index,
      title: '公共维修',
      children: [
        { path: '/index/pubWaitCheck', name: '待审核维修单', component: pubWaitCheck },
        { path: '/index/pubNowService', name: '正在维修', component: pubNowService },
        { path: '/index/pubDoneService', name: '已完成维修', component: pubDoneSerivice },
        { path: '/index/pubCancelService', name: '已取消维修', component: pubCancelService },
      ]
    },
    {
      path: '/index',
      name: '统计管理',
      component: index,
      children: [
        { path: '/index/publicAcc', name: '公共维修材料统计', component: publicAcc},
        { path: '/index/proprietirsAcc', name: '业主家中收费统计', component: proprietirsAcc },
        { path: '/index/repairAcc', name: '维修完成情况统计', component: repairAcc }
      ]
    },
    {
      path: '/index',
      name: '投票管理',
      component: index,
      children: [
        { path: '/index/inquiry', name: '大项维修意见征询', component: inquiry},
        { path: '/index/vote', name: '业主投票', component: vote }
      ]
    },
    {
      path: '/index',
      name: '业务收发',
      component: index,
      children: [
        { path: '/index/order', name: '接单', component: order },
        { path: '/index/acceptance', name: '验收', component: acceptance }
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

  ]
})
