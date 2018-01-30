import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import * as api from '../api/repairManagement'

Vue.use(Vuex)

let state = {
    loading: false,
    routerList:sessionStorage.getItem('routerList')?JSON.parse(sessionStorage.getItem('routerList')):[], //存储路由菜单  
    waitHandNum:'' 
}

let actions={
    setLoading({ commit }, loading) {
        commit('SET_LOADING', loading)
    },
    setRouterList({commit},info){
        commit('SET_ROUTER_LIST',info)
    },
    setWaitHandNum({commit}){
        api.getCountByTableName('order',{"order_state":"waitting"}).then(res=>{
            commit('SET_WAITING_NUM',res.total)
           })
    }    
}

let mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ROUTER_LIST(state,info){
        sessionStorage['routerList']=info
        state.routerList=JSON.parse(info)
    },
    SET_WAITING_NUM(state,total){
        state.waitHandNum=total
    }
    
}
let getters = {
    loading: state => state.loading,
    routerList: state => state.routerList,
    waitHandNum:state => state.waitHandNum
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})