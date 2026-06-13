<template>
  <div class="order-list-page">
    <div class="detail-header">
      <div class="header-btn back-btn" @click="goBack">← 返回</div>
      <div class="header-title">我的预约</div>
      <div class="header-btn"></div>
    </div>

    <!-- Tab切换 -->
    <div class="order-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="order-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="page-container">
      <div v-for="(order, idx) in filteredOrders" :key="idx" class="order-card">
        <div class="order-header">
          <span class="order-service">{{ order.service }}</span>
          <span class="order-status" :class="'status-' + order.status">{{ order.statusText }}</span>
        </div>
        <div class="order-body">
          <div class="order-row"><span>时间：</span><span>{{ order.time }}</span></div>
          <div class="order-row"><span>门店：</span><span>{{ order.store }}</span></div>
          <div class="order-row"><span>单号：</span><span>{{ order.id }}</span></div>
        </div>
        <div class="order-actions">
          <button class="btn-outline small">查看详情</button>
          <button v-if="order.status === 'pending'" class="btn-outline small" style="border-color: #FF6B81; color: #FF6B81;">取消预约</button>
        </div>
      </div>

      <div v-if="filteredOrders.length === 0" class="empty-state">
        <span class="empty-icon">📋</span>
        <span class="empty-text">暂无{{ activeTab === 'all' ? '' : activeTab === 'pending' ? '待确认' : activeTab === 'active' ? '进行中' : '已完成' }}订单</span>
      </div>

      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待确认' },
  { key: 'active', label: '进行中' },
  { key: 'done', label: '已完成' }
]

const activeTab = ref('all')

const orders = [
  { id: 'ERPT-20260615-0832', service: '月嫂见面会 · 天河店', time: '2026/06/15 10:00', store: '氧阁·天河店', status: 'pending', statusText: '⏳ 待确认' },
  { id: 'ERPT-20260610-0721', service: '产康体验 · 盆底肌修复', time: '2026/06/12 14:00', store: '氧阁·海珠店', status: 'active', statusText: '🟢 已确认' },
  { id: 'ERPT-20260601-0618', service: '孕期按摩 · 3次套餐', time: '2026/06/01-06/15', store: '氧阁·天河店', status: 'done', statusText: '✅ 已完成' },
  { id: 'ERPT-20260528-0542', service: '月嫂咨询 · 免费', time: '2026/05/28 15:00', store: '线上面试', status: 'done', statusText: '✅ 已完成' }
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders
  return orders.filter(o => o.status === activeTab.value)
})

function goBack() {
  window.history.back()
}
</script>

<style scoped>
.order-list-page {
  height: 100vh;
  background: #FFF8FA;
  display: flex;
  flex-direction: column;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 16px 12px;
  background: #fff;
  flex-shrink: 0;
}

.header-btn { font-size: 14px; color: #333; cursor: pointer; padding: 4px 8px; }
.back-btn { font-weight: 500; }
.header-title { font-size: 16px; font-weight: 600; }

/* Tab切换 */
.order-tabs {
  display: flex;
  background: #fff;
  padding: 0 16px;
  border-bottom: 1px solid #F0F0F0;
  flex-shrink: 0;
}

.order-tab {
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.order-tab.active {
  color: #F8A8B8;
  font-weight: 600;
}

.order-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2.5px;
  background: #F8A8B8;
  border-radius: 2px;
}

/* 订单卡片 */
.order-card {
  margin: 12px 16px 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px 0;
}

.order-service {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.order-body {
  padding: 10px 16px 8px;
}

.order-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 3px 0;
  color: #333;
}

.order-row span:first-child { color: #999; }

.order-actions {
  display: flex;
  gap: 8px;
  padding: 8px 16px 14px;
  border-top: 1px solid #F5F5F5;
}

.status-pending { color: #FAAD14; }
.status-active { color: #52C41A; }
.status-done { color: #999; }

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  gap: 12px;
}

.empty-icon {
  font-size: 48px;
  opacity: 0.4;
}

.empty-text {
  font-size: 14px;
  color: #bbb;
}
</style>
