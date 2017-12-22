import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import * as api from '../api'

Vue.use(Vuex)

let state = {
    loading: false,
    routerList:sessionStorage.getItem('routerList')?JSON.parse(sessionStorage.getItem('routerList')):[] //存储路由菜单   
}

let actions={
    setLoading({ commit }, loading) {
        commit('SET_LOADING', loading)
    },
    setRouterList({commit},info){
        commit('SET_ROUTER_LIST',info)
    }    
}

let mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ROUTER_LIST(state,info){
        sessionStorage['routerList']=info
        state.routerList=JSON.parse(info)
    }
    
}
let getters = {
    loading: state => state.loading,
    routerList: state => state.routerList,
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})