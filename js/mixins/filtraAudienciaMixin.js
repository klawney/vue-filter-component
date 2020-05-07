const filtraAudienciasMixin = {
    data(){
        return {
            
        }
    },
    methods:{
      setFiltrosAud(filtros){
        this.$store.dispatch('audiencia/setFiltros', filtros)   
      }
    },
    computed:{
        filtrosAplicados(){
          return this.$store.state.audiencia.filtros     
        },
        audienciasFiltradas(){          
          return this.$store.getters['audiencia/getAudienciasFiltradas']
        },
        //
        opcoesfiltroAuds(){
            return [
            /*
            {
              tag: "Caso um ",
              campo: "a",
              tipo: "select-simples",
              valores: [11, 111.52000, 22, 55.96, 88.5]
            },
            {
              tag: "preço de casa",
              campo: "preco",
              tipo: "select-multiplo",
              valores: [11, 111, 22, 88, 55]
            },
            { tag: "Tem Casa", campo: "tem_casa", tipo: "check", valores: null },
            {
              tag: "Campo C",
              campo: "c",
              tipo: "radio",
              valores: [11, 111, 22, 55, 88]
            },
            {
                tag: "Campo E",
                campo: "e",
              tipo: "text",
              valores: ["Vadas", "Amor"]
            },
            { tag: "XXXXX", campo: "dt", tipo: "periodo", valores: null },
            { tag: "dATA", campo: "dtI", tipo: "data", valores: null },
            { tag: "Dia", campo: "dt_hr_audiencia", tipo: "data-horas", valores: null }
            */

           { tag: "Advogados", campo: "nomeAdvogadoAcervo", tipo: "select-multiplo", valores: _.orderBy(this.$store.state.advogado.advogados,['nome'],['asc']).map(x=>x.usuario+' - '+x.nome) },
           { tag: "Tipo", campo: "tipo", tipo: "select-multiplo", valores: this.$store.state.audiencia.tipos.map(x=>x.descricao) },
           { tag: "Periódo", campo: "dt_hr_audiencia", tipo: "periodo", valores: null }
          ]
        },
        

    }

}
export default filtraAudienciasMixin