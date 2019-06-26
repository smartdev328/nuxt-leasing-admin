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
import { message } from 'ant-design-vue'
import 'ant-design-vue/lib/message/style/index.css'

import nav from './menu'
import { Header as AppHeader, Sidebar, Breadcrumb } from '~/components/'

Vue.prototype.$message = message

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
