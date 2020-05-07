<template>
  <div>
    <div class="alert bg-info">
      <div class="row">
        <div class="col-md-10">
          <h4>Detalhes do Processo:</h4>
        </div>
        <div class="col-md-2">
          <button class="btn btn-default btn-sm pull-right" @click="show = !show">
            <i class="fa" v-bind:class="show?'fa-minus':'fa-eye'"></i>
          </button>
        </div>
      </div>
      <!-- <transition name=""> -->
        <div class="row" v-show="show">
          <!-- coluna 1 -->
          <div class="col-md-6 col-12">
            <div class="row">
              <div class="col-md-3">Num. Processo :</div>
              <div class="col-md-9">
                <strong>{{processo.nu_processo}}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">Comarca:</div>
              <div class="col-md-9">{{processo.Comarca |lowercase | titlecase}}</div>
            </div>
            <div class="row">
              <div class="col-md-3">Advogado:</div>
              <div class="col-md-9">{{processo.nomeAdvogadoAcervo |lowercase | titlecase }}</div>
            </div>
            <div class="row">
              <div class="col-md-3">Litisconsorte:</div>
              <div class="col-md-9">{{processo.LitisconsorteReu |lowercase | titlecase }}</div>
            </div>
          </div>
          <!-- coluna 2 -->
          <div class="col-md-6 col-12">
            <div class="row">
              <div class="col-md-3">Expediente :</div>
              <div class="col-md-9">{{processo.Expediente}}</div>
            </div>
            <div class="row">
              <div class="col-md-3">Foro:</div>
              <div class="col-md-9">{{processo.Foro |lowercase | titlecase}}</div>
            </div>
            <div class="row">
              <div class="col-md-3">Reclamante:</div>
              <div class="col-md-9">{{processo.Reclamante |lowercase | titlecase }}</div>
            </div>
            <div class="row">
              <div class="col-md-3">Assuntos:</div>
              <div class="col-md-9">{{processo.Assuntos |lowercase | titlecase }}</div>
            </div>
            <div class="row">
              <div class="col-md-1">link:</div>
              <div class="col-md-9">
                <a v-bind:href="processo.urlPortal" target="blanck">peças Ged</a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" v-if="processo.isTerceirizado">
              <span v-bind:class="[processo.isTerceirizado,'fa fa-check text-success']"></span> Terceirizado
            </div>
          </div>
          <div class="col-md-10">
            <span
              class="fa"
              v-bind:class="[processo.Ativo ? 'fa-check text-success':'fa-close text-danger']"
            ></span>
          </div>
          <div class="row">
            <div class="col-md-3">Ativo:</div>
          </div>
        </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["processo"],
  data() {
    return {
      show: true
    };
  }
};
</script>
<style>

</style>