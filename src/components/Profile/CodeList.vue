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
            v-for="code in visibleCodes" :key=code.id
            :code=code v-bind:currentPage="currentPage"
          >
          </Code>

          <tr v-if=!codes.length>
            <td colspan="5"> No records found! </td>
          </tr>
          <tr v-else>
            <td colspan="5">
            <Pagination
              v-bind:codes="codes"
              v-on:page:update="updatePage"
              v-bind:currentPage="currentPage"
              v-bind:pageSize="pageSize">
            </Pagination>

            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
</template>


<script>
import Code from './Code.vue'
import { httpGet } from '@/utils/api'
import Pagination from './Pagination.vue'

export default {
  name: 'CodeList',
  props: ['codes'],
  components: {
    Code,
    Pagination
  },
  data () {
    return {
      pageSize: 4,
      visibleCodes: [],
      currentPage: 0
    }
  },
  async mounted () {
    this.updateVisibleCodes()
  },
  methods: {
    updatePage(pageNumber){
      this.currentPage = pageNumber;
      this.updateVisibleCodes();
    },
    updateVisibleCodes(){
      this.visibleCodes = this.codes.slice(this.currentPage * this.pageSize , (this.currentPage * this.pageSize) + this.pageSize )
      if(this.visibleCodes.length == 0 && this.currentPage > 0){
        this.updatePage(this.currentPage-1)
      }
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
