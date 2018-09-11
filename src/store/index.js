import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    res:''
  },
  mutations:{
    setRes(state,data){
        console.log(data.score)
        state.res=data
    },
  },
  actions:{
    getRes(context,data){
        context.commit('setRes',data)
    },
  }
})

export default store