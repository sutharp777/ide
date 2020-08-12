<template>
  <div class="pagination-wrapper">
    <span v-if="showPreviousLink()" class="pagination-btn" v-on:click="prevPage()">
      <button type="button" class="btn btn-sm btn-run"> Previous </button>
    </span>
    <span v-if="showNextLink()" class="pagination-btn" v-on:click="nextPage()">
      <button type="button" class="btn btn-sm btn-run"> Next </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['codes'],
  data () {
    return {
      offset: 0,
      limit: 5
    }
  },
  methods: {
    nextPage(){
      this.offset = this.offset + this.limit
      this.$emit('page-update', '', this.offset , this.limit)
    },
    prevPage(){
      this.offset = this.offset - this.limit
      this.$emit('page-update' , '' , this.offset , this.limit )
    },
    showPreviousLink() {
      return this.offset == 0 ? false : true;
    },
    showNextLink() {
      return this.codes.length < 5 ? false : true;
    }
  }
}
</script>