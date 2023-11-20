import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

library.add(fas);

import App from './App.vue';
import router from './router';

const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
  })

app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(vuetify);

app.mount('#app');