<template>
  <div class="setting-page">
    <div class="detail-header">
      <div class="header-btn back-btn" @click="goBack">← 返回</div>
      <div class="header-title">{{ setting?.title || '设置' }}</div>
      <div class="header-btn"></div>
    </div>

    <div class="page-container">
      <!-- 账号设置 -->
      <template v-if="settingType === 'account'">
        <div class="setting-group">
          <div class="setting-field">
            <span class="field-label">头像</span>
            <div class="field-value">
              <div class="field-avatar">👩</div>
              <span class="field-arrow">&gt;</span>
            </div>
          </div>
          <div class="setting-field">
            <span class="field-label">昵称</span>
            <div class="field-value">
              <span>小笼包妈妈</span>
              <span class="field-arrow">&gt;</span>
            </div>
          </div>
          <div class="setting-field">
            <span class="field-label">手机号</span>
            <div class="field-value">
              <span>138****8888</span>
              <span class="field-arrow">&gt;</span>
            </div>
          </div>
          <div class="setting-field">
            <span class="field-label">微信绑定</span>
            <div class="field-value">
              <span>已绑定</span>
              <span class="field-arrow">&gt;</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 隐私管理 -->
      <template v-else-if="settingType === 'privacy'">
        <div class="setting-group">
          <div class="setting-switch">
            <div class="switch-info">
              <div class="switch-title">允许AI记住孕产信息</div>
              <div class="switch-desc">开启后，氧宝会根据您的孕周和健康数据提供个性化建议</div>
            </div>
            <div class="switch-toggle" :class="{ on: privacyOn }" @click="privacyOn = !privacyOn">
              <div class="toggle-thumb"></div>
            </div>
          </div>
          <div class="setting-field" @click="showToast('数据导出开发中')">
            <span class="field-label">导出个人数据</span>
            <span class="field-arrow">&gt;</span>
          </div>
          <div class="setting-field" @click="showToast('账号注销')" style="color: #FF4D4F;">
            <span class="field-label">注销账号</span>
            <span class="field-arrow">&gt;</span>
          </div>
        </div>
      </template>

      <!-- AI对话管理 -->
      <template v-else-if="settingType === 'ai'">
        <div class="setting-group">
          <div class="ai-stats">
            <div class="ai-stat-item">
              <span class="ai-stat-num">128</span>
              <span class="ai-stat-label">对话记录</span>
            </div>
            <div class="ai-stat-item">
              <span class="ai-stat-num">已开启</span>
              <span class="ai-stat-label">AI记忆</span>
            </div>
          </div>
          <div class="setting-field" @click="showToast('搜索功能')">
            <span class="field-label">🔍 搜索对话</span>
            <span class="field-arrow">&gt;</span>
          </div>
          <div class="setting-field" @click="showToast('对话已导出')">
            <span class="field-label">📥 导出对话为PDF</span>
            <span class="field-arrow">&gt;</span>
          </div>
          <div class="setting-field" @click="onClearAI" style="color: #FF4D4F;">
            <span class="field-label">🗑️ 清空所有对话记录</span>
            <span class="field-arrow">&gt;</span>
          </div>
        </div>
      </template>

      <!-- 关于 -->
      <template v-else-if="settingType === 'about'">
        <div class="about-section">
          <div class="about-logo">🐣</div>
          <div class="about-name">氧阁AI伴</div>
          <div class="about-version">版本 1.0.0</div>
          <div class="about-desc">基于AI对话的孕产全周期服务APP</div>
          <div class="about-links">
            <div class="about-link" @click="showToast('用户协议')">用户协议</div>
            <div class="about-link" @click="showToast('隐私政策')">隐私政策</div>
          </div>
        </div>
      </template>

      <!-- 其他/默认 -->
      <template v-else>
        <div class="placeholder-card">
          <div class="placeholder-icon">⚙️</div>
          <div class="placeholder-title">功能开发中</div>
        </div>
      </template>

      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showDialog, showToast } from 'vant'
import { settings } from '../mock/data.js'

const route = useRoute()
const settingType = route.params.type
const setting = computed(() => settings.find(s => s.type === settingType))
const privacyOn = ref(true)

function goBack() {
  window.history.back()
}

function onClearAI() {
  showDialog({
    title: '清空所有对话记录？',
    message: '此操作不可撤销，所有对话历史将被永久删除。',
    showCancelButton: true,
    confirmButtonText: '清空',
    confirmButtonColor: '#FF4D4F',
    cancelButtonText: '取消'
  }).then(() => {
    localStorage.removeItem('chatMessages')
    showToast('对话记录已清空')
  }).catch(() => {})
}
</script>

<style scoped>
.setting-page {
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

/* 设置分组 */
.setting-group {
  margin: 16px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
}

.setting-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #F5F5F5;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.setting-field:last-child { border: none; }

.field-value {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999;
  font-size: 13px;
}

.field-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F8A8B8, #E0C3FC);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.field-arrow { color: #ccc; }

/* 开关 */
.setting-switch {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #F5F5F5;
}

.switch-info { flex: 1; }

.switch-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}

.switch-desc {
  font-size: 12px;
  color: #bbb;
  line-height: 1.4;
}

.switch-toggle {
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background: #ddd;
  padding: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.switch-toggle.on {
  background: linear-gradient(135deg, #F8A8B8, #E8889E);
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transition: transform 0.3s;
}

.switch-toggle.on .toggle-thumb {
  transform: translateX(20px);
}

/* AI统计数据 */
.ai-stats {
  display: flex;
  padding: 20px 16px;
  gap: 16px;
}

.ai-stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
  background: #FFF8FA;
  border-radius: 12px;
}

.ai-stat-num {
  font-size: 22px;
  font-weight: 700;
  color: #F8A8B8;
}

.ai-stat-label {
  font-size: 12px;
  color: #999;
}

/* 关于页 */
.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px;
}

.about-logo {
  font-size: 64px;
  margin-bottom: 12px;
}

.about-name {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.about-version {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.about-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 24px;
}

.about-links {
  display: flex;
  gap: 24px;
}

.about-link {
  font-size: 13px;
  color: #F8A8B8;
  cursor: pointer;
  padding: 4px 12px;
}

.about-link:active {
  background: #FFF0F3;
  border-radius: 8px;
}

/* 占位 */
.placeholder-card {
  text-align: center;
  padding: 60px 16px;
}

.placeholder-icon { font-size: 48px; margin-bottom: 12px; }
.placeholder-title { font-size: 16px; color: #999; }
</style>
