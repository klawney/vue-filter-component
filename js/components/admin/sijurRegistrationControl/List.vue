<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-square-o"></span> Controle de Cadastramento no SIJUR</h3>
                    <div class="col-md-12">
                        <input type="text" class="row" placeholder="Filtrar por Grupo Assunto">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <table class="text-center table table-hover table-bordered">
                <thead>
                    <tr>
                        <th colspan="3" class="text-danger text-center"><h3>Verificiar</h3></th>
                        <th colspan="2" class="text-success text-center"><h3>Lançar</h3></th>
                    </tr>
                    <tr>
                        <th class="col-md-2 alert-danger text-center">Grupo</th>
                        <th class="col-md-2 alert-danger text-center">C. Custo</th>
                        <th class="col-md-2 alert-danger text-center">Assunto</th>
                        <th class="col-md-2 alert-success text-center">C. Custo</th>
                        <th class="col-md-2 alert-success text-center">Assunto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-danger">2</td>
                        <td class="text-danger"> - </td>
                        <td class="text-danger"> - </td>
                        <td class="text-success"> - </td>
                        <td class="text-success">344</td>
                    </tr>
                    <tr v-for="launch in launches">
                        <td v-if="proc.unid_sijur_id != 16"><input :name="proc.id" type="checkbox"></td>
                        <td v-else></td>
                        <td>{{proc.co_expediente}}</td>
                        <td>{{proc.no_area}}</td>
                        <td>{{proc.sigla}}</td>
                        <td v-if="proc.user_id == 15"><a :href="urlRoute(proc.log_proc_centralization_id)" class="btn btn-primary">Definir Usuário</a></td>
                        <td v-else>{{proc.nome}}</td>
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
        'launches'
    ],
    data(){
        return {}
    }
}
</script>