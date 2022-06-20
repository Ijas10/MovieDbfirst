/* eslint-disable no-undef */
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      favMovies: [],
      allMovies: [],
    };
  },
  mutations: {
    addingFavouritesMutations: function (state, data) {
      const mapping = state.allMovies.map(function (each) {
        if (each.id === data) {
          return { ...each, marked: true };
        }
        return each;
      });
      console.log("after adding to fav",mapping)
      state.allMovies = mapping;
    },
    fetchingMutations: (state, data) => (state.allMovies = data),
  },
  actions: {
    async fetchingApi() {
      const apiUrl =
        "https://api.themoviedb.org/3/movie/popular?api_key=919d1c9f740208335620061fe5b28c0f&language=en-US&page=1";
      const res = await fetch(apiUrl);
      const data = await res.json();
      const mapping = data.results.map((each) => ({ ...each, marked: false }));
      this.commit("fetchingMutations", mapping);
      console.log("created", mapping);
    },

    fetchingAddedDetails(id) {
      // console.log("id",id)
      // const filterNum = this.state.allMovies.find(each => each.id==="id")
      // console.log("filterNum:", filterNum)
      // const mapping = this.state.allMovies.map(function (each) {
      //   if (each.id === id) {
      //     return { ...each, "marked": true };
      //   }
      //   return each;
      // });
      this.commit("addingFavouritesMutations", id);
    },
  },
  getters: {
    allMoviesGetter: (state) => state.allMovies,
  },
});

export default store;
