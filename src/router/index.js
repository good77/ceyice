import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Alone from '@/components/Alone'
import All from '@/components/All'
import Result from '@/components/Result'
import Sign from '@/components/Sign'
import Vote from '@/components/Vote'
import Form from '@/components/Form'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Alone',
      name: 'Alone',
      component: Alone
    },
    {
      path: '/All',
      name: 'All',
      component: All
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result
    },
    {
      path: '/Sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/Vote',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/Form',
      name: 'Form',
      component: Form
    }
  ]
})
