<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-thumbs-o-down"></span> Devolvidos</h3>
                    <div v-if="unidSijur === '11.000'" class="col-md-12">
                        <input v-model="configs.filterTerm" type="text" class="row" placeholder="Filtrar resultado">
                    </div>
                    <div class="col-md-12">
                        <h5 class="text-info"><i>{{qtde}} expediente(s)</i></h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="col-md-1"></th>
                        <th class="col-md-2">Expediente
                            <a href="#" @click="sort($event, 'co_expediente', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'co_expediente', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-2">Processo
                            <a href="#" @click="sort($event, 'proc', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'proc', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th>Motivo
                            <a href="#" @click="sort($event, 'motivo', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'motivo', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th>
                            <span class="text-danger" title="DEVOLVIDO POR:">D</span>
                        </th>
                        <th class="col-md-1">Ged</th>
                        <th class="col-md-1">Prazo
                            <a href="#" @click="sort($event, 'dt_fim_prazo_comp', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'dt_fim_prazo_comp', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Dev.
                            <a href="#" @click="sort($event, 'dt_dev', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'dt_dev', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Msg
                            <a href="#" @click="sort($event, 'quant_emails', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'quant_emails', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="proc in list">
                        <td v-if="proc.unid_sijur_id != 16"><input :name="proc.id" type="checkbox"></td>
                        <td v-else></td>
                        <td>{{proc.co_expediente}}</td>
                        <td>{{proc.proc}}</td>
                        <td>{{proc.motivo}}</td>
                        <td>
                            <span :title="proc.nome" class="text-danger"><span class="glyphicon glyphicon-user"></span></span>
                        </td>
                        <td>
                            <form method="POST" accept-charset="UTF-8" target="_blank">
                                <input type="hidden" value="BDD7436WN001.corp.caixa.gov.br" name="servidorSijur"></input>
                                <input type="hidden" v-model="proc.co_expediente" name="coExpediente"></input>
                                <button class="btn btn-primary" type="submit" formaction="http://www.portal.dijur.caixa/modulos/Ged/?pg=gedDossie" formtarget="_blank"><i class="fa fa-file-pdf-o"></i></button>
                            </form>
                        </td>
                        <td :class="conditionalClass(proc.dt_fim_prazo_comp)">{{ proc.dt_fim_prazo_comp | moment("DD/MM/YYYY") }}</td>
                        <td>{{ proc.dt_dev | moment("DD/MM/YYYY") }}</td>
                        <td><a :href="urlRoute(proc.id)" class="btn btn-primary"><i class="fa fa-envelope-o"></i></a><span class="alert-success badge">{{proc.quant_emails}}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'url_route',
        'procs',
        'unid_sijur'
    ],
    data(){
        return {
            items: [],
            configs: {
                orderBy: 'dt_fim_prazo_comp',
                order: 'asc',
                filterTerm: '',
            },
            unidSijur: '',
            qtde: 0
        }
    },
    mounted(){
        this.items = JSON.parse(this.procs)
        this.unidSijur = this.unid_sijur
        this.configs.filterTerm = this.unidSijur
    },

    methods: {
        sort(ev, property, order){
            ev.preventDefault
            this.configs.orderBy = property
            this.configs.order = order
        },
        urlRoute(id){
            var r = this.url_route
            return r.replace('_ID_', id)
        },
        conditionalClass(procDate){
            var d = Date.parse(new Date())
            var d2 = Date.parse(procDate)
            if(d > d2 ){
                return "alert alert-danger"
            }
            return ""
        }
    },
    computed: {
        list() {
            let filterTerm = this.configs.filterTerm.toLowerCase()
            let list = _.orderBy(this.items, this.configs.orderBy, this.configs.order)
            if (_.isEmpty(filterTerm)) {
                this.qtde = list.length
                return list
            }
            for(var i = 0; i < list.length; i++){
                list[i].co_expedienteLower = list[i].co_expediente.toLowerCase()
                list[i].motivoLower = list[i].motivo.toLowerCase()
                list[i].nomeLower = list[i].nome.toLowerCase()
            }
            list = _.filter(list, result =>
                result.co_expedienteLower.indexOf(filterTerm) >= 0 ||
                result.motivoLower.indexOf(filterTerm) >= 0 ||
                result.nomeLower.indexOf(filterTerm) >= 0
            )
            this.qtde = list.length
            return list
        },
    }
}
</script>