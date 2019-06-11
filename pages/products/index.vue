<template>
  <div class="products">
    <b-row>
      <b-col lg="12">
        <c-table striped caption="List of All Products"></c-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import cTable from '../base/table.vue'

  export default {
    name: 'tables',
    components: {cTable}
  }
</script>
