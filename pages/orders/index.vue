<template>
  <div class="orders" :class="{ loaded: !loading }">
    <!-- <b-row class="justify-content-end" style="padding: 15px;">
      <router-link :to="`/orders/new`">
        <b-button variant="success" disabled>
          Add New Order
        </b-button>
      </router-link>
    </b-row> -->
    <b-row>
      <b-col lg="12">
        <b-card :header="header">
          <b-table
            :striped="striped"
            :items="orders"
            :fields="fields"
            :busy="loading"
            class="mt-3"
            outlined
          >
            <template slot="id" slot-scope="data">
              <router-link :to="`/orders/${data.item.id}`">
                {{ data.item.id }}
              </router-link>
            </template>
            <template slot="username" slot-scope="data">
              <span>{{ data.item.firstName }} {{ data.item.lastName }}</span>
            </template>
            <template slot="address" slot-scope="data">
              <span>{{ data.item.addressStreet && `${data.item.addressStreet},` }} {{ data.item.city && data.item.city }} {{ data.item.zipcode && data.item.zipcode }}</span>
            </template>
            <template slot="status" slot-scope="data">
              <a-button type="primary" size="small" :class="data.item.status">
                {{ data.item.status.replace('_', ' ') }}
              </a-button>
            </template>
            <template slot="actions" slot-scope="data">
              <span class="editbtn">
                <router-link :to="`/orders/${data.item.id}`">
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
              @change="getOrders"
            />
          </nav>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'Orders',
  middleware: 'guest',
  data: () => {
    return {
      orders: [],
      fields: [
        { key: 'id', sortable: true, label: 'ID' },
        { key: 'username', sortable: true },
        { key: 'email', sortable: true },
        { key: 'phone' },
        { key: 'variant' },
        { key: 'address' },
        { key: 'status', sortable: true },
        { key: 'companyName', sortable: true },
        { key: 'companyIndustry', sortable: true },
        { key: 'cvr' },
        { key: 'numberOfEmployees', sortable: true },
        { key: 'brand', sortable: true },
        { key: 'model', sortable: true },
        { key: 'color', sortable: true },
        { key: 'monthlyPrice', sortable: true },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Orders',
      loading: false,
      striped: true
    }
  },
  mounted() {
    this.getOrders(1)
  },
  methods: {
    getOrders(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      this.$axios.get('/orders/', {
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
        this.orders = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Orders (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
    },
    deleteOrder(orderId) {
      this.loading = true
      this.$axios.delete(`/orders/${orderId}`)
        .then(response => {
          this.loading = false
          this.getOrders(this.currentPage)
          this.$message.success('Successfully Removed!')
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!')
        })
    },
    showMsgBoxOne(orderId) {
      this.$bvModal.msgBoxConfirm(
        'Do you really want to delete the Order?',
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
            this.deleteOrder(orderId)
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
