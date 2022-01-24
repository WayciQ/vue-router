<template>
  <div id="nav">
    <p class="logo">The Travel App</p>
    <!-- <router-link to="/brazil">Brazil</router-link>
    <router-link to="/hawaii">Hawaii</router-link>
    <router-link to="/jamaica">Jamaica</router-link>
    <router-link to="/panama">Panama</router-link> -->

    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Home</router-link>
      </li>
      <li
        class="links"
        v-for="destination in destinations"
        :key="destination.name"
      >
        <router-link
          :to="{
            name: 'DestinationDetails',
            params: { slug: destination.slug },
          }"
        >
          {{ destination.name }}</router-link
        >
      </li>
      <li class="links">
        <router-link to="/user"> Dashboard</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  data() {
    return {
      destinationId: this.$route.params.id,
      destinations: store.destinations,
    };
  },
};
</script>
<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid grey;
  z-index: 1;
}
#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}
#nav a.vue-active-class {
  color: red;
}

.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}
.logo {
  font-size: 20px;
  color: black;
  font-weight: bold;
}
</style>
