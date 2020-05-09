import Vue from 'vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
// --> import resource ???
export default {
    namespaced: true,
    state: {
        empregados: []
    },
    mutations: {
        setEmpregados(state, emps) {
            emps = emps.map((emp)=>{ 
                emp.desc = emp.usuario+' - '+emp.nome
                return emp
            })
            state.empregados = emps
        }
    },
    actions: {
        getEmpregados(context) {
            return axios.get('/empregado').then(response => {
                context.commit('setEmpregados', response.data)
            }).catch(error => {
                console.log(error)
            })
        },
        buscaEmpregados(context, busca) {
            if (!busca.str) return
            return axios.get('/api/empregado/busca/' + busca.str)
                .then(response => {
                    context.commit('setEmpregados', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
            //.finally(() => this.loading = false)
        }
    }

    //-------------------
}