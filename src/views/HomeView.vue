<script>
import HeadTab from "../components/HeadTab.vue";
import Items from "../components/Items.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    HeadTab,
    Items,
    MagnifyIcon,
    PulseLoader,
  },

  data() {
    return {
      ratingInitial: "high",
      sortingInitial: "ascending",
      searchInput: "",
    };
  },
  computed: mapGetters([
    "allMoviesGetter",
    "loadingOrNot",
    "seachInputGetter",
    "searchFilterGetter",
  ]),
  methods: {
    ...mapActions([
      "fetchingApi",
      "sortingBasedOnRatingAction",
      "sortingBasedOnRatingActionHigh",
      "changeSearch",
    ]),
    changeRating(event) {
      this.ratingInitial = event.target.value;
      if (this.ratingInitial === "low") {
        const ratingHighTo = this.$store.state.allMovies.sort(
          (a, b) => a.vote_average - b.vote_average
        );
        console.log(ratingHighTo);
      } else {
        this.$store.state.allMovies.sort(
          (a, b) => b.vote_average - a.vote_average
        );
      }
      console.log(this.ratingInitial);
    },
    changeSearchMain(event) {
      const values = event.target.value;
      console.log(values, "values");
      this.changeSearch(values);
    },
    changeRatingA_Z(event) {
      this.sortingInitial = event.target.value;
      console.log(this.sortingInitial);
      if (this.sortingInitial === "ascending") {
        this.sortingBasedOnRatingAction();
      } else {
        this.sortingBasedOnRatingActionHigh();
      }
    },
  },

  created() {
    if (this.allMoviesGetter.length === 0) {
      this.fetchingApi();
    }
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
        <div class="searchCont">
          <input
            type="search"
            placeholder="Search"
            class="inputSearch"
            :value="seachInputGetter"
            @input="changeSearchMain"
          />
          <MagnifyIcon />
        </div>
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
      <PulseLoader class="loader" v-if="!loadingOrNot" />
      <ul v-else class="unorderList">
        <Items
          v-for="item in searchFilterGetter"
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
      <h2 class="headWarn" v-if="searchFilterGetter.length === 0">
        Oops!👀. Not Finding the expected results?.Try typing something else.
      </h2>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
.loader {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.headWarn {
  text-align: center;
  margin-top: 60px;
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
  cursor: pointer;
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
  
  align-items: center;
  justify-content: space-between;
}
.contSelect {
  align-self: flex-end;
  cursor: pointer;
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
