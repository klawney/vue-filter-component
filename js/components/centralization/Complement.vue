<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-check-square-o"></span> Complementar Processos</h3>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-3">
                        <h2 class="text-info">{{item.getCoExpediente}}</h2>
                    </div>
                    <div class="col-md-3">
                        <h4 class="text-info" style="margin-top: 30px">Entrada: {{item.getDtEntrada}}</h4>
                    </div>
                    <div v-if="item.getIcSituacaoProcesso == 0" class="col-md-5" style="margin-top: 20px">
                        <span class="alert alert-info"> ATIVO</span>
                    </div>
                    <div v-else class="col-md-5" style="margin-top: 20px">
                        <span class="alert alert-danger"> EXTINTO</span>
                    </div>
                    <div class="col-md-1 form-inline div-buttons pull-right">
                        <form method="POST" accept-charset="UTF-8" target="_top" class="buttons">
                            <input type="hidden" value="BDD7436WN001.corp.caixa.gov.br" name="servidorSijur">
                            <input type="hidden" name="coExpediente" :value=item.getCoExpediente>
                            <button type="submit" formaction="http://www.portal.dijur.caixa/modulos/Ged/?pg=gedDossie" formtarget="_blank" class="btn btn-primary pull-right">
                                <i class="fa fa-file-pdf-o"></i> Portal
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <form :action="item.doneRoute" method="post" ref="myForm">
                <div class="row">
                    <input type="hidden" name="_token" v-model="csrf_token">
                    <input type="hidden" name="co_expediente" v-model="item.getCoExpediente">
                    <input type="hidden" name="nu_posicao_cef" v-model="nu_posicao_cef">
                    <input v-if="item.proc_centralization_id != 0" type="hidden" name="proc_centralization_id" v-model="item.proc_centralization_id">
                    <div class="form-group col-md-3">
                        <label for="nu_processo_texto">Num. Processo:</label>
                        <input type="text" name="nu_processo_texto" class="form-control" v-model=item.getNuProcessoTexto v-mask="'####################'" v-validate="'required|length:20'">
                        <span v-if="errors.has('nu_processo_texto')" class="text-danger">Número de processo inválido</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="nu_processo_texto_anterior">Num. Processo Anterior:</label>
                        <input type="text" name="nu_processo_texto_anterior" class="form-control" v-model=item.getNuProcessoTextoAnterior v-mask="'####################'" v-validate="'length:20'">
                        <span v-if="errors.has('nu_processo_texto_anterior')" class="text-danger">Número de processo inválido</span>
                    </div>
                    <div class="form-group col-md-1" :class="{'has-error': errors.has('nu_vara')}">
                        <label for="nu_vara">Vara:</label>
                        <input type="text" name="nu_vara" class="form-control" v-model=item.getNuVara v-mask="'##'" v-validate="'required'">
                        <span v-if="errors.has('nu_vara')" class="text-danger">{{ errors.first('nu_vara') }}</span>
                    </div>
                    <div class="form-group col-md-5">
                        <label for="nu_area_judicial">Área:</label>
                        <select name="nu_area_judicial" class="form-control" v-model="item.getNuAreaJudicial" v-validate="'required'">
                            <option v-for="area in obj_areas" v-bind:value=area.id>{{area.description}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Comarca:</label>
                        <v-select v-model="comarca_selected" label="description" :options="obj_comarcas"></v-select>
                        <input type="hidden" name="nu_comarca" :value="comarca_selected.id"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Foro:</label>
                        <v-select v-model="foro_selected" label="description" :options="obj_foros"></v-select>
                        <input type="hidden" name="nu_foro" :value="foro_selected.id"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Ação:</label>
                        <v-select v-model="acao_selected" label="description" :options="obj_acoes"></v-select>
                        <input type="hidden" name="nu_acao" :value="acao_selected.id"/>
                    </div>
                    <div v-if="item.getIcTerceirizado == 1" class="form-group col-md-6">
                        <label>Responsável:</label>
                        <v-select v-model="resp_selected" label="description" :options="obj_credenciados"></v-select>
                        <input type="hidden" name="nu_credenciado" :value="resp_selected.id"/>
                    </div>
                    <div v-else class="form-group col-md-6">
                        <label>Responsável:</label>
                        <v-select v-model="resp_selected" label="description" :options="obj_empregados"></v-select>
                        <input type="hidden" name="nu_empregado" :value="resp_selected.id"/>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class ="col-md-1">
                        <a title="Adicionar Parte" class="btn btn-success button-add" @click.prevent="addParteJudicial('',3,'','')"><i class="fa fa-plus"></i></a>
                    </div>
                    <div class="col-md-11">
                        <h3>Partes</h3>
                    </div>
                </div>
                <br>
                <div class="col-md-12">
                    <div v-if="item.getNuAreaJudicial == 5" class="row">
                        <div v-for="(input, index) in parte_judicial.inputs" class="row">
                            <div class="form-group col-md-4">
                                <label v-if="index == 0" :for=input.noParteDomName>Nome da Parte:</label>
                                <input type="text" class="form-control" :name=input.noParteDomName @input="noParteModified(index)" v-model="input.no_parte" v-validate="'required|max:60'">
                                <span v-if="errors.has(input.noParteDomName)" class="text-danger">{{ errors.first(input.noParteDomName) }}</span>
                            </div>
                            <div class="form-group col-md-2">
                                <label v-if="index == 0" :for=input.nuCpfcgcDomName>CPF/CNPJ:</label>
                                <input type="text" class="form-control" :name=input.nuCpfcgcDomName v-model="input.nu_cpfcgc" v-mask="['###.###.###-##', '##.###.###/####-##']" v-validate="'min:14|max:18'" @keyup="validarCPFCNPJ(index)" @change="nuCpfCgcModified(index)">
                                <input type="hidden" :name="input.coTipoPessoaDomName" v-model="input.co_tipopessoa">
                                <span v-if="errors.has(input.nuCpfcgcDomName)" class="text-danger">Não é um CPF/CNPJ válido</span>
                                <span v-else>
                                <span v-if="input.nu_cpfcgc.length > 0 && !input.isValidNuCpfcgc" class="text-danger">Não é um CPF/CNPJ válido</span>
                            </span>
                            </div>
                            <div class="form-group col-md-2">
                                <label v-if="index == 0" :for=input.nuMatriculaDomName>Matrícula:</label>
                                <input type="text" class="form-control" :name=input.nuMatriculaDomName v-model="input.nu_matricula" v-mask="'######'" v-validate="'required|min:1|max:6'">
                                <span v-if="errors.has(input.nuCpfcgcDomName)" class="text-danger">Matrícula inválida</span>
                            </div>
                            <div class="form-group col-md-3">
                                <label v-if="index == 0" :for=input.nuCondicaoParteDomName>Condição Parte:</label>
                                <select class="form-control" :name="input.nuCondicaoParteDomName" v-model="input.nu_condicao_parte" @change="nuCondicaoParteModified">
                                    <option v-for="condicao_parte in obj_condicao_partes" v-bind:value=condicao_parte.NU_CONDICAO_PARTE>{{condicao_parte.DE_CONDICAO_PARTE}} - {{condicao_parte.NU_CONDICAO_PARTE}}</option>
                                </select>
                            </div>
                            <div v-if="index == 0" class="form-group col-md-1 div-button-without-label">
                                <a class="btn btn-danger" @click.prevent="deleteParteJudicial(index)"><i class="fa fa-trash"></i></a>
                            </div>
                            <div v-else class="form-group col-md-1">
                                <a class="btn btn-danger" @click.prevent="deleteParteJudicial(index)"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div v-for="(input, index) in parte_judicial.inputs" class="row">
                            <div class="form-group col-md-5">
                                <label v-if="index == 0" :for=input.noParteDomName>Nome da Parte:</label>
                                <input type="text" class="form-control" :name=input.noParteDomName @input="noParteModified(index)" v-model="input.no_parte" v-validate="'required|max:60'">
                                <span v-if="errors.has(input.noParteDomName)" class="text-danger">{{ errors.first(input.noParteDomName) }}</span>
                            </div>
                            <div class="form-group col-md-2">
                                <label v-if="index == 0" :for=input.nuCpfcgcDomName>CPF/CNPJ:</label>
                                <input type="text" class="form-control" :name=input.nuCpfcgcDomName v-model="input.nu_cpfcgc" v-mask="['###.###.###-##', '##.###.###/####-##']" v-validate="'min:14|max:18'" @keyup="validarCPFCNPJ(index)" @change="nuCpfCgcModified(index)">
                                <input type="hidden" :name="input.coTipoPessoaDomName" v-model="input.co_tipopessoa">
                                <span v-if="errors.has(input.nuCpfcgcDomName)" class="text-danger">Não é um CPF/CNPJ válido</span>
                                <span v-else>
                            <span v-if="input.nu_cpfcgc.length > 0 && !input.isValidNuCpfcgc" class="text-danger">Não é um CPF/CNPJ válido</span>
                        </span>
                            </div>
                            <div class="form-group col-md-4">
                                <label v-if="index == 0" :for=input.nuCondicaoParteDomName>Condição Parte:</label>
                                <select class="form-control" :name="input.nuCondicaoParteDomName" v-model="input.nu_condicao_parte" @change="nuCondicaoParteModified">
                                    <option v-for="condicao_parte in obj_condicao_partes" v-bind:value=condicao_parte.NU_CONDICAO_PARTE>{{condicao_parte.DE_CONDICAO_PARTE}} - {{condicao_parte.NU_CONDICAO_PARTE}}</option>
                                </select>
                            </div>
                            <div v-if="index == 0" class="form-group col-md-1 div-button-without-label">
                                <a class="btn btn-danger" @click.prevent="deleteParteJudicial(index)"><i class="fa fa-trash"></i></a>
                            </div>
                            <div v-else class="form-group col-md-1">
                                <a class="btn btn-danger" @click.prevent="deleteParteJudicial(index)"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class ="col-md-1">
                        <a title="Adicionar Contrato" class="btn btn-success button-add" @click.prevent="addContratoJudicial('','','')"><i class="fa fa-plus"></i></a>
                    </div>
                    <div class="col-md-11">
                        <h3>Contratos</h3>
                    </div>
                </div>
                <br>
                <div v-for="(input, index) in contrato_judicial.inputs" class="row">
                    <div class="form-group col-md-7">
                        <label v-if="index == 0">Nome da Parte no Contrato:</label>
                        <select :name="input.noParteDomName" v-model="input.no_parte" class="form-control" @change="noParteContratoModified(index, input.no_parte)">
                            <option v-for="parte in parte_judicial.inputs" v-bind:value=parte.no_parte>{{parte.no_parte}}</option>
                        </select>
                        <input type="hidden" :name="input.nuCondicaoParteDomName" :value="input.nu_condicao_parte">
                    </div>
                    <div class="form-group col-md-4">
                        <label v-if="index == 0">Contrato:</label>
                        <input type="text" class="form-control" :name="input.coContratoDomName" @input="coContratoModified(index)" v-model="input.co_contrato" v-validate="'required'">
                        <span v-if="errors.has(input.coContratoDomName)" class="text-danger">Campo obrigatório</span>
                    </div>
                    <div v-if="index == 0" class="form-group col-md-1 div-button-without-label">
                        <a class="btn btn-danger" @click.prevent="deleteContratoJudicial(index)"><i class="fa fa-trash"></i></a>
                    </div>
                    <div v-else class="form-group col-md-1">
                        <a class="btn btn-danger" @click.prevent="deleteContratoJudicial(index)"><i class="fa fa-trash"></i></a>
                    </div>
                </div>
                <hr>
                <div v-if="item.getNuAreaJudicial != 3">
                    <div class="row">
                        <div class="form-group col-md-11">
                            <label>Grupo Assunto:</label>
                            <v-select v-model="grupo_assunto_selected" label="description" :options="obj_grupo_assuntos" @input="nuGrupoAssuntoModified" @change="nuGrupoAssuntoModified"></v-select>
                            <input type="hidden" name="nu_grupo_assunto" :value="grupo_assunto_selected.id"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class ="col-md-1">
                            <a title="Adicionar Assunto" class="btn btn-success button-add" @click.prevent="addAssuntoJudicial('50','DANO MORAL')"><i class="fa fa-plus"></i></a>
                        </div>
                        <div class="col-md-11">
                            <h3>Assuntos</h3>
                        </div>
                    </div>
                    <br>
                    <div class="rown">
                        <div v-for="(input, index) in assunto_judicial.inputs" class="row">
                            <div class="form-group col-md-11">
                                <v-select v-model="input.selected" label="description" :options="assunto_judicial_options"></v-select>
                                <input type="hidden" :name="'assunto_judicial_id_'+index" :value="input.selected.id">
                            </div>
                            <div class="form-group col-md-1">
                                <a class="btn btn-danger" @click.prevent="deleteAssuntoJudicial(index)"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row">
                        <div class ="col-md-1">
                            <a title="Adicionar Operacao" class="btn btn-success button-add" @click.prevent="addOperacaoJudicial('999','A CLASSIFICAR')"><i class="fa fa-plus"></i></a>
                        </div>
                        <div class="col-md-11">
                            <h3>Operações</h3>
                        </div>
                    </div>
                    <br>
                    <div class="rown">
                        <div v-for="(input, index) in operacao_judicial.inputs" class="row">
                            <div class="form-group col-md-11">
                                <v-select v-model="input.selected" label="description" :options="operacao_judicial_options"></v-select>
                                <input type="hidden" :name="'operacao_judicial_id_'+index" :value="input.selected.id">
                            </div>
                            <div class="form-group col-md-1">
                                <a class="btn btn-danger" @click.prevent="deleteOperacaoJudicial(index)"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class ="col-md-1">
                        <a title="Adicionar Expediente Vinculado" class="btn btn-success button-add" @click.prevent="addExpedienteVinculado('')"><i class="fa fa-plus"></i></a>
                    </div>
                    <div class="col-md-11">
                        <h3>Expedientes Vinculados</h3>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div v-for="(input, index) in expediente_vinculado.inputs">
                        <div class="form-group col-md-2">
                            <input type="text" class="form-control" :name=input.coExpedienteVinculadoDomName v-model="input.co_expediente_vinculado" v-mask="'##.###.#####/####'" v-validate="'required|length:17'">
                            <span v-if="errors.has(input.coExpedienteVinculadoDomName)" class="text-danger">Expediente incorreto</span>
                        </div>
                        <div class="form-group col-md-1">
                            <a class="btn btn-danger" @click.prevent="deleteExpedienteVinculado(index)"><i class="fa fa-trash"></i></a>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Centro de Custo:</label>
                        <v-select v-model="centro_custo_selected" label="description" :options="obj_unidades" @input="nuUnidadeSubcidioModified" @change="nuUnidadeSubcidioModified"></v-select>
                        <input type="hidden" name="nu_unidade" :value="centro_custo_selected.id"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Unidade Subsídio:</label>
                        <v-select v-model="unidade_subsidio_selected" label="description" :options="obj_unidades"></v-select>
                        <input type="hidden" name="nu_unidade_subsidio" :value="unidade_subsidio_selected.id"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-3">
                        <label for="dt_causa">Data da Causa:</label>
                        <div v-if="dt_causa != ''">
                            <datepicker-component name="dt_causa" :value="dt_causa" clear_button="false"></datepicker-component>
                        </div>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="vr_causa">Valor da Causa:</label>
                        <div v-if="vr_causa != ''">
                            <input type="text" name="vr_causa" v-model="vr_causa" class="form-control" v-money="money">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="de_observacao">Observacao:</label>
                        <textarea name="de_observacao" class="form-control" rows="4" @input="deObservacaoModified" v-model="item.getDeObservacao"></textarea>
                    </div>
                </div>
                <br>
                <div v-if="item.waitingForComplement" class="row">
                    <div class="form-group col-md-12">
                        <input style="margin-left: -550px" type="checkbox" id="completed" name="completed" v-model="completed">
                        <label style="margin-left: -550px" for="completed"><span v-if="completed" class="fa fa-thumbs-o-up fa-lg"></span> Lançar fase 440 e marcar como concluído</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-9 form-inline div-buttons">
                        <a v-if="item.waitingForComplement" class="btn btn-warning buttons" title="Devolver" :href="item.devolutionRoute"><span class="fa fa-thumbs-o-down fa-lg"></span> Devolver</a>
                        <button type="submit" title="Salvar" class="btn btn-success buttons" :disabled="btnSaveIsDisabled"
                            v-confirm="{
                              okText: 'Salvar',
                              cancelText: 'Cancelar',
                              cancel:notConfirm,
                              message: 'Deseja salvar as alterações?'
                            }"><span class="fa fa-save fa-lg"></span> Salvar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
