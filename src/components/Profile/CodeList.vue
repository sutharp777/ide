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
            v-on:page:update="fetchCodes" >
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
  components: {
    Code,
    Pagination
  },
  data () {
    return {
      codes: [],
      updatedIndex: 0
    }
  },
  async created () {
    await this.fetchCodes()
  },
  methods: {
    async fetchCodes (title = '', offset, limit) {
      const { data } = await httpGet('/code', {
        filter: {
          title: {
            $iLike: `%${title}%`
          }
        },
        offset,
        limit
      })
      this.codes = data.codes
      if(offset || offset == 0){
        this.updatedIndex = offset
      }
    },
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
