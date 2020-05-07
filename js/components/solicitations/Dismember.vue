<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
          <div class="col-md-12">
            <h3><span class="fa fa-star-half-empty"></span> Desmembrar Expediente</h3>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <span v-if="errors.has('co_expediente_id')" class="text-danger">{{ errors.first('co_expediente_id') }}</span><br>
        <div id="box_exp" class="form-inline">
          <label for="co_expediente">Expediente:</label>
          <b>
            <input  v-model="co_expediente" v-mask="'##.###.#####/####'" v-validate="'required|length:17'"  @focus="touched()"
              name="co_expediente" id="co_expediente" type="text" class="form-control">
          </b>
          <a v-if="loading" href="#" class="btn btn-primary" disabled="disabled"><span><i class="fa fa-circle-o-notch fa-spin"></i></span></a>
          <a v-else href="#" class="btn btn-primary" @click="getExpInfo()" v-bind:disabled="!validCoExpediente"><span><i aria-hidden="true" class="fa fa-share" @click="getExpInfo()"></i></span></a>
          <span v-if="(!validCoExpediente && !untouched)" class="text-danger">Expediente inválido</span><br>
        </div>
        <div v-if="exp_found" class="col-md-12">
          <div v-if="res.CO_EXPEDIENTE != 'ERRO' && res.NU_AREA_JUDICIAL == 3" class="row">
            <br>
            <div class="col-md-12 alert alert-info">
              <div class="col-md-12"><h3 class="text-success">{{ res.CO_EXPEDIENTE }}</h3></div>
              <div class="col-md-6"><b>Parte: </b>{{ res.NO_PARTE }}</div>
              <div class="col-md-6"><b>Responsável: </b>{{ res.RESP }}</div>
              <div class="col-md-6"><b>Ação: </b>{{ res.DE_ACAO }}</div>
              <div class="col-md-6"><b>Num. Processo: </b>{{ res.NU_PROCESSO_TEXTO }}</div>
              <div class="col-md-6"><b>Área: </b>{{ res.DE_AREA_JUDICIAL }}</div>
              <div class="col-md-6"><b>Vara: </b>{{ res.NU_VARA }}</div>
              <div class="col-md-6"><b>Foro: </b>{{ res.DE_FORO }}</div>
              <div class="col-md-12"><b>Comarca: </b>{{ res.DE_COMARCA }}</div>
            </div>
            <div v-if="divide_by > 1">
              <fieldset class="scheduler-border">
                <form :action="store_dismember_route" method="post">
                  <input type="hidden" name="_token" v-model="csrf_token">
                  <input type="hidden" name="co_expediente" v-model="res.CO_EXPEDIENTE">
                  <h3>Distribuição dos Contratos {{divide_by}}</h3>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Contrato</th>
                        <th class="col-md-2">Expediente</th>
                        <th class="col-md-2">Garantia</th>
                        <th>Data de CA</th>
                        <th>Valor de CA</th>
                        <th>Valor da Dívida</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="contracts" v-for="i in divide_by">
                        <td>
                          <input :name="'contract_'+ contracts[i-1].CO_CONTRATO" type="text" class="form-control" :value="contracts[i-1].CO_CONTRATO" disabled="disabled">
                        </td>
                        <td>
                          <select :name="'exp_contract_'+ contracts[i-1].CO_CONTRATO" v-model="exp_choices[i-1]" class="form-control">
                            <option v-for="j in divide_by" :value=j>{{ j == 1 ? 'Exp. Original' : 'Expediente ' + j }}</option>
                          </select>
                        </td>
                        <td>
                          <select :name="'warranty_contract_'+ contracts[i-1].CO_CONTRATO" v-model="warranty_choices[i-1]" class="form-control">
                            <option value=0>SEM GARANTIA</option>
                            <option v-for="l in warranties.length" :value="warranties[l-1].NU_OPERACAO">{{ warranties[l-1].NU_OPERACAO + ' - ' + warranties[l-1].DE_OPERACAO}}</option>
                          </select>
                        </td>
                        <td>
                          <input type="text" :name="'dt_ca_'+ contracts[i-1].CO_CONTRATO" v-model="dt_ca[i-1]" v-mask="'##/##/####'"></input>
                        </td>
                        <td>
                          <input type="text" :name="'vr_ca_'+ contracts[i-1].CO_CONTRATO" v-model="vr_ca[i-1]" class="form-control" v-money="money">
                        </td>
                        <td>
                          <input type="text" :name="'vr_total_'+ contracts[i-1].CO_CONTRATO" v-model="vr_total[i-1]" class="form-control" v-money="money">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <br>
                    <button type="submit" title="Enviar" class="btn btn-primary buttons" :disabled="!isUnimpeded" v-confirm="{
                        okText: 'Sim',
                        cancelText: 'Cancelar',
                        cancel:notConfirm,
                        message: 'Confirma solicitação de desmembramento deste expediente?'
                      }">Enviar
                    </button>
                  </div>
                </form>
              </fieldset>
            </div>
            <div v-else>
              <br>
              <div class="col-md-12 alert alert-danger"><i><b>Apenas um contrato. Não é possível desmebrar este expediente.</b></i></div>
            </div>
          </div>
          <div v-else-if="res.CO_EXPEDIENTE != 'ERRO' && res.NU_AREA_JUDICIAL != 3">
            <br>
            <div class="col-md-12 alert alert-danger"><i><b>Não é um expediente de Recuperação de Créditos.</b></i></div>
          </div>
          <div v-else>
            <br>
            <div class="col-md-12 alert alert-danger"><i><b>Erro na consulta. Talvez este expediente possa ter sido excluído.</b></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  fieldset.scheduler-border {
    border: 1px solid gainsboro;
    padding: 0 1.4em 1.4em 1.4em !important;
    margin: 0 0 1.5em 0 !important;
    -webkit-box-shadow:  0px 0px 0px 0px #000;
    box-shadow:  0px 0px 0px 0px #000;
  }
  legend.scheduler-border {
    font-size: 1.2em !important;
    font-weight: bold !important;
    text-align: left !important;
    width:auto;
    padding:0 10px;
    border-bottom:none;
  }
