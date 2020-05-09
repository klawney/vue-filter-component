<template>
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item ">
        <a class="nav-link" role="tab" data-toggle="pill" href="#audi-processo">Processo</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" role="tab" data-toggle="pill" href="#audi-listar">Audiencias</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " role="tab" data-toggle="pill" href="#audi-agenda">Agenda</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" role="tab" data-toggle="pill" href="#audi-dap">DAP</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" role="tab" data-toggle="pill" href="#audi-suporte">Suporte</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          role="tab"
          data-toggle="pill"
          href="#audi-relp"
        >Relatorio Agendamento Pendente</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" role="tab" data-toggle="pill" href="#pills-rel">Rela</a>
      </li>
    </ul>
    <br />
    <div class="tab-content pt-2 pl-1" id="pills-tabContent">

      <div class="tab-pane fade " role="tabpanel" id="audi-processo">
        <processo></processo>
      </div>
      <div class="tab-pane fade active in" role="tabpanel" id="audi-listar">
        <audiencia></audiencia>
      </div>
      <div class="tab-pane fade" role="tabpanel" id="audi-agenda">
        <agenda></agenda>
      </div>
      <div class="tab-pane fade" role="tabpanel" id="audi-dap">
        xxxxxxxxxx DAP 
      </div>
      <div class="tab-pane fade" role="tabpanel" id="audi-suporte">
          xxxxxxxxxxxxxxx
      </div>
      <div class="tab-pane fade" role="tabpanel" id="audi-relp">
          xxxxxxxxxxxxx
      </div>

      
      <!-- <div class="tab-pane fade" role="tabpanel" v-for="item in menuTab" v-bind:id="item.id" v-bind:key="item">        {{item.title}}  </div> -->

    </div>
 
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      a: 54654654,
      b: "asdasdas",
      menuTab:[
        {id:"audi-incluir",title:"Incluasd"},
        {id:"audi-editar",title:"edasd tsdkjlfkjs"},
        {id:"audi-agenda",title:"asgem agenss"},
        {id:"audi-dap",title:"dap dap dapd apd ad apd "},
        {id:"audi-suporte",title:"supos sdfosidpfo sasdasdaisaisoisosisisissuus"},
        {id:"audi-relp",title:"relp repsld sprepsdlsresp"}
      ]
    };
  },
  computed: {
  },
  
};
</script>

<style>

</style>