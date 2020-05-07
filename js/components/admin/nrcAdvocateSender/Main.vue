<template>
    <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-12">
                        <h3><i class="fa fa-paper-plane" aria-hidden="true"></i> Advogado NRC Responsável Por Distribuições de DAP</h3>
                        <h5 class="text-info"><i>Atual: {{obj_advocate_sender.usuario}} - {{obj_advocate_sender.nome.toUpperCase()}}</i></h5>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div v-if="loaded">
                        <form :action=update_route method="post">
                            <input type="hidden" name="_token" v-model="csrf_token">
                            <div class="form-group col-md-10">
                                <label>Advogado:</label>
                                <v-select v-model="empregado_selected" label="description" :options="obj_empregados"></v-select>
                                <input type="hidden" name="user_sijur" :value="empregado_selected.id"/>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" title="Alterar" class="btn btn-primary div-button-without-label"
                                        v-confirm="{
                                        okText: 'SIM',
                                        cancelText: 'Cancelar',
                                        cancel:notConfirm,
                                        message: 'Deseja realmente alterar o advogado responsável?'
                                    }">Alterar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
  .div-button-without-label{
    margin-top: 25px;
  }
</style>

<script>
  import VueSelect from 'vue-select'
  import VuejsDialog from 'vuejs-dialog'

  Vue.use(VuejsDialog)
  Vue.component('VSelect', VueSelect)

  export default {
    data(){
      return {
        obj_empregados: {},
        obj_advocate_sender: {},
        empregado_selected: {},
        loaded: false
      }
    },

    props: [
      'csrf_token',
      'advocate_sender',
      'empregados',
      'update_route'
    ],

    mounted(){
      this.obj_advocate_sender = JSON.parse(this.advocate_sender)
      this.makeEmpregadoOptions()
      this.loaded = true
    },

    methods: {
      /*********CONFIRM DIALOG**********/
      notConfirm: function(){
        event.preventDefault()
      },
      /*********************************/
      makeEmpregadoOptions(){
        this.obj_empregados = JSON.parse(this.empregados)
        this.empregado_selected = {
          id: this.obj_advocate_sender.id,
          description: this.obj_advocate_sender.nome.toUpperCase() +' - ' + Number(this.obj_advocate_sender.usuario.substr(1, 6))
        }
      }
    }
  }
</script>