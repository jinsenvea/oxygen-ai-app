<template>
  <div class="tab-home fade-in">
    <div class="page-container">
      <!-- ===== 顶部品牌区 ===== -->
      <div class="hero-section">
        <div class="hero-bg">
          <div class="hero-circle c1"></div>
          <div class="hero-circle c2"></div>
          <div class="hero-circle c3"></div>
        </div>
        <div class="hero-content">
          <div class="hero-avatar" @click="onOxygenTap">
            <div class="avatar-glow"></div>
            <div class="avatar-body"><span>🐣</span></div>
            <div class="avatar-ring"></div>
          </div>
          <div class="hero-text">
            <div class="hero-greeting">{{ greetingText }} <span class="hero-sparkle">✨</span></div>
            <div class="hero-week">{{ userInfo.pregnancyWeek }}</div>
            <div class="hero-saying">{{ dailySaying }}</div>
          </div>
        </div>
        <div class="hero-wave">
          <svg viewBox="0 0 375 30" preserveAspectRatio="none"><path d="M0,15 Q50,30 100,15 T200,15 T300,15 T375,15 V30 H0 Z" fill="#FFF8FA"/></svg>
        </div>
      </div>

      <!-- ===== 常用工具 ===== -->
      <div class="tools-section">
        <div class="tools-header">
          <span class="tools-title">🛠 常用工具</span>
          <span class="tools-subtitle">{{ userInfo.pregnancyWeek }} 必备</span>
        </div>
        <div class="tools-grid">
          <div v-for="(tool, i) in toolList" :key="i" class="tool-card" @click="goTool(tool.id)" :style="{ transitionDelay: i*0.03+'s' }">
            <div class="tool-icon" :style="{ background: tool.bg }">{{ tool.icon }}</div>
            <span class="tool-name">{{ tool.name }}</span>
            <span class="tool-desc">{{ tool.desc }}</span>
          </div>
        </div>
      </div>

      <!-- ===== 场景管家 ===== -->
      <div class="scene-section">
        <div class="scene-header">
          <span class="scene-title">🏠 场景管家</span>
          <span class="scene-link" @click="goToJourney">查看全部 ›</span>
        </div>
        <div class="scene-list">
          <div v-for="scene in scenes" :key="scene.id" class="scene-card" :style="{ background: scene.cardBg || scene.bgColor }" @click="onSceneClick(scene)">
            <div class="scene-emoji">{{ scene.icon }}</div>
            <div class="scene-name">{{ scene.title }}</div>
            <div class="scene-brief">{{ scene.subtitle }}</div>
            <div class="scene-footer">
              <div v-if="scene.status === 'active'" class="scene-tag active"><span class="tag-dot"></span>已开启</div>
              <button v-else class="scene-btn" @click.stop="onSceneActivate(scene)">去点亮 +</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 快捷入口 ===== -->
      <div class="quick-section">
        <div class="quick-header">
          <span class="quick-title">⚡ 快捷入口</span>
          <span class="quick-hint">点击即用</span>
        </div>
        <div class="quick-scroll">
          <div v-for="item in quickScenes" :key="item.id" class="quick-card" @click="onQuickSceneClick(item)">
            <div class="quick-icon" :style="{ background: item.bgLight || item.color+'22' }">{{ item.icon }}</div>
            <div class="quick-info">
              <span class="quick-name">{{ item.title }}</span>
              <span class="quick-desc">{{ item.desc }}</span>
            </div>
            <span class="quick-arrow">›</span>
          </div>
        </div>
      </div>

      <!-- ===== 运营活动 ===== -->
      <div class="activity-area">
        <div class="activity-card gift" @click="onGiftClaim">
          <div class="gift-deco"></div>
          <div class="gift-content">
            <div class="gift-tag">🎁 新人专享</div>
            <div class="gift-title">{{ activities[0].title }}</div>
            <div class="gift-desc">{{ activities[0].desc }}</div>
          </div>
          <div class="gift-btn-wrap">
            <button class="gift-cta" @click.stop="onGiftClaim">{{ activities[0].cta }}</button>
          </div>
        </div>
        <div class="activity-card course" @click="goCourse">
          <div class="course-label">{{ activities[1].title }}</div>
          <div v-for="(item, idx) in activities[1].items" :key="idx" class="course-row" @click.stop="onCourseClick(item)">
            <span class="course-dot"></span>
            <span class="course-name">{{ item }}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      <!-- ===== 每日Tips ===== -->
      <div class="tip-card" @click="onTipClick">
        <div class="tip-badge">💡</div>
        <div class="tip-content">{{ dailyTip.content }}</div>
        <svg class="tip-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>

      <div style="height:16px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast, showDialog } from 'vant'
