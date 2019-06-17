<template>
  <b-nav-item-dropdown right no-caret>
    <template slot="button-content">
      <img src="~static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
    </template>
    <b-dropdown-item @click="logout">
      <i class="fa fa-lock" /> Logout
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  name: 'HeaderDropdown',
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
