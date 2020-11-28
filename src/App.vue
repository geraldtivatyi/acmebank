<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">ACME Bank</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <!-- <b-nav-item to="/">Accounts</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  watch: {}
}
</script>

<style scoped>
 .bg-dark {
    background-color: #c9085d !important;
    background-image: linear-gradient(to right, #c9085d , #5e012a );
  }
</style>