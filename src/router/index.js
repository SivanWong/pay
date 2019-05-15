import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import pay from '@/components/pay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    }
  ]
})
