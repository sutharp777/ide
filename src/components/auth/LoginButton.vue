<template>
  <span v-if="userStore.isAuthenticated">
    <div class="btn-group" :class="{ userOptionOpen : isUserOptionOpen}"  @click="userOptionOpen">
      <button type="button" class="btn btn-sm btn-menu"
        aria-haspopup="true" aria-expanded="false" @blur="userOptionClose" >
        {{userStore.currentUser.firstname}} <span class="fa fa-caret-down"></span>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="btn btn-sm btn-menu" target="_blank" href="https://account.codingblocks.com/users/me">
            <i class="fa fa-user"></i>
            profile
          </a>
        </li>
        <li>
          <router-link class="btn btn-sm btn-menu" tag="button" to="/profile">
            <i class="fa fa-list"></i>
            Saved Codes 
          </router-link>
        </li>
        <li>
          <button 
            type="button" 
            class="btn btn-sm btn-menu"
            @click="logout"
            >
          Logout <span class="fas fa-sign-in-alt"></span>
          </button>
        </li>
      </ul>
    </div>
  </span>
  <button id="panelLang" type="button" class="btn btn-sm btn-danger"
    @click="login"
    v-else >
    <i class="fa fa-sign-in"></i> Login
  </button>
  
</template>

<script>
import { mapState } from 'vuex'
import { setToken } from '@/utils/api'

export default {
  data() {
    return {
      isUserOptionOpen: false
    }
  },
  computed: mapState({
    userStore: 'user'
  }),
  methods: {
    login () {
      const oneauth = process.env.ONEAUTH
      window.location.href= oneauth.url + `/oauth/authorize?response_type=code&client_id=${oneauth.clientId}&redirect_uri=${process.env.url}callback`
    },
    logout () {
      this.$store.commit('user/logout')
      setToken(null)
      this.$notify({
        text: 'Logged you out. You may still keep the fiddling with code and use the ide in anonymous mode.',
        type: 'success'
      })
    },
    userOptionOpen() {
      this.isUserOptionOpen = !this.isUserOptionOpen
    },
    userOptionClose() {
      setTimeout(() => { this.isUserOptionOpen=false },250 )
    }
  }
  
}
</script>

<style scoped>
  .userOptionOpen > .dropdown-menu {
    display: list-item !important;
    background-color: #202020;
    font-size: 14px;
    overflow: hidden;
  }
</style>

<style>
  .vue-notification {
    margin-top: 45px;
  }
</style>
