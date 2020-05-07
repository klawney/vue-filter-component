<template>
  <div title="divModalPrepTestem">
    <!-- ---------------------- -->
    <modal ref="compModal" size="xl">
      <div slot="header">
        <h3>
          <span class="glyphicon glyphicon-list-alt"></span>
          {{tipoPessoa}}
        </h3>
      </div>
      <div v-if="audiencia">
        <detalhe-proc-sijur
          v-show="!carregando"
          v-if="audiencia.processo"
          :processo="audiencia.processo"
        ></detalhe-proc-sijur>
        <detalhe-audiencia v-show="!carregando" :audiencia="audiencia"></detalhe-audiencia>
      </div>
      <!-- <list-audiencias-proc v-else :processo_id ="5"></list-audiencias-proc> -->
      <!-- 
      -->
      <!-- {{dadosTemp}} -->
      <div v-if="audiencia">
        <!-- {{audiencia.empregado}} -->
        <!-- <input type='text'  v-model="audiencia.empregado.usuario" /> -->
        <!-- <div class="panel-body"> -->
        <div class="row">
          <div class="col-md-12">
            <form>
              <div v-if="isPreposto" class="form-group col-md-12">
                <check-box-style size="md" @click="togglePrepEspecializado">Preposto Especializado</check-box-style>
              </div>
              <div class="form-group col-md-6" v-if="!prepEspcializado">
                <label class="form-label">Unidade / Lotação</label>
                <v-select
                  v-model="unidadeDestino"
                  @search="buscaUnidades"
                  label="desc"
                  :options="Unidades"
                  :clearable="false"
                >
                  <div slot="no-options">Nenhuma unidade encontrada, tente de outra forma</div>
                </v-select>
              </div>
              <div class="form-group" v-bind:class="prepEspcializado?'col-md-12':'col-md-6'">
                <label class="form-label">{{tipoPessoa}} {{prepEspcializado?' Especializado':''}}</label>
                <!-- v-model="audiencia.empregado" -->
                <!-- v-model="Pessoa" -->
                <v-select
                  :disabled="!unidadeDestino && !prepEspcializado"
                  @search="buscaEmpregado"
                  v-model="novaPessoa.empregado"
                  label="desc"
                  :reduce="nome => nome"
                  :options="Empregados"
                >
                  <div slot="no-options">Nenhuma unidade empregado, tente de outra forma</div>
                </v-select>
              </div>
              <div class="form-group col-md-12">
                <label for>Obs.:</label>
                <textarea class="form-control" id="obs" v-model="novaPessoa.obs" rows="3"></textarea>
              </div>
              <!--  -->
              <!-- <check-box-style size="md" @click="prepEspcializado=!prepEspcializado" >Confirmado?</check-box-style> -->
              <div v-if="novaPessoa.empregado" class="col-md-12">
                <check-box-style size="md" @click="solicLog=!solicLog">Necessita de Logística</check-box-style>
                <req-logistica v-if="solicLog" req="teste"></req-logistica>
              </div>
              <!-- {{Empregados}} -->
              <!-- buscaEmpregado -->
            </form>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- </div>
      </div>-->
      <div slot="footer">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <button class="btn btn-primary" @click="solIndicacao" :disabled="habilitaConvocacao">
                Solicitar Indicação
                <span class="glyphicon glyphicon-envelope"></span>
              </button>
              <button class="btn btn-primary" @click="convocar" :disabled="!habilitaConvocacao">
                Convocar
                <span class="glyphicon glyphicon-send"></span>
              </button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import MyHelpers from "../../mixins/helpers"
