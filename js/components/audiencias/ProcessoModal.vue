<template>
  <div title="divModalProcesso">
    <modal ref="modal">
      <!-- <h4 slot="header" class="modal-title">Complementar Processo</h4> -->
      <!-- <p v-for="(v, n)  in Processo" v-bind:key="n">{{n}} -- {{v}}</p> -->
      <h3 slot="header" class="modal-title">
        <span class="glyphicon glyphicon-list-alt"></span> Complemento
      </h3>
      <detalhe-proc-sijur v-if="Processo" :processo="Processo"></detalhe-proc-sijur>
      <div class="row">
        <div class="col-md-12">
          <form class="form">
            <div class="form-group">
              <div class="col-md-8">
                <label class="form-label">Unidade Subsidio</label>
                <v-select
                  v-model="Processo.unidade_subsidio"
                  @search="buscaUnidades"
                  :reduce="nome => nome.adm_unid"
                  label="desc"
                  :options="Unidades"
                >
                  <div slot="no-options">Nenhuma unidade encontrada, tente de outra forma</div>
                </v-select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Atendimento</label>
                <br />
                <vue2datepicker
                  v-model="Processo.atend_subsidio"
                  :format="dtpFormat[0]"
                  :type="dtpType[0]"
                  :time-picker-options="horarioComercial"
                  valuetype="date"
                ></vue2datepicker>
              </div>
              <div class="col-md-12">
                <label class="form-label">Observações:</label>
                <textarea class="form-control" v-model="Processo.obs"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" @click="salvarProcesso">Salvar</button>
      </div>
    </modal>
  </div>
</template>

<script>
import datePickerConfig from "../../mixins/datePickerConfigMixins"
import buscasMixins from "../../mixins/buscasMixins"

export default {
  mixins: [
    datePickerConfig,
    buscasMixins
  ],
  components: {
    DetalheProcSijur: require("./DetalheProcSijur")
  },
  props: ["Processo"],
  data() {
    return {
      delay: 0,
      ultimaBusca: ""
    };
  },
  computed: {
    Unidades() {
      //return []
      // let unids = this.$store.state.unidade.unidades
      //  console.log(unids.length);

      // if(unids.length){
      //   this.$store.dispatch('unidade/buscaUnidades',{str:this.Processo.unidade_subsidio})
      // }
      //setUnidadeSub
      return this.$store.state.unidade.unidades;
    }
  },
  methods: {
    showModal() {
      this.getModal().show();
    },
    closeModal() {
      this.getModal().close();
    },
    getModal() {
      return this.$refs.modal;
    },
    onCloseModal() {
      this.$store.dispatch("processo/resetProcesso");
      //console.log("reset Processo");
    },
  /* substituido pelo mixin
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
    }, */
    // onOpenModal(){
    //   console.log("abrindo Modal");
    // },
    salvarProcesso() {
      let self = this;
      this.Processo.atend_subsidio = Vue.moment(
        this.Processo.atend_subsidio
      ).format("YYYY-MM-DD H:mm");
      this.$store
        .dispatch("processo/UpdateProcesso", this.Processo)
        .then(function() {
          self.closeModal();
        });

      /*
               //this.$emit('fim-jogo', {golsCasa: this.golsCasa, golsFora: this.golsFora});
        */
    }
  },
  mounted() {
    let self = this;
    $(this.getModal)
      .find(".modal")
      .on("hidden.bs.modal", function(e) {
        if ($(e.target).parent()[0].title == "divModalProcesso") {
          self.onCloseModal();
        }
      });
  }
};
</script>