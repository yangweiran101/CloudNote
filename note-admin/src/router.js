import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./views/layout"),
      children: [
        {
          path: "",
          component: () =>
            import(/* webpackChunkName: "default" */ "./views/default")
        },
        {
          path: "/user/userList",
          component: () =>
            import(/* webpackChunkName: "userList" */ "./views/user/userList")
        },
        {
          path: "/news/addNews",
          component: () =>
            import(/* webpackChunkName: "addNews" */ "./views/news/addNews")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/login")
    }
  ]
})
