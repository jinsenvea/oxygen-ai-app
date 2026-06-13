<template>
  <div class="service-detail">
    <div class="detail-header">
      <div class="header-btn back-btn" @click="goBack">← 返回</div>
      <div class="header-title">服务详情</div>
      <div class="header-actions">
        <span class="action-btn" @click="showToast('已收藏 ❤️')">♡</span>
        <span class="action-btn" @click="showToast('分享')">↗</span>
      </div>
    </div>

    <div class="page-container">
      <!-- 服务图片 -->
      <div class="image-carousel">
        <div class="carousel-placeholder" :style="{ background: 'linear-gradient(135deg, #FFF0F3, #F8E8FF)' }">
          <span class="carousel-emoji">🤱</span>
        </div>
        <div class="carousel-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

      <!-- 服务信息 -->
      <div class="info-section">
        <div class="service-name">{{ detail.name }}</div>
        <div class="service-rating">
          <span class="stars">⭐ {{ detail.rating }}</span>
          <span class="divider">|</span>
          <span class="sales">已服务{{ detail.sales }}位宝妈</span>
        </div>
        <div class="service-tags">
          <span v-for="(tag, idx) in detail.tags" :key="idx" class="tag-item">{{ tag }}</span>
        </div>
      </div>

      <!-- 价格区 -->
      <div class="price-section">
        <span class="current-price">¥{{ detail.price.toLocaleString() }}</span>
        <span class="original-price">原价¥{{ detail.originalPrice.toLocaleString() }}</span>
        <span class="saving">省¥{{ (detail.originalPrice - detail.price).toLocaleString() }}</span>
      </div>

      <!-- 服务详情内容 -->
      <div class="section-card">
        <div class="section-header">
          <span class="section-title">📝 服务详情</span>
        </div>
        <div class="desc-content" v-html="detail.desc"></div>
      </div>

      <!-- FAQ -->
      <div class="section-card" v-if="detail.faq && detail.faq.length > 0">
        <div class="section-header">
          <span class="section-title">❓ 常见问题</span>
        </div>
        <div class="faq-list">
          <div
            v-for="(faq, idx) in detail.faq"
            :key="idx"
            class="faq-item"
            @click="toggleFaq(idx)"
          >
            <div class="faq-q">
              <span>Q{{ idx + 1 }}.</span>
              <span>{{ faq.q }}</span>
              <span class="faq-arrow" :class="{ open: activeFaq === idx }">▼</span>
            </div>
            <div v-if="activeFaq === idx" class="faq-a">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>

      <!-- 用户评价 -->
      <div class="section-card" v-if="detail.reviews">
        <div class="section-header">
          <span class="section-title">⭐ 用户评价</span>
        </div>
        <div class="review-list">
          <div v-for="(review, idx) in detail.reviews" :key="idx" class="review-item">
            <div class="review-user">
              <div class="review-avatar">{{ review.user[0] }}</div>
              <div class="review-name">{{ review.user }}</div>
              <div class="review-rating">★ {{ review.rating }}</div>
            </div>
            <div class="review-content">{{ review.content }}</div>
            <div class="review-date">{{ review.date }}</div>
          </div>
        </div>
      </div>

      <div style="height: 100px;"></div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <button class="btn-outline consultant-btn" @click="onConsultant">联系顾问</button>
      <button class="btn-primary book-btn" @click="onBook">立即预约</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast, showDialog } from 'vant'
import { serviceDetail } from '../mock/data.js'

const route = useRoute()
const detail = ref(serviceDetail)
const activeFaq = ref(null)

onMounted(() => {
  // 实际应用会根据route.params.id加载不同数据
})

function goBack() {
  window.history.back()
}

function toggleFaq(idx) {
  activeFaq.value = activeFaq.value === idx ? null : idx
}

function onConsultant() {
  showDialog({
    title: '联系顾问',
    message: '氧阁专业顾问将为您一对一解答疑问\n\n在线咨询：点击确认进入对话\n客服热线：400-800-8888',
    confirmButtonText: '在线咨询',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' }))
  }).catch(() => {})
}

function onBook() {
  showDialog({
    title: '📋 预约确认',
    message: `服务：${detail.value.name}\n价格：¥${detail.value.price.toLocaleString()}\n\n确认后将为您生成预约工单，顾问会尽快联系您确认具体时间。`,
    confirmButtonText: '确认预约',
    cancelButtonText: '再想想',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    showToast('✅ 预约已提交，工单号：ERPT-' + Date.now().toString(36).toUpperCase())
  }).catch(() => {})
}
</script>

<style scoped>
.service-detail {
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

.header-btn {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 4px 8px;
}

.back-btn { font-weight: 500; }

.header-title { font-size: 16px; font-weight: 600; }

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  font-size: 18px;
  cursor: pointer;
  color: #999;
  padding: 4px;
}

.action-btn:active { color: #F8A8B8; }

/* 轮播 */
.image-carousel {
  position: relative;
  height: 240px;
}

.carousel-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-emoji {
  font-size: 72px;
  opacity: 0.6;
}

.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0,0,0,0.15);
}

.dot.active {
  width: 18px;
  border-radius: 3px;
  background: #F8A8B8;
}

/* 服务信息 */
.info-section {
  background: #fff;
  padding: 16px;
}

.service-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.service-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.stars { color: #FAAD14; }

.divider { color: #eee; }

.service-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag-item {
  padding: 3px 10px;
  background: #FFF0F3;
  color: #F8A8B8;
  font-size: 12px;
  border-radius: 6px;
}

/* 价格区 */
.price-section {
  background: #fff;
  padding: 12px 16px 16px;
  display: flex;
  align-items: baseline;
  gap: 8px;
  border-top: 1px solid #F5F5F5;
}

.current-price {
  font-size: 24px;
  font-weight: 700;
  color: #FF6B81;
}

.original-price {
  font-size: 13px;
  color: #ccc;
  text-decoration: line-through;
}

.saving {
  font-size: 12px;
  color: #FF6B81;
  background: #FFF0F3;
  padding: 1px 8px;
  border-radius: 4px;
}

/* 通用卡片 */
.section-card {
  margin: 12px 16px 0;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 4px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 8px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
}

.desc-content {
  padding: 8px 16px 16px;
  font-size: 13px;
  color: #666;
  line-height: 1.8;
}

.desc-content :deep(h3) {
  font-size: 14px;
  color: #333;
  margin: 10px 0 6px;
}

.desc-content :deep(ul) {
  padding-left: 16px;
}

.desc-content :deep(li) {
  margin: 4px 0;
}

/* FAQ */
.faq-list {
  padding: 4px 16px 12px;
}

.faq-item {
  border-bottom: 1px solid #F5F5F5;
  cursor: pointer;
}

.faq-item:last-child { border: none; }

.faq-q {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.faq-arrow {
  margin-left: auto;
  font-size: 10px;
  color: #ccc;
  transition: transform 0.2s;
}

.faq-arrow.open {
  transform: rotate(180deg);
  color: #F8A8B8;
}

.faq-a {
  padding: 0 0 12px;
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

/* 评价 */
.review-list {
  padding: 4px 16px 12px;
}

.review-item {
  padding: 12px 0;
  border-bottom: 1px solid #F5F5F5;
}

.review-item:last-child { border: none; }

.review-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.review-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F8A8B8, #E0C3FC);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.review-name {
  font-size: 13px;
  font-weight: 500;
}

.review-rating {
  margin-left: auto;
  color: #FAAD14;
  font-size: 12px;
}

.review-content {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 4px;
}

.review-date {
  font-size: 11px;
  color: #bbb;
}

/* 底部操作栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 750px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(14px);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
  display: flex;
  gap: 12px;
  border-top: 1px solid #F0F0F0;
  z-index: 10;
}

.consultant-btn {
  flex: 1;
}

.book-btn {
  flex: 2;
}
</style>
