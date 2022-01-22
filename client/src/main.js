import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins, faPen, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoins);
library.add(faPen);
library.add(faWallet);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
