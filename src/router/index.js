import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/tabbar/Home.vue";
import Layout from "../views/layout/Index.vue";

Vue.use(VueRouter);

const routes = [
  // 配置路由规则
  { path: "/", redirect: "/home" },
  // tabbar 路由
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "/",
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
        meta: { requireAuth: true },
        component: () =>
          import(/* webpackChunkName: "cart" */ "../views/tabbar/Cart.vue")
      },
      {
        path: "/member",
        name: "member",
        meta: { requireAuth: true },
        component: () =>
          import(/* webpackChunkName: "member" */ "../views/tabbar/Member.vue")
      },
      {
        path: "/cart/pay/:arr",
        props: true,
        name: "pay",
        meta: { requireAuth: true },
        component: () =>
          import(/* webpackChunkName: "pay" */ "../views/cart/Pay.vue")
      }
    ]
  },
  // 个人中心相关路由
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
  },
  // 登录注册相关路由
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/login/Register.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue")
  },
  {
    path: "/codelogin",
    name: "codelogin",
    component: () =>
      import(/* webpackChunkName: "codelogin" */ "../views/login/CodeLogin.vue")
  },
  {
    path: "/forgetpwd",
    name: "forgetpwd",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/login/Forgetpwd.vue")
  },
  {
    path: "/login/pawreset",
    name: "pawreset",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/login/pawreset.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     const token = window.localStorage.getItem("token");
//     if (token) {
//       next();
//     } else {
//       next({
//         path: "/login/login",
//         query: { redirect: to.fullPath }
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
