<template>
  <b-nav-item-dropdown right no-caret>
    <template slot="button-content">
      <img src="~static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
      {{ loggedInUser && loggedInUser.username || '' }}
    </template>
    <b-dropdown-item @click="logout">
      <i class="fa fa-lock" /> Logout
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderDropdown',
  computed: {
    ...mapGetters({
      loggedInUser: 'localStorage/loggedInUser'
    })
  },
  methods: {
    logout() {
      try {
        this.$store.commit('localStorage/logout')
        this.$message.success('Successfully Logout!')
        this.$router.push('/login')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
