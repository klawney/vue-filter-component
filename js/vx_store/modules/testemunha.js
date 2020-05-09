import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
export default {
    namespaced: true,
    state: {
        testemunha: {},
    },

    mutations: {
        setTestemunhas(state, data) {
            // testemunha = testemunha.map((aud) => {
            //     return aud
            // })
            state.testemunhas = data
        },
        setTestemunha(state, data) {
            data.empregado ? Vue.set(data.empregado, 'desc', data.empregado.usuario + ' - ' + data.empregado.nome) : false            
            state.testemunha = data
            // console.log(state.testemunha);
        },
        resetTestemunha(state) {
            state.testemunha = {}
        },
    },

    actions: {      
        resetTestemunha(context) {
            context.commit('resetTestemunha')
        },

        getTestemunhaAud(context, aud) {
            return axios.get('/api/audiencia/' + aud.id + '/testemunha')
                .then(response => {
                    // filtro pode ser desnecessário se API retornar corretamente
                    let data = _.first(_.filter(response.data,(x)=>{return x.audiencia_id == aud.id}))  
                    context.commit('setTestemunha', data || {})
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
        },
       
        
    },

    getters: {

    }

}