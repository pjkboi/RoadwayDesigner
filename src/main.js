import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VModal from "vue-js-modal";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
``;
import vueXlsxTable from "vue-xlsx-table";
Vue.use(BootstrapVue);
Vue.use(vueXlsxTable, { rABS: false });
Vue.use(VModal);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
