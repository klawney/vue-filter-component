<template>
  <div id="app">
    <div class="row">
      <div class="col-md-12">
        <select-filtro :opcoes="opcoesfiltro" @aplicaFiltro="setFiltros"/>
        <!-- <select-filtro :opcoes="opcoesfiltro" @aplicaFiltro="setFiltrosAud"></select-filtro> -->
      </div>
    </div>
  </div>
</template>

<script>
import MixFiltroExemplo from "./mixins/MixFiltroExemplo";
import SelectFiltro from './components/shared/SelectFiltro.vue'
export default {
  mixins: [MixFiltroExemplo],
  name: "App",
  components: {
    SelectFiltro
  }
};
</script>

<style>
</style>