import { userInfo, scenes, quickScenes, activities, dailyTip } from '../mock/data.js'

const sayings = ['今天也是元气满满的一天！','宝宝也在努力长大呢 💪','你笑起来，就是好天气 ☀️','每一天都是珍贵的孕期时光','要好好照顾自己哦 💕']
const dailySaying = ref(sayings[Math.floor(Math.random() * sayings.length)])

const hour = new Date().getHours()
const greetingText = computed(() => {
  if (hour < 6) return '夜深了，早点休息哦'
  if (hour < 9) return '早安，亲爱的孕妈妈'
  if (hour < 12) return '上午好，孕妈妈'
  if (hour < 14) return '中午好，记得吃午餐哦'
  if (hour < 18) return '下午好，孕妈妈'
  return '晚上好，今天过得怎么样'
})

const toolList = [
  { id:'checklist', icon:'📋', name:'待产清单', desc:'智能待产包', bg:'linear-gradient(135deg,#FFF0F3,#FFE4E9)' },
  { id:'checkup', icon:'🏥', name:'产检记录', desc:'产检日历+记录', bg:'linear-gradient(135deg,#E8F4FF,#D0ECFF)' },
  { id:'kick', icon:'👶', name:'胎动计数', desc:'胎动记录+曲线', bg:'linear-gradient(135deg,#FFF0F3,#FFE4E9)' },
  { id:'weight', icon:'⚖️', name:'体重管理', desc:'体重曲线+建议', bg:'linear-gradient(135deg,#F0F6FF,#E8F0FF)' },
  { id:'contraction', icon:'⏱️', name:'宫缩记录', desc:'宫缩频率记录', bg:'linear-gradient(135deg,#F8E8FF,#F0E6FF)' },
  { id:'feeding', icon:'🍼', name:'母乳记录', desc:'喂养频率记录', bg:'linear-gradient(135deg,#FFF8F0,#FFE8CC)' }
]

const toolRoutes = {
  checklist: '/tool/checklist', checkup: '/tool/checkup', kick: '/tool/kick',
  weight: '/tool/weight', contraction: '/tool/contraction', feeding: '/tool/feeding'
}
function goTool(id) { window.location.hash = toolRoutes[id] || '/tool/kick' }

function onOxygenTap() {
  showDialog({
    title: '🐣 嗨~ 我是氧宝！',
    message: '您的专属孕产AI私教\n\n💬 解答孕产疑问\n📋 解读产检报告\n🤱 预约月嫂服务\n📝 记录孕育日记\n\n有什么想聊的吗？',
    confirmButtonText: '去找氧宝聊天', cancelButtonText: '再逛逛',
    showCancelButton: true, confirmButtonColor: '#F8A8B8'
  }).then(() => goToChat()).catch(() => {})
}

function onSceneClick(scene) {
  window.location.hash = `#/scene/${scene.id}`
}

// 场景点亮 - 直接跳转场景详情页
function onSceneActivate(scene) {
  window.location.hash = `#/scene/${scene.id}`
}

function onQuickSceneClick(item) {
  switch(item.id) {
    case 1: showToast('📅 跳转产检预约'); setTimeout(() => goToChat(), 400); break
    case 2: showToast('🤱 跳转月嫂服务'); setTimeout(() => goToJourney(), 400); break
    case 3: window.location.hash = '#/coupon'; break
    case 4: window.location.hash = '#/tool/checklist'; break
  }
}

function goCourse() { window.location.hash = '#/course' }
function onCourseClick(course) {
  showDialog({ title: '📚 妈妈课堂', message: `即将打开课程：「${course}」\n\n跳转氧宝私语，AI为您详细讲解`, confirmButtonText: '去学习', confirmButtonColor: '#F8A8B8' }).then(() => goToChat()).catch(() => {})
}

function onGiftClaim() { window.location.hash = '#/coupon' }

function onTipClick() {
  showDialog({ title: '💡 ' + dailyTip.source, message: dailyTip.content + '\n\n需要氧宝为您详细讲解吗？', confirmButtonText: '去了解详情', cancelButtonText: '稍后再说', showCancelButton: true, confirmButtonColor: '#F8A8B8' }).then(() => goToChat()).catch(() => {})
}

function goToChat() { window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' })) }
function goToJourney() { window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'footprint' })) }
</script>

<style scoped>
.tab-home { height:100%; display:flex; flex-direction:column; background:#FFF8FA; }
.page-container { padding-bottom:110px; }

/* ===== 顶部品牌区 ===== */
.hero-section { position:relative; overflow:hidden; }
.hero-bg { position:absolute; inset:0; background:linear-gradient(135deg,#F8A8B8 0%,#E8C8F8 55%,#E0C3FC 100%); border-radius:0 0 40px 40px; }
.hero-circle { position:absolute; border-radius:50%; background:rgba(255,255,255,0.08); }
.c1 { width:260px; height:260px; top:-80px; right:-50px; }
.c2 { width:140px; height:140px; bottom:-30px; left:-20px; }
.c3 { width:80px; height:80px; top:30px; left:40%; }

.hero-content { position:relative; z-index:1; display:flex; align-items:center; padding:54px 20px 24px; gap:14px; }
.hero-avatar { position:relative; width:64px; height:64px; flex-shrink:0; cursor:pointer; }
.avatar-glow { position:absolute; inset:-8px; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,0.35),transparent 70%); animation:glowPulse 3s ease-in-out infinite; }
@keyframes glowPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
.avatar-body { width:64px; height:64px; border-radius:50%; background:linear-gradient(145deg,#fff,#FFF0F3); display:flex; align-items:center; justify-content:center; font-size:32px; position:relative; z-index:2; box-shadow:0 4px 16px rgba(248,168,184,0.3); }
.avatar-ring { position:absolute; inset:-3px; border-radius:50%; border:2px solid rgba(255,255,255,0.5); z-index:3; }

.hero-text { color:#fff; }
.hero-greeting { font-size:19px; font-weight:700; margin-bottom:3px; text-shadow:0 1px 4px rgba(0,0,0,0.08); }
.hero-sparkle { display:inline-block; animation:spark 1.8s ease-in-out infinite; }
@keyframes spark { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
.hero-week { font-size:12px; opacity:0.92; font-weight:500; }
.hero-saying { font-size:12px; opacity:0.78; margin-top:2px; }

.hero-wave { position:absolute; bottom:-2px; left:0; right:0; height:30px; z-index:2; }
.hero-wave svg { width:100%; height:100%; display:block; }

/* ===== 常用工具 ===== */
.tools-section { margin:1px 16px 0; position:relative; z-index:3; }
.tools-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding:0 4px; }
.tools-title { font-size:16px; font-weight:700; color:#333; }
.tools-subtitle { font-size:11px; color:#bbb; }
.tools-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.tool-card { display:flex; flex-direction:column; align-items:center; gap:5px; padding:16px 6px 12px; background:#fff; border-radius:16px; cursor:pointer; transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1); box-shadow:0 2px 12px rgba(248,168,184,0.08); border:1px solid rgba(248,168,184,0.04); }
.tool-card:active { transform:scale(0.92); box-shadow:0 1px 4px rgba(248,168,184,0.05); }
.tool-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; margin-bottom:2px; box-shadow:0 2px 8px rgba(0,0,0,0.03); }
.tool-name { font-size:13px; font-weight:600; color:#333; }
.tool-desc { font-size:9px; color:#bbb; }

/* ===== 场景管家 ===== */
.scene-section { margin:14px 16px 0; }
.scene-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; padding:0 4px; }
.scene-title { font-size:16px; font-weight:700; color:#333; }
.scene-link { font-size:11px; color:#bbb; cursor:pointer; transition:color 0.2s; }
.scene-link:active { color:#F8A8B8; }
.scene-list { display:flex; gap:10px; }
.scene-card { flex:1; border-radius:18px; padding:18px 12px 14px; text-align:center; cursor:pointer; transition:all 0.3s; display:flex; flex-direction:column; align-items:center; gap:5px; }
.scene-card:active { transform:scale(0.95); }
.scene-emoji { font-size:32px; margin-bottom:2px; }
.scene-name { font-size:14px; font-weight:700; color:#333; }
.scene-brief { font-size:10px; color:#999; line-height:1.3; }
.scene-footer { margin-top:6px; }
.scene-tag { display:flex; align-items:center; gap:4px; font-size:10px; color:#52C41A; font-weight:600; background:rgba(82,196,26,0.08); padding:3px 10px; border-radius:10px; }
.tag-dot { width:5px; height:5px; border-radius:50%; background:#52C41A; }
.scene-btn { font-size:10px; color:#fff; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; padding:5px 14px; border-radius:10px; cursor:pointer; font-weight:600; box-shadow:0 2px 8px rgba(248,168,184,0.25); transition:all 0.2s; }
.scene-btn:active { transform:scale(0.92); }

/* ===== 快捷入口 ===== */
.quick-section { margin:14px 16px 0; }
.quick-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; padding:0 4px; }
.quick-title { font-size:16px; font-weight:700; color:#333; }
.quick-hint { font-size:10px; color:#ccc; }
.quick-scroll { display:flex; gap:10px; overflow-x:auto; padding:0 0 6px; scrollbar-width:none; -webkit-overflow-scrolling:touch; }
.quick-scroll::-webkit-scrollbar { display:none; }
.quick-card { flex-shrink:0; display:flex; align-items:center; gap:10px; padding:12px 16px; background:#fff; border-radius:16px; cursor:pointer; transition:all 0.2s; box-shadow:0 2px 8px rgba(0,0,0,0.04); border:1px solid rgba(248,168,184,0.04); }
.quick-card:active { transform:scale(0.96); background:#FFF8FA; }
.quick-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
.quick-info { display:flex; flex-direction:column; }
.quick-name { font-size:14px; font-weight:600; color:#333; }
.quick-desc { font-size:10px; color:#bbb; margin-top:1px; }
.quick-arrow { color:#ddd; font-size:16px; margin-left:4px; }

/* ===== 运营活动 ===== */
.activity-area { margin:14px 16px 0; display:flex; flex-direction:column; gap:10px; }

.gift { position:relative; display:flex; align-items:center; justify-content:space-between; overflow:hidden; background:linear-gradient(135deg,#FFF0F3,#FFE4E9); border-radius:18px; padding:18px 18px 18px 20px; cursor:pointer; }
.gift:active { transform:scale(0.98); }
.gift-deco { position:absolute; top:-30px; right:-20px; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle,rgba(248,168,184,0.12),transparent); }
.gift-content { position:relative; }
.gift-tag { font-size:9px; color:#F8A8B8; background:rgba(248,168,184,0.12); padding:2px 8px; border-radius:4px; display:inline-block; margin-bottom:6px; font-weight:600; }
.gift-title { font-size:16px; font-weight:700; color:#333; margin-bottom:3px; }
.gift-desc { font-size:11px; color:#888; }
.gift-btn-wrap { position:relative; flex-shrink:0; }
.gift-cta { font-size:12px; color:#fff; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; padding:8px 18px; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 12px rgba(248,168,184,0.3); transition:all 0.2s; }
.gift-cta:active { transform:scale(0.92); }

.course { background:#fff; border-radius:18px; padding:16px 18px; cursor:pointer; }
.course:active { transform:scale(0.98); }
.course-label { font-size:14px; font-weight:700; color:#333; margin-bottom:10px; }
.course-row { display:flex; align-items:center; gap:8px; padding:7px 0; cursor:pointer; transition:color 0.2s; }
.course-row:active { color:#F8A8B8; }
.course-dot { width:5px; height:5px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E0C3FC); flex-shrink:0; }
.course-name { flex:1; font-size:12px; color:#666; }

/* ===== 每日Tips ===== */
.tip-card { margin:10px 16px 0; display:flex; align-items:center; gap:10px; padding:12px 16px; background:#fff; border-radius:14px; box-shadow:0 1px 6px rgba(0,0,0,0.04); cursor:pointer; transition:all 0.2s; border:1px solid rgba(248,168,184,0.04); }
.tip-card:active { transform:scale(0.98); }
.tip-badge { font-size:18px; flex-shrink:0; }
.tip-content { flex:1; font-size:12px; color:#888; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.tip-arrow { flex-shrink:0; }
</style>
