<template>
  <div title="divModalAudiencia">
    <!-- ---------------------- -->
    <modal ref="modal">
      <!-- ------------ inicio modal --------------- -->
      <div slot="header">
        <h3 v-show="!recebendo">
          <span class="glyphicon glyphicon-list-alt"></span>
          {{Title}}
        </h3>
      </div>
      <div v-show="!recebendo">
        <div class="panel panel-default">
          <div class="panel-heading">
            <detalhe-proc-sijur
              v-show="!carregando"
              v-if="audiencia.processo"
              :processo="audiencia.processo"
            ></detalhe-proc-sijur>
            <div v-show="carregando" class="fa fa-spinner fa-spin fa-3x"></div>
            <div class="form-group" v-show="!audiencia.id">
              <label class="form-label">Processo</label>
              <v-select
                :options="Processos"
                label="nu_processo"
                @input="setProcessoAudiencia"
                v-model="audiencia.processo"
                :clearable="false"
              >
                <!-- "  @search="buscaProcesso()"  v-model="ProcessoSelect" :reduce = "nu => nome.adm_unid" label = "desc" -->
                <div slot="spinner" v-show="carregando" class="fa fa-spinner fa-spin"></div>
                <div slot="no-options">Nenhuma processo encontrada</div>
              </v-select>
            </div>
          </div>

          <div class="panel-body" v-show="!carregando && audiencia.processo">
            <div class="row">
              <div class="col-md-12">
                <!--
                   {{audiencia}}
              {{audiencia.processo.nu_processo}}
                {{audiencia.processo.Expediente}}-->
                <form>
                  <div class="form-group col-md-4">
                    <label for="inputAddress">Data / Hora</label>
                    <br/>
                    <vue2datepicker
                      v-model="audiencia.dt_hr_audiencia"
                      :format="dtpFormat[0]"
                      :type="dtpType[0]"
                      :time-picker-options="horarioComercial"
                      valueType = "date"
                    ></vue2datepicker>

                  </div>
                  <div class="form-group col-md-4" v-if="Tipos">
                    <label>Tipo</label>
                    <v-select
                      :options="Tipos"
                      label="descricao"
                      :searchable="false"
                      :clearable="false"
                      v-model="audiencia.tipo_audiencia"
                    ></v-select>
                  </div>
                  <div class="form-group col-md-4">
                    <br />
                    <label
                      class="form-label"
                      @click.prevent="audiencia.bit_terc_ato=!audiencia.bit_terc_ato"
                    >
                      <!-- <button class="btn btn-default" style="font-size:2em; padding:0" > -->
                      <span
                        class="btn fa"
                        style="color:#999;font-size:2em;width:30px;margin-right:5px "
                        v-bind:class="[audiencia.bit_terc_ato?'fa-check-square-o':'fa-square-o']"
                      ></span>
                      <!-- </button> -->
                      Terceirizar Ato
                    </label>
                    <!-- <input type="checkbox" class="form-check-input" v-model=audiencia.bit_terc_ato > -->
                  </div>

                  <div class="form-group col-md-12">
                    <label for="">Obs.:</label>
                    <textarea class="form-control" id="obs" v-model="audiencia.obs" rows="3"></textarea>
                  </div>

                  <!-- </div> -->
                  <!-- <div class="form-group col-md-1">
                    <br />
                    <button
                      class="btn btn-primary"
                      @click.prevent="redistAdvg"
                    >Redistribuir Advogado</button>
                  </div>
                  <div class="form-group col-md-4">
                    <label for>Advogado Redistribuição</label>
                    <v-select
                      :options="Advogados"
                      label="desc"
                      :clearable="false"
                      v-model="audiencia.advogado_redist_id"
                    ></v-select>
                  </div>
                  <div class="form-group col-md-6">
                    <div class="form-check">
                      <div class="col-md-6">
                        <div class="col-md-12">
                          <input class="form-check-input" type="checkbox" />
                          <label class="form-check-label" for="gridCheck">DAP Enviado.</label>
                          <br />
                        </div>
                        <div class="col-md-12">
                          <br />
                          <label for="inputAddress">Verificado em:</label>
                          <input type="datetime-local" class="form-control" />
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-12">
                          <input class="form-check-input" type="checkbox" />
                          <label class="form-check-label" for="gridCheck">DAP aguardando Adv.</label>
                        </div>
                        <div class="col-md-12">
                          <br />
                          <label for="inputAddress">Verificado em:</label>
                          <input type="datetime-local" class="form-control" />
                        </div>
                      </div> 
                    </div>
                  </div>-->
                </form>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <div v-if="error" class="alert alert-danger">
            <ul>
              <li>{{error.msg}}</li>
            </ul>
            <div class="message">
              <p class="alert alert-{{}}">
                <a href=" #" class="close" data-dismiss="alert" aria-label="close">&times;</a>
              </p>
            </div>
          </div>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="salvarAudiencia">
            <span class="glyphicon glyphicon-floppy-disk"></span> Salvar
          </button>
        </div>
      </div>
      <div v-show="recebendo">
        Carregando...
        <span class="fa fa-spinner fa-spin fa-3x"></span>
      </div>
    </modal>
    <!-- ---------------------- -->
    <!-- ------------------- -->
  </div>
