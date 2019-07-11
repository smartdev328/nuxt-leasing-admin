<template>
  <div>
    <a-select
      label-in-value
      default-active-first-option
      style="width: 200px; margin-right: 8px"
      placeholder="Search Fields"
      @change="handleSearchOptionChange"
    >
      <a-select-option
        v-for="(option, index) in searchOptions"
        :key="index"
        :value="index"
      >
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
      <a-select-option
        v-for="(opt, sourceId) in selectedSearchOption.source"
        :key="sourceId"
        :value="sourceId"
      >
        {{ opt.name }}
      </a-select-option>
    </a-select>
    <a-input-group
      v-if="selectedSearchOption.type === 'fromTo'"
      compact
      class="from-to-group-input"
    >
      <a-input
        style=" width: 130px; text-align: center"
        type="number"
        placeholder="Minimum"
        :value="tempFilter.value && tempFilter.value[0]"
        @change="onFromChange(selectedSearchOption.key, $event)"
      />
      <a-input
        style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
        placeholder="~"
        disabled
      />
      <a-input
        style="width: 130px; text-align: center; border-left: 0"
        type="number"
        placeholder="Maximum"
        :value="tempFilter.value && tempFilter.value[1]"
        @change="onToChange(selectedSearchOption.key, $event)"
      />
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
  </div>
</template>
<script>
import { isArray, cloneDeep, intersection, findIndex } from 'lodash'

export default {
  name: 'MultiPropsSearch',
  props: {
    searchOptions: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    multiTagsFormData: [],
    tempFilter: {},
    selectedSearchOption: {
      type: ''
    },
    filters: [],
    modelList: []
  }),
  watch: {
    searchOptions: function (newValue, oldValue) {
      this.selectedSearchOption = newValue[0]
      this.searchOptions.forEach(item => {
        if (item.key === 'model') {
          this.modelList = item.source
        }
      })
    }
  },
  methods: {
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
        if (filter.key === 'brand' && findIndex(this.searchOptions, ['key', 'model']) > -1) {
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
      // Emit an event to parent
      this.$emit('filtersChanged', filters)
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
