import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import * as api from '../api'

Vue.use(Vuex)

let state = {
    loading: false,
    
}

let actions={
    setLoading({ commit }, loading) {
        commit('SET_LOADING', loading)
    },
    
       
}

let mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    },
   
    
}
let getters = {
 


}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})