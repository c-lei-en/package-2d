import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue"; // 引入Ant Design Vue组件
import echarts from "echarts";
import "ant-design-vue/dist/antd.css"; // 引入Ant Design Vue样式
Vue.use(Antd); //挂载到vue中
import "ol/ol.css";
import "@/styles/index.scss";

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
