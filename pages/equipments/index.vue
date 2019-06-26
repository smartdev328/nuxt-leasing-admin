<template>
  <div class="equipments">
    <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/equipments/new`">
        <b-button variant="success">
          Add New Equipment
        </b-button>
      </router-link>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="equipments"
            :fields="fields"
            :busy="loading"
            class="mt-3"
            outlined
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/equipments/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="actions" slot-scope="data">
              <span class="editbtn">
                <router-link :to="`/equipments/${data.item.id}`">
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
              @change="getEquipments"
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
  name: 'Equipments',
  middleware: 'guest',
  data: () => {
    return {
      equipments: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'name', sortable: true, tdClass: 'td-name-style' },
        { key: 'price', sortable: true },
        { key: 'icon', tdClass: 'td-name-style' },
        { key: 'createdAt', sortable: true },
        { key: 'updatedAt', sortable: true },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Equipments',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getEquipments(1)
  },
  methods: {
    getEquipments(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/equipments/', {
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
        this.equipments = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Equipments (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    },
    deleteEquipment(equipmentId) {
      this.loading = true
      axios.delete(`/api/v1/equipments/${equipmentId}`)
        .then(response => {
          this.loading = false
          this.getEquipments(this.currentPage)
          this.$message.success('Successfully Removed!')
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!')
        })
    },
    showMsgBoxOne(equipmentId) {
      this.$bvModal.msgBoxConfirm(
        'Do you really want to delete the Equipment?',
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
            this.deleteEquipment(equipmentId)
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
