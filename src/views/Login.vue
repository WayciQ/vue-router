<template>
  <div class="login">
    <h1>login</h1>
    <div class="form">
      <label for="username">Username</label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Password</label>
      <input v-model="password" type="text" name="password" class="input" />
      <button class="btn" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      window.localStorage.setItem("user", this.username);
      this.$router.push("/user");
      const redirectPath = this.$route.query.redirect || "/";
      this.$router.push(redirectPath);
    },
  },
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
.input {
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 20px;
}
.btn {
  background: green;
  color: white;
  padding: 10px;
}
</style>
