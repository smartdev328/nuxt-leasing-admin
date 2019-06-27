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
            :items="products"
            :busy="loading"
            :fields="fields"
            outlined
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/products/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="actions" slot-scope="data">
              <span class="editbtn">
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

export default {
  name: 'Products',
  middleware: 'guest',
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
        { key: 'actions', label: '', tdClass: 'td-action-style' }
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
      this.$axios.get('/products/', {
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
