<template>
  <div class="results">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Language</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
        </thead>
        <tbody>
          <Code 
            v-for="(code, index) in codes" :key=code.id
            :code=code :index=index :updatedIndex=updatedIndex
          >
          </Code>

          <tr v-if=!codes.length>
            <td colspan="5"> No records found! </td>
          </tr>
          <tr v-else>
            <td colspan="5">
            <Pagination :codes=codes
            v-on:page-update="updatePage" >
            </Pagination>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
</template>


<script>
import Code from './Code.vue'
import Pagination from './Pagination.vue'

import { httpGet } from '@/utils/api'

export default {
  name: 'CodeList',
  props: ['codes'],
  components: {
    Code,
    Pagination
  },
  data () {
    return {
      updatedIndex: 0
    }
  },
  methods: {
    updatePage(a , b , c){
      this.$emit('page-update', a , b, c)
      this.updatedIndex = b
    }
  }
}
</script>

<style scoped>
  .results {
    display: flex;
    justify-content: center;
  }
  table {
    width: 70%;
    text-align: center;
  }
  tr {
    cursor: pointer;
  }
</style>
