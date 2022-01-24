<template>
  <div>
    <h1>Not Found</h1>
    <p>Oops we couldn't find that page. Try going</p>
    <router-link :to="{ name: 'Home' }"> Home</router-link>
  </div>
</template>