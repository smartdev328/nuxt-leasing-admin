<template>
  <div class="products">
    <b-row style="padding: 15px 0;">
      <b-col lg="6">
        <MultiPropsSearch :search-options="searchOptions" @filtersChanged="filterChanged" />
      </b-col>
      <b-col lg="4" class="text-right">
        <Sort :sort-options="sortOptions" @sortChanged="sortChanged" />
      </b-col>
      <b-col lg="2" class="text-right">
        <router-link :to="`/products/new`">
          <b-button variant="success">
            Add New Product
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="products"
            :busy="loading"
            :fields="fields"
            outlined
          >
            <template slot="id" slot-scope="data">
              <router-link v-if="data.item.status == 'DRAFT'" :to="`/products/drafts/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
              <router-link v-if="data.item.status == 'COMPLETED'" :to="`/products/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="status" slot-scope="data">
              <a-button type="primary" size="small" :class="data.item.status">
                {{ data.item.status }}
              </a-button>
            </template>
            <template slot="actions" slot-scope="data">
              <span v-if="data.item.status == 'DRAFT'" class="editbtn">
                <router-link :to="`/products/drafts/${data.item.id}`">
                  Edit
                </router-link>
              </span>
              <span v-if="data.item.status == 'COMPLETED'" class="editbtn">
                <router-link :to="`/products/${data.item.id}`">
                  Edit
                </router-link>
              </span>
              <span class="text-danger deletebtn" @click="showMsgBoxOne(data.item.id)">
                Delete
              </span>
            </template>
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </b-table>
          <nav v-if="!loading">
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { MultiPropsSearch, Sort } from '~/components/'

export default {
  name: 'Products',
  middleware: 'guest',
  components: {
    MultiPropsSearch,
    Sort
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
        { key: 'leasingPeriods' },
        { key: 'status', sortable: true },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Products',
      loading: false,
      striped: true,
      searchOptions: [
        {
          key: 'brand',
          type: 'select',
          name: 'Brand'
        },
        {
          key: 'model',
          type: 'select',
          name: 'Model'
        },
        {
          key: 'oVariant',
          type: 'text',
          name: 'Origin variant'
        },
        {
          key: 'year',
          type: 'fromTo',
          name: 'Production Year'
        },
        {
          key: 'acquisitionCost',
          type: 'fromTo',
          name: 'Acquisition Cost'
        },
        {
          key: 'status',
          type: 'select',
          name: 'Status',
          source: [
            {
              name: 'Draft',
              value: 'DRAFT'
            },
            {
              name: 'Completed',
              value: 'COMPLETED'
            }
          ]
        }
      ],
      sortOptions: [
        {
          key: 'variant',
          name: 'Variant'
        },
        {
          key: 'year',
          name: 'Year'
        },
        {
          key: 'price',
          name: 'Price'
        }
      ],
      sortParam: {}
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.$axios.get(`/brands`).then(response => {
      const data = response.data.results || []
      this.searchOptions = this.searchOptions.map(item => {
        if (item.key === 'brand') {
          item.source = data.map(item => ({ name: item.name, value: item.id }))
        }
        return item
      })
    })
    this.$axios.get(`/models`).then(response => {
      const data = response.data.results || []
      this.searchOptions = this.searchOptions.map(item => {
        if (item.key === 'model') {
          item.source = data.map(item => ({ name: item.modelTitle, value: item.id, brand: item.brand.id }))
        }
        return item
      })
    })
  },
  mounted() {
    this.getProducts(1)
  },
  methods: {
    getProducts(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      this.$axios.get('/products/', {
        params: {
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage + 0,
          sortby: JSON.stringify(this.sortParam)
        }
      }).then(response => {
        this.products = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        this.header = `List of All Products`
      })
    },
    deleteProduct(productId) {
      this.loading = true
      this.$axios.delete(`/products/${productId}`)
        .then(response => {
          this.loading = false
          this.getProducts(this.currentPage)
          this.$message.success('Successfully Removed!')
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!')
        })
    },
    showMsgBoxOne(productId) {
      this.$bvModal.msgBoxConfirm(
        'Do you really want to delete the Product?',
        {
          size: 'md',
          okVariant: 'danger',
          okTitle: 'Confirm',
          cancelTitle: 'Cancel',
          buttonSize: 'sm',
          footerClass: 'p-2 border-top-0',
          hideHeaderClose: true,
          centered: true
        }
      )
        .then(value => {
          if (value) {
            this.deleteProduct(productId)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    filterChanged(filters) {
      this.loading = true
      this.$axios.get('/products/', {
        params: {
          ...filters,
          limit: this.perPage,
          offset: 0,
          sortby: JSON.stringify(this.sortParam)
        }
      }).then(response => {
        this.products = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        this.header = `List of All Products`
      })
    },
    sortChanged(sortParam) {
      this.sortParam = sortParam
      this.loading = true
      this.$axios.get('/products/', {
        params: {
          limit: this.perPage,
          offset: 0,
          sortby: JSON.stringify(this.sortParam)
        }
      }).then(response => {
        this.products = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        this.header = `List of All Products`
      })
    }
  }
}
</script>
<style>
.editbtn {
  padding: 0px 5px;
}
.editbtn a:hover {
  text-decoration: none;
}
.deletebtn {
  padding: 0px 5px;
  cursor: pointer;
}
.td-action-style {
  width: 120px;
}
</style>
