<template>
  <div>
      <button @click="setAudi"></button>
      <div class="row" v-if="listaAudiencias">
      <div class="col-md-5">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>tipo</th>
                    <th>data</th>
                    <th>hora</th>
                    <th>selecionada</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listaAudiencias" v-bind:key="item.id">
                    <td>{{item.tipo}}</td>
                    <td>{{item.dt_hr_audiencia | moment("DD/MMM/YY")}}</td>
                    <td>{{item.dt_hr_audiencia | moment("HH:mm")}}</td>
                    <td class="text-center"><input type="radio" name="aud" :value=item.id v-model='selectAud'></td>
                </tr>
            </tbody>
        </table>
      </div>
      </div>
      {{selectAud}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            selectAud:null
        }
    },
    props:[
        'processo',
        'value'
    ],
    computed:{
        listaAudiencias(){
            //let proc = this.$store.state.processo.processo
            return this.$store.state.processo.processo.audiencias
        }
    },
    methods:{
        setAudi(){
            this.$store.dispatch("processo/getProcessoId", { id: 5 }).then(()=>{
                this.$store.dispatch("processo/getAudsByProcId", { id: 5 })
            })
        }
    },
    mounted(){
        //teste
        // let self = this
        // this.$store.dispatch("processo/getProcessoId", { id: 5 }).then(()=>{
        //     this.$store.dispatch("processo/getAudsByProcId", { id: 5 }).then(()=>{
        //         console.log(self.$store.state.processo.processo.audiencias);

        //     })

        // })

    }
}
</script>

<style>

</style>