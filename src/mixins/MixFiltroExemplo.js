const MixFiltroExemplo = {
    data(){
        return {
            filtroFake:[],
            filtradosFake:[
              {a:"asdasd", b:"sadasdas"},
              {a:"asdasd", b:"sadasdas"},
              {a:"asdasd", b:"sadasdas"},
            ]
        }
    },
    methods:{
      setFiltros(filtros){
        this.filtroFake = filtros   
        //this.$store.dispatch('audiencia/setFiltros', filtros)  
      }
    },
    computed:{
        filtrosAplicados(){
          return this.filtroFake //this.$store.state.audiencia.filtros     
        },
        objFiltradas(){          
          return this.filtradosFake //this.$store.getters['audiencia/getAudienciasFiltradas']
        },
        //
        opcoesfiltro(){
            return [ 
          //  { tag: "Unidade Subsidio", campo: "processo.unidade_subsidio", tipo: "select-multiplo", valores: this.$store.state.unidade.unidades, config:{label:'desc', code:'adm_unid'} },
          //  { tag: "Advogados", campo: "processo.nomeAdvogadoAcervo", tipo: "select-multiplo", valores: this.$store.state.advogado.advogados, config:{label:'nome', code:'nome'} },
          //  //{ tag: "Advogados", campo: "nomeAdvogadoAcervo", tipo: "select-multiplo", valores: _.orderBy(this.$store.state.advogado.advogados,['nome'],['asc']).map(x=>x.usuario+' - '+x.nome) },
          //  { tag: "Tipo", campo: "tipo", tipo: "select-multiplo", valores: this.$store.state.audiencia.tipos.map(x=>x.descricao) },
           { tag: "Periódo", campo: "dt_hr_audiencia", tipo: "periodo", valores: null }
          ]
        },
        

    }

}
export default MixFiltroExemplo