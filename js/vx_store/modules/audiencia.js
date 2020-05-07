import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
export default {
    namespaced: true,
    state: {
        audiencias: [],
        audiencia: {},
        tipos: [],
        filtros: []
    },

    mutations: {
        setAudiencias(state, auds) {
            auds = auds.map((aud) => {
                aud.bit_terc_ato = aud.bit_terc_ato == 1
                return aud
            })
            state.audiencias = auds
        },

        setAudiencia(state, aud) {
            let tp = state.tipos.filter((t) => t.id == aud.tipo_audiencia)
            aud.tipo_audiencia = tp ? tp[0] : null
            aud.dt_hr_audiencia = Vue.moment(aud.dt_hr_audiencia).toDate() // new Date(aud.dt_hr_audiencia)
            state.audiencia = aud
            // console.log(state.audiencia);
        },
        resetAudiencia(state) {
            state.audiencia = {}
        },

        setTipos(state, tipos) {
            state.tipos = tipos
        },
        updateAudienciasList(state, aud) {
            state.audiencias = state.audiencias.map((item) => {
                if (item.id == aud.id) {
                    aud.bit_terc_ato = aud.bit_terc_ato == 1
                    item = aud
                }
                return item
            })
        },
        addAudienciasList(state, aud) {
            aud.bit_terc_ato = aud.bit_terc_ato == 1
            state.audiencias.push(aud)
        },
        setFiltros(state, filtros) {
            state.filtros = filtros
        }
        /*,
        setProcessoAudiencia(state,proc){
            console.log(state.audiencia);
            state.audiencia.processo = proc
        }
        */
    },

    actions: {
        setFiltros(context, filtros) {
            context.commit('setFiltros', filtros)
        },
        getAudiencias(context) {
            return axios.get('/api/audiencia')
                .then(response => {
                    context.commit('setAudiencias', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
        },
        getTipos(context) {
            return axios.get('/api/audiencia/tipos')
                .then(response => {
                    context.commit('setTipos', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
        },
        gravarAudiencia(context, aud) {
            if (aud) {
                let dados = {
                    "id": aud.id ? aud.id : null,
                    "dt_hr_audiencia": Vue.moment(aud.dt_hr_audiencia).format('YYYY-MM-DD HH:mm'),
                    "tipo_audiencia": aud.tipo_audiencia.id ? aud.tipo_audiencia.id : aud.tipo_audiencia,
                    "processo_id": aud.processo_id,
                    "bit_terc_ato": aud.bit_terc_ato,
                    "advogado_redist_id": aud.advogado_redist_id ? aud.advogado_redist_id.id : null,
                    "obs": aud.obs
                }
                //-------- remover --------
                dados.tipo = aud.tipo_audiencia.descricao
                dados.created_at = aud.created_at
                dados.updated_at = aud.updated_at
                dados.processo = aud.processo
                //----------------
                return axios.post('/api/audiencia', dados)
                    .then((response) => {
                        context.commit('setAudiencia', response.data)
                        //  console.log(response.data);
                        let novo = dados.id == null
                        if (novo) {
                            context.commit('addAudienciasList', response.data)
                        } else {
                            context.commit('updateAudienciasList', response.data)
                        }
                    }).catch(error => {
                        console.log(error)
                        // this.errored = true
                    })

            }
        },
        resetAudiencia(context) {
            context.commit('resetAudiencia')
        },
        getAudiencia(context, aud) {
            if (!isNaN(aud)) {
                return axios.get('/api/audiencia/' + aud)
                    .then(response => {
                        let respAud = response.data
                        context.commit('setAudiencia', respAud)
                    })
                    .catch(error => {
                        console.log(error)
                        // this.errored = true
                    })
            } else if (!Array.isArray(aud)) {
                //console.log(aud.id);
                context.commit('setAudiencia', aud)
            }
        },

        solicitaTestemunha(context, dados) {
            console.log(dados);
            /*
            let test = null

            return axios.post('/api/testemunha/solicita',test)
            .then((response)=>{
                console.log(response);                
                //context.commit('addPrepostoTestemunha', response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            */
        },
        convocaTestemunha(context, dados) {
            let test = null
            return axios.post('/api/testemunha', test)
                .then((response) => {
                    console.log(response);
                    //context.commit('addPrepostoTestemunha', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        solicitaPreposto(context, dados) {
            let prep = null
            return axios.post('/api/preposto/solicita', prep)
                .then(response => {
                    console.log(response);
                    //context.commit('addPrepostoTestemunha', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        convocaPreposto(context, dados) {
            let prep = null
            return axios.post('/api/preposto', prep)
            .then(response => {
                console.log(response);
                //context.commit('addPrepostoTestemunha', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        
        //--------------- fim actions
    },
    getters: {
        getAudienciasFiltradas(state) {
            if(!state.filtros.length) return state.audiencias
            let camposValidos = _.keys(state.audiencias[0])
            //console.log(_.includes(camposValidos,'tipo'));
            
            //let MsgErro
            return state.audiencias.filter((aud) => {
                return _.reduce(state.filtros, (testaFiltro, item) => {
                    if (!_.includes(camposValidos,item[0])) {
                        console.log(item[0] + ' Campo Inválido' )     
                    }
                    let cpFiltro = item[0]
                    let vlrFiltro = item[1]
                    let vlrCpAud = aud[cpFiltro]


                    if (vlrCpAud == vlrFiltro) {
                        testaFiltro = true
                    } else if (_.isArray(vlrFiltro)) {
                        let testaVlrArray = vlrFiltro.reduce((ent, vli) => {
                            if (_.isDate(vli)) {
                                vli = Vue.moment(vli)
                                if (!ent.prev) {
                                    ent.prev = vli
                                    ent.teste = false
                                } else {
                                    ent.teste = Vue.moment(vlrCpAud).isBetween(ent.prev, vli)
                                }
                            } else {
                                ent.teste = vlrCpAud >= ent.prev && vlrCpAud <= vli
                                ent.prev = ent.prev ? ent.prev : vli
                            }
                            return ent
                        }, {teste: false, prev: null})
                        // console.log(testaVlrArray);
                        testaFiltro = testaVlrArray.teste && testaFiltro
                    }
                    return testaFiltro
                },false);
            })
        }
        //----------------------
    // ------ fim getters    
    }
//-------- Fim Store Audiencia    
}


//console.log(vlrFiltro);

// if(_.includes(cpsAud,cpFiltro))console.log(aud);

/*
if (item[1] == v ) _.unset(or, k);
if (_.isArray(v)) {
    v = v.filter(vli => !_.isDate(vli) && (vli !== item[1] && item[1] !=null ));
    v.length ? (or[k] = v) : _.unset(or, k);
}        
this.todos[k] = !or[k]
//return false;
*/
// let audPar = _.toPairs(aud)
// let cpsAud = _.keys(aud)
//let testaFiltro = false
//_.forIn(state.filtros, (v, k) => {