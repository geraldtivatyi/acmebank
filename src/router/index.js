import Vue from 'vue'
import Router from 'vue-router'
import ACME from '@/components/ACME'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ACME',
      component: ACME
    },
    {
      path: '/withdraw/:index/:accounttype',
      name: 'ACME',
      component: ACME
    }
  ],
  mode: 'history'
})
