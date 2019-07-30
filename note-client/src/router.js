import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import Register from "./views/Register";
import Modify from "./views/Modify";
import Write from "./views/Write";
import Article from "./views/Article";
import ArticleList from "./views/ArticleList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/modify",
      name: "modify",
      component: Modify
    },
    {
      path: "/write",
      name: "write",
      component: Write
    },
    {
      path: "/article",
      name: "article",
      component: Article
    },
    {
      path: "/articlelist",
      name: "articlelist",
      component: ArticleList
    }
  ]
});
