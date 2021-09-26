import elementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store, { StoreKey } from './store/store';

createApp(App)
  .use(store, StoreKey)
  .use(router)
  .use(elementPlus)
  .mount('#app');
