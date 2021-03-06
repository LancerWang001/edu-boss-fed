import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // 留空表示默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advertSpace',
        component: () => import(/* webpackChunkName: 'advertSpace' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        props: true // 将路由路径参数映射到组件的 props 中
      },
      {
        path: '/course/create-edit/:courseId?',
        name: 'course-create-edit',
        component: () => import(
          /* webpackChunkName: 'course-create-edit' */ '@/views/course/createOrEdit.vue'
        ),
        props: true
      },
      {
        path: '/course/course-section/:courseId',
        name: 'course-section',
        component: () => import(
          /* webpackChunkName: 'course-section' */ '@/views/course/section.vue'
        ),
        props: true
      },
      {
        path: '/course/course-video/:courseId',
        name: 'course-video',
        component: () => import(
          /* webpackChunkName: 'course-video' */ '@/views/course/video.vue'
        ),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
// to : 要去哪里的路由信息
// from : 从哪里来的路由信息
// next : 通行的标志
router.beforeEach((to, from, next) => {
  // 校验登录状态
  if (to.matched.some(({ meta }) => meta.requiresAuth) && !store.state.user) {
    return next({
      name: 'login',
      query: {
        // 把登录成功的
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router
