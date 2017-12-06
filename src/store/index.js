import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import * as api from '../api'

Vue.use(Vuex)

let state = {
    text:1
}

let actions={
    setText({ commit },info){
         commit('SET_TEXT', info);
    },
       
}

let mutations = {
    SET_TEXT(state,info){
        state.text = info;
    },
    
}
let getters = {
    text(state){
        return state.text+='o'

    }


}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})