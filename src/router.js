import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/user_module/user/Login'),
      hidden: true //表示不会主菜单的地址
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/errorpages_module/404'),
      hidden: true //表示不会主菜单的地址
    },
    //主页跑马灯
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/carousel',

      children: [
        {
          path: '/carousel',
          name: 'carousel',
          component: () => import('./views/api_module/Carousel')
        },
        //图表区域
        {
          path: '/echarts',
          name: 'echarts',
          component: () => import('./views/echarts_module/Echarts')
        },
        //用户信息
        {
          path: '/userlist',
          name: 'userlist',
          component: () => import('./views/user_module/user/UserList')
        },
        //公司信息
        {
          path: '/companyinfo',
          name: 'companyinfo',
          component: () => import('./views/organization_module/company/CompanyInfo')
        },
        //部门信息
        {
          path: '/departmentinfo',
          name: 'departmentinfo',
          component: () => import('./views/organization_module/department/DepartmentInfo')
        },
        //部门信息
        {
          path: '/pensonnelinfo',
          name: 'pensonnelinfo',
          component: () => import('./views/organization_module/pensonnel/PensonnelInfo')
        }
      ]

    },


    {
      path: '/register',
      name: 'register',
      component: () => import('./views/user_module/user/Register'),
      hidden: true //表示不会主菜单的地址

    },
    { path: '*', redirect: '/404', hidden: true } //不是以上地址直接跳到404
  ]
})
//挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //如果访问登录或者注册页面就放行
  if (to.path === '/' | to.path === '/register') return next()
  //从 sessionStorage 中取保存的 token 值
  const token = window.sessionStorage.getItem('token')
  //没有强制跳到登录页面
  if (!token) return next('/')
  //放行
  next()

})
export default router