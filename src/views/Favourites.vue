<script>
import HeadTab from "../components/HeadTab.vue";
import { mapGetters } from "vuex";
import { RouterLink } from "vue-router";
export default {
  components: { HeadTab },

  computed: {
    ...mapGetters(["favoriteMovies"]),
  },
  methods: {
    imgUrlFixer(img) {
      return "https://image.tmdb.org/t/p/original" + img;
    },
    unorderListOF() {
      const filtering5 = this.$store.state.allMovies.filter(
        (each) => each.marked === "false"
      );
      return filtering5;
    },
  },
};
</script>

<template>
  <div class="1">
    <HeadTab />
    <div class="about">
      <h1 class="head">Favourite Movies</h1>
      <h4 class="head2">Your top favorite movies</h4>
      <h5 v-if="favoriteMovies.length === 0" class="conditional">
        Add your favorite movies to view them in the favorite movie list
      </h5>
      <ul v-if="favoriteMovies.length !== 0" class="unorderList">
        <li class="listEl" v-for="item in favoriteMovies" v-bind:key="item.id">
          <router-link class="routerLink" :to="/movies/ + item.id">
            <div>
              <img
                v-bind:src="
                  'https://image.tmdb.org/t/p/original' + item.poster_path
                "
                class="posterImg"
              />
              <p class="title">{{ item.title }}</p>
            </div>
            <div>
              <p class="rating">Rating - {{ item.vote_average }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.listEl {
  width: 10%;
  margin: 10px;
  background-color: rgb(81, 119, 119);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 7px;
  color: white;
}
.conditional {
  text-align: center;
  margin-top: 50px;
}
.about {
  padding: 40px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
