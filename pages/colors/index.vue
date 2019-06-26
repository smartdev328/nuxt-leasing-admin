<template>
  <div class="colors">
    <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/colors/new`">
        <b-button variant="success">
          Add New Color
        </b-button>
      </router-link>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="colors"
            :fields="fields"
            :busy="loading"
            class="mt-3"
            outlined
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/colors/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="actions" slot-scope="data">
              <span class="editbtn">
                <router-link :to="`/colors/${data.item.id}`">
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
              @change="getColors"
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
  name: 'Colors',
  middleware: 'guest',
  data: () => {
    return {
      colors: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'name', sortable: true, tdClass: 'td-name-style' },
        { key: 'hexColor', sortable: true },
        { key: 'price', sortable: true },
        { key: 'createdAt', sortable: true },
        { key: 'updatedAt', sortable: true },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Colors',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getColors(1)
  },
  methods: {
    getColors(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/colors/', {
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
        this.colors = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Colors (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    },
    deleteColor(colorId) {
      this.loading = true
      axios.delete(`/api/v1/colors/${colorId}`)
        .then(response => {
          this.loading = false
          this.getColors(this.currentPage)
          this.$message.success('Successfully Removed!')
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!')
        })
    },
    showMsgBoxOne(colorId) {
      this.$bvModal.msgBoxConfirm(
        'Do you really want to delete the Color?',
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
            this.deleteColor(colorId)
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
