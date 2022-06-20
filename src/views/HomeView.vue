<script>
import HeadTab from "../components/HeadTab.vue";
import Items from "../components/Items.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    HeadTab,
    Items,
    MagnifyIcon,
  },

  data() {
    return {
      listOfMovies: [],
      ratingInitial: "high",
      sortingInitial: "ascending",
      searchInput: "",
    };
  },
  computed: mapGetters(["allMoviesGetter"]),
  methods: {
    ...mapActions(["fetchingApi"]),
    changeRating(event) {
      this.ratingInitial = event.target.value;
      if (this.ratingInitial === "low") {
        const ratingHighTo = this.listOfMovies.sort(
          (a, b) => a.vote_average - b.vote_average
        );
        console.log(ratingHighTo);
      } else {
        this.listOfMovies.sort((a, b) => b.vote_average - a.vote_average);
      }
      console.log(this.ratingInitial);
    },
    changeSearchContents(event) {
      this.searchInput = event.target.value;
      this.listOfMovies = this.listOfMovies.filter((each) =>
        each.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },

    changeRatingA_Z(event) {
      this.sortingInitial = event.target.value;
      console.log(this.sortingInitial);
      if (this.sortingInitial === "ascending") {
        this.listOfMovies.sort(function (a, b) {
          const nameA = a.title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        this.listOfMovies.sort(function (a, b) {
          const nameA = a.title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
          return 0;
        });
      }
    },
  },

  mounted() {
    this.fetchingApi()
  },
};
</script>

<template>
  <div class="mainEl">
    <HeadTab />
    <div class="main">
      <h1 class="head">Popular Movies</h1>
      <h3 class="head2">
        The most popular movies that everyone must have seen atleast once
      </h3>
      <div class="flexBox">

        <div class="contSelect">
          <select class="selectOption" @change="changeRating">
            <option value="high">Rating(high-low)</option>
            <option value="low">Rating(low-high)</option>
          </select>
          <select class="selectOption" @change="changeRatingA_Z">
            <option value="ascending">Sort by(a-z)</option>
            <option value="descending">Sort by (z-a)</option>
          </select>
        </div>
      </div>

      <ul v-if="listOfMovies.lenght !== 0" class="unorderList">
        <Items
          v-for="item in this.$store.state.allMovies"
          :title="item.title"
          :imgUrl="item.poster_path"
          :genre="item.genre"
          :rating="item.vote_average"
          :key="item.id"
          :id="item.id"
          :overview="item.overview"
          :marked="item.marked"
          :releasedate="item.release_date"
        />
      </ul>
      <h1 class="error" v-if="listOfMovies.length === 0">
        Not getting the expected result?.Try something else
      </h1>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
.main {
  padding-left: 40px;
  padding-right: 40px;
  background-color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.selectOption {
  align-self: flex-end;
  margin-left: 10px;
  font-size: 17px;
  padding: 10px;
  border-radius: 4px;
}
.error {
  text-align: center;
}
.inputSearch {
  height: 37px;
  width: 300px;
  border: 0px;
  background-color: transparent;
}
.searchCont {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  color: rgb(107, 69, 69);
  margin-bottom: 0px;
  font-size: 37px;
}
.head2 {
  font-size: 26px;
  margin-top: 10px;
}
.imgurl {
  width: 100%;
}
.flexBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.contSelect {
  align-self: flex-end;
}
.unorderList {
  display: flex;
  padding-left: 0px;
  justify-content: center;
  list-style-type: none;
  flex-wrap: wrap;
  background-color: black;
  border-radius: 10px;
}
</style>
