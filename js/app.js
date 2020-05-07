import Vue from 'vue'
import VueMoment from 'vue-moment'
//import Vuex from 'vuex'
import VueStringFilter from 'vue-string-filter'
import vSelect from 'vue-select'


require('./bootstrap')

//Vue.use(Vuex)
Vue.use(VueMoment)
Vue.moment.locale('pt-BR')

import VuexStore from './vx_store/store'

const store = VuexStore //new Vuex.Store(VuexStore)

Vue.use(VueStringFilter)

//import capitalize 'vue-string-filter/libs/capitalize'
//Vue.filter('capitalize', capitalize)

//sync(store)

Vue.component('v-select' , vSelect) 
// Vue.component('DatepickerComponent', require('./components/DatepickerComponent.vue'))
Vue.component('CurrencyInputComponent', require('./components/CurrencyInputComponent.vue'))
Vue.component('Distribution', require('./components/centralization/Distribution.vue'))
Vue.component('Distribuited', require('./components/centralization/Distributed.vue'))
Vue.component('Complement', require('./components/centralization/Complement'))
Vue.component('Returned', require('./components/centralization/Returned.vue'))
Vue.component('CdList', require('./components/cd/List.vue'))
Vue.component('SrcList', require('./components/admin/sijurRegistrationControl/List.vue'))
Vue.component('GeridUpdatesMain', require('./components/admin/geridUpdates/Main.vue'))
Vue.component('GeridUpdatesEdit', require('./components/admin/geridUpdates/Edit.vue'))
Vue.component('NrcAdvocateSender', require('./components/admin/nrcAdvocateSender/Main.vue'))
Vue.component('ViewExpDdrOrAir', require('./components/cd/ViewExpDdrOrAir.vue'))
Vue.component('AccreditedOutsourcing', require('./components/outsourcing/AccreditedOutsourcing.vue'))
Vue.component('Dismember', require('./components/solicitations/Dismember.vue'))
Vue.component('MakeDismember', require('./components/solicitations/MakeDismember.vue'))
Vue.component('Union', require('./components/solicitations/Union.vue'))

Vue.component('PainelAudiencias', require('./components/audiencias/PainelAudiencias.vue'))
Vue.component('Processo', require('./components/audiencias/Processo.vue'))
Vue.component('Audiencia', require('./components/audiencias/Audiencia.vue'))
Vue.component('Agenda', require('./components/audiencias/Agenda.vue'))

Vue.component('modal', require('./components/modal.vue'))
Vue.component('pagination', require('./components/shared/pagination.vue'))
Vue.component('ProcessoModal', require('./components/audiencias/ProcessoModal.vue'))
Vue.component('AudienciaModal', require('./components/audiencias/AudienciaModal.vue'))
/*
*/
//Vue.config.devtools = true
//Vue.config.performance = true
new Vue({
    el: '#app',
    store,
});

