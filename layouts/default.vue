<template>
  <div class="app">
    <AppHeader />
    <div class="app-body">
      <Sidebar :nav-items="nav" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { message, Radio, Button, Form, Input, Select, Icon, Row, Col } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import nav from './menu'
import { Header as AppHeader, Sidebar, Breadcrumb } from '~/components/'

Vue.use(Radio)
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = message
Vue.prototype.$form = Form

export default {
  name: 'Full',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb
  },
  data() {
    return {
      nav: nav.items
    }
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.fullPath.split('/')
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log('--------- loading')
    // })
  }
}
</script>
