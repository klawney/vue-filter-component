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
            
            let tp = state.tipos.filter((t) =>{
                return t.id == aud.tipo_audiencia || t == aud.tipo_audiencia
            })
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

            //let camposValidos = _.keys(state.audiencias[0])
            let camposValidos =
                _.map(state.audiencias[0], (o, k) => {
                    if (_.isObject(o)) {
                        return _.keys(_.mapKeys(o, (i, ki) => k + '.' + ki))
                    }
                    return k
                })
            camposValidos = _.concat(
                _.filter(camposValidos, (f) => _.isArray(f))[0],
                _.filter(camposValidos, (f) => !_.isArray(f))
            )
            //let camposValidos = _.keys(state.audiencias[0])
            // console.log(camposValidos);

            _.remove(filtros, (item) => {
                // cpFiltro = item[0]
                //console.log(item);

                let teste = !_.includes(camposValidos, item[0])
                teste ? console.log(item[0] + " não foi encontrado") : false
                return teste
            })
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
                //console.log(aud);
                
                let dados = {
                    "id": aud.id ? aud.id : null,
                    "dt_hr_audiencia": Vue.moment(aud.dt_hr_audiencia).format('YYYY-MM-DD HH:mm'),
                    "tipo_audiencia": aud.tipo_audiencia.id ? aud.tipo_audiencia.id : null,
                    "processo_id": aud.processo_id,
                    "bit_terc_ato": aud.bit_terc_ato,
                    "advogado_redist_id": aud.advogado_redist_id ? aud.advogado_redist_id : null,
                    "adv_aud_id": aud.adv_aud_id ? aud.adv_aud_id : null,
                    "bit_adv_redis" : aud.bit_adv_redis,
                    "credenciado_id" : aud.credenciado_id ? aud.credenciado_id : null,
                    "obs": aud.obs
                }
                console.log(dados);
                //-------- remover --------
                dados.tipo = aud.tipo_audiencia.descricao
                dados.created_at = aud.created_at
                dados.updated_at = aud.updated_at
                dados.processo = aud.processo
                //----------------
                return axios.post('/api/audiencia', dados)
                    .then((response) => {
                        context.commit('setAudiencia', response.data)
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
                context.commit('setAudiencia', aud)
            }
        },

        solicitaTestemunha(context, dados) {
            //console.log(dados);
            return axios.post('/api/testemunha/solicita',dados)
            .then((response)=>{
                console.log(response);                
                //context.commit('addPrepostoTestemunha', response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        convocaTestemunha(context, dados) {
            return axios.post('/api/testemunha', dados)
                .then((response) => {
                    console.log(response);
                    //context.commit('addPrepostoTestemunha', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        solicitaPreposto(context, dados) {
            return axios.post('/api/preposto/solicita', dados)
                .then(response => {
                    console.log(response);
                    //context.commit('addPrepostoTestemunha', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        convocaPreposto(context, dados) {
            return axios.post('/api/preposto', dados)
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
            if (!state.filtros.length) return state.audiencias
            return state.audiencias.filter((aud) => {
                //let ObjAcumFiltros = {}
                let ObjAcumFiltros = _.reduce(state.filtros, (ObjAcumFiltros, item, k, org) => {
                    let testeItem = false
                    let cpFiltro = item[0]
                    let vlrFiltro = item[1]
                    let x
                    if (cpFiltro.includes('.')) {
                        x = cpFiltro.split('.')
                    }
                    let vlrCpAud = x ? aud[x[0]][x[1]] : aud[cpFiltro]                   
                    switch (true) {
                        case _.isString(vlrFiltro): {                           
                            vlrCpAud = vlrCpAud ? 
                                _.isString(vlrCpAud)?vlrCpAud.toLowerCase():vlrCpAud
                                : undefined
                            vlrFiltro = vlrFiltro.toLowerCase()
                        }
                    }
                    if (vlrCpAud == vlrFiltro) {
                        testeItem = true
                        //return ObjAcumFiltros.testaFiltro && true 
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
                        }, {
                            teste: false,
                            prev: null
                        })
                        // console.log(testaVlrArray);
                        testeItem = testaVlrArray.teste
                    }
                    //--- Processa o para o campo do filtro
                    if (ObjAcumFiltros[cpFiltro]) {
                        ObjAcumFiltros[cpFiltro] = testeItem || ObjAcumFiltros[cpFiltro]
                    } else {
                        ObjAcumFiltros[cpFiltro] = testeItem
                    }
                    return ObjAcumFiltros
                }, {}) // descer esta linha    
                return _.reduce(ObjAcumFiltros, (bitAcum, bitF) =>bitF && bitAcum, true)
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