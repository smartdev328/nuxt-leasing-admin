<template>
  <ol class="breadcrumb">
    <li v-for="(item, index) in list" :key="index" class="breadcrumb-item">
      <span v-if="isLast(index)" class="active">{{ item }}</span>
      <router-link v-else :to="link(item, index)">
        {{ item || 'Home' }}
      </router-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    isLast(index) {
      return index === this.list.length - 1
    },
    link(item, index) {
      const arr = this.list.slice(0, index + 1)
      const path = arr.join('/')
      if (index === 0) { return '/' }
      return path
    }
  }
}
</script>
