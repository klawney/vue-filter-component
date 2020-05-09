import Vue from 'vue';
import axios from 'axios';
// --> import resource ???
export default {
    namespaced: true,
    state: {
        unidades: [],
    },

    mutations: {
        setUnidades(state, unids) {           
            let aUnids = []           
            if (!unids.length && unids.id) {
                aUnids.push(unids)
            } 
            else {
                aUnids = unids
            }
            unids = aUnids.map(function (un) {
                let comp = un.type.replace(/\W/gi, "").length ? ". " : ""
                un.desc = un.type + comp + un.adm_unid + " - " + un.nome
                return un
            });    
            state.unidades = unids            
        },
        addUnidade(state,unids){
            let aUnids = []           
            if (!unids.length && unids.id) {
                aUnids.push(unids)
            } 
            else {
                aUnids = unids
            }
            unids = aUnids.map(function (un) {
                let comp = un.type.replace(/\W/gi, "").length ? ". " : ""
                un.desc = un.type + comp + un.adm_unid + " - " + un.nome
                return un
            });    
            state.unidades =  _.unionBy(state.unidades,unids, 'id')
        }
    },
    
    actions: {
        buscaUnidades(context, busca) {
            if (!busca.str) return
            return axios.get('/api/unidades/busca/' + busca.str)
                .then(response => {
                    let data = response.data ? response.data : [];
                    context.commit('setUnidades', data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
        },
        getUnidade(context, unid) {            
            if (!unid.id) return
            return axios.get('/api/unidade/' + unid.id)
                .then(response => {
                    let data = response.data ? response.data : [];                  
                    context.commit('addUnidade', data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
            })
        }
    }
}
//.finally(() => this.loading = false)