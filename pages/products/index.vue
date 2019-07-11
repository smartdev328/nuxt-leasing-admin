<template>
  <div class="products">
    <b-row style="padding: 15px 0;">
      <b-col lg="10">
        <a-select label-in-value default-active-first-option style="width: 200px; margin-right: 8px" placeholder="Search Fields" @change="handleSearchOptionChange">
          <a-select-option v-for="(option, index) in searchOptions" :key="index" :value="index">
            {{ option.name }}
          </a-select-option>
        </a-select>
        <a-input
          v-if="selectedSearchOption.type === 'text'"
          :id="selectedSearchOption.key"
          :value="tempFilter.value"
          style="width: 300px; margin-right: 8px"
          :placeholder="`Please input ${selectedSearchOption.name}`"
          @change="handleSearchTextChange"
        />
        <a-select
          v-if="selectedSearchOption.type === 'select'"
          :key="selectedSearchOption.type + selectedSearchOption.key"
          label-in-value
          mode="multiple"
          style="width: 300px; margin-right: 8px"
          placeholder="Please select an option"
          @change="handleOptionChange"
        >
          <a-select-option v-for="(opt, sourceId) in selectedSearchOption.source" :key="sourceId" :value="sourceId">
            {{ opt.name }}
          </a-select-option>
        </a-select>
        <a-input-group v-if="selectedSearchOption.type === 'fromTo'" compact class="from-to-group-input">
          <a-input style=" width: 130px; text-align: center" type="number" placeholder="Minimum" :value="tempFilter.value && tempFilter.value[0]" @change="onFromChange(selectedSearchOption.key, $event)" />
          <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
          <a-input style="width: 130px; text-align: center; border-left: 0" type="number" placeholder="Maximum" :value="tempFilter.value && tempFilter.value[1]" @change="onToChange(selectedSearchOption.key, $event)" />
        </a-input-group>
        <a-button
          type="default"
          icon="plus-o"
          class="addfilter-btn"
          @click="addFilter"
        />
        <a-select
          mode="multiple"
          :value="multiTagsFormData"
          :show-search="false"
          style="width: 100%; margin: 10px 0;"
          :open="false"
          class="multi-filters-select"
          @change="handleChange"
        />
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
import { isArray, cloneDeep, intersection } from 'lodash'

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
        { key: 'status', sortable: true },
        { key: 'actions', label: '', tdClass: 'td-action-style' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      header: 'List of All Products',
      loading: false,
      striped: true,
      selectedSearchOption: {
        type: ''
      },
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
      filters: [],
      multiTagsFormData: [],
      tempFilter: {}
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
          this.modelList = item.source
        }
        return item
      })
    })
  },
  mounted() {
    this.selectedSearchOption = this.searchOptions[0]
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
    handleSearchOptionChange(option) {
      this.selectedSearchOption = this.searchOptions[option.key]
    },
    handleOptionChange(options) {
      const label = []
      const value = []
      options.forEach(option => {
        label.push(this.selectedSearchOption.source[option.key].name)
        value.push(this.selectedSearchOption.source[option.key].value)
      })
      this.tempFilter = {
        key: this.selectedSearchOption.key,
        label: label.join(', '),
        value
      }
    },
    handleSearchTextChange(e) {
      const value = e.target.value
      const key = e.target.id
      this.tempFilter = {
        key: key,
        label: value,
        value
      }
    },
    getMultiTagsFormData: function () {
      const data = []
      this.filters.map(filter => {
        data.push(`${filter.key}: ${isArray(filter.label) ? filter.label.join(' - ') : filter.label}`)
      })
      this.multiTagsFormData = data
    },
    handleChange: function (data) {
      this.filters = this.filters.filter(filter => {
        const compare = `${filter.key}: ${isArray(filter.label) ? filter.label.join(' - ') : filter.label}`
        if (data.indexOf(compare) > -1) {
          return true
        }
        return false
      })
      this.filterChanged()
    },
    filterChanged() {
      this.getMultiTagsFormData()
      const filters = {}
      this.filters.forEach(filter => {
        if (filter.key === 'brand') {
          const models = this.modelList.filter(item => filter.value.indexOf(item.brand) > -1)
          filters.brand = models.map(item => item.value)
        } else {
          if (filter.key === 'year') {
            if (!filter.value[0]) filter.value[0] = 2000
            if (!filter.value[1]) filter.value[1] = 3000
          }
          if (filter.key === 'acquisitionCost') {
            if (!filter.value[0]) filter.value[0] = 0
            if (!filter.value[1]) filter.value[1] = 9000000000
          }
          filters[filter.key] = filter.value
        }
      })
      if (filters.brand && filters.brand.length > 0 && filters.model && filters.model.length > 0) {
        filters.model = intersection(filters.brand, filters.model)
      } else if (filters.brand && filters.brand.length > 0) {
        filters.model = filters.brand
      }
      this.loading = true
      this.$axios.get('/products/', {
        params: {
          ...filters,
          limit: this.perPage,
          offset: 0
        }
      }).then(response => {
        this.products = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        this.header = `List of All Products`
      })
    },
    addFilter() {
      const value = this.tempFilter.value
      if (this.tempFilter.key === 'fromTo') {
        if (value[1] && value[0] && value[1] < value[0]) {
          this.tempFilter = {}
          return
        }
      }
      if (this.tempFilter.key === 'select') {
        if (value.length === 0) {
          this.tempFilter = {}
          return
        }
      }
      if (value) {
        const filters = this.filters.filter(filter => filter.key !== this.tempFilter.key)
        filters.push(this.tempFilter)
        this.filters = cloneDeep(filters)
        this.filterChanged()
        this.tempFilter = {}
      }
    },
    onFromChange(key, e) {
      let value = this.tempFilter.value
      if (isArray(value)) {
        value[0] = parseInt(e.target.value, 10)
      } else {
        value = []
        value.push(parseInt(e.target.value, 10))
      }
      this.tempFilter = {
        key: key,
        label: value,
        value: value
      }
    },
    onToChange(key, e) {
      let value = this.tempFilter.value
      if (isArray(value)) {
        value[1] = parseInt(e.target.value, 10)
      } else {
        value = []
        value.push(undefined)
        value.push(parseInt(e.target.value, 10))
      }
      this.tempFilter = {
        key: key,
        label: value,
        value: value
      }
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
.addfilter-btn i {
  transform: translateY(-2px)
}
.multi-filters-select .ant-select-selection {
  border: none;
}
.from-to-group-input.ant-input-group {
  display: inline-block;
  width: 300px;
  transform: translateY(-5px);
}
.ant-select-search {
  pointer-events: none;
}
</style>
