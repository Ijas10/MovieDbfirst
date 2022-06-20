<script>
import HeartIcon from "vue-material-design-icons/Heart.vue";
import { RouterLink } from "vue-router";
import { mapActions } from "vuex";
export default {
  props: [
    "id",
    "overview",
    "releasedate",
    "title",
    "imgUrl",
    "genre",
    "rating",
    "marked",
  ],
  components: {
    HeartIcon,
  },

  methods: {
    ...mapActions(["fetchingAddedDetails"]),
    imgUrlFixer() {
      return "https://image.tmdb.org/t/p/original" + this.imgUrl;
    },
    addingFavourites1() {
      // this.addingFavouritesMutations(this.id);
      // this.$store.state.favMovies.push({
      //   title: this.title,
      //   imgUrl: this.imgUrl,
      //   rating: this.rating,
      //   id: this.id,
      // });
      this.fetchingAddedDetails(this.id);
    },
    
  },
};
</script>

<template>
  <li class="listEl">
    <router-link class="routerLink" :to="/movies/ + this.id">
      <img :src="imgUrlFixer()" class="posterImg" />

      <p class="title">{{ title }}</p>

      <div>
        <p class="rating">Rating - {{ rating }}</p>
      </div>
    </router-link>
    <button type="button" class="fav" @click="addingFavourites1">
      <p v-if="!marked">Mark Favorite</p>
      <p v-else>Marked</p>
      <HeartIcon class="icons1" />
    </button>
  </li>
</template>
<style>
.listEl {
  width: 10%;
  margin: 10px;
  background-color: rgb(81, 119, 119);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 7px;
}
.fav {
  background-color: burlywood;
  border: 0px;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: rgb(103, 6, 6);
}
.icons1 {
  color: red;
}
.title {
  font-weight: 500;
}
.routerLink {
  text-decoration: none;
  color: black;
}
.rating {
  color: rgb(239, 241, 204);
  font-weight: 500;
}
.posterImg {
  width: 100%;
  border-radius: 8px;
}
</style>
