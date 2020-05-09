<template>
  <div>
    <div class="alert bg-info">
        <div class="row">
            <div class="col-md-10">
                <h4>Detalhes da Audiência:</h4>
            </div>
            <div class="col-md-2">
                <button :disabled="!audiencia.id" class="btn btn-default btn-sm pull-right" @click="show = !show">
                    <i class="fa" v-bind:class="show?'fa-minus':'fa-eye'"></i>
                </button>
            </div>
        </div>
      <div class="row" v-show="show && audiencia.id">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-1">Data:</div>
            <div class="col-md-2">
              <strong>{{audiencia.dt_hr_audiencia | moment("DD/MMM/YY")}}</strong>
            </div>
            <div class="col-md-1">Hora:</div>
            <div class="col-md-3">
              <strong>{{audiencia.dt_hr_audiencia | moment("HH:mm")}}</strong>
            </div>
            <div class="col-md-1">Tipo:</div>
            <div class="col-md-3">
              <strong>{{audiencia.tipo}}</strong>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-1">Obs :</div>
            <div class="col-md-11">{{audiencia.obs}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["audiencia"],
  data(){
      return {
          show:true
      }
  }
};
</script>

<style>
</style>