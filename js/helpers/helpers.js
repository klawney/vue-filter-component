/*
const MyHelpers = {
    methods: {
        permuta(obj1, obj2) {
            let tmp = _.clone(obj1)
            obj1 = _.clone(obj2)
            obj2 = _.clone(tmp)
            tmp = undefined
        },

    }
}
*/
export default {
    /*
    getTagValorText (item, opcoes)
    _.differenceBy(this.opcoesfiltroAuds, this.$store.state.audiencia.filtros.map((f) => {
        return {
          campo: f[0]
        }
      }), 'campo')
      .map((todos)=> todos.tag + ': Todos')
},  */
    getTagValorText (item, opcoes) {
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
    },

    getTagValor(item, opcoes) {
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

        return [tag ,valor];
        //return value.charAt(0).toUpperCase() + value.slice(1)
    }
}