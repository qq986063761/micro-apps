import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)

let router = null;
let instance = null;
function render(props = {}) {
  let { container, plugins, ajax, methods } = props
  let { init, initAfter } = methods

  init({
    Vue,
    ajaxList: {
      getChildData() {}
    }
  })

  router = new VueRouter({
    // mode: 'history',
    // base: window.__POWERED_BY_QIANKUN__ ? '/okr/' : '/',
    routes
  })

  // router.beforeEach((to, from, next) => {
  //   next()
  // })

  instance = new Vue({
    router,
    store,
    // i18n,
    render: h => h(App),
    mounted() {
      console.log('ajax', this.$ajax)
    }
  }).$mount(container ? container.querySelector('#app') : '#app')

  initAfter({
    vm: instance
  })
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
