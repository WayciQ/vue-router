<template>
  <div>
    <h1>Welcome {{ user }}</h1>
    <p>
      <router-link
        :to="{
          name: 'Invoices',
        }"
        >Invoices</router-link
      >
    </p>
    <button @click="logOut" class="btn">Log out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: window.localStorage.getItem("user"),
    };
  },
  methods: {
    logOut() {
      window.localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>
