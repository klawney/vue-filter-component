<template>
  <div>
      <div>
        <!-- {{preFiltros}} -->
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
        <button
          v-if="filtroSelecionados.length"
          @click="limpaFiltro()"
          class="btn btn-danger btn-sm"
        >Limpar Tudo</button>

        <!--  -->
        <button @click="filtroAberto = !filtroAberto" class="btn btn-default btn-sm">
          Filtrar
          <i class="fa fa-filter"></i>
        </button>

        <button v-if="filtroSelecionados.length" @click="aplicarFiltro" class="btn btn-primary btn-sm">
          Aplicar
        </button>
      </div>
      <!-- {{preFiltros}} -->
      <!-- {{filtroSelecionados}} -->
    <div class="sf fade in" style="display: block;" v-if="filtroAberto">
      <div v-show="filtroAberto" class="fs-form">
        <form class="form fs-content" >
          <div v-for="(op) in opcoes" v-bind:key="op.id">
            <!-- {{k}} -->
            <div v-bind:class="classItemForm(op.tipo)">
              <label>{{op.tag}}</label>

              <v-select
                v-if="op.tipo.startsWith('select')"
                :multiple="op.tipo.endsWith('multiplo')"
                :options="op.valores"
                :clearable="false"
                v-model="preFiltros[op.campo]"
              ></v-select>

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
  data() {
    return {
      filtroAberto: false,
      opcoes: [
        {
          tag: "Caso um ",
          campo: "a",
          tipo: "select-simples",
          valores: [11, 111.52000, 22, 55.96, 88.5]
        },
        {
          tag: "preço de casa",
          campo: "preco",
          tipo: "select-multiplo",
          valores: [11, 111, 22, 88, 55]
        },
        {
          tag: "Veículo utilizado",
          campo: "veiculo",
          tipo: "select-multiplo",
          valores: ["Carro", "Barco", "Aviao"]
        },
        { tag: "Tem Casa", campo: "tem_casa", tipo: "check", valores: null },
        {
          tag: "Campo C",
          campo: "c",
          tipo: "radio",
          valores: [11, 111, 22, 55, 88]
        },
        {
          tag: "Campo E",
          campo: "e",
          tipo: "text",
          valores: ["Vadas", "Amor"]
        },
        { tag: "YYYYY", campo: "dth", tipo: "periodo-horas", valores: null },
        { tag: "XXXXX", campo: "dt", tipo: "periodo", valores: null },
        { tag: "dATA", campo: "dtI", tipo: "data", valores: null },
        { tag: "dATAhORA ", campo: "dtm", tipo: "data-horas", valores: null }
      ],
      preFiltros: {},
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
      // return this.preFiltros
      return processados;
    }
  },

  methods: {
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
    },
    removeItem(item) {
      _.forIn(this.preFiltros, (v, k, or) => {
        if (item[0] == k) {
          if (item[1] == v) _.unset(or, k);
          if (_.isArray(v)) {
            v = v.filter(vli => !_.isDate(vli) && vli !== item[1]);
            v.length ? (or[k] = v) : _.unset(or, k);
          }
          return false;
        }
      });
      //------
      this.preFiltros = _.pickBy(this.preFiltros, () => true);
    },
    aplicarFiltro(){
        console.log(this.filtroSelecionados);        
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
        valor = !isNaN(valor) ? valor.toLocaleString('pt-BR'): valor;
      }
      //console.log();
      
      return tag + " : " + valor;
      //return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
};
/*
      let processados = _.pickBy(this.preFiltros, valor => _.isArray(valor));

      processados = _.map(processados, (arr, key) => {
        let x = _.reduce(
          arr,
          (ent, val) => {
            ent.push(_.fromPairs([[key, val]]));
            return ent;
          },
          []
        );
        return x;
      });
      // return ref,(d,k)=>k == key )
      // _.fromPairs()

   
          _.toPairs(
            _.pickBy(this.preFiltros, ((valor)=>{
              if(_.isArray(valor)) return false

            }))
          )
          */
</script>

<style>
.sf-open {
  overflow: hidden;
}

.sf {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: none;
  overflow: hidden;
  outline: 0;
}

.sf-open .sf {
  overflow-x: hidden;
  overflow-y: auto;
}

.sf-form {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.sf.fade .sf-form {
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  -webkit-transform: translate(0, -25%);
  transform: translate(0, -25%);
}

.sf.show .sf-form {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}

.sf-form-centered {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: calc(100% - (0.5rem * 2));
}

.sf-content {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.sf-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}

.sf-backdrop.fade {
  opacity: 0;
}

.sf-backdrop.show {
  opacity: 0.5;
}

.sf-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.sf-header .close {
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
}

.sf-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.sf-body {
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
}

.sf-footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
}

.sf-footer > :not(:first-child) {
  margin-left: .25rem;
}

.sf-footer > :not(:last-child) {
  margin-right: .25rem;
}

.sf-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
</style>

