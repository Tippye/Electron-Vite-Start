import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {App} from "vue";
import Layout from "@/components/Layout/index.vue"

const staticRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'home',
        name: 'Home',
        alias: '/',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          affix: false,
          alwaysShow: true,
          canTo: true,
          hidden: true,
          noCache: true,
          noTagsView: false,
          title: '主页'
        }
      },{
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings/index.vue'),
        meta: {
          affix: false,
          alwaysShow: true,
          canTo: true,
          hidden: true,
          noCache: true,
          noTagsView: false,
          title: '设置'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRouterMap as RouteRecordRaw[]
})

router.beforeEach((to, _, next) => {
  if (to.matched.length === 0) {
    next({path: '/home'})
  } else next();
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router