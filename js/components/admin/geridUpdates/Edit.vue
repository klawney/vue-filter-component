<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-check-square-o"></span> Detalhes - Atualizações GERID</h3>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div v-if="mounted_page" class="row">
                <form :action="update_route" method="post">
                    <input type="hidden" name="_token" v-model="csrf_token">
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" name="id" v-model="id">
                    <input type="hidden" name="type_id" v-model="type_id">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-12">
                                <h3>Grupo: {{group_code}}</h3>
                            </div>
                            <div class="col-md-12">
                                <label for="name">Nome da Atualização:</label>
                                <input ref="name" name="name" type="text" class="form-control" :disabled="!enable_edit" v-model="name" v-validate="'required|min:3|max:255'">
                                <span v-if="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span><br>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">&nbsp;</div>
                    <div v-if="enable_edit" class="col-md-12">
                        <div class="alert alert-info"><i>Abaixo é apresentado uma sentença padrão para personalização. <b>Não use apelidos(ALIAS) no select. Modifique os dados entre colchetes.</b></i></div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-12">
                                <label for="select_text">Consulta:</label>
                                <textarea name="select_text" class="form-control" rows="10" :disabled="!enable_edit" v-model="select_text" v-validate="'required'"></textarea>
                                <span v-if="errors.has('select_text')" class="text-danger">{{ errors.first('select_text') }}</span><br>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">&nbsp;</div>
                    <div v-if="enable_edit" class="col-md-12">
                        <div class="alert alert-info"><i>Será feito as alterações para todos os pedientes que retornarem da consulta. <b>Modifique apenas os dados entre colchetes. Não retire o '{EXPEDIENTES_DA_CONSULTA}'</b></i></div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-12">
                                <label for="update_text">Alteração:</label>
                                <textarea name="update_text" class="form-control" rows="10" :disabled="!enable_edit" v-model="update_text" v-validate="'required'"></textarea>
                                <span v-if="errors.has('update_text')" class="text-danger">{{ errors.first('update_text') }}</span><br>
                            </div>
                        </div>
                    </div>
                    <div v-if="usr.edicao">
                        <div class="col-md-12">&nbsp;</div>
                        <div v-if="!enable_edit" class="row">
                            <div class="col-md-12">
                                <div class="col-md-12">
                                    <a href="#" title="Alterar Registro" class="btn btn-primary" @click="enableEdit">
                                        <span class="glyphicon glyphicon-edit"></span> Alterar Registro
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col-md-12">
                                <div class="col-md-12">
                                    <button type="submit" title="Salvar" class="btn btn-primary" :disabled="btnSaveIsDisabled" v-confirm="{
                                            okText: 'Confirmar',
                                            cancelText: 'Cancelar',
                                            cancel: notConfirm,
                                            message: 'As setenças sql estão corretas? Somente prossiga se tiver certeza.'
                                        }"><span class="fa fa-save fa-lg"></span> Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import ptBR from 'vee-validate/dist/locale/pt_BR.js'
  import VeeValidate, { Validator } from 'vee-validate'
  import VuejsDialog from 'vuejs-dialog'

  Validator.localize('pt_BR', ptBR)
  Vue.use(VeeValidate)
  Vue.use(VuejsDialog)

  export default {
    data(){
      return {
        usr: '',
        id: '',
        name: '',
        select_text: '',
        update_text: '',
        group_code: '',
        type_id: '',
        mounted_page: false,
        enable_edit: false
      }
    },

    props: [
      'register',
      'csrf_token',
      'update_route',
      'user'
    ],

    mounted(){
      let items = JSON.parse(this.register)
      this.name = items[0].name
      this.id = items[0].id
      this.group_code = items[0].group_code
      this.select_text = items[0].select_text
      this.update_text = items[0].update_text
      this.type_id = items[0].type_id
      this.usr = JSON.parse(this.user)
      this.mounted_page = true
    },

    computed: {
      btnSaveIsDisabled() {
        if(this.errors.has('name') || this.name.length <= 3 || this.errors.has('select_text ') || this.errors.has('update_text')){
          return true
        }
        let str = ['[NU_GRUPO_ASSUNTO]', '[NU_GRUPO_ASSUNTO(S)]', '[NU_ASSUNTO]', '[NU_ASSUNTO(S)]', '[NU_UNIDADE]', '[NU_UNIDADE(S)]']
        for(let i=0; i < str.length; i++){
          if(this.select_text.includes(str[i]) || this.update_text.includes(str[i])){
            return true
          }
        }
        return false
      }
    },

    methods: {
      /*********CONFIRM DIALOG**********/
      notConfirm: function(){
        event.preventDefault()
      },
      /*********************************/
      enableEdit: function(){
        event.preventDefault()
        this.enable_edit = true
      }
    }
  }
</script>