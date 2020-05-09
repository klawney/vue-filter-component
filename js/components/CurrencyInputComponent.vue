<template>
    <input type="text" :id="inputId" :name="inputName" :required="inputRequired" :value="inputValue" class="inputClass" v-money="money">
</template>

<script>
import {VMoney} from 'v-money'
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

export default {
    data() {
      return {
        inputId: '',
        inputName: '',
        inputRequired: '',
        inputValue: '',
        inputClass: '',

        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false /* doesn't work with directive */
        }
      }
    },
    props: [
      'id',
      'name',
      'required',
      'val',
      'class'
    ],
    mounted(){
      this.inputId = this.id
      this.inputName = this.name
      this.inputRequired = this.required
      this.inputValue = this.val
      this.inputClass = this.class
    }
}
</script>

<style>
</style>