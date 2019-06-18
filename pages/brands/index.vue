<template>
  <div class="brands">
    <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/brands/new`">
        <b-button variant="success">
          Add New Brand
        </b-button>
      </router-link>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="brands"
            :fields="fields"
            :busy="loading"
            class="mt-3"
            outlined
            style="width: 700px"
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/brands/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </b-table>
          <nav>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
              @change="getBrands"
            />
          </nav>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Brands',
  data: () => {
    return {
      brands: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'name', sortable: true },
        { key: 'createdAt', sortable: true },
        { key: 'updatedAt', sortable: true }
      ],
      currentPage: 1,
      perPage: 3,
      totalRows: 0,
      header: 'List of All Brands',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getBrands(1)
  },
  methods: {
    getBrands(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/brands/', {
        params: {
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage + 0
        }
      }).then(response => {
        const data = response.data.results
        data.map(item => {
          item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
          item.updatedAt = moment(item.updatedAt).format('YYYY/MM/DD')
          return item
        })
        this.brands = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Brands (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    }
  }
}
</script>