</template>

<script>
import DetalheProcSijur from "./DetalheProcSijur"

//import moment from "moment"
import datePickerConfig from "../../mixins/datePickerConfigMixins";
import moment from 'moment';
  
export default {
  components: {
    DetalheProcSijur : DetalheProcSijur,
  },
  mixins: [datePickerConfig],
  data() {
    return {
      carregando: false,
      pronto: false,
      tercAto: false
    };
  },
  props: ["audiencia", "recebendo"],
  computed: {
    Title() {
      return (this.audiencia.id ? "Edite " : "Nova") + " Audiência";
    },
    Tipos() {
      //let tipos =
      return this.$store.state.audiencia.tipos;
      //   return tipos.map((tp)=>{ return {id:tp.id, label:tp.descricao} })
    },
    Advogados() {
      let advs = this.$store.state.advogado.advogados;
      return advs.map(adv => {
        adv.desc = adv.usuario + " " + adv.nome;
        return adv;
      });
      //   return tipos.map((tp)=>{ return {id:tp.id, label:tp.descricao} })
    },
    Processos() {
      return this.$store.state.processo.processos;
    },
    error() {
      return undefined; // this.error
    }
  },
  methods: {
    msgInfo() {
      return "asdaksjdlkasj dl "; //this.audiencia.processo? 'Audiência para o Processo ' + this.audiencia.processo.nu_processo :''
    },

    redistAdvg() {
      console.log("Acao de REdistroi ADvg");

      //this.audiencia.processo? 'Audiência para o Processo ' + this.audiencia.processo.nu_processo :''
    },
    setProcessoAudiencia(proc) {
      if (proc) {
        this.carregando = true;
        this.$store.dispatch("processo/getProcessoId", proc).then(() => {
          let aud = {
            processo: this.$store.state.processo.processo
          };
          aud.processo_id = aud.processo.id;
          this.$store.dispatch("audiencia/getAudiencia", aud);
          this.carregando = false;
          // this.$store.dispatch('audiencia/setProcesso' , this.$store.state.processo.processo)
        });
      }
    },

    salvarAudiencia() {
      //this.audiencia.bit_terc_ato = this.tercAto
      let self = this;
      this.$store
        .dispatch("audiencia/gravarAudiencia", this.audiencia)
        .then(() => {
          //console.log("salvou");
          self.closeModal();
        });
    },
    onCloseModal() {
      this.$store.dispatch("audiencia/resetAudiencia");
      //console.log( "reset Audiencia");
    },
    // -------------Modal ------------------ //
    showModal() {
      this.getModal().show();
    },
    closeModal() {
      this.getModal().close();
    },
    getModal() {
      return this.$refs.modal;
    }
  },
  mounted() {
    let self = this;
    $(this.getModal)
      .find(".modal")
      .on("hidden.bs.modal", function(e) {
        if ($(e.target).parent()[0].title == "divModalAudiencia") {
          self.onCloseModal();
        }
      });
  }
};
</script>
