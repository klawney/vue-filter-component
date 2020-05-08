      <!-- {{preFiltros}} -->
      <!-- Ativos {{filtrosAplicados}} -->
<template>
  <div>
    <div v-if="filtroAberto" class="bloquiaTelaFundo"></div>
    <!-- menu do filtro / cabeçalho  -->
    <div v-bind:class="filtroAberto?'sobressai':''">
      <div class="row">
        <div class="col-md-9">
          <span v-for="item  in filtroSelecionados" v-bind:key="item.id" style="margin:2px">
            <button class="btn btn-info btn-sm">
              {{item | textoObjFiltrados(opcoes)}}
              <span
                @click="removeItem(item)"
                style="color:red"
                class="badge"
              >
                <i class="fa fa-remove"></i>
              </span>
            </button>
          </span>
        </div>
        <!-- ---------------------- -->
        <div class="col-md-3 text-right">
          <button
            v-if="filtroSelecionados.length"
            @click="limpaFiltro()"
            class="btn btn-danger btn-sm"
          >Limpar Tudo</button>
          <button v-if="temFiltroAplicar" @click="aplicarFiltro" class="btn btn-primary btn-sm">
            Aplicar
            <i class="fa fa-filter"></i>
          </button>
          <button @click="filtroAberto = !filtroAberto" class="btn btn-default btn-sm">
            Filtrar
            <i class="fa fa-filter"></i>
          </button>
        </div>
      </div>
      <!-- {{preFiltros}} -->
      <!-- {{filtroSelecionados}} -->
      <!-- {{todos}} -->
      <div v-show="filtroAberto">
        <form class="form">
          <div v-for="(op) in opcoes" v-bind:key="op.id">
            <!-- {{k}} -->
            <div v-bind:class="classItemForm(op.tipo)">
              <fieldset class="col-md-12">
                <label class="col-md-3">{{op.tag}}</label>
                <input
                  style="margin-left:10px"
                  type="checkbox"
                  @change="marcouTodos(op.campo)"
                  v-model="todos[op.campo]"
                /> Todos
              </fieldset>
              <fieldset class="col-md-12" v-show="!todos[op.campo]">
                {{op.config?op.config.label:"sss"}}
                <v-select
                  v-if="op.tipo.startsWith('select')"
                  :multiple="op.tipo.endsWith('multiplo')"
                  :closeOnSelect="!op.tipo.endsWith('multiplo')"
                  :clearSearchOnSelect="op.tipo.endsWith('multiplo')"
                  :selectable="option => naoSelecionados(option,preFiltros[op.campo])"
                  :searchable="op.valores.length >= 20"
                  :options="op.valores"
                  :clearable="false"
                  v-model="preFiltros[op.campo]"
                  :code="op.config?op.config.code:undefined"
                  :label="op.config?op.config.label:undefined"
                  :reduce ="op.config?  obj => obj[op.config.code] :undefined"
                ></v-select>
                  <!--:label="op.config.label" :'nome', code:'adm_unid'}" -->
    
                <vue2datepicker
                  range
                  v-else-if="op.tipo == 'periodo'"
                  v-model="preFiltros[op.campo]"
                  :format="dtpFormat[1]"
                  :type="dtpType[1]"
                  valuetype="date"
                ></vue2datepicker>

                <vue2datepicker
                  v-else-if="op.tipo == 'data'"
                  v-model="preFiltros[op.campo]"
                  :format="dtpFormat[1]"
                  :type="dtpType[1]"
                  valuetype="date"
                ></vue2datepicker>

                <vue2datepicker
                  v-else-if="op.tipo == 'data-horas'"
                  v-model="preFiltros[op.campo]"
                  :format="dtpFormat[0]"
                  :type="dtpType[0]"
                  :time-picker-options="horarioComercial"
                  valuetype="date"
                ></vue2datepicker>

                <vue2datepicker
                  range
                  v-else-if="op.tipo == 'periodo-horas'"
                  v-model="preFiltros[op.campo]"
                  :format="dtpFormat[0]"
                  :type="dtpType[0]"
                  :time-picker-options="horarioComercial"
                  valuetype="date"
                ></vue2datepicker>

                <label
                  v-else-if="op.tipo == 'radio'"
                  class="form-check-label"
                  v-for="val in op.valores"
                  v-bind:key="val"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="op.campo"
                    :value="val"
                    v-model="preFiltros[op.campo]"
                  />
                  {{val}}
                </label>

                <input
                  v-else-if="op.tipo == 'check'"
                  type="checkbox"
                  class="form-check-input"
                  :name="op.campo"
                  v-model="preFiltros[op.campo]"
                />
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import datePickerConfig from "../../mixins/datePickerConfigMixins";
export default {
  mixins: [datePickerConfig],
  props: ["opcoes"],
  data() {
    return {
      filtroAberto: false,
      filtrosAplicados: {},
      preFiltros: {},
      todos: {},
      Tipos: [
        { tipo: "select-simples", classes: "" },
        { tipo: "select-multiplo", classes: "" },
        { tipo: "radio", classes: "form-check" },
        { tipo: "int", classes: "" },
        { tipo: "text", classes: "" },
        { tipo: "dec", classes: "" },
        { tipo: "perc", classes: "" },
        { tipo: "periodo", classes: "" },
        { tipo: "periodo-horas", classes: "" },
        { tipo: "check", classes: "form-check" },
        { tipo: "data", classes: "" },
        { tipo: "data-horas", classes: "" }
      ]
    };
  },
  computed: {
    filtroSelecionados() {
      let processados = _.flatten(
        _.map(this.preFiltros, (arr, key) => {
          //console.log(arr);
          
          if (!_.isArray(arr)) return [[key, arr]]; //_.fromPairs([[key, arr]]);
          let result = _.reduce(
            arr,
            (ent, val, k) => {
              if (_.isDate(val)) return [[key, arr]];
              ent.push([key, val]);
              return ent;
            },
            []
          );
          return result;
        })
      );
      // Se a propriedade reativa verificar que os filtros estao vazios mas existem filtros aplicados, força a limpeza
      if (!processados.length && !_.isEmpty(this.filtrosAplicados)) {
        this.limpaFiltro();
      }
      return processados;
    },
    temFiltroAplicar() {
      let tem = this.filtroSelecionados.length;
      tem = tem && !_.isEqual(this.preFiltros, this.filtrosAplicados);
      return tem;
    }
  },

  methods: {
    marcouTodos(cp) {
      //console.log(this.preFiltros[cp])
      if (this.todos[cp]) this.removeItem([cp, null]);
    },
    naoSelecionados(option, sel) {
      return !sel || !sel.includes(option);
    },
    composto(item) {
      return _.isArray(item);
    },
    classGrupoForm(tipo) {
      return "form-group";
    },
    classItemForm(tipo) {
      return this.Tipos.filter(ct => ct.tipo == tipo)[0].classes;
    },
    limpaFiltro() {
      this.preFiltros = {};
      this.todos = {};
      this.aplicarFiltro();
    },
    removeItem(item) {
      this.filtroAberto = true;
      _.forIn(this.preFiltros, (v, k, or) => {
        //console.log("this.todos[cp] ")
        if (item[0] == k) {
          if (item[1] == v) _.unset(or, k);
          if (_.isArray(v)) {
            v = v.filter(
              vli => !_.isDate(vli) && vli !== item[1] && item[1] != null
            );
            v.length ? (or[k] = v) : _.unset(or, k);
          }
          this.todos[k] = !or[k];
          //return false;
        }
      });
      //------
      this.preFiltros = _.pickBy(this.preFiltros, () => true);
      //if()
    },

    aplicarFiltro() {
      //_.clone()
      this.filtroAberto = false;
      this.filtrosAplicados = _.clone(this.preFiltros);
      this.$emit("aplicaFiltro", this.filtroSelecionados);
      //console.log();
    }
  },
  //--------------------------------------- filters de campo formatacao ----------------------
  filters: {
    textoObjFiltrados: function(item, opcoes) {
      if (!item) return "";
      let op = _.filter(opcoes, op => {
        return op.campo == item[0];
      });
      let tag = "";
      let valor = "";
      let formato = "";
      if (op.length) {
        tag = op[0].tag;
        //console.log(op[0].tipo)
        switch (op[0].tipo) {
          case "data":
            formato = "DD/MMM/YYYY";
            break;
          case "periodo":
            formato = "DD/MMM/YYYY";
            break;
          case "data-horas":
            formato = "DD/MMM/YYYY HH:mm";
            break;
          case "periodo-horas":
            formato = "DD/MMM/YYYY HH:mm";
            break;
        }
      }

      if (_.isArray(item[1])) {
        valor = _.reduce(
          item[1],
          (ent, it) => {
            it = _.isDate(it) ? Vue.moment(it).format(formato) : it;
            let pre = ent == "" ? "" : " - ";
            return (ent += pre + it);
          },
          ""
        );
      } else {
        valor = item[1];
        valor = _.isDate(valor) ? Vue.moment(valor).format(formato) : valor;
        valor = _.isNumber(valor) ? valor.toLocaleString("pt-BR") : valor;
      }
      //console.log();

      return tag + " : " + valor;
      //return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
};
</script>

<style>
  /*
  .bloquiaTelaFundo {
     position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    opacity: 0.5;
    background-color: #000; 
  }*/ 
  /*.sobressai {
     background-color:#fff;
    opacity: 1; 
    z-index: 1050;
  }*/
  /*
  .sobressai > * {
     background-color:#fff;
    opacity: 1; 
    z-index: auto;
  } */
</style>

