<template>
  <div class="products">
    <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/products/new`">
        <b-button variant="success">
          Add New Product
        </b-button>
      </router-link>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            responsive="sm"
            :items="products"
            :fields="fields"
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/products/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
          </b-table>
          <nav>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
              @change="getProducts"
            />
          </nav>
        </b-card>
        <Loading v-show="loading" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

import Loading from '~/components/Loading.vue'

export default {
  name: 'Products',
  components: {
    Loading
  },
  data: () => {
    return {
      products: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'brand', sortable: true },
        { key: 'model', sortable: true },
        { key: 'oVariant', sortable: true, label: 'oVariant' },
        { key: 'variant', sortable: true },
        { key: 'year', sortable: true },
        { key: 'acquisitionCost', sortable: true },
        { key: 'scrapValues' },
        { key: 'leasingPeriods' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Products',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getProducts(1)
  },
  methods: {
    getProducts(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/products/', {
        params: {
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage + 0
        }
      }).then(response => {
        this.products = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Products (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    }
  }
}
</script>