</style>

<script>
import Vue from 'vue'
import axios from 'axios'
import ptBR from 'vee-validate/dist/locale/pt_BR.js'
import VeeValidate, { Validator } from 'vee-validate'
import moment from 'moment'
import {VMoney} from 'v-money'
import VueTheMask from 'vue-the-mask'
import VuejsDialog from 'vuejs-dialog'

Validator.localize('pt_BR', ptBR)
Vue.use(VeeValidate)
Vue.use(VueTheMask)
Vue.use(VuejsDialog)

export default {
  props: [
    'solicitation_type_id',
    'unid_sijur_dig',
    'csrf_token',
    'store_dismember_route'
  ],

  data(){
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },

      exp_choices: [],
      warranty_choices: [],
      dt_ca: [],
      vr_ca: [],
      vr_total: [],

      contracts: [],
      warranties: [],
      exp_found: false,
      untouched: true,
      res: null,
      loading: false,
      co_expediente: '11.00',
      divide_by: 1
    }
  },

  mounted () {
    this.co_expediente += this.unid_sijur_dig
  },

  methods: {
    /*********CONFIRM DIALOG**********/
    notConfirm: function(){
      event.preventDefault()
    },
    /*********************************/
    getExpInfo() {
      if(!this.validCoExpediente){
        return
      }
      this.loading = true
      var aux_exp = this.co_expediente.replace('/', '-BARRA-')
      var url
      if ( process.env.NODE_ENV == 'production' ) {
        url = 'http://www.jurirbh.hom.mg.caixa/sistema/sijur_controle/agiliza/public/solicitations/1/get-data?co_expediente='+aux_exp+'&solicitation_type_id='+this.solicitation_type_id
      } else {
        url = 'http://localhost:3000/solicitations/1/get-data?co_expediente='+aux_exp+'&solicitation_type_id='+this.solicitation_type_id
      }
      axios
        .get(url)
        .then(response => {
          this.res = response.data

          let op = ''
          let aux = ''
          let count = 0
          for(var i = 0; i < this.res.CONTRACTS.length; i++){
            op = this.res.CONTRACTS[i].CO_CONTRATO.substr(4,3)
            aux = this.res.CONTRACTS[i].CO_CONTRATO.substr(0,4)
            if(aux != '9926') {
              if (this.res.CONTRACTS[i].show){
                this.contracts[count] = this.res.CONTRACTS[i]
                count++
              }
            }
          }
          for(var j = 0; j < this.res.WARRANTIES.length; j++){
            this.warranties[j] = this.res.WARRANTIES[j]
          }
          this.divide_by = this.contracts.length
          this.loading = false
          this.exp_found = true
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    touched() {
      this.untouched = false
    },
    dateIsValid(dt) {
      console.log("a")
      if (dt.length != 10) {
        return false
      }
      let year = new Date().getFullYear()
      let d = dt.substr(0,2)
      let m = dt.substr (3,2)
      let y = dt.substr (6,4)
      if(m <= 0 || m > 12){
        return false
      }
      if (y < 1990 || y > year){
        return false
      }
      switch (m) {
        case '01': return (d <= 31 && d >= 0); break
        case '02': return (d <= 29 && d >= 0); break
        case '03': return (d <= 31 && d >= 0); break
        case '04': return (d <= 30 && d >= 0); break
        case '05': return (d <= 31 && d >= 0); break
        case '06': return (d <= 30 && d >= 0); break
        case '07': return (d <= 31 && d >= 0); break
        case '08': return (d <= 31 && d >= 0); break
        case '09': return (d <= 30 && d >= 0); break
        case '10': return (d <= 31 && d >= 0); break
        case '11': return (d <= 30 && d >= 0); break
        case '12': return (d <= 31 && d >= 0); break
      }
    }
  },

  computed: {
    validCoExpediente() {
      if(this.co_expediente.length === 17){
        let year = new Date().getFullYear()
        if(this.co_expediente.substr(0, 5) != '11.00' || this.co_expediente.substr(7, 5) == '00000' || this.co_expediente.substr(5, 1) > 3 || !(this.co_expediente.substr(13,16) >= 1990 && this.co_expediente.substr(13,16) <= year)){
          return false
        }
        return true
      }
      return false
    },
    validCoExpedienteRecurso() {
      return this.co_expediente_recurso.length === 3
    },
    isUnimpeded(){
      if (this.exp_choices.length != this.divide_by) {
        console.log('a')
        return false
      }
      if (this.warranty_choices.length != this.divide_by) {
          console.log('b')
        return false
      }
      for (let i = 0; i < this.divide_by; ++i) {
        if (this.vr_ca[i] == 'R$ 0,00') {
            console.log('c')
          return false
        }
      }
      for (let i = 0; i < this.divide_by; ++i) {
        if (this.vr_total[i] == 'R$ 0,00') {
            console.log('d')
          return false
        }
      }
      for (let i = 0; i < this.divide_by; ++i) {
        if (this.dt_ca[i].length < 10) {
            console.log('e')
          return false
        }
      }
      //TODOS OS CONTRATOS VINCULADOS. VERIFICAR SE AO MENOS UM ESTÁ NO PRINCIPAL
      let proceed = false
      for (let i = 0; i < this.divide_by; ++i) {
        if (this.exp_choices[i] == 1) {
          proceed = true
        }
      }
      if(!proceed){
        console.log('f')
        return false
      }
      proceed = false
      let aux = this.exp_choices[0]
      for (let i = 0; i < this.divide_by; ++i) {
        if (this.exp_choices[i] != aux) {
          proceed = true
        }
      }
      if(!proceed){
          console.log('g')
        return false
      }
      if(this.dt_ca.length != this.divide_by){
          console.log('h')
        return false
      }
      for (let i = 0; i < this.divide_by; ++i) {
        if (!this.dateIsValid(this.dt_ca[i])) {
            console.log('i')
          return false
        }
      }
      return true
    }
  }
}
</script>