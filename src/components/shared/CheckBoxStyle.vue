<template>
  <div>      
      <!-- v-bind:checked="checked" -->
    <div v-bind:class="classBtn">
      <label
        class="form-label"
        style=" margin-bottom: 0px; cursor:pointer"
        @click.prevent="setValor"
      >
        <span
          class="caixa fa"
          v-bind:class="[classCheck,classSize]"
        ></span>
        <slot>slot default</slot>
      </label>
  </div>
  </div>
</template>

<script>
export default {
    props:{
       // checked: Boolean,
        size:String,
        btn:[String, Boolean]
    },
    // model:{
    //   prop: 'checked',
    //   event: 'click'
    // },
    data(){
      return {
        valor:false
      }
    },
    computed:{
        classCheck(){
            return this.valor?'fa-check-square-o':'fa-square-o'
        },
        classSize(){
            return 'caixa-'+this.size
        },
        classBtn(){
          if(this.btn){            
            return 'btn '+ (typeof this.btn == 'string' ? 'btn-' + this.btn :'btn-default')
          }
          return ''
        }
    },
    methods:{
      setValor(){
        this.valor=!this.valor
        //v-on:click="$emit('click', $event.target.checked)"
        //this.$emit('click', $event.target.checked)
        this.$emit('click')
      }
    }
};
</script>

<style>
    .caixa{
        color:#999;
        vertical-align: middle;
        margin-right:5px; 
    }
    .caixa-md{
        font-size:1.5em;
        width:18px;
    }
    .caixa-lg{
        font-size:2em;
        width:25px;
    }
</style>