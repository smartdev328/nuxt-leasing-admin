<template>
  <div class="categories">
    <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/categories/new`">
        <b-button variant="success">
          Add New Category
        </b-button>
      </router-link>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="categories"
            :fields="fields"
            :busy="loading"
            class="mt-3"
            outlined
            style="width: 800px"
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/categories/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="actions" slot-scope="data">
              <span class="editbtn">
                <router-link :to="`/categories/${data.item.id}`">
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
              @change="getCategories"
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
  name: 'Categories',
  middleware: 'guest',
  data: () => {
    return {
      categories: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'name', sortable: true, tdClass: 'td-name-style' },
        { key: 'createdAt', sortable: true },
        { key: 'updatedAt', sortable: true },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Categories',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getCategories(1)
  },
  methods: {
    getCategories(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/categories/', {
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
        this.categories = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Categories (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    },
    deleteCategory(brandId) {
      this.loading = true
      axios.delete(`/api/v1/categories/${brandId}`)
        .then(response => {
          this.loading = false
          this.getCategories(this.currentPage)
          this.$message.success('Successfully Removed!')
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!')
        })
    },
    showMsgBoxOne(brandId) {
      this.$bvModal.msgBoxConfirm(
        'Do you really want to delete the Category?',
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
            this.deleteCategory(brandId)
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
.td-name-style {
  width: 300px;
}
.td-action-style {
  width: 120px;
}
</style>
