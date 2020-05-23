<template>
  <div class="btn-group" :class="{ open : isOpen}"  @click="open">
    <button id="panelLang" type="button" class="btn btn-sm btn-menu"
            aria-haspopup="true" aria-expanded="false" @blur="close" >
      <span v-if="selected"> {{selected.lang_name}} </span> <span class="fa fa-caret-down"></span>
       <i class="fa fa-code" aria-hidden="true"></i>
    </button>
    <ul class="dropdown-menu">
        <li v-for="option in options" @click="select(option.lang_slug)"><span href="#">{{option.lang_name}}</span></li>
    </ul>  
  </div>
</template>


<script>
  export default {
    name: 'language',
    props: {
      options: {
        default: function () {
          return []
        }
      },
      selected: {
        default: {}
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      select(selected) {
          this.$store.commit('changeLanguage', selected) 
      },
      open() {
        this.isOpen = !this.isOpen 
      },
      close () {
        setTimeout(() => { this.isOpen=false },250 )    
      }
    }
  } 
</script>

<style scoped>
  .open > .dropdown-menu {
    display: list-item !important;
    background-color: #202020;
    color: #ffffff;
    font-size: 14px;
    overflow: hidden;
  }

  .open > .dropdown-menu > li {
    padding: 0 8px;
  }

  .open > .dropdown-menu > li:hover {
    cursor: pointer;
    color: #fc4f4f;
  }
</style>
