<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list" v-bind:key="index">
      <span class="active" v-if="isLast(index)">{{ item }}</span>
      <router-link :to="link(item, index)" v-else>{{ item || 'Home' }}</router-link>
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
    isLast (index) {
      return index === this.list.length - 1
    },
    link (item, index) {
      const arr = this.list.slice(0, index);
      const path = arr.join('/');
      if (index === 0)
        return '/'
      return path
    }
  }
}
</script>
