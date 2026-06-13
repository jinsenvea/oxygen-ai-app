import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // Tab页面（由App.vue直接渲染）
  { path: '/', redirect: '/footprint' },
  { path: '/footprint', name: 'footprint', component: () => import('../components/Tab3GrowthJourney.vue') },
  { path: '/chat', name: 'chat', component: () => import('../components/Tab2Chat.vue') },
  { path: '/tools', name: 'tools', component: () => import('../components/Tab1Home.vue') },
  { path: '/nest', name: 'nest', component: () => import('../components/Tab4Profile.vue') },

  // 详情页（这些页面会覆盖tab bar，全屏展示）
  { path: '/scene/:id', name: 'scene', component: () => import('../views/SceneDetail.vue') },
  { path: '/service/:id', name: 'service', component: () => import('../views/ServiceDetail.vue') },
  { path: '/tool/:id', name: 'tool', component: () => import('../views/ToolPage.vue') },
  { path: '/order-list', name: 'order-list', component: () => import('../views/OrderList.vue') },
  { path: '/order-detail/:id', name: 'order-detail', component: () => import('../views/OrderDetail.vue') },
  { path: '/setting/:type', name: 'setting', component: () => import('../views/SettingPage.vue') },
  // 我的小筑 - 详情子页面
  { path: '/report-list', name: 'report-list', component: () => import('../views/ReportList.vue') },
  { path: '/nursing-report', name: 'nursing-report', component: () => import('../views/NursingReport.vue') },
  { path: '/meal-record', name: 'meal-record', component: () => import('../views/MealRecord.vue') },
  { path: '/body-record', name: 'body-record', component: () => import('../views/BodyRecord.vue') },
  { path: '/nanny-detail', name: 'nanny-detail', component: () => import('../views/NannyDetail.vue') },
  { path: '/album', name: 'album', component: () => import('../views/Album.vue') },
  // 时光足迹 - 详情子页面
  { path: '/badge-wall', name: 'badge-wall', component: () => import('../views/BadgeWall.vue') },
  { path: '/diary-detail', name: 'diary-detail', component: () => import('../views/DiaryDetail.vue') },
  { path: '/write-diary', name: 'write-diary', component: () => import('../views/WriteDiary.vue') },
  { path: '/milestone-list', name: 'milestone-list', component: () => import('../views/MilestoneList.vue') },
  // 氧宝陪伴 - 工具/功能子页面
  { path: '/tool/checklist', name: 'tool-checklist', component: () => import('../views/ToolChecklist.vue') },
  { path: '/tool/checkup', name: 'tool-checkup', component: () => import('../views/ToolCheckup.vue') },
  { path: '/tool/weight', name: 'tool-weight', component: () => import('../views/ToolWeight.vue') },
  { path: '/tool/contraction', name: 'tool-contraction', component: () => import('../views/ToolContraction.vue') },
  { path: '/tool/feeding', name: 'tool-feeding', component: () => import('../views/ToolFeeding.vue') },
  { path: '/course', name: 'course', component: () => import('../views/CourseDetail.vue') },
  { path: '/coupon', name: 'coupon', component: () => import('../views/CouponCenter.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
