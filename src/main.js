import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = createApp(App);

const firebaseConfig = {
  apiKey: "AIzaSyDngQsrhVB1CkxNo8mY1QRcETZ641t0Q24",
  authDomain: "vue-authentication-practice.firebaseapp.com",
  projectId: "vue-authentication-practice",
  storageBucket: "vue-authentication-practice.appspot.com",
  messagingSenderId: "803114338999",
  appId: "1:803114338999:web:5c85b7dbc8c94e88749b32",
};

initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

app.use(router);
app.use(store);
app.mount("#app");


export { auth, db, storage };