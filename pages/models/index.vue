<template>
  <div class="models">
    <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/models/new`">
        <b-button variant="success">
          Add New Model
        </b-button>
      </router-link>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="models"
            :busy="loading"
            :fields="fields"
            outlined
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/models/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="actions" slot-scope="data">
              <span class="editbtn">
                <router-link :to="`/models/${data.item.id}`">
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
          <nav>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
              @change="getModels"
            />
          </nav>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Models',
  data: () => {
    return {
      models: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'modelTitle', sortable: true },
        { key: 'brand', sortable: true },
        { key: 'modelImage' },
        { key: 'modelDescription' },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Models',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getModels(1)
  },
  methods: {
    getModels(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/models/', {
        params: {
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage + 0
        }
      }).then(response => {
        this.models = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Models (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    },
    deleteModel(modelId) {
      this.loading = true
      axios.delete(`/api/v1/models/${modelId}`)
        .then(response => {
          this.loading = false
          this.getModels(this.currentPage)
          this.$message.success('Successfully Removed!')
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!')
        })
    },
    showMsgBoxOne(modelId) {
      this.$bvModal.msgBoxConfirm(
        'Do you really want to delete the Model?',
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
            this.deleteModel(modelId)
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
