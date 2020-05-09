import 'vue-resource';
import CONFIG from './config';
import Vue from 'vue';
//import JwtToken from './jwt-token';
//import store from '../store/store';
//import router from '../router';

// *** *** usar Axios em vez de vue-resource ****
Vue.http.options.root = CONFIG.API_URL;
// Vue.http.interceptors.push((request,next) => {}

const Processo = {
    ClassProcesso: Vue.resource('processo/{id_processo}')
    //,----
};

export {
    Processo
};