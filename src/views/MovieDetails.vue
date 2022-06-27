<script>
import HeadTab from "../components/HeadTab.vue";
import { mapActions, mapGetters } from "vuex";
import StarIcon from "vue-material-design-icons/Star.vue";

export default {
  data() {
    return {
      final: {},
    };
  },
  computed: {
    ...mapGetters(["favoriteMovies"]),
    checkingIF() {
      const ids = this.favoriteMovies.map((each) => each.id);
      const finding = ids.includes(parseInt(this.$route.params.id));
      console.log("finalres", finding);
      return finding;
    },
  },
  components: {
    HeadTab,
    StarIcon,
  },
  async mounted() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.$route.params.id +
        "?api_key=919d1c9f740208335620061fe5b28c0f&language=en-US&page=1"
    );
    const finalData = await response.json();
    this.final = finalData;
  },
  methods: {
    imgUrlFixer() {
      return "https://image.tmdb.org/t/p/original" + this.final.backdrop_path;
    },
    ...mapActions(["addingFavouritesAction"]),
  },
};
</script>

<template>
  <div>
    <HeadTab />
    <div class="unorderList1 about">
      <img v-bind:src="imgUrlFixer()" class="imgPOster" />
      <div class="cont1">
        <h1>{{ final.title }}</h1>
        <h3 class="head5">
          Rating : {{ final.vote_average }}
          <span><StarIcon class="star" /></span>
        </h3>
        <h3>Release Date : {{ final.release_date }}</h3>
        <h2>Overview</h2>
        <p class="para">{{ final.overview }}</p>
        <button
          v-if="!checkingIF"
          class="addBtn"
          @click="addingFavouritesAction({ id: final.id })"
          type="button"
        >
          Add to Favourites
        </button>
        <button
          v-else
          class="addBtn"
          @click="addingFavouritesAction({ id: final.id })"
          type="button"
        >
          Remove from favorites
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imgPOster {
  width: 50%;
  border-radius: 8px;
}
.head5 {
  display: flex;
}
.addBtn {
  background-color: blue;
  border-radius: 4px;
  border: 0px;
  height: 40px;
  width: 200px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.star {
  color: yellow;
}
.para {
  color: grey;
}
.itemDetails {
  padding: 40px;
}
.divCont {
  background-color: black;
  height: 20vh;
}
.about {
  padding: 40px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.cont1 {
  margin-left: 20px;
}
.unorderList1 {
  color: white;
  display: flex;
  padding-left: 40px;

  background-color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 20px;
}
</style>
