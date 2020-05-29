<template>
  <div>
    <!-- {{PreTestTest}} Criar filtro para itens com relacionamento -->
    <!-- {{filtrosAplicados}} -->
    <!-- <req-logistica></req-logistica> -->
    <!-- :pessoa="TestemunhaPreposto"  -->
    <!-- <button @click="getAdvogado(6)">X</button> -->

    <!-- <pauta-modal ref="pautaModal"/> -->
    <!-- <button type="button" @click="abrePauta" class="btn btn-primary"></button> -->
    <audiencia-modal :audiencia="Audiencia" :recebendo="enviando" ref="Audmodal"></audiencia-modal>
    <audiencia-modal-det :audiencia="Audiencia" :recebendo="enviando" ref="ViewModal"></audiencia-modal-det>
    <prep-test-aud-modal
      v-if="tipoPTModal"
      :audiencia="audParaEmail"
      :tipoPessoa="tipoPTModal"
      ref="PTmodal"
    ></prep-test-aud-modal>
    <!-- :audiencia="Audiencia" -->
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
      <div v-show="carregando" class="fa fa-spinner fa-spin fa-3x"></div>
      <div class="panel-body" v-if="!carregando">
        <div class="row">
          <div class="col-md-12 table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th @click="ordenaAudiencia('processo.nu_processo');col=1;" class="pointer">
                    Processo
                    <span v-bind:class="col==1?iconClassSort:iconClass"></span>
                  </th>
                  <th @click="ordenaAudiencia('tipo');col=2;" class="pointer">
                    Tipo
                    <span v-bind:class="col==2?iconClassSort:iconClass"></span>
                  </th>
                  <th @click="ordenaAudiencia('dt_hr_audiencia');col=3;" class="pointer">
                    Data
                    <span v-bind:class="col==3?iconClassSort:iconClass"></span>
                  </th>
                  <th>Horário</th>
                  <th @click="ordenaAudiencia('advRepres.nome');col=4;" class="pointer">
                    Advogado
                    <span v-bind:class="col==4?iconClassSort:iconClass"></span>
                  </th>
                  <th @click="ordenaAudiencia('preposto.nome');col=5;" class="pointer">
                    Preposto
                    <span v-bind:class="col==5?iconClassSort:iconClass"></span>
                  </th>
                  <th @click="ordenaAudiencia('testemunha.nome');col=6;" class="pointer">
                    <span v-bind:class="col==6?iconClassSort:iconClass"></span>Testemunha
                  </th>
                  <th>Ação</th>
                </tr>
              </thead>
              <!-- <th>
              DAP
              <br />Enviado
            </th>
            <th>
              DAP
              <br />aguardando Adv.
              </th>-->
              <!-- <td class="" >{{item.obs}}</td>            -->
              <!-- <td>
                <span class="glyphicon glyphicon-check"></span>
                <span class="glyphicon glyphicon-unchecked"></span>
              </td>-->
              <!-- <td>{{tipoPTModal}}</td> -->

              <tbody>
                <tr v-for="(item) in Audiencias" v-bind:key="item.id">
                  <td>{{item.processo.nu_processo}}</td>
                  <td>{{item.tipo}}</td>
                  <td>{{item.dt_hr_audiencia | moment("DD/MMM/YY")}}</td>
                  <td>{{item.dt_hr_audiencia | moment("HH:mm")}}</td>
                  <td>{{item.advRepres.nome | reduzido | titlecase}} ({{item.advRepres.tipo}})</td>
                  <td v-if="item.preposto" @click="tipoPTModal = 'Preposto';abrePTModal(item);">
                    {{item.preposto.nome | reduzido | titlecase}}
                    <i class="fa fa-pencil text-info"></i>
                  </td>
                  <td v-else>
                    <button
                      class="btn btn-default"
                      @click="tipoPTModal = 'Preposto';abrePTModal(item);"
                    >Preposto</button>
                  </td>
                  <td v-if="item.testemunha" @click="tipoPTModal = 'Testemunha';abrePTModal(item);">
                    {{item.testemunha.nome | reduzido | titlecase}}
                    <i class="fa fa-pencil text-info"></i>
                  </td>
                  <td v-else>
                    <button
                      class="btn btn-default"
                      @click="tipoPTModal = 'Testemunha';abrePTModal(item);"
                    >Testemunha</button>
                  </td>
                  <td>
                    <!-- <span class="glyphicon glyphicon-trash text-danger"></span> -->
                    <button class="btn btn-primary" @click="editAudiencia(item)">
                      <span class="glyphicon glyphicon-pencil"></span>
                    </button>
                    <!-- <button class="btn btn-info" @click="visualizarAud(item)">
                      <span class="fa fa-eye"></span>
                    </button> -->
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
// import PautaModal from "./PautaModal";
import PrepTestAudModal from "./PrepTestAudModal";
import AudienciaModalDet from "./AudienciaModalDet";
// import filtraAudienciasMixin from "../../mixins/filtraAudienciaMixin";
import buscasMixins from "../../mixins/buscasMixins";
import trataAudienciasMixins from "../../mixins/trataAudienciasMixins";
export default {
  mixins: [buscasMixins, trataAudienciasMixins],
  components: {
    ReqLogistica: require("../shared/ReqLogistica"),
    SelectFiltro: require("../shared/SelectFiltro"),
    AudienciaModalDet:AudienciaModalDet,
    PrepTestAudModal: PrepTestAudModal
    // PautaModal:PautaModal
  },
  data() {
    return {
      col: 0,
      ordem: "asc",
      coluna: "id",
      iconClass: "glyphicon glyphicon-sort",
      iconClassSort: "",
      //carregando: false,
      enviando: false,
      criterioBusca: "",
      tipoPTModal: null,
      audParaEmail: {}
    };
  },
  computed: {
    Audiencias() {
      let auds = this.AudienciasCompostas;
      return _.orderBy(
        _.filter(auds, aud => {
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
    //--------------------------------------

    Audiencia() {
      return this.$store.state.audiencia.audiencia;
    }
    // TestemunhaPreposto(){
    //   return this.tipoPTModal == 'Preposto' ? this.$store.state.preposto.preposto :this.$store.state.testemunha.testemunha
    // }
  },
  methods: {
    // abrePauta(){
    //   this.$refs.pautaModal.showModal();
    // },
    abrePTModal(objAudiencia) {
      this.audParaEmail = objAudiencia;
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
    getAdvogado(id) {
      return _.find(this.$store.state.advogado.advogados, adv => adv.id == id);
    },
    getTerceirizado(id) {
      let result = _.find(
        this.$store.state.advogado.credenciados,
        cred => cred.id == id
      );
      if (result) {
        result.nome = result.NO_CREDENCIADO.replace(
          /\&?\s?(advocacia|advogados|associados|advs|assoc)\s?/gi,
          ""
        ).trim();
      }
      return result;
    },
    getAdvAcervo(proc) {
      //return _.find(this.$store.state.advogado.advogados,(adv)=>adv.id == id)
    },
    novaAudiencia() {
      this.$refs.Audmodal.showModal();
      this.$store.dispatch("audiencia/getAudiencia", {});
    },
    setStoreAud(aud) {
      this.enviando = true;
      if (aud.processo) {
        this.$store
          .dispatch("processo/getProcessoId", aud.processo)
          .then(() => {
            aud.processo = this.$store.state.processo.processo;
            this.$store.dispatch("audiencia/getAudiencia", aud);
            this.enviando = false;
          });
      }
    },
    visualizarAud(aud) {
      this.setStoreAud(aud)
      this.$refs.ViewModal.showModal();
    },
    editAudiencia(aud) {
      this.setStoreAud(aud)
      this.$refs.Audmodal.showModal();
    }
  },
  mounted() {
    // $(this.$refs.Audmodal).on("hidden.bs.Audmodal", ()=>{console.log("Feccdd"); })
    //------------- Testando ---------------
    /*
    this.$store.dispatch("convocacao/getConvocacoes").then(()=>{ 
      console.log(this.$store.state.convocacao.convocacoes);
    });
    */
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>