import buscasMixins from "../../mixins/buscasMixins"
export default {
  mixins: [ buscasMixins,MyHelpers],
  components: {
    DetalheProcSijur: require("./DetalheProcSijur"),
    DetalheAudiencia: require("./DetalheAudiencia"),
    ListAudienciasProc: require("./ListAudienciasProc"),
    ReqLogistica: require("../shared/ReqLogistica"),
    CheckBoxStyle: require("../shared/CheckBoxStyle")
  },
  props: {
    audiencia: {
      type: Object,
      required: true
    },
    tipoPessoa: {
      type: String,
      default: "Preposto",
      required: true,
      validator: function(value) {
        // O valor precisa corresponder a alguma dessas Strings
        return ["Testemunha", "Preposto"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      prepEspcializado: false,
      dadosTemp:{pessoa:{},unidade:{}},
      solicLog: false,
      carregando: false,
      isVazio: true
      //  listaAudiencias = null,
      // tipoPessoa: "Preposto" //"Testemunha"
    };
  },
  computed: {
    unidadeDestino: {
      // unid.id == this.novaPessoa.unidade_id
      get() {
        return _.filter(
          this.$store.state.unidade.unidades,
          unid => unid.id == this.novaPessoa.unidade_id
        );
      },
      set(unid) {
        this.novaPessoa.unidade_id = unid.id;
      }
    },
    novaPessoa() {
      let recurso = (this.tipoPessoa + "." + this.tipoPessoa).toLowerCase();
      return this.$deepModel(recurso);
    },
    Unidades() {
      return this.$store.state.unidade.unidades;
    },
    Empregados() {
      let empregados = this.$store.state.empregado.empregados;
      if (this.prepEspcializado) {
        empregados = _.filter(
          empregados,
          emp => emp.bit_prep_especializado == 1
        );
      }
      return empregados;
    },
    habilitaConvocacao() {
      return this.novaPessoa.empregado; //? true:false
    },
    validaForm(){
      let isValido = false
      return isValido
    },
    isPreposto() {
      return this.tipoPessoa == "Preposto" ? true : false;
    }
  },
  methods: {
    togglePrepEspecializado() {
      this.prepEspcializado = !this.prepEspcializado
      //&& this.novaPessoa.empregado.bit_prep_especializado != 1
      if(this.prepEspcializado && this.novaPessoa.empregado ){
        this.dadosTemp.pessoa = _.clone(this.novaPessoa.empregado)
        this.novaPessoa.empregado = null
        this.dadosTemp.unidade = _.clone(this.unidadeDestino)
        this.unidadeDestino = {}
      }
      else {
        this.novaPessoa.empregado = _.clone(this.dadosTemp.pessoa)
        this.unidadeDestino = _.clone(this.dadosTemp.unidade)
      }

    },
    carregaDados() {
      if (this.audiencia) {
        let recurso =
          this.tipoPessoa.toLowerCase() + "/get" + this.tipoPessoa + "Aud";
        this.$store.dispatch(recurso, this.audiencia).then(() => {
          this.$store.dispatch("unidade/getUnidade", {
            id: this.novaPessoa.unidade_id
          });
          let busca = this.novaPessoa.empregado
            ? this.novaPessoa.empregado.usuario
            : "";
          this.buscaEmpregado(busca, () => {});
        });
      }
    },
    solIndicacao() {
      let solic = "solicita" + this.tipoPessoa;
      console.log(solic);

      /*
      this.$store
        .dispatch("audiencia/" + solic, {
          unid: this.unidadeDestino,
          aud: this.audiencia
        })
        .then(() => {
          console.log("solicitou");
        });
        */
    },
    convocar() {
      let conv = "convoca" + this.tipoPessoa;
      console.log(conv);

      /*
      this.$store
        .dispatch("audiencia/" + conv, {
          pessoa: this.Dados.Pessoa,
          aud: this.audiencia
        })
        .then(() => {
          console.log("Convocou");
        });
        */
    },
    // -------------Modal ------------------ //
    showModal() {
      this.carregaDados();
      this.getModal().show();
    },
    closeModal() {
      this.getModal().close();
    },
    getModal() {
      return this.$refs.compModal;
    }
  },
  mounted() {
    //this.Dados.Pessoa = this.$store.state.audiencia
    //console.log(this.$refs.compModal);
    //this.$store.dispatch("processo/getAudsByProcId", { id: 5 })
    //         console.log(self.$store.state.processo.processo.audiencias);
    //     })
  }
};
</script>

<style>
</style>