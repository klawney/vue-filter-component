import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
export default {
    namespaced: true,
    state: {
        preposto: {},
    },

    mutations: {
        setPrepostos(state, data) {
            // preposto = preposto.map((aud) => {
            //     return aud
            // })
            state.prepostos = data
        },
        setPreposto(state, data) {
            data.empregado ? Vue.set(data.empregado, 'desc', data.empregado.usuario + ' - ' + data.empregado.nome) : false            
            state.preposto = data
            // console.log(state.preposto);
        },
        resetPreposto(state) {
            state.preposto = {}
        },
    },

    actions: {      
        resetPreposto(context) {
            context.commit('resetPreposto')
        },

        getPrepostoAud(context, aud) {
            return axios.get('/api/audiencia/' + aud.id + '/preposto')
                .then(response => {
                    // filtro pode ser desnecessário se API retornar corretamente
                    let data = _.first(_.filter(response.data,(x)=>{return x.audiencia_id == aud.id}))                    
                    context.commit('setPreposto', data  || {})
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