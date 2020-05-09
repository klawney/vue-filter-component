const buscasMixins = {
    data(){
        return {
            ultimaBusca:""
        }
    },
    methods: {
        buscaUnidades(busca, loading) {
            let pattcodUnid = new RegExp(/\d{1,4}/g);
            if (
              !busca.includes(this.ultimaBusca) ||
              this.ultimaBusca == "" ||
              pattcodUnid.test(busca)
            ) {
              loading(true);
              this.$store
                .dispatch("unidade/buscaUnidades", { str: busca })
                .then(function() {
                  loading(false);
                });
              this.ultimaBusca = busca;
            }
          },
          buscaEmpregado(busca, loading) {
            if (!busca.includes(this.ultimaBusca) || this.ultimaBusca == "") {
              loading(true);
              this.$store
                .dispatch("empregado/buscaEmpregados", { str: busca })
                .then(function() {
                  loading(false);
                });
              this.ultimaBusca = busca;
            }
          },
    }
}
export default buscasMixins