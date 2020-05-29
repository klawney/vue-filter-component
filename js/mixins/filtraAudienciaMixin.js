const filtraAudienciasMixin = {
  data() {
    return {

    }
  },
  methods: {
    setFiltrosAud(filtros) {
      this.$store.dispatch('audiencia/setFiltros', filtros)
    }
  },
  computed: {
    filtrosAplicados() {
      return this.$store.state.audiencia.filtros
    },
    filtrosAplicadosTxt() {
      return _.concat(
        _.differenceBy(this.opcoesfiltroAuds, this.$store.state.audiencia.filtros.map((f) => {
          return {
            campo: f[0]
          }
        }), 'campo')
        .map((todos) => todos.tag + ': Todos')
        , _.map(this.$store.state.audiencia.filtros,
          ((item) => Vue.helpers.getTagValorText(item, this.opcoesfiltroAuds))
        )
      )
    },
    audienciasFiltradas() {
      return this.$store.getters['audiencia/getAudienciasFiltradas']
    },
    //
    opcoesfiltroAuds() {
      return [{
          tag: "Unidade Subsidio",
          campo: "processo.unidade_subsidio",
          tipo: "select-multiplo",
          valores: this.$store.state.unidade.unidades,
          config: {
            label: 'desc',
            code: 'adm_unid',
            busca: this.buscaUnidades
          }
        },
        /* redistrib (resp) / acervo / audiendia / terceiro
         {
           tag: "Advogados",
           campo: "processo.nomeAdvogadoAcervo",
           tipo: "select-multiplo",
           valores: _.orderBy(this.$store.state.advogado.advogados, ['nome'], ['asc']).map(x => {
             x['desc'] = x.usuario + ' - ' + x.nome;
             return x
           }),
           config: {
             label: 'desc',
             code: 'nome',
             busca: () => true
           }
         },
         */
        {
          tag: "Tipo",
          campo: "tipo",
          tipo: "select-multiplo",
          valores: this.$store.state.audiencia.tipos,
          config: {
            label: "descricao",
            code: "descricao",
            busca: () => true
          }
        },
        // Criar filtro para itens com relacionamento
        // {
        //   tag: "Testemunha",
        //   campo: "id",
        //   tipo: "select-multiplo",
        //   valores: this.$store.getters['testemunha/testemunhaAuds'],
        //   config: {
        //     label: "nome",
        //     code: "auds",
        //     busca: () => true
        //   }
        // },
        {
          tag: "Periódo",
          campo: "dt_hr_audiencia",
          tipo: "periodo",
          valores: null
        }
      ]
    },


  }

}
export default filtraAudienciasMixin

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