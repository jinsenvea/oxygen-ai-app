<template>
  <div class="app-container">
    <!-- Tab内容区（在首页/chat/services/profile时显示） -->
    <template v-if="!isDetailPage">
      <keep-alive>
        <component :is="currentTab" :key="activeTab" />
      </keep-alive>
    </template>

    <!-- 详情页（通过router-view渲染） -->
    <router-view v-else />

    <!-- 底部 TabBar（详情页隐藏） -->
    <div v-if="!isDetailPage" class="tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        <div class="tab-icon" v-html="tab.icon"></div>
        <span class="tab-label">{{ tab.label }}</span>
        <div v-if="tab.badge" class="tab-badge">{{ tab.badge }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, markRaw, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TabFootprint from './components/Tab3GrowthJourney.vue'
import TabChat from './components/Tab2Chat.vue'
TabFootprint.displayName = 'TabFootprint'
import TabTools from './components/Tab1Home.vue'
import TabNest from './components/Tab4Profile.vue'

const route = useRoute()
const router = useRouter()
const activeTab = ref('footprint')

const tabs = [
  {
    key: 'footprint',
    label: '时光足迹',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.3"/><path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 22V7" stroke="currentColor" stroke-width="2" fill="none"/></svg>`
  },
  {
    key: 'chat',
    label: '氧宝私语',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor"/><circle cx="8" cy="10" r="1.5" fill="currentColor"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/><circle cx="16" cy="10" r="1.5" fill="currentColor"/></svg>`
  },
  {
    key: 'tools',
    label: '氧宝陪伴',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C7.58 3 4 6.58 4 11v5c0 1.1.9 2 2 2h1v-7c0-2.76 2.24-5 5-5s5 2.24 5 5v7h1c1.1 0 2-.9 2-2v-5c0-4.42-3.58-8-8-8z" fill="currentColor"/><path d="M12 12c-1.66 0-3 1.34-3 3v3c0 1.66 1.34 3 3 3s3-1.34 3-3v-3c0-1.66-1.34-3-3-3z" fill="currentColor"/></svg>`
  },
  {
    key: 'nest',
    label: '我的小筑',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L3 12h3v7h6v-5h4v5h6v-7h3L12 3z" fill="currentColor" opacity="0.3"/><path d="M12 21v-5M7 12l5-5 5 5" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`
  },
]

const tabComponents = {
  footprint: markRaw(TabFootprint),
  chat: markRaw(TabChat),
  tools: markRaw(TabTools),
  nest: markRaw(TabNest)
}

const currentTab = shallowRef(tabComponents.footprint)

// 判断是否在详情页（非tab路由）
const detailRoutes = ['scene', 'service', 'tool', 'order-list', 'order-detail', 'setting', 'report-list', 'nursing-report', 'meal-record', 'body-record', 'nanny-detail', 'album', 'badge-wall', 'diary-detail', 'write-diary', 'milestone-list', 'course', 'coupon']
const isDetailPage = computed(() => {
  const name = route.name
  return detailRoutes.some(r => name === r || name?.startsWith(r))
})

function switchTab(key) {
  activeTab.value = key
  currentTab.value = tabComponents[key]
  // 确保URL在根路径
  if (window.location.hash) {
    router.push('/')
  }
}

// 监听路由变化，检测是否为详情页
watch(() => route.path, (path) => {
  // 如果回到根路径，需要显示tab
})

// 监听跨Tab跳转事件
if (typeof window !== 'undefined') {
  window.addEventListener('switch-tab', (e) => {
    switchTab(e.detail)
  })
}
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  max-width: 750px;
  margin: 0 auto;
  background: #FFF8FA;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 750px;
  height: 98px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom, 0);
  z-index: 1000;
}

.tab-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s;
}

.tab-item:active {
  transform: scale(0.92);
}

.tab-icon {
  width: 24px;
  height: 24px;
  color: #999;
  transition: color 0.3s;
}

.tab-item.active .tab-icon {
  color: #F8A8B8;
}

.tab-label {
  font-size: 10px;
  color: #999;
  transition: color 0.3s;
}

.tab-item.active .tab-label {
  color: #F8A8B8;
  font-weight: 600;
}

.tab-badge {
  position: absolute;
  top: 2px;
  right: 4px;
  background: #FF6B81;
  color: #fff;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
