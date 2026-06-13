<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">💪 身材变化</span>
      <button class="dp-action" @click="onRecord">＋记录</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🌸 你的身体正在创造生命，每一个变化都值得被温柔记录～</div>

      <!-- 当前数据卡 -->
      <div class="current-card">
        <div class="cc-phase">
          <span class="cc-dot"></span>
          当前 · 孕24周+3天
        </div>
        <div class="cc-grid">
          <div class="cc-item"><span class="cc-num">72.5</span><span class="cc-unit">kg</span><span class="cc-label">体重</span></div>
          <div class="cc-div"></div>
          <div class="cc-item"><span class="cc-num">96</span><span class="cc-unit">cm</span><span class="cc-label">腹围</span></div>
          <div class="cc-div"></div>
          <div class="cc-item"><span class="cc-num">96</span><span class="cc-unit">cm</span><span class="cc-label">臀围</span></div>
        </div>
      </div>

      <!-- 趋势图 -->
      <div class="chart-card" @click="showToast('📈 变化曲线')">
        <div class="chart-title">📈 体重变化趋势</div>
        <div class="chart-area">
          <div v-for="(w,i) in weights" :key="i" class="chart-bar-wrap">
            <div class="chart-bar" :style="{ height: w.h + 'px' }">
              <span class="chart-val">{{ w.v }}</span>
            </div>
            <span class="chart-label">{{ w.l }}</span>
          </div>
        </div>
      </div>

      <!-- 三阶段对比 -->
      <div class="timeline-compare">
        <div class="tl-title">📊 产前 vs 现在 vs 目标</div>
        <div class="tl-row" v-for="(r,i) in compareData" :key="i">
          <span class="tl-label">{{ r.label }}</span>
          <span class="tl-before">{{ r.before }}</span>
          <span class="tl-arrow">→</span>
          <span class="tl-current">{{ r.current }}</span>
          <span class="tl-arrow">→</span>
          <span class="tl-target">{{ r.target }}</span>
        </div>
      </div>

      <!-- 修复建议 -->
      <div class="advice-card" @click="onPostpartum">
        <span class="ad-icon">💪</span>
        <div class="ad-info">
          <span class="ad-title">产后修复建议</span>
          <span class="ad-text">产后42天开始修复效果最佳，氧宝帮你定制方案</span>
        </div>
        <span class="ad-arrow">›</span>
      </div>

      <button class="view-all-btn" @click="onRecord">📝 记录新数据</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
const weights = ref([
  { v:'58', h:60, l:'孕前' },{ v:'62', h:80, l:'12周' },{ v:'65', h:90, l:'16周' },
  { v:'68', h:100, l:'20周' },{ v:'72.5', h:120, l:'24周' },{ v:'-', h:30, l:'28周' }
])
const compareData = ref([
  { label:'体重', before:'58.0', current:'72.5', target:'60.0' },
  { label:'腰/腹围', before:'68cm', current:'96cm', target:'72cm' },
  { label:'臀围', before:'90cm', current:'96cm', target:'92cm' }
])
function goBack(){window.history.back()}
function onRecord(){
  showDialog({ title:'📝 记录身体数据', message:'准备好体重秤和软尺 📏\n\n需要记录：\n⚖️ 当前体重\n📏 腹围/腰围\n📏 臀围\n\n氧宝会自动生成变化曲线 📈', confirmButtonText:'开始记录', cancelButtonText:'稍后', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(() => showToast('📝 请准备好数据～')).catch(() => {})
}
function onPostpartum(){
  showDialog({ title:'💪 产后修复方案', message:'等你分娩后，氧宝为你定制专属修复方案：\n\n1️⃣ 盆底肌修复（产后42天开始）\n2️⃣ 腹直肌分离修复（产后2个月）\n3️⃣ 产后体态管理（产后3个月）\n\n现在好好享受孕期，修复的事交给氧宝 💕', confirmButtonText:'好的，知道了', confirmButtonColor:'#F8A8B8' })
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.current-card { background:linear-gradient(135deg,#F8A8B8,#E0C3FC); border-radius:18px; padding:18px; color:#fff; margin-bottom:14px; }
.cc-phase { display:flex; align-items:center; gap:6px; font-size:13px; opacity:0.9; margin-bottom:14px; }
.cc-dot { width:8px; height:8px; border-radius:50%; background:#fff; }
.cc-grid { display:flex; align-items:center; }
.cc-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:1px; }
.cc-num { font-size:32px; font-weight:700; line-height:1; }
.cc-unit { font-size:12px; opacity:0.7; }
.cc-label { font-size:11px; opacity:0.7; }
.cc-div { width:1px; height:30px; background:rgba(255,255,255,0.2); }
.chart-card { background:#fff; border-radius:16px; padding:16px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); cursor:pointer; }
.chart-title { font-size:14px; font-weight:600; color:#333; margin-bottom:14px; }
.chart-area { display:flex; align-items:flex-end; gap:6px; height:140px; padding-bottom:20px; }
.chart-bar-wrap { flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end; }
.chart-bar { width:100%; max-width:36px; background:linear-gradient(180deg,#F8A8B8,#E0C3FC); border-radius:6px 6px 2px 2px; position:relative; min-height:6px; display:flex; align-items:flex-start; justify-content:center; padding-top:4px; }
.chart-val { font-size:9px; color:#fff; font-weight:600; }
.chart-label { font-size:9px; color:#999; margin-top:4px; }
.timeline-compare { background:#fff; border-radius:16px; padding:16px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.tl-title { font-size:14px; font-weight:600; color:#333; margin-bottom:10px; }
.tl-row { display:flex; align-items:center; gap:4px; padding:6px 0; font-size:13px; }
.tl-label { width:56px; color:#999; flex-shrink:0; }
.tl-before { flex:1; text-align:center; color:#bbb; }
.tl-arrow { color:#ddd; font-size:10px; }
.tl-current { flex:1; text-align:center; color:#F8A8B8; font-weight:700; }
.tl-target { flex:1; text-align:center; color:#52C41A; font-weight:500; }
.advice-card { display:flex; align-items:center; gap:10px; padding:12px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; cursor:pointer; margin-bottom:12px; }
.advice-card:active { opacity:0.7; }
.ad-icon { font-size:24px; }
.ad-info { flex:1; }
.ad-title { font-size:13px; font-weight:600; color:#E8889E; display:block; }
.ad-text { font-size:12px; color:#888; margin-top:2px; display:block; }
.ad-arrow { color:#ccc; font-size:14px; }
.view-all-btn { width:100%; padding:14px; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; border-radius:12px; font-size:14px; color:#fff; font-weight:500; cursor:pointer; }
</style>
