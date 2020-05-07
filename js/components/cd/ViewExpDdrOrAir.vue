<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3><span :style="icon_color" class="fa fa-file-text"></span> Geração de Documento</h3>
            <h5><i>{{title}}</i></h5>
        </div>
        <div class="panel-body">
            <form accept-charset="UTF-8" :action="url_route" method="GET">
                <fieldset class="form-group">
                    <div id="box_exp">
                        <div class="col-md-2" :class="{'has-error': errors.has('co_expediente_id')}">
                            <label for="co_expediente_id">Expediente:</label>
                            <input v-model="co_expediente_id" v-mask="'##.###.#####/####'" v-validate="'required|length:17'"
                                name="co_expediente_id" type="text" class="form-control">
                        </div>
                        <div class="col-md-2" :class="{'has-error': errors.has('co_expediente_recurso')}">
                            <div class="col-md-3">
                                <input class="checkbox" type="checkbox" @change="modifyCheckCoExpedienteRecurso">
                                <input name="check_co_expediente_recurso" type="hidden" v-model="check_co_expediente_recurso">
                            </div>
                            <label for="co_expediente_recurso">Recurso<span v-if="check_co_expediente_recurso == 1">:</span></label>
                            <div v-show="check_co_expediente_recurso == 1" class="col-md-9">
                                <input v-model="co_expediente_recurso" v-mask="'###'"  v-validate="'required|length:3'"
                                    ref="co_expediente_recurso" name="co_expediente_recurso" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <span v-if="errors.has('co_expediente_id')" class="text-danger">{{ errors.first('co_expediente_id') }}</span><br>
                    <span v-if="check_co_expediente_recurso == 1 && errors.has('co_expediente_recurso')" class="text-danger">{{ errors.first('co_expediente_recurso') }}</span><br>
                </fieldset>
                <div v-if="check_co_expediente_recurso == 1" class="col-md-3">
                    <button class="btn btn-primary" type="submit" :disabled="errors.has('co_expediente_id') || errors.has('co_expediente_recurso') || !validCoExpediente || !validCoExpedienteRecurso">
                        <i class="fa fa-share" aria-hidden="true"></i> Continuar
                    </button>
                </div>
                <div v-else class="col-md-3">
                    <button class="btn btn-primary" type="submit" :disabled="errors.has('co_expediente_id') || !validCoExpediente">
                        <i class="fa fa-share" aria-hidden="true"></i> Continuar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ptBR from 'vee-validate/dist/locale/pt_BR.js'
import VeeValidate, { Validator } from 'vee-validate'

Validator.localize('pt_BR', ptBR)
Vue.use(VeeValidate)

export default {
    props: [
        'icon_color',
        'title',
        'url_route',
        'unid_sijur'
    ],

    data(){
        return {
            check_co_expediente_recurso: 0,
            co_expediente_id: this.unid_sijur,
            co_expediente_recurso: ''
        }
    },

    computed: {
        validCoExpediente() {
            return this.co_expediente_id.length === 17
        },

        validCoExpedienteRecurso() {
            return this.co_expediente_recurso.length === 3
        }
    },

    methods: {
        modifyCheckCoExpedienteRecurso(){
            this.check_co_expediente_recurso = this.check_co_expediente_recurso == 1 ? 0 : 1
        }
    }
}
</script>

<style>
    .text-danger {
        font-size: smaller;
    }
</style>