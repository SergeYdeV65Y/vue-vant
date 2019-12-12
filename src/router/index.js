import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/tabbar/Home.vue";

Vue.use(VueRouter);

const routes = [
  // 配置路由规则
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/search",
    name: "search",
    // route level code-splitting
    // this generates a separate chunk (search.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/tabbar/Search.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(/* webpackChunkName: "cart" */ "../views/tabbar/Cart.vue")
  },
  {
    path: "/member",
    name: "member",
    component: () =>
      import(/* webpackChunkName: "member" */ "../views/tabbar/Member.vue")
  },
  {
    path: "/member/account",
    name: "account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/member/Account.vue")
  },
  {
    path: "/member/address",
    name: "address",
    component: () =>
      import(/* webpackChunkName: "address" */ "../views/member/Address.vue")
  },
  {
    path: "/member/addressadd",
    name: "addressadd",
    component: () =>
      import(
        /* webpackChunkName: "addressadd" */ "../views/member/AddressEdit.vue"
      )
  },
  {
    path: "/member/addressedit/:id",
    props: true,
    name: "addressedit",
    component: () =>
      import(
        /* webpackChunkName: "addressedit" */ "../views/member/AddressEdit.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
