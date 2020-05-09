<template>
  <div class="modal fade" data-backdrop="static" tabindex="-1" role="dialog">
    <!-- <div class="" tabindex="-1" role="dialog"> -->
    <div class="modal-dialog" v-bind:class="classSize" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-md-11">
            <slot name="header"></slot>
          </div>
          <div class="col-md-1">
            <button class="pull-right close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    size: {
      default:'lg'
    }
  },
  computed:{
    classSize(){
      return 'modal-'+this.size
    },
  },
  methods: {
    show() {
      $(this.$el).modal("show")
    },
    close() {
      $(this.$el).modal("hide")
    },
  },
  mounted(){
    /*
    $(this.$el).on('hidden.bs.modal', function (e) {
      //this.$emit('mhidden', e.target.value)      
    })
    */
  }
};
</script>
<style>
  @media (min-width:1142px){
    .modal-xl{
      width:1140px
    }
  }

</style>