<template>
  <div>
    <!-- {{filtrosAplicados}} -->
    <!-- <req-logistica></req-logistica> -->
    <!-- :pessoa="TestemunhaPreposto"  -->
    <audiencia-modal :audiencia="Audiencia" :recebendo="enviando" ref="Audmodal"></audiencia-modal>
    <prep-test-aud-modal
      v-if="tipoPTModal"
      :audiencia="Audiencia"
      :tipoPessoa="tipoPTModal"
      ref="PTmodal"
    ></prep-test-aud-modal>
    <!-- ------------------------------------- -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
          <div class="col-md-4 panel-title">
            <h3>
              <span class="fa fa-university"></span> Audiências
            </h3>
          </div>

          <div class="col-md-5 col-md-offset-2">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="criterioBusca"
                placeholder="Buscar por Processo / Expediente / Tipo / Data "
              />
              <span class="input-group-addon">
                <i class="glyphicon glyphicon-search"></i>
              </span>
            </div>
          </div>
          <div class="col-md-1">
            <button class="pull-right btn btn-primary" @click="novaAudiencia()">
              <i class="glyphicon glyphicon-plus"></i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <select-filtro :opcoes="opcoesfiltroAuds" @aplicaFiltro="setFiltrosAud"></select-filtro>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-12 table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th @click="ordenaAudiencia('processo.nu_processo');col=1;" class="pointer">
                    Processo
                    <span v-bind:class="col==1?iconClassSort:iconClass"></span>
                  </th>
                  <th>Tipo</th>
                  <th @click="ordenaAudiencia('dt_hr_audiencia');col=2;" class="pointer">
                    Data
                    <span v-bind:class="col==2?iconClassSort:iconClass"></span>
                  </th>
                  <th>Horário</th>
                  <th @click="ordenaAudiencia('advogado_redist_id');col=3;" class="pointer">
                    Advogado
                    <span v-bind:class="col==3?iconClassSort:iconClass"></span>
                  </th>
                  <!-- <th>
              DAP
              <br />Enviado
            </th>
            <th>
              DAP
              <br />aguardando Adv.
                  </th>-->
                  <th>Preposto</th>
                  <th>Testemunha</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in Audiencias" v-bind:key="item.id">
                  <td>{{item.processo.nu_processo}}</td>
                  <td>{{item.tipo}}</td>
                  <td>{{item.dt_hr_audiencia | moment("DD/MMM/YY")}}</td>
                  <td>{{item.dt_hr_audiencia | moment("HH:mm")}}</td>
                  <td>{{item.advogado_redist_id}}</td>
                  <!-- <td class="" >{{item.obs}}</td>            -->
                  <!-- <td>
                <span class="glyphicon glyphicon-check"></span>
                <span class="glyphicon glyphicon-unchecked"></span>
                  </td>-->
                  <!-- <td>{{tipoPTModal}}</td> -->
                  <td>
                    <button
                      class="btn btn-default"
                      @click="tipoPTModal = 'Testemunha';abrePTModal(item);"
                    >Testemunha</button>
                  </td>
                  <td>
                    <button
                      class="btn btn-default"
                      @click="tipoPTModal = 'Preposto';abrePTModal(item);"
                    >Preposto</button>
                  </td>
                  <td>
                    <!-- <span class="glyphicon glyphicon-trash text-danger"></span> -->
                    <button class="btn btn-info" @click="editAudiencia(item)">
                      <span class="glyphicon glyphicon-pencil"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------------------------- -->
  </div>
</template>

<script>
import PrepTestAudModal from "./PrepTestAudModal";
import filtraAudienciasMixin from "../../mixins/filtraAudienciaMixin";

export default {
  mixins: [filtraAudienciasMixin],
  components: {
    ReqLogistica: require("../shared/ReqLogistica"),
    SelectFiltro: require("../shared/SelectFiltro"),

    PrepTestAudModal: PrepTestAudModal
  },
  data() {
    return {
      col: 0,
      ordem: "asc",
      coluna: "id",
      iconClass: "glyphicon glyphicon-sort",
      iconClassSort: "",
      enviando: false,
      criterioBusca: "",
      tipoPTModal: null
    };
  },
  computed: {
    Audiencias() {
      //filtra e ordena Audiencias
      //let busca = this.criterioBusca.toLowerCase()
      return _.orderBy(
        //_.filter(this.$store.state.audiencia.audiencias, aud => {
        _.filter(this.audienciasFiltradas, aud => {
          return (
            aud.processo.nu_processo.toString().includes(this.criterioBusca) ||
            (aud.processo.Expediente &&
              aud.processo.Expediente.includes(this.criterioBusca)) ||
            Vue.moment(aud.dt_hr_audiencia)
              .format("DD/MMM/YYYY")
              .toString()
              .toLowerCase()
              .includes(this.criterioBusca.toLowerCase()) ||
            (aud.tipo &&
              aud.tipo
                .toLowerCase()
                .startsWith(this.criterioBusca.toLowerCase()))
          );
        }),
        this.coluna,
        this.ordem
      );
    },
    Audiencia() {
      return this.$store.state.audiencia.audiencia;
    }
    // TestemunhaPreposto(){
    //   return this.tipoPTModal == 'Preposto' ? this.$store.state.preposto.preposto :this.$store.state.testemunha.testemunha
    // }
  },
  methods: {
    abrePTModal(objAudiencia) {
      this.$store
        .dispatch("audiencia/getAudiencia", objAudiencia.id)
        .then(() => {
          //this.$store.dispatch("testemunha/getTestemunhaAud", objAudiencia)
          //this.$store.dispatch("preposto/getPrepostoAud", objAudiencia)
          this.$refs.PTmodal.showModal();
        });

      // console.log(objAudiencia);
      // this.tipoPessoa
      // let acao = 'get'+this.tipoPessoa+'Aud'   // getPrepostoAud // getTestemunhaAud
      //   let obj = this.$store.state.audiencia.audiencia
      //   this.$store.dispatch("audiencia/"+acao,obj).then(()=>{
      // })
    },
    ordenaAudiencia(col) {
      // mantem sempre a ordem de data independente da ordenação principal
      this.coluna = col != "dt_hr_audiencia" ? [col, "dt_hr_audiencia"] : col;
      this.ordem = this.ordem == "asc" ? "desc" : "asc";
      this.iconClassSort = "text-primary glyphicon ";
      this.iconClassSort +=
        this.ordem == "asc" ? " glyphicon-arrow-up" : " glyphicon-arrow-down";
    },
    novaAudiencia() {
      this.$refs.Audmodal.showModal();
      this.$store.dispatch("audiencia/getAudiencia", {});
    },
    editAudiencia(aud) {
      this.enviando = true;
      this.$refs.Audmodal.showModal();
      if (aud.processo) {
        this.$store
          .dispatch("processo/getProcessoId", aud.processo)
          .then(() => {
            aud.processo = this.$store.state.processo.processo;
            this.$store.dispatch("audiencia/getAudiencia", aud);
            this.enviando = false;
          });
      }
    }
  },
  mounted() {
    // $(this.$refs.Audmodal).on("hidden.bs.Audmodal", ()=>{console.log("Feccdd"); })
    this.$store.dispatch("audiencia/getAudiencias");
    //this.$store.dispatch("audiencia/getAudiencia",{id:5});
    this.$store.dispatch("unidade/buscaUnidades", { str: "a" })
    this.$store.dispatch("audiencia/getTipos");
    this.$store.dispatch("advogado/getAdvogados");
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>