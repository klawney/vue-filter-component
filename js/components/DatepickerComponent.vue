<template>
  <datepicker :clear-button="clearButton" language="pt-br" :id="inputId" :name="inputName" :format="format" :required="inputRequired" :value="state.date"></datepicker>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  props: [
    'clear_button',
    'id',
    'name',
    'value',
    'required'
  ],
  components: {
    Datepicker
  },
  data () {
    return {
      format: 'dd/MM/yyyy',
      disabled: {},
      eventMsg: null,
      state: {},
      clearButton: false,
      inputId: '',
      inputName: '',
      inputRequired: '',
      year: '',
      month: '',
      day: '',
    }
  },
  mounted(){
    this.inputId = this.id
    this.inputName = this.name
    this.inputRequired = this.required
    if(this.value){
      var d = this.value
      this.state = {
        date: new Date(parseInt(d.substring(6, 10)), parseInt(d.substring(3, 5)) - 1, parseInt(d.substring(0, 2)))
      }
    }
    if(this.clear_button){
            this.clearButton = JSON.parse(this.clear_button)
        }
    },
}
</script>

<style>
    input{
        border-radius: 4px;
        padding: 5px 15px;
        font-size: 100%;
        border: 1px solid #DCDCDC;
        width: 100%;
    }
</style>