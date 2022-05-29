import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { fb } from './Firebase'




createApp(App)
   .use(router)
   .use(fb)
   .mount('#app')