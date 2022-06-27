<script>
import { RouterView } from "vue-router";
import * as firebase from "firebase/app";
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/favourites") {
          router.replace("/");
        }
      });
    });
  },
};
</script>

<template>
  <RouterView />
</template>
