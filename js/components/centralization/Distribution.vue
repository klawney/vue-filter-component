<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-square-o"></span> Distribuir</h3>
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
                        <th class="col-md-1"></th>
                        <th class="col-md-1"><span style="margin-left: -100px">Expediente</span>
                            <a href="#" @click="sort($event, 'co_expediente', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'co_expediente', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">G.A.
                            <a href="#" @click="sort($event, 'nu_grupo_assunto', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'nu_grupo_assunto', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Area
                            <a href="#" @click="sort($event, 'no_area', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'no_area', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-3">Incluído Por
                            <a href="#" @click="sort($event, 'nome', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'nome', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Rejur
                            <a href="#" @click="sort($event, 'sigla', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'sigla', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Ged
                            <a href="#" @click="sort($event, 'is_priority', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'is_priority', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Prazo
                            <a href="#" @click="sort($event, 'dt_fim_prazo_comp', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'dt_fim_prazo_comp', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(proc, index) in list">
                        <td><span>{{index + 1}}. </span></td>
                        <td v-if="proc.unid_sijur_id != 16"><input style="margin-left: -90px;" :name="proc.id" type="checkbox"></td>
                        <td v-else></td>
                        <td><span style="margin-left: -100px">{{proc.co_expediente}}</span></td>
                        <td>{{proc.nu_grupo_assunto}}</td>
                        <td>{{proc.no_area}}</td>
                        <td v-if="proc.user_id == 15"><a :href="urlRoute(proc.log_proc_centralization_id)" class="btn btn-primary">Definir Usuário</a></td>
                        <td v-else>{{proc.nome}}</td>
                        <td>{{proc.sigla}}</td>
                        <td>
                            <form method="POST" accept-charset="UTF-8" target="_blank">
                                <input type="hidden" value="BDD7436WN001.corp.caixa.gov.br" name="servidorSijur"></input>
                                <input type="hidden" v-model="proc.co_expediente" name="coExpediente"></input>
                                <div v-if="proc.is_priority == 1">
                                    <button class="btn btn-danger" type="submit" formaction="http://www.portal.dijur.caixa/modulos/Ged/?pg=gedDossie" formtarget="_blank">
                                        <span class="fa fa-file-pdf-o"></span>
                                    </button>
                                    <span v-if="proc.ecint == 1" title="ECINT" class="alert-danger badge">E</span>
                                </div>
                                <div v-else>
                                    <button class="btn btn-primary" type="submit" formaction="http://www.portal.dijur.caixa/modulos/Ged/?pg=gedDossie" formtarget="_blank">
                                        <span class="fa fa-file-pdf-o"></span>
                                    </button>
                                    <span v-if="proc.ecint == 1" title="ECINT" class="alert-primary badge">E</span>
                                </div>
                            </form>
                        </td>
                        <td :class="conditionalClass(proc.dt_fim_prazo_comp)">{{ proc.dt_fim_prazo_comp | moment("DD/MM/YYYY") }}</td>
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
                orderBy: 'is_priority',
                order: 'desc',
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
                list[i].no_areaLower = list[i].no_area.toLowerCase()
                list[i].siglaLower = list[i].sigla.toLowerCase()
                list[i].nomeLower = list[i].nome.toLowerCase()
            }
            list = _.filter(list, result =>
                result.co_expedienteLower.indexOf(filterTerm) >= 0 ||
                result.no_areaLower.indexOf(filterTerm) >= 0 ||
                result.siglaLower.indexOf(filterTerm) >= 0 ||
                result.nomeLower.indexOf(filterTerm) >= 0
            )
            this.qtde = list.length
            return list
        },
    }
}
</script>