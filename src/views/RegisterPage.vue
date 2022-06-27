<template>
  <div>
    <form @submit.prevent="register">
      <h1>Register Page</h1>
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="register" />
      <p>have an account? <router-link to="/login">Login Now</router-link></p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import * as firebase from "firebase/app";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => alert(user))
        .catch((err) => alert(err.message));
    };
    return {
      register,
      email,
      password,
    };
  },
};
</script>

<style></style>
