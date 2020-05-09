import axios from 'axios';

export default{
    namespaced:true,
    state:{
        advogados:[],
        advogado:{}

    },
    mutations:{
        setAdvogados(state,advs){           
            state.advogados = advs
        }
    },
    actions:{
        getAdvogados(context){
            return axios.get('/api/empregado/advogado').then((response)=>{
                context.commit('setAdvogados',response.data)
            })
        }
    },
    getters:{
        advogadoAcervo: function(state){
            return state.advogados
        },
        advogadoRedistribuicao: function(state){
            return state.advogados
        },
        advogadoJaAtuou: function(state){
            return state.advogados
        }

    }
}