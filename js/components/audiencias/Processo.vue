<template>
  <div>
    <!-- ---------------------------------- -->
    <processo-modal :processo="Processo" ref="modal"></processo-modal>

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
          <div class="col-md-4 panel-title">Processos</div>
          <div class="col-md-5 col-md-offset-1">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="filtroProcesso"
                placeholder="Buscar por Processo ou Expediente"
              />
              <span class="input-group-addon">
                <i class="glyphicon glyphicon-search"></i>
              </span>
            </div>
          </div>
          <div class="col-md-1">
            <button class="btn btn-default" @click="togglePendentes">
              <i class="glyphicon" v-bind:class="setPendentes?'glyphicon-check':'glyphicon-unchecked'"></i> Pendentes
            </button>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-12 table-responsive">
            <table class="table table-light table-sm">
              <thead class="thead-light">
                <tr>
                  <th @click="ordenaProcessos('nu_processo');col=1;" class="pointer">
                    Processo
                    <span v-bind:class="col==1?iconClassSort:iconClass"></span>
                  </th>
                  <th @click="ordenaProcessos('Expediente');col=2;" class="pointer">
                    Expediente
                    <span v-bind:class="col==2?iconClassSort:iconClass"></span>
                  </th>
                  <!-- <th>Reclamante</th> -->
                  <!-- <th>Vara</th> -->
                  <!-- <th>Comarca</th> -->
                  <!-- <th>Advogado</th> -->
                  <!-- <th>Assunto</th> -->
                  <th>Unidade Subsidio</th>
                  <th>Atend. Subsidio</th>
                  <th class="col-md-3">Obs.:</th>
                  <!-- <th>LitisconsorteReu</th> -->
                  <!-- <th>LinkPeticaoInicial</th> -->
                  <!-- <th>LinkDefesa</th> -->
                  <th>Status</th>
                  <th colspan="2">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ProcessosFiltrados" v-bind:key="item.id">
                  <td>{{item.nu_processo}}</td>
                  <td>{{item.Expediente}}</td>
                  <!-- <td>{{item.Reclamante}}</td> -->
                  <!-- <td>{{item.Vara}}</td> -->
                  <!-- <td>{{item.Comarca}}</td> -->
                  <!-- <td>{{item.MatrAdv + item.Nome}}</td> -->
                  <!-- <td>{{item.Assunto}}</td> -->
                  <td>{{item.unidade_subsidio}}</td>
                  <td>{{item.atend_subsidio | moment("DD/MM/YYYY HH:mm")}}</td>
                  <td>{{item.obs}}</td>
                  <!-- <td>{{item.LitisconsorteReu}}</td> -->
                  <!-- <td>{{item.LinkPeticaoInicial}}</td> -->
                  <!-- <td>{{item.LinkDefesa}}</td> -->
                  <!-- <td>{{item.LinkDefesa}}</td> -->
                  <td>
                    <span
                      v-bind:class="[item.status==3 ? 'glyphicon-folder-close text-success':'glyphicon-folder-open text-danger']"
                      class="glyphicon"
                    ></span>
                  </td>
                  <td>
                    <a title="Editar" @click="getProcessoById(item.id)">
                      <span class="glyphicon glyphicon-pencil"></span>
                    </a>
                  </td>
                  <td>
                    <a title="Excluir">
                      <span class="glyphicon glyphicon-trash text-danger"></span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <pagination total-per-page="100"></pagination>
    <!-- ---------------------------------- -->
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  name: "processos",
  //components: {    'pagination': Pagination  },
  data() {
    return {
      col: 0,
      ordem: "asc",
      coluna: "id",
      iconClass: "glyphicon glyphicon-sort",
      iconClassSort: "",
      filtroProcesso: "",
      filtroStatus: [],
      setPendentes: false,
      STATUS_PENDENTE : "2"
    };
  },
  methods: {
    getProcessoById: function(id) {
      let self = this;
      this.$store.dispatch("processo/getProcessoId", { id: id }).then(resp => {
        var modal = this.$refs.modal;
        // let undSub = self.$store.state.processo.processo.unidade_subsidio;
        let undSub = self.Processo.unidade_subsidio;
        self.$store.dispatch("unidade/buscaUnidades", { str: undSub });
        modal.showModal();
      });
    },
    ordenaProcessos(col) {
      this.coluna = col;
      this.ordem = this.ordem == "asc" ? "desc" : "asc";
      this.iconClassSort = "text-primary glyphicon ";
      this.iconClassSort +=
        this.ordem == "asc" ? " glyphicon-arrow-up" : " glyphicon-arrow-down";
    },
    filtraProcessos(){
      let filtra =  _.filter(this.$store.state.processo.processos, proc => {
        return(
          proc.nu_processo.toString().startsWith(this.filtroProcesso) ||
          (proc.Expediente && proc.Expediente.includes(this.filtroProcesso))
        );
      })
      if(this.filtroStatus.length) {
        filtra = _.filter(filtra,proc=>{
          return this.filtroStatus.includes(proc.status) 
        })        
      }
      return filtra
    },
    togglePendentes(){
      this.setPendentes=!this.setPendentes
      if(this.setPendentes){
        this.filtroStatus.push(this.STATUS_PENDENTE)
      } 
      else{
        this.filtroStatus = this.filtroStatus.filter((st)=>st!=this.STATUS_PENDENTE)
      } 
    }
  },
  computed: {
    ProcessosFiltrados() {
      return _.orderBy(
        this.filtraProcessos(),
        this.coluna,
        this.ordem
      );
    },
    Processo() {
      return this.$store.state.processo.processo;
    }
  },
  mounted() {
    //this.$store.dispatch('processo/getProcessos')
    this.$store.dispatch("processo/getPendentesApt");
  }
  /*
  data() {
    return {
      info:null,
      loading: true,
      errored: false,
      Processos: []

    };
  },*/
  //-------------------------//
  //-------------------------//
};
</script>

<style>
</style>