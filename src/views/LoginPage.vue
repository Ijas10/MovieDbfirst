<template>
  <div>
    <form @submit.prevent="login">
      <h1>Login Page</h1>
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" />
      <p>Need an account? <router-link to="/register">Register Now</router-link></p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import * as firebase from "firebase/app";
import { auth } from "../main.js";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const login = () => {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    };
    return {
      login,
      email,
      password,
    };
  },
};
</script>
