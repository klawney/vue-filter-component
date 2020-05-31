<template>
  <div class="row">
    <!-- Solicita Logistica / Email pra CP unidade Responsavel -->
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="form-group col-lg-3 col-md-6">
          <label class="form-label">Data ida</label>
          <vue2datepicker
            v-model="dt_ida"
            :format="dtpFormat[1]"
            :type="dtpType[1]"
            valuetype="date"
          ></vue2datepicker>
            <!-- range -->
        </div>
        <div class="form-group col-lg-3 col-md-6">
          <label class="form-label">Data retorno</label>
          <vue2datepicker
            v-model="dt_retorno"
            :format="dtpFormat[1]"
            :type="dtpType[1]"
            valuetype="date"
            :disabled-date="getDisabled"
          ></vue2datepicker>
        </div>
        <div class="form-group col-md-3">
          <label class="form-label">Transporte:</label>
          <input type="text" class="form-control" value="Padrão para a Comarca" />
        </div>
        <div class="form-group col-md-3">
          <label for>Cx Postal:</label>
          <select class="form-control">
            <option value="jurirbh26@mail.caixa">JURIRBH26</option>
            <option></option>
            <option></option>
          </select>
        </div>
        <div class="col-md-12">
          <p class="alert alert-info" v-if="isPernoite">Pernoite será solicitada </p>
          <p class="alert alert-danger" v-if="!PeriodoValido">Selecione um período válido </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datePickerConfig from "../../mixins/datePickerConfigMixins";
export default {
  props: ["req"],
  mixins: [datePickerConfig],
  data(){
    return {
      dt_ida:null,
      dt_retorno:null
    }
  },
  computed:{
    isPernoite(){
      if(this.dt_ida && this.dt_retorno){
        return (this.dt_ida < this.dt_retorno)?true:false
      }
      return false
    },
    PeriodoValido(){
      if(this.dt_ida && this.dt_retorno){
        return (this.dt_ida <= this.dt_retorno)?true:false
      }
      return true
    }
  },
  methods:{
    getDisabled(dt){
      return (this.dt_ida > dt)?true:false      
    }
  }
};
</script>

<style>
</style>