<script>
export default {
  async mounted() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.$route.params.id +
        "?api_key=919d1c9f740208335620061fe5b28c0f&language=en-US&page=1"
    );
    const dataReturned = await response.json();
    console.log("data",dataReturned);
  },
};
</script>

<template>
  <h1>dghiuashsdhj</h1>
</template>
