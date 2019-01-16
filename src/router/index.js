import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

const peopleMagNow=`pages/peopleMag/nowUserPeople`

const serviceMag=`pages/serviceMag`
const serviceMagPri=`pages/serviceMag/private`
const serviceMagPub=`pages/serviceMag/public`

const accountMag=`pages/accountMag`

const voteMag=`pages/voteMag`

const notice=`pages/notice`

//const setting=`pages/setting`
 //你把文件夹改成setting试一下，我这一直报错说找不到,不对文件夹只能叫settingd,见鬼了
const setting=`pages/settingd`
//console.log('aa',_import(`${setting}/setting`))

const business=`pages/business`

const materialMag=`pages/materialMag`

import Hello from '@/components/Hello'





Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Root',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: _import('login'),
            meta: { auth: true }

        },

        {
            path: '/index',
            name: '人员管理',
            component:  _import('index'),
            title: '正在使用人员',
            menu: true,
            children: [
                { path: '/index/proprietors', name: '业主', component:  _import(`${peopleMagNow}/proprietors`), meta: { index: '1-1-1' } },
                { path: '/index/propertyOfc', name: '物业处人员', component:  _import(`${peopleMagNow}/propertyOfc`), meta: { index: '1-1-2' } },
                { path: '/index/maintenance', name: '维修工', component:  _import(`${peopleMagNow}/maintenance`), meta: { index: '1-1-3' } }
            ]
        },


        {
            path: '/index',
            name: '维修管理',
            component: _import('index'),
            title: '个人维修',
            menu: true,
            children: [
                { path: '/index/priNowService', name: '正在维修', component: _import(`${serviceMagPri}/priNowService`), meta: { index: '2-1-1' } },
                { path: '/index/priDoneService', name: '已完成维修', component: _import(`${serviceMagPri}/priDoneService`), meta: { index: '2-1-2' } },
                { path: '/index/priCancelService', name: '已取消维修', component: _import(`${serviceMagPri}/priCancelService`), meta: { index: '2-1-3' } },
            ]
        },
        {
            path: '/index',
            name: '维修管理',
            component:  _import('index'),
            menu: true,

            children: [
                { path: '/index/waitCheck', name: '待审核维修单', component:_import(`${serviceMag}/waitCheck`) , meta: { index: '2-3' } },
                { path: '/index/waitHanding', name: '待处理维修单', component: _import(`${serviceMag}/waitHanding`) , meta: { index: '2-4' } },
            ]
        },
        {
            path: '/index',
            name: '维修管理',
            component:  _import('index'),
            title: '公共维修',
            menu: true,
            children: [
                { path: '/index/pubNowService', name: '正在维修', component: _import(`${serviceMagPub}/pubNowService`), meta: { index: '2-2-1' } },
                { path: '/index/pubDoneService', name: '已完成维修', component: _import(`${serviceMagPub}/pubDoneSerivice`), meta: { index: '2-2-2' } },
                { path: '/index/pubCancelService', name: '已取消维修', component: _import(`${serviceMagPub}/pubCancelService`), meta: { index: '2-2-3' } },
            ]
        },
        {
            path: '/index',
            name: '统计管理',
            component:  _import('index'),
            menu: true,
            children: [
                { path: '/index/publicAcc', name: '公共维修材料统计', component: _import(`${accountMag}/publicAcc`), meta: { index: '3-1' } },
                { path: '/index/proprietirsAcc', name: '业主家中收费统计', component: _import(`${accountMag}/proprietirsAcc`), meta: { index: '3-2' } },
                { path: '/index/repairAcc', name: '维修完成情况统计', component: _import(`${accountMag}/repairAcc`), meta: { index: '3-3' } }
            ]
        },
        {
            path: '/index',
            name: '投票管理',
            component:  _import('index'),
            menu: true,
            children: [
                { path: '/index/inquiry', name: '大项维修意见征询', component: _import(`${voteMag}/inquiry`), meta: { index: '4-1' } },
                { path: '/index/vote', name: '业主投票', component: _import(`${voteMag}/proprietorsVote`), meta: { index: '4-2' } }
            ]
        },
        {
            path: '/index',
            name: '业务收发',
            component:  _import('index'),
            menu: true,
            children: [
                { path: '/index/order', name: '接单', component:  _import(`${business}/order`), meta: { index: '5-1' } },
                { path: '/index/acceptance', name: '验收', component:  _import(`${business}/acceptance`), meta: { index: '5-2' } }
            ]
        },

        {
            path: '/index',
            name: '用户信息',
            component:  _import('index'),
            children: [
                { path: '/index/userInfo', name: '个人信息', component: _import('userInfo'),meta: { index: '10' } },

            ]
        },
        {
            path: '/index',
            name: '通知',
            component:  _import('index'),
            menu: true,
            children: [
                { path: '/index/notice', name: '通知', component: _import(`${notice}/notice`), meta: { index: '6' } },

            ]
        },
      {
        path: '/index',
        name: '材料管理',
        component:  _import('index'),
        menu: true,
        children: [
          { path: '/index/material', name: '材料管理', component: _import(`${materialMag}/material`), meta: { index: '11' } },

        ]
      },
        {
            path: '/index',
            name: '设置',
            component:  _import('index'),
            menu: true,
            children: [
                { path: '/index/setting', name: '设置',component: _import(`${setting}/setting`) , meta: { index: '7' } },

            ]
        },

    ]
})
