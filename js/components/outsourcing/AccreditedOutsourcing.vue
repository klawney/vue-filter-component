<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-square-o"></span> Distribuição padrão para terceirização</h3>
                    <div class="col-md-12">
                        <input v-model="configs.filterTerm" type="text" class="row" placeholder="Filtrar resultado">
                    </div>
                    <div class="col-md-12">
                        <h5 class="text-info"><i>{{qtde}} registro(s)</i></h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="col-md-2">Comarca
                            <a href="#" @click="sort($event, 'comarca', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'comarca', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Vara
                            <a href="#" @click="sort($event, 'vara', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'vara', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-4">Foro
                            <a href="#" @click="sort($event, 'foro', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'foro', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Par
                            <a href="#" @click="sort($event, 'even', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'even', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-4">Credenciado
                            <a href="#" @click="sort($event, 'accredited_id', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                            <a href="#" @click="sort($event, 'accredited_id', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                        </th>
                        <th class="col-md-1">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="register in list">
                        <td>{{register.comarca}}</td>
                        <td>{{register.vara}}</td>
                        <td>{{register.foro}}</td>
                        <td>{{register.even == 1 ? 'PAR' : 'ÍMPAR'}}</td>
                        <td>{{register.accredited_name}}</td>
                        <td>
                            <span><a title="Editar" :href="register.edit_route"><span class="glyphicon glyphicon-edit"></span></a></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  props: [
    'accredited_outsourcings',
    'foros'
  ],

  data(){
    return {
      items: [],
      configs: {
        orderBy: 'comarca',
        order: 'asc',
        filterTerm: '',
      },
      qtde: 0
    }
  },

  mounted(){
    this.items = JSON.parse(this.accredited_outsourcings)
  },

  methods: {
    sort(ev, property, order){
      ev.preventDefault
      this.configs.orderBy = property
      this.configs.order = order
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
        list[i].comarcaLower = list[i].comarca.toLowerCase()
        list[i].foroLower = list[i].foro.toLowerCase()
        list[i].accreditedNameLower = list[i].accredited_name.toLowerCase()
      }
      list = _.filter(list, result =>
        result.comarcaLower.indexOf(filterTerm) >= 0 ||
        result.foroLower.indexOf(filterTerm) >= 0 ||
        result.accreditedNameLower.indexOf(filterTerm) >= 0
      )
      this.qtde = list.length
      return list
    }
  }
}
</script>