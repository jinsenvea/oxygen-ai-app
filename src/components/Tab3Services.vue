<template>
  <div class="tab-services fade-in">
    <div class="page-container">
      <!-- ===== 顶部AI推荐语 ===== -->
      <div class="recommend-header">
        <div class="recommend-bg"></div>
        <div class="recommend-content">
          <div class="recommend-title">爱购 · 为你优选</div>
          <div class="recommend-subtitle">{{ recommendText }}</div>
        </div>
      </div>

      <!-- ===== 分类标签栏 ===== -->
      <div class="category-bar">
        <div class="category-scroll">
          <div
            v-for="cat in categories"
            :key="cat.key"
            class="category-tag"
            :class="{ active: activeCategory === cat.key }"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </div>
        </div>
      </div>

      <!-- ===== 筛选标签 ===== -->
      <div class="filter-bar">
        <div
          v-for="filter in filters"
          :key="filter.key"
          class="filter-tag"
          :class="{ active: filter.active }"
          @click="toggleFilter(filter)"
        >
          {{ filter.label }}
          <span class="filter-arrow">▼</span>
        </div>
      </div>

      <!-- ===== 2列推荐卡片 ===== -->
      <div class="service-grid">
        <div
          v-for="service in filteredServices"
          :key="service.id"
          class="service-card"
          @click="onServiceClick(service)"
        >
          <!-- 图片区 -->
          <div class="card-image" :style="{ background: getCardBg(service.category) }">
            <div class="card-image-emoji">{{ getCardEmoji(service.category) }}</div>
            <div v-if="service.badge" class="card-badge">{{ service.badge }}</div>
          </div>

          <!-- 信息区 -->
          <div class="card-info">
            <div class="card-name">{{ service.name }}</div>
            <div class="card-desc">{{ service.desc }}</div>
            <div class="card-tags">
              <span v-for="(tag, idx) in service.tags.slice(0, 2)" :key="idx" class="tag-small">{{ tag }}</span>
            </div>
            <div class="card-bottom">
              <div class="card-rating">⭐ {{ service.rating }}</div>
              <div class="card-sales">已售{{ service.sales }}</div>
            </div>
            <div class="card-price-row">
              <span class="price" v-if="service.price > 0">¥{{ service.price.toLocaleString() }}</span>
              <span class="price" v-else style="color: #52C41A;">免费</span>
              <span v-if="service.originalPrice > service.price" class="original-price">¥{{ service.originalPrice.toLocaleString() }}</span>
            </div>
          </div>

          <!-- 按钮 -->
          <button class="btn-primary book-btn" @click.stop="onBook(service)">
            {{ service.price === 0 ? '立即预约' : '立即预约' }}
          </button>
        </div>
      </div>

      <div style="height: 16px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { serviceCategories, serviceList } from '../mock/data.js'

const activeCategory = ref('all')
const categories = serviceCategories

const filters = ref([
  { key: 'price', label: '价格', active: false },
  { key: 'type', label: '服务类型', active: false },
  { key: 'distance', label: '距离', active: false },
  { key: 'rating', label: '评分', active: false }
])

// AI推荐语
const recommendText = ref('为你推荐适合孕晚期的精选服务')

// 分类筛选
const filteredServices = computed(() => {
  if (activeCategory.value === 'all') return serviceList
  return serviceList.filter(s => s.category === activeCategory.value)
})

function toggleFilter(filter) {
  filter.active = !filter.active
  if (filter.active) {
    showToast(`${filter.label}筛选开发中`)
    filter.active = false
  }
}

function onServiceClick(service) {
  window.location.hash = `#/service/${service.id}`
}

function onBook(service) {
  showToast(`正在预约「${service.name}」`)
}

function getCardBg(category) {
  const map = {
    matron: 'linear-gradient(135deg, #FFF0F3, #FFE4E9)',
    month: 'linear-gradient(135deg, #F8E8FF, #E8D5FF)',
    recovery: 'linear-gradient(135deg, #FFF0F3, #FFE4E9)',
    pregnancy: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)'
  }
  return map[category] || '#FFF0F3'
}

function getCardEmoji(category) {
  const map = {
    matron: '🤱',
    month: '🏠',
    recovery: '💆',
    pregnancy: '🧘'
  }
  return map[category] || '🏥'
}
</script>

<style scoped>
.tab-services {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ===== 顶部推荐语 ===== */
.recommend-header {
  position: relative;
  padding: 50px 20px 20px;
  overflow: hidden;
}

.recommend-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #FFF0F3, #F8E8FF);
  border-radius: 0 0 30px 30px;
}

.recommend-content {
  position: relative;
  z-index: 1;
}

.recommend-title {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
}

.recommend-subtitle {
  font-size: 13px;
  color: #F8A8B8;
  font-weight: 500;
  cursor: pointer;
}

.recommend-subtitle:active {
  opacity: 0.7;
}

/* ===== 分类标签栏 ===== */
.category-bar {
  padding: 12px 16px 8px;
}

.category-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-tag {
  flex-shrink: 0;
  padding: 8px 18px;
  background: #F5F5F5;
  color: #666;
  font-size: 13px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;
  font-weight: 500;
}

.category-tag.active {
  background: linear-gradient(135deg, #F8A8B8, #E8889E);
  color: #fff;
  box-shadow: 0 2px 8px rgba(248,168,184,0.3);
}

.category-tag:active {
  transform: scale(0.95);
}

/* ===== 筛选标签 ===== */
.filter-bar {
  display: flex;
  justify-content: space-around;
  padding: 4px 16px 12px;
  border-bottom: 1px solid #F0F0F0;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.2s;
}

.filter-tag.active {
  color: #F8A8B8;
  background: #FFF0F3;
}

.filter-tag:active {
  background: #F5F5F5;
}

.filter-arrow {
  font-size: 8px;
}

/* ===== 2列推荐卡片 ===== */
.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px;
}

.service-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  flex-direction: column;
}

.service-card:active {
  transform: scale(0.97);
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

.card-image {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-image-emoji {
  font-size: 48px;
  opacity: 0.8;
}

.card-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  background: linear-gradient(135deg, #F8A8B8, #E8889E);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
}

.card-info {
  padding: 12px 12px 8px;
  flex: 1;
}

.card-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-size: 11px;
  color: #999;
  margin-bottom: 6px;
}

.card-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.tag-small {
  padding: 1px 6px;
  background: #FFF0F3;
  color: #F8A8B8;
  font-size: 10px;
  border-radius: 4px;
}

.card-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-rating {
  font-size: 11px;
  color: #FAAD14;
}

.card-sales {
  font-size: 10px;
  color: #bbb;
}

.card-price-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 4px;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #FF6B81;
}

.original-price {
  font-size: 11px;
  color: #ccc;
  text-decoration: line-through;
}

.book-btn {
  width: calc(100% - 24px);
  margin: 0 12px 12px;
  height: 32px;
  font-size: 12px;
}
</style>
