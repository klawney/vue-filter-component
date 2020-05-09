import Vuex from 'vuex'
import Vue from 'vue'
import * as VueDeepSet from 'vue-deepset'

Vue.use(Vuex)
Vue.use(VueDeepSet)
import processo from './modules/processo'
import audiencia from './modules/audiencia'
import advogado from './modules/advogado'
import empregado from './modules/empregado'
import testemunha from './modules/testemunha'
import preposto from './modules/preposto'
import unidade from './unidade'

export default new Vuex.Store({
  namespaced: true,
    mutations: VueDeepSet.extendMutation(),
    modules:{
      audiencia : audiencia,
      advogado : advogado,
      empregado : empregado,
      testemunha : testemunha,
      preposto : preposto,
      processo : processo,
      unidade : unidade
    }
})

