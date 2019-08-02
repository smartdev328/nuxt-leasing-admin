<template>
  <div>
    <span style="font-weight: bold; margin-right: 8px;">Sort By: </span>
    <a-select
      default-active-first-option
      style="width: 200px; margin-right: 8px"
      placeholder="Sort Fields"
      @change="handleSortOptionChange"
    >
      <a-select-option
        v-for="(option, index) in sortOptions"
        :key="index"
        :value="index"
      >
        {{ option.name }}
      </a-select-option>
    </a-select>
    <a-select
      :key="selectedSortOption"
      style="width: 100px;"
      default-value="ASC"
      @change="handleDirectionChange"
    >
      <a-select-option
        v-for="(opt, sourceId) in ['ASC', 'DESC']"
        :key="sourceId"
        :value="opt"
      >
        {{ opt }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>

export default {
  name: 'Sort',
  props: {
    sortOptions: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selectedSortOption: ''
  }),
  mounted() {
    this.selectedSortOption = this.sortOptions[0].key
  },
  methods: {
    handleSortOptionChange(option) {
      this.selectedSortOption = this.sortOptions[option].key
      this.selectedSortDirection = 'ASC'
      this.filterChanged()
    },
    handleDirectionChange(option) {
      this.selectedSortDirection = option
      this.filterChanged()
    },
    filterChanged() {
      // Emit an event to parent
      this.$emit('sortChanged', {
        option: this.selectedSortOption,
        direction: this.selectedSortDirection
      })
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
.ant-select-Sort {
  pointer-events: none;
}
</style>
