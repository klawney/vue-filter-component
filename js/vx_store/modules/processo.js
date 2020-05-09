import Vue from 'vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
// --> import resource ???
export default {
    namespaced: true,
    state: {
        processos: [], // [{processo},...]
        processo: {},

        status:[
            {cod:2,desc:"incompleto"},
            {cod:3,desc:"cadastrado"}
        ]
    },

    mutations: {
        setProcessos(state, procs) {          
            procs = procs.map(function (p) {     
                p.Expediente = !p.Expediente? "":p.Expediente                        
                if (p.unidade_subsidio) {                    
                    p.unidade_subsidio = p.unidade_subsidio.toString().padStart(4, "0")
                }
                return p
            })
            //console.log(p);
            state.processos = procs
        },
        setProcAudiencias(state, auds) {
            //audiencias
            //console.log(state.processo.id);
            
            let procId = state.processo.id
            //state.processo.audiencias = []
          //  auds = auds.filter((aud)=>aud.processo_id == procId)
          //  state.audienciasProc = auds
            state.processo.audiencias  = auds
            //console.log(state.processo);

        },
        setProcesso(state, proc) {
            if (proc.unidade_subsidio) {
                proc.unidade_subsidio = proc.unidade_subsidio.toString().padStart(4, "0")
            }
            proc.atend_subsidio = proc.atend_subsidio? Vue.moment(proc.atend_subsidio).toDate(): ""
            proc.numAdvogadoAcervo = proc.NU_EMPREGADO || proc.NU_CREDENCIADO
            proc.nomeAdvogadoAcervo = proc.NO_EMPREGADO || proc.NO_CREDENCIADO           
            proc.isTerceirizado = proc.IC_TERCEIRIZADO == 1           
            proc.audiencias=[]
            state.processo = proc
        },
        resetProcesso(state){
            state.processo = {}
        },
        updateLista(state, proc) {          
            //console.log(p);
            state.processos = state.processos.map((p)=>{ 
                if(p.id == proc.id){
                    if (p.unidade_subsidio) {
                        p.unidade_subsidio = p.unidade_subsidio.padStart(4, "0")
                    }
                    p = proc
                } 
                return p
            })
        },

        setPendentesApt(state, procs) {           
            state.processo = procs
        },
    },

    actions: {
        getProcessos(context) {
            return axios.get('/api/processo')
                .then(response => {
                    context.commit('setProcessos', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
            //.finally(() => this.loading = false)
        },
        getProcessoId(context, proc) {            
            if (proc.id != this.state.processo.processo.id ) {
                return axios.get('/api/processo/'+ proc.id)
                    .then(response => {
                        context.commit('setProcesso', response.data)
                    })
                    .catch(error => {
                        console.log(error)
                        // this.errored = true
                    })
            }
                //.finally(() => this.loading = false)
        },
        getAudsByProcId(context, proc) {            
            return axios.get('/api/processo/'+ proc.id +'/audiencias')
                .then(response => {
                    context.commit('setProcAudiencias', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })

        },
        /**
         * 
         * @param {*} context 
         */
        getPendentesApt(context) {
            let status = 2;
            return axios.get('/api/processos/pendentes/'+status)
                .then(response => {
                    context.commit('setProcessos', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
            //.finally(() => this.loading = false)
        },
 
        UpdateProcesso(context, proc) {
            proc.status = 3;
            return axios.put('/api/processo/'+ proc.id,proc)
            .then(response => {
                context.commit('setProcesso', response.data)
                context.commit('updateLista', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        resetProcesso(context){
            context.commit('resetProcesso')
        }
    }
}

       // getPendentesAptId(context) {
        //     return axios.get('/api/processos/mandado/3000')
        //         .then(response => {
        //             context.commit('setPendentesApt', response.data)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //             // this.errored = true
        //         })
        //     //.finally(() => this.loading = false)
        // },
        /*
        newProcesso(context, proc) {
            return axios.post('/api/processo',proc)
            .then(response => {
                context.commit('setProcesso', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        */