<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-for="(item, index) in menu">
            <b-nav-item :key="index" :href="item.route">{{ item.name }}</b-nav-item>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <!-- <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input> -->
            <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            > -->
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Topbar",

  data() {
    return {
      menu: [
        {
          route: '/',
          name: 'Home',
        },
        {
          route: '/lista',
          name: 'Lista',
        },
        {
          route: '/busca',
          name: 'Busca',
        },
        {
          route: '/comparador',
          name: 'Comparador',
        }
      ]
    }
  }
};
</script>

<style>
</style>