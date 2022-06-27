import { createStore } from "vuex";
// Create a new store instance.
const store = createStore({
  state() {
    return {
      allMovies: [],
      isLoading: true,
      searchInput: "",
    };
  },
  mutations: {
    fetchingMutations: (state, data) => (state.allMovies = data),
    addingtoFavMutations: (state, data) => {
      console.log("state", state.allMovies);
      state.allMovies = state.allMovies.map((each) => {
        if (each.id == data) {
          return { ...each, marked: !each.marked };
        } else {
          return each;
        }
      });
      console.log("final", state.allMovies);
    },
    sortingBasedOnRatingMutation: (state) => {
      state.allMovies.sort((a, b) => {
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
    },
    sortingBasedOnRatingMutationHigh: (state) => {
      state.allMovies.sort((a, b) => {
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
    },
    loadingTrue: (state) => (state.isLoading = !state.isLoading),
    loadingFalse: (state) => (state.isLoading = !state.isLoading),
    changeSearchMutation: (state, data) => {
      state.searchInput = data;
    },
  },
  actions: {
    async fetchingApi() {
      this.commit("loadingTrue");
      const apiUrl =
        "https://api.themoviedb.org/3/movie/popular?api_key=919d1c9f740208335620061fe5b28c0f&language=en-US&page=1";
      const res = await fetch(apiUrl);
      const data = await res.json();
      const mapping = data.results.map((each) => ({ ...each, marked: false }));
      this.commit("loadingFalse");
      this.commit("fetchingMutations", mapping);
      console.log("created", mapping);
    },
    addingFavouritesAction(context, data) {
      console.log("idof", data.id);
      context.commit("addingtoFavMutations", data.id);
    },
    changeSearch(event, payload) {
      console.log(payload, "sraech");
      this.commit("changeSearchMutation", payload);
    },
    sortingBasedOnRatingAction() {
      this.commit("sortingBasedOnRatingMutation");
    },
    sortingBasedOnRatingActionHigh() {
      this.commit("sortingBasedOnRatingMutationHigh");
    },
  },
  getters: {
    allMoviesGetter: (state) => state.allMovies,
    favoriteMovies: (state) => state.allMovies.filter((each) => each.marked),
    loadingOrNot: (state) => state.isLoading,
    seachInputGetter: (state) => state.searchInput,
    searchFilterGetter: (state) =>
      state.allMovies.filter((each) =>
        each.title.toLowerCase().includes(state.searchInput)
      ),
  },
});

export default store;
