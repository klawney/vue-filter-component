<template>
  <div v-if="m_exp_dismember">
    <ul id="myTab" role="tablist" class="nav nav-tabs">
      <li class="nav-item active"><a id="dismember-tab" data-toggle="tab" href="#dismember" role="tab" aria-controls="dismember" aria-selected="false" aria-expanded="true" class="nav-link active"><i class="fa fa-star-half-empty"></i> Desmembramento</a></li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <div id="dismember" role="tabpanel" aria-labelledby="dismember-tab" class="tab-pane fade active in">
        <div class="col-md-12">&nbsp;</div>
          <form :action="done_route" method="post" ref="myForm">
            <div class="row">
              <input type="hidden" name="_token" :value="csrf_token">
              <div v-for="i in m_exp_to_dismembers">
                <div class="col-sm-12">
                  <div class="panel panel-default" style="box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 3px;">
                    <div class="panel-heading">
                      <h4><i class="fa fa-star-half-empty"></i> {{m_exp_to_dismembers[i-1] == 1 ? m_exp_dismember.co_expediente : 'Expediente ' + m_exp_to_dismembers[i-1]}}</h4>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table class="table table-responsive table-borderless">
                              <thead>
                                <tr>
                                  <th>Contrato</th>
                                  <th>Operação</th>
                                  <th><i class="fa fa-calendar-times-o" aria-hidden="true"></i> Data CA</th>
                                  <th><i class="fa fa-dollar" aria-hidden="true"></i> Valor CA</th>
                                  <th><i class="fa fa-money" aria-hidden="true"></i> Valor Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="m_exp_to_dismembers[i-1] == contract.exp_to_dismember" v-for="(contract, index) in m_exp_dismember.contracts">
                                  <input type="hidden" :name="'exp_contract_'+contract.co_contrato" :value="contract.exp_to_dismember">
                                  <input type="hidden" name="co_expediente" :value="m_exp_dismember.co_expediente">
                                  <td><input type="text" :name="'contract_'+contract.co_contrato" :value="contract.co_contrato" disabled="disabled" class="form-control"></td>
                                  <td>
                                    <select v-if="contract.show == 1" :name="'op_contract_'+contract.co_contrato" v-model="operation_choices[index]" class="form-control">
                                      <option v-for="operation in m_select_operations" :value="operation.NU_OPERACAO">{{operation.NU_OPERACAO}} - {{operation.DE_OPERACAO}}</option>
                                    </select>
                                    <select v-else :name="'op_contract_'+contract.co_contrato" v-model="operation_choices[index]" class="form-control" disabled>
                                      <option v-for="operation in m_select_operations" :value="operation.NU_OPERACAO">{{operation.NU_OPERACAO}} - {{operation.DE_OPERACAO}}</option>
                                    </select>
                                  </td>
                                  <td><input type="text" :name="'dt_ca_contract_'+contract.co_contrato" :value="frontEndDateFormat(contract.dt_ca)" disabled="disabled" class="form-control"></td>
                                  <td><input type="text" :name="'vr_ca_contract_'+contract.co_contrato" :value="contract.vr_ca | currency" disabled="disabled" class="form_control"></td>
                                  <td><input type="text" :name="'vr_total_contract_'+contract.co_contrato" :value="contract.vr_total | currency" disabled="disabled" class="form_control"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div v-if="m_exp_dismember.warranties.length > 0" class="table-responsive">
                          <table class="table table-responsive table-borderless">
                            <thead>
                              <tr>
                                <th>Garantia</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="m_exp_to_dismembers[i-1] == warranty.exp_to_dismember" v-for="(warranty, index) in m_exp_dismember.warranties">
                                <td>
                                  <select class="form-control" :name="'warranty_exp_'+warranty.exp_to_dismember" v-model="warranty_choices[index]">
                                    <option v-for="w in m_exp_dismember.warranties" :value="w.warranty_op">{{w.warranty_op}} - {{w.name}}</option>
                                  </select>
                                </td>
                              </tr>
                              <tr v-else>
                                <td>
                                  <select class="form-control" disabled>
                                    <option value="0"> - </option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div v-if="exp_found" class="col-md-12">
                          <div v-if="res.CO_EXPEDIENTE != 'ERRO'">
                            <div class="col-md-12 alert alert-default" style="border: 1px solid silver">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <hr>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button type="submit" title="Executar Desmembramento" class="btn btn-primary buttons pull-right" :disabled="!isUnimpeded" v-confirm="{
                  okText: 'Sim',
                  cancelText: 'Cancelar',
                  cancel:notConfirm,
                  message: 'Confirma o desmembramento?'
                }"><i aria-hidden="true" class="fa fa-check"></i> Executar
              </button>
            </div>
          </div>
          <div class="col-md-12">&nbsp;</div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import moment from 'moment'
  import VuejsDialog from 'vuejs-dialog'
  import VueCurrencyFilter from 'vue-currency-filter'

  Vue.use(VuejsDialog)
  Vue.use(VueCurrencyFilter, {
    symbol : 'R$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })

  export default {
    props: [
      'exp_dismember',
      'exp_to_dismembers',
      'select_operations',
      'select_warranties',
      'done_route',
      'csrf_token'
    ],

    mounted(){
      this.m_exp_dismember = JSON.parse(this.exp_dismember)
      this.m_exp_to_dismembers = JSON.parse(this.exp_to_dismembers)
      this.m_select_operations = JSON.parse(this.select_operations)
      this.m_select_warranties = JSON.parse(this.select_warranties)
      for(let i=0; i < this.m_exp_dismember.contracts.length; i++){
        this.operation_choices[i] = this.m_exp_dismember.contracts[i].contract_op
      }
      for(let j=0; j < this.m_exp_dismember.warranties.length; j++){
        this.warranty_choices[j] = this.m_exp_dismember.warranties[j].warranty_op
      }

      let aux_exp = this.m_exp_dismember.co_expediente.replace('/', '-BARRA-')
      let url
      if ( process.env.NODE_ENV == 'production' ) {
        url = 'http://www.jurirbh.hom.mg.caixa/sistema/sijur_controle/agiliza/public/solicitations/1/get-data?co_expediente='+aux_exp+'&solicitation_type_id=1'
      } else {
        url = 'http://localhost:3000/solicitations/1/get-data?co_expediente='+aux_exp+'&solicitation_type_id=1'
      }
      axios
        .get(url)
        .then(response => {
          this.res = response.data
          this.exp_found = true
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },

    data(){
      return {
        m_exp_dismember: {},
        m_exp_to_dismembers: {},
        m_select_operations: {},
        m_select_warranties: {},
        operation_choices: [],
        warranty_choices: [],
        res: null,
        exp_found: false
      }
    },

    computed: {
      isUnimpeded(){
        return true
      }
    },

    methods: {
      /*********CONFIRM DIALOG**********/
      notConfirm: function(){
        event.preventDefault()
      },
      /*********************************/
      frontEndDateFormat(date){
        return moment(String(date)).format('DD/MM/YYYY')
      }
    }
  }
</script>