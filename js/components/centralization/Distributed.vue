<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-check-square-o"></span> Distribuídos</h3>
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
                        <th class="col-md-2">Expediente
                            <a href="#" @click="sort($event, 'co_expediente', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'co_expediente', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-2">Area
                            <a href="#" @click="sort($event, 'no_area', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'no_area', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-2">Rejur
                            <a href="#" @click="sort($event, 'sigla', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'sigla', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-3">Responsável
                            <a href="#" @click="sort($event, 'nome', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'nome', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Ged</th>
                        <th class="col-md-1">Prazo
                            <a href="#" @click="sort($event, 'dt_fim_prazo_comp', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'dt_fim_prazo_comp', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="proc in list">
                        <td>{{proc.co_expediente}}</td>
                        <td>{{proc.no_area}}</td>
                        <td>{{proc.sigla}}</td>
                        <td>{{proc.nome}}</td>
                        <td>
                            <form method="POST" accept-charset="UTF-8" target="_blank">
                                <input type="hidden" value="BDD7436WN001.corp.caixa.gov.br" name="servidorSijur"></input>
                                <input type="hidden" v-model="proc.co_expediente" name="coExpediente"></input>
                                <button class="btn btn-primary" type="submit" formaction="http://www.portal.dijur.caixa/modulos/Ged/?pg=gedDossie" formtarget="_blank"><span class="fa fa-file-pdf-o"></span></button>
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