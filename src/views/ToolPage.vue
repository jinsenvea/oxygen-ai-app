<template>
  <div class="tool-page">
    <div class="detail-header">
      <div class="header-btn back-btn" @click="goBack">← 返回</div>
      <div class="header-title">{{ tool.title }}</div>
      <div class="header-btn" @click="showToast('记录已保存')">保存</div>
    </div>

    <div class="page-container">
      <!-- 胎动计数工具 -->
      <template v-if="toolId === 'kick'">
        <!-- 今日总结 -->
        <div class="summary-card">
          <div class="summary-header">今日胎动</div>
          <div class="summary-num">{{ kickCount }} <span class="unit">次</span></div>
          <div class="summary-info">活跃时段：09:00-11:00</div>
          <div class="summary-status">状态：正常 ✅</div>
        </div>

        <!-- 胎动趋势 -->
        <div class="section-card">
          <div class="section-header">
            <span class="section-title">📈 胎动趋势</span>
          </div>
          <div class="chart-area">
            <div class="chart-bars">
              <div v-for="(v, idx) in weeklyData" :key="idx" class="chart-bar-wrap">
                <div class="chart-bar" :style="{ height: v * 2 + 'px' }"></div>
              </div>
            </div>
            <div class="chart-labels">
              <span v-for="d in ['一','二','三','四','五','六','日']" :key="d">{{ d }}</span>
            </div>
          </div>
        </div>

        <!-- 计数区 -->
        <div class="section-card kick-counter">
          <div class="counter-display">
            <div class="counter-timer">{{ timerDisplay }}</div>
            <div class="counter-num">{{ kickSession }} 次</div>
          </div>
          <div class="counter-actions">
            <button class="btn-primary" @click="countKick" :disabled="!isCounting">
              🦶 踢了一下!
            </button>
          </div>
          <div class="counter-controls">
            <button class="btn-outline small" @click="startKickCount" v-if="!isCounting">
              开始计数
            </button>
            <button class="btn-outline small" @click="stopKickCount" v-else>
              完成计数
            </button>
            <button class="btn-outline small" style="border-color: #FF6B81; color: #FF6B81;" @click="resetKickCount">
              重置
            </button>
          </div>
        </div>

        <div class="analysis-btn" @click="goToChat">
          <span>🤖 智能分析 → 跳转对话</span>
        </div>
      </template>

      <!-- 其他工具占位 -->
      <template v-else>
        <div class="placeholder-card">
          <div class="placeholder-icon">🛠️</div>
          <div class="placeholder-title">「{{ tool.title }}」即将上线</div>
          <div class="placeholder-desc">功能开发中，敬请期待！</div>
        </div>
      </template>

      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import { tools } from '../mock/data.js'

const route = useRoute()
const toolId = route.params.id
const tool = ref(tools.find(t => t.id === toolId) || { title: '工具', desc: '' })

// 胎动计数
const kickCount = ref(8)
const kickSession = ref(0)
const isCounting = ref(false)
const timerSeconds = ref(0)
let timerInterval = null
const weeklyData = [8, 12, 15, 10, 14, 18, 8] // 模拟周数据

const timerDisplay = computed(() => {
  const m = Math.floor(timerSeconds.value / 60)
  const s = timerSeconds.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function goBack() {
  window.history.back()
}

function countKick() {
  if (!isCounting) return
  kickSession.value++
  kickCount.value++
  showToast(`第 ${kickSession.value} 次胎动记录 ✓`)
}

function startKickCount() {
  isCounting.value = true
  kickSession.value = 0
  timerSeconds.value = 0
  timerInterval = setInterval(() => {
    timerSeconds.value++
  }, 1000)
}

function stopKickCount() {
  isCounting.value = false
  clearInterval(timerInterval)
  showToast(`本次计数完成：${kickSession.value} 次，用时 ${timerDisplay.value}`)
}

function resetKickCount() {
  isCounting.value = false
  clearInterval(timerInterval)
  kickSession.value = 0
  timerSeconds.value = 0
}

function goToChat() {
  window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' }))
}

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<style scoped>
.tool-page {
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

/* 今日总结 */
.summary-card {
  margin: 16px;
  background: linear-gradient(135deg, #F8A8B8, #E0C3FC);
  border-radius: 20px;
  padding: 20px;
  color: #fff;
  text-align: center;
}

.summary-header {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 6px;
}

.summary-num {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 4px;
}

.unit {
  font-size: 18px;
  font-weight: 400;
}

.summary-info {
  font-size: 13px;
  opacity: 0.85;
  margin-bottom: 2px;
}

.summary-status {
  font-size: 13px;
  opacity: 0.85;
}

/* 通用卡片 */
.section-card {
  margin: 0 16px 12px;
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

/* 图表 */
.chart-area {
  padding: 8px 16px 16px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100px;
  margin-bottom: 8px;
}

.chart-bar-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
}

.chart-bar {
  width: 24px;
  background: linear-gradient(180deg, #F8A8B8, #E0C3FC);
  border-radius: 12px 12px 4px 4px;
  transition: height 0.3s;
  min-height: 4px;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  font-size: 11px;
  color: #999;
}

/* 计数器 */
.kick-counter {
  text-align: center;
}

.counter-display {
  padding: 20px 16px 12px;
}

.counter-timer {
  font-size: 36px;
  font-weight: 300;
  color: #333;
  font-variant-numeric: tabular-nums;
}

.counter-num {
  font-size: 14px;
  color: #999;
  margin-top: 4px;
}

.counter-actions {
  padding: 0 16px 12px;
}

.counter-actions .btn-primary {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 24px;
}

.counter-actions .btn-primary:disabled {
  opacity: 0.4;
}

.counter-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 0 16px 16px;
}

.analysis-btn {
  margin: 4px 16px 0;
  padding: 14px;
  background: linear-gradient(135deg, #F8A8B8, #E0C3FC);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.analysis-btn:active {
  transform: scale(0.97);
}

/* 占位卡片 */
.placeholder-card {
  margin: 60px 16px;
  text-align: center;
}

.placeholder-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.placeholder-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.placeholder-desc {
  font-size: 14px;
  color: #999;
}
</style>
