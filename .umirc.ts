import { defineConfig } from "umi";
import {componentStatus} from "@iconify/utils/lib/emoji/test/parse";

export default defineConfig({
  routes: [

    // { path: "/docs", component: "docs" },
    // { path: "/ products", component: "products"},
    { path: "/", component: "index",layout: false},
    { path: "/register" , component: "register",layout: false },
    { path: "/FxDb", component: "FxDb"},
    { path: "/CoinDb", component: "CoinDb"},
    { path:"/CoinDetial", component: "CoinDetial"},
    { path:"/FxDetial",component: "FxDetial"}
  ],
  npmClient: 'npm',
});