select, option {
  width: 180pt;
  padding: 0pt 2pt;
}
.buttons{
    float: left;
    margin-left: 5px;
}
.div-buttons{
    margin-top: 20px;
}
.div-button-without-label{
    margin-top: 25px;
}
.button-add{
    margin-top: 17px;
}
</style>

<script>
  import ptBR from 'vee-validate/dist/locale/pt_BR.js'
  import VeeValidate, { Validator } from 'vee-validate'
  import VueSelect from 'vue-select'
  import moment from 'moment'
  import {VMoney} from 'v-money'
  import VueTheMask from 'vue-the-mask'
  import VuejsDialog from 'vuejs-dialog'

  Validator.localize('pt_BR', ptBR)
  Vue.use(VeeValidate)
  Vue.use(VueTheMask)
  Vue.use(VuejsDialog)
  Vue.component('VSelect', VueSelect)

  export default {
    data(){
      return {
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false /* doesn't work with directive */
        },

        completed: true,
        comarca_selected: {},
        foro_selected: {},
        acao_selected: {},
        resp_selected: {},
        centro_custo_selected: {},
        unidade_subsidio_selected: {},
        grupo_assunto_selected: {},

        dt_causa: '',
        vr_causa: '',
        parte_judicial: {
          i: 0,
          inputs: []
        },
        assunto_judicial: {
          i: 0,
          inputs: []
        },
        operacao_judicial: {
          i: 0,
          inputs: []
        },
        contrato_judicial: {
          i: 0,
          inputs: []
        },
        expediente_vinculado: {
          i: 0,
          inputs: []
        },

        item: {},
        assunto_judicial_options: [],
        operacao_judicial_options: [],

        obj_areas: {},
        obj_comarcas: {},
        obj_foros: {},
        obj_acoes: {},
        obj_empregados: {},
        obj_assuntos: {},
        obj_operacoes: {},
        obj_credenciados: {},
        obj_grupo_assuntos: {},
        obj_unidades: {},
        obj_condicao_partes: {},
        obj_situacao_processos: {}
      }
    },

    props: [
      'expediente',
      'assuntos',
      'operacoes',
      'foros',
      'acoes',
      'comarcas',
      'unidades',
      'areas',
      'credenciados',
      'empregados',
      'condicao_partes',
      'grupo_assuntos',
      'situacao_processos',
      'csrf_token'
    ],

    computed: {
      nu_posicao_cef(){
        let has1 = false
        let has2 = false
        for(let i = 0; i < this.parte_judicial.inputs.length; i++){
          if(this.parte_judicial.inputs[i].nu_condicao_parte == 1){
            has1 = true
          }
          if(this.parte_judicial.inputs[i].nu_condicao_parte == 2){
            has2 = true
          }
        }
        if(has1 == true && has2 == true){
          return 12 //TERCEIRO INTERESSADO
        }
        if(has1){
          return 2
        }
        if(has2){
          return 1
        }
        return 1
      },
      btnSaveIsDisabled() {
        if(this.errors.has('nu_processo_texto') || this.errors.has('nu_processo_texto_anterior') || this.errors.has('nu_vara') ||
          this.vr_causa == 'R$ 0,00' || this.parte_judicial.inputs.length == 0){
          return true
        }

        if(this.item.getNuAreaJudicial != 3){
          if(this.assunto_judicial.inputs.length <= 0){
            return true
          }
        }
        else{
          if(this.operacao_judicial.inputs.length <= 0){
            return true
          }
        }

        for(let i = 0; i < this.parte_judicial.inputs.length; i++){
          if(!this.parte_judicial.inputs[i].isValidNuCpfcgc || this.parte_judicial.inputs[i].no_parte.length <= 2){
            return true
          }
        }
        for(let i = 0; i < this.contrato_judicial.inputs.length; i++){
          if(this.contrato_judicial.inputs[i].co_contrato.length <= 2){
            return true
          }
          if(this.contrato_judicial.inputs[i].no_parte.length <= 2 || this.errors.has(this.contrato_judicial.inputs[i].noParteDomName)){
            return true
          }
        }
        for(let i = 0; i < this.expediente_vinculado.inputs.length; i++){
          if(this.expediente_vinculado.inputs[i].co_expediente_vinculado.length != 17){
            return true
          }
        }
        return false
      }
    },

    mounted(){
      this.item = JSON.parse(this.expediente)
      this.dt_causa = String(moment(this.item.getDtCausa).format('DD/MM/YYYY'))
      this.vr_causa = String(this.item.getVrCausa)
      this.obj_condicao_partes = JSON.parse(this.condicao_partes)
      this.obj_situacao_processos= JSON.parse(this.situacao_processos)
      this.obj_areas = JSON.parse(this.areas)
      this.makeComarcaOptions()
      this.makeForoOptions()
      this.makeAcaoOptions()
      this.makeResponsavelOptions()
      this.makeGrupoAssuntoOptions()
      this.makeUnidadeOptions()
      this.parteJudicialInit()
      this.contratoJudicialInit()
      this.expedienteVinculadoInit()
      if(this.item.getNuAreaJudicial != 3){
        this.assuntoJudicialInit()
      }
      else{
        this.operacaoJudicialInit()
      }
      this.nuGrupoAssuntoCodigoAssuntoRelationship()
      this.deObservacaoModified()
    },

    methods: {
      /*********CONFIRM DIALOG**********/
      notConfirm: function(){
        event.preventDefault()
      },
      /*********************************/
      parteJudicialInit(){
        for(let i = 0; i < this.item.getParts.length; ++i){
          this.addParteJudicial(this.item.getParts[i].NO_PARTE, this.item.getParts[i].NU_CONDICAO_PARTE, this.item.getParts[i].NU_CPFCGC === null ? '' : this.item.getParts[i].NU_CPFCGC, this.item.getParts[i].NU_MATRICULA === null ? '' : this.item.getParts[i].NU_MATRICULA)
        }
      },
      assuntoJudicialInit(){
        this.obj_assuntos = JSON.parse(this.assuntos)
        for(let i = 0; i < this.item.getSubjects.length; ++i){ //getSubjects VALE PARA ASSUNTO E OPERACAO
          this.addAssuntoJudicial(this.item.getSubjects[i].id, this.item.getSubjects[i].subject)
        }
      },
      operacaoJudicialInit(){
        for(let i = 0; i < this.item.getSubjects.length; ++i){ //getSubjects VALE PARA ASSUNTO E OPERACAO
          this.addOperacaoJudicial(this.item.getSubjects[i].id, this.item.getSubjects[i].subject)
        }
        this.obj_operacoes = JSON.parse(this.operacoes)
        for(let j = 0; j < this.obj_operacoes.length; ++j){
          this.operacao_judicial_options.push({
            id: this.obj_operacoes[j].NU_OPERACAO,
            description: this.obj_operacoes[j].DE_OPERACAO + ' - ' + this.obj_operacoes[j].NU_OPERACAO
          })
        }
      },
      contratoJudicialInit(){
        for(let i = 0; i < this.item.getContracts.length; ++i){
          this.addContratoJudicial(this.item.getContracts[i].NO_PARTE, this.item.getContracts[i].NU_CONDICAO_PARTE, this.item.getContracts[i].CO_CONTRATO)
        }
      },
      expedienteVinculadoInit(){
        for(let i = 0; i < this.item.getLinkeds.length; ++i){
          this.addExpedienteVinculado(this.item.getLinkeds[i].CO_EXPEDIENTE_VINCULADO)
        }
      },

      addParteJudicial(no_parte, nu_condicao_parte, nu_cpfcgc, nu_matricula) {
        this.parte_judicial.inputs.push({
          no_parte: no_parte,
          noParteDomName: 'no_parte_id_' + this.parte_judicial.i,
          nu_condicao_parte: nu_condicao_parte,
          nuCondicaoParteDomName: 'nu_condicao_parte_id_' + this.parte_judicial.i,
          nu_cpfcgc: nu_cpfcgc,
          nuCpfcgcDomName: 'nu_cpfcgc_id_' + this.parte_judicial.i,
          co_tipopessoa: nu_cpfcgc.length > 14 ? 2 : 1,
          coTipoPessoaDomName: 'co_tipopessoa_id_' + this.parte_judicial.i,
          nu_matricula: nu_matricula,
          nuMatriculaDomName: 'nu_matricula_id_' + this.parte_judicial.i,
          isValidNuCpfcgc: true
        })
        this.parte_judicial.i ++
      },
      addAssuntoJudicial(id, description) {
        this.assunto_judicial.inputs.push({
          selected: {
            id: id,
            description: description + ' - ' + id,
            assuntoJudicialDomName: 'assunto_judicial_id_' + this.assunto_judicial.i
          }
        })
        this.assunto_judicial.i ++
      },
      addOperacaoJudicial(id, description) {
        this.operacao_judicial.inputs.push({
          selected: {
            id: id,
            description: description + ' - ' + id,
            operacaoJudicialDomName: 'operacao_judicial_id_' + this.operacao_judicial.i
          }
        })
        this.operacao_judicial.i ++
      },
      addContratoJudicial(no_parte, nu_condicao_parte, co_contrato) {
        this.contrato_judicial.inputs.push({
          no_parte: no_parte,
          noParteDomName: 'contrato_no_parte_id_' + this.contrato_judicial.i,
          nu_condicao_parte: nu_condicao_parte,
          nuCondicaoParteDomName: 'contrato_nu_condicao_parte_id_' + this.contrato_judicial.i,
          co_contrato: co_contrato,
          coContratoDomName: 'contrato_co_contrato_id_' + this.contrato_judicial.i
        })
        this.contrato_judicial.i ++
      },
      addExpedienteVinculado(co_expediente) {
        this.expediente_vinculado.inputs.push({
          co_expediente_vinculado: co_expediente,
          coExpedienteVinculadoDomName: 'co_expediente_vinculado_id_' + this.expediente_vinculado.i,
        })
        this.expediente_vinculado.i ++
      },

      deleteParteJudicial(index) {
        for(let i = 0; i < this.contrato_judicial.inputs.length; ++i){
          if(this.contrato_judicial.inputs[i].no_parte == this.parte_judicial.inputs[index].no_parte){
            this.contrato_judicial.inputs.splice(i)
          }
        }
        this.parte_judicial.inputs.splice(index,1)
      },
      deleteAssuntoJudicial(index) {
        this.assunto_judicial.inputs.splice(index,1)
      },
      deleteOperacaoJudicial(index) {
        this.operacao_judicial.inputs.splice(index,1)
      },
      deleteContratoJudicial(index) {
        this.contrato_judicial.inputs.splice(index,1)
      },
      deleteExpedienteVinculado(index) {
        this.expediente_vinculado.inputs.splice(index,1)
      },

      nuGrupoAssuntoCodigoAssuntoRelationship(){
        for(let i = 0; i < this.obj_assuntos.length; ++i){
          if(this.grupo_assunto_selected.id == this.obj_assuntos[i].NU_GRUPO_ASSUNTO){
            this.assunto_judicial_options.push({
              id: this.obj_assuntos[i].NU_ASSUNTO,
              description: this.obj_assuntos[i].DE_ASSUNTO + ' - ' + this.obj_assuntos[i].NU_ASSUNTO
            })
          }
        }
      },

      clearAssuntoJudicial() {
        this.assunto_judicial = {
          i: 0,
          inputs: []
        }
        this.assunto_judicial_options = []
      },

      makeComarcaOptions(){
        this.obj_comarcas = JSON.parse(this.comarcas)
        this.comarca_selected = {
          id: this.item.getNuComarca,
          description: this.item.getDeComarca + ' - ' + this.item.getNuComarca
        }
      },
      makeForoOptions(){
        this.obj_foros = JSON.parse(this.foros)
        this.foro_selected = {
          id: this.item.getNuForo,
          description: this.item.getDeForo + ' - ' + this.item.getNuForo
        }
      },
      makeAcaoOptions(){
        this.obj_acoes = JSON.parse(this.acoes)
        this.acao_selected = {
          id: this.item.getNuAcao,
          description: this.item.getDeAcao + ' - ' + this.item.getNuAcao
        }
      },
      makeResponsavelOptions(){
        if(this.item.getIcTerceirizado == 1){
          this.obj_credenciados = JSON.parse(this.credenciados)
        }
        else{
          this.obj_empregados = JSON.parse(this.empregados)
        }
        this.resp_selected = {
          id: this.item.getResp,
          description: this.item.getNoResp
        }
      },
      makeGrupoAssuntoOptions(){
        this.obj_grupo_assuntos = JSON.parse(this.grupo_assuntos)
        this.grupo_assunto_selected = {
          id: this.item.getNuGrupoAssunto,
          description: this.item.getDeGrupoAssunto + ' - ' + this.item.getNuGrupoAssunto
        }
      },
      makeUnidadeOptions(){
        this.obj_unidades = JSON.parse(this.unidades)
        this.centro_custo_selected = {
          id: this.item.getNuUnidade,
          description: this.item.getNoUnidade + ' - ' + this.item.getNuUnidade
        }
        this.unidade_subsidio_selected = {
          id: this.item.getNuUnidade,
          description: this.item.getNoUnidade + ' - ' + this.item.getNuUnidade
        }
      },
      noParteContratoModified(index, no_parte){
        for(let i = 0; i < this.parte_judicial.inputs.length; ++i){
          if(this.parte_judicial.inputs[i].no_parte == no_parte){
            this.contrato_judicial.inputs[index].nu_condicao_parte = this.parte_judicial.inputs[i].nu_condicao_parte
            break
          }
        }
      },
      nuCondicaoParteModified(){
        for(let i = 0; i < this.contrato_judicial.inputs.length; ++i){
          this.noParteContratoModified(i, this.contrato_judicial.inputs[i].no_parte)
        }
      },
      nuUnidadeSubcidioModified(){
        this.unidade_subsidio_selected = this.centro_custo_selected
      },
      nuGrupoAssuntoModified(){
        if(this.item.getNuGrupoAssunto != this.grupo_assunto_selected.id){
          this.clearAssuntoJudicial()
          this.nuGrupoAssuntoCodigoAssuntoRelationship()
          this.getNuGrupoAssunto = this.grupo_assunto_selected
        }
      },
      nuCpfCgcModified(index){
        this.parte_judicial.inputs[index].co_tipopessoa = this.parte_judicial.inputs[index].nu_cpfcgc.length > 14 ? 2 : 1
      },
      noParteModified(index){
        let aux = this.parte_judicial.inputs[index].no_parte
        aux = aux.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        aux = aux.replace(/[^\w\s]/gi, '')
        aux = aux.toUpperCase()
        this.parte_judicial.inputs[index].no_parte = aux
      },
      coContratoModified(index){
        let aux = this.contrato_judicial.inputs[index].co_contrato
        aux = aux.toUpperCase()
        aux = aux.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        aux = aux.replace(/[^\w\s]/gi, '')
        aux = aux.replace(/	/g,'')
        aux = aux.replace(/ /g,'')
        this.contrato_judicial.inputs[index].co_contrato = aux
      },
      deObservacaoModified(){
        let aux = this.item.getDeObservacao
        if(!aux){
          return aux
        }
        aux = aux.replace(/-/g, 'FFDDTRACOFFDD')
        aux = aux.replace(/\//g, 'FFDDBARRAFFDD')
        aux = aux.replace(/@/g, 'FFDDARROBAFFDD')
        aux = aux.replace(/%/g, 'FFDDPORCENTAGEMFFDD')
        aux = aux.replace(/\./g, 'FFDDPONTOFFDD')
        aux = aux.replace(/\$/g, 'FFDDSIFRAOFFDD')
        aux = aux.replace(/\(/g, 'FFDDABREPARENTESESFFDD')
        aux = aux.replace(/\)/g, 'FFDDFECHAPARENTESESFFDD')
        aux = aux.replace(/;/g, 'FFDDPONTOEVIRGULAFFDD')
        aux = aux.replace(/,/g, 'FFDDVIRGULAFFDD')
        aux = aux.replace(/&/g, 'FFDDECOMERCIALFFDD')
        aux = aux.replace(/=/g, 'FFDDIGUALFFDD')
        aux = aux.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        aux = aux.replace(/[^\w\s]/gi, '')
        aux = aux.replace(/FFDDTRACOFFDD/g, '-')
        aux = aux.replace(/FFDDBARRAFFDD/g, '/')
        aux = aux.replace(/FFDDARROBAFFDD/g, '@')
        aux = aux.replace(/FFDDPORCENTAGEMFFDD/g, '%')
        aux = aux.replace(/FFDDPONTOFFDD/g, '.')
        aux = aux.replace(/FFDDSIFRAOFFDD/g, '$')
        aux = aux.replace(/FFDDABREPARENTESESFFDD/g, '(')
        aux = aux.replace(/FFDDFECHAPARENTESESFFDD/g, ')')
        aux = aux.replace(/FFDDPONTOEVIRGULAFFDD/g, ';')
        aux = aux.replace(/FFDDVIRGULAFFDD/g, ',')
        aux = aux.replace(/FFDDECOMERCIALFFDD/g, '&')
        aux = aux.replace(/FFDDIGUALFFDD/g, '=')
        aux = aux.toUpperCase()
        this.item.getDeObservacao = aux
      },
      validarCPFCNPJ(index){
        if(this.parte_judicial.inputs[index].nu_cpfcgc.length <= 0){
          this.parte_judicial.inputs[index].isValidNuCpfcgc = true
          return
        }
        if(this.parte_judicial.inputs[index].nu_cpfcgc.length != 14 && this.parte_judicial.inputs[index].nu_cpfcgc.length != 18){
          this.parte_judicial.inputs[index].isValidNuCpfcgc = false
          return
        }
        if(this.parte_judicial.inputs[index].nu_cpfcgc.length == 14){
          this.parte_judicial.inputs[index].isValidNuCpfcgc = this.validatorCPF(this.parte_judicial.inputs[index].nu_cpfcgc)
          return
        }
        this.parte_judicial.inputs[index].isValidNuCpfcgc = this.validatorCNPJ(this.parte_judicial.inputs[index].nu_cpfcgc)
      },
      validatorCPF(cpf){
        let CPF = require('cpf_cnpj').CPF
        return CPF.isValid(cpf)
      },
      validatorCNPJ(cnpj){
        let CNPJ = require('cpf_cnpj').CNPJ
        return CNPJ.isValid(cnpj)
      }
    }
  }
</script>