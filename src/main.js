import { createApp, provide } from "vue";
import "./style.css";
import App from "./App.vue";

import $todos from "./data";

const app = createApp(App);

app.provide("$todos", $todos);
// app.config.globalProperties.$todos = $todos;

app.mount("#app");
