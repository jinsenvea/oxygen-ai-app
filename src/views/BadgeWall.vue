<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">🎖️ 我的勋章墙</span>
      <button class="dp-action" style="visibility:hidden">　</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🎉 你已经获得了 <strong>3</strong> 枚勋章，每一次打卡都是成长的见证！</div>

      <div class="badge-stats">
        <div class="bs-item"><span class="bs-num">3</span><span class="bs-label">已获得</span></div>
        <div class="bs-div"></div>
        <div class="bs-item"><span class="bs-num">12</span><span class="bs-label">总勋章</span></div>
        <div class="bs-div"></div>
        <div class="bs-item"><span class="bs-num">25%</span><span class="bs-label">收集进度</span></div>
      </div>

      <!-- 已获得 -->
      <div class="section-title">🏆 已获得勋章</div>
      <div class="badge-grid">
        <div v-for="(b, i) in earnedBadges" :key="i" class="badge-card" @click="onBadgeClick(b)">
          <div class="badge-icon">{{ b.icon }}</div>
          <div class="badge-name">{{ b.name }}</div>
          <div class="badge-date">{{ b.date }}</div>
        </div>
      </div>

      <!-- 待解锁 -->
      <div class="section-title">🔒 待解锁勋章</div>
      <div class="badge-grid">
        <div v-for="(b, i) in lockedBadges" :key="i" class="badge-card locked" @click="onBadgeClick(b)">
          <div class="badge-icon dim">🔒</div>
          <div class="badge-name">{{ b.name }}</div>
          <div class="badge-date">{{ b.condition }}</div>
        </div>
      </div>

      <div class="tip-text">💡 完成对应阶段的里程碑打卡即可解锁勋章，加油哦～</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showDialog } from 'vant'
const earnedBadges = ref([
  { icon:'🥇', name:'孕早期守护者', desc:'完成孕早期全部里程碑', date:'2026/04/28 获得' },
  { icon:'🥇', name:'打卡小能手', desc:'累计完成5次里程碑打卡', date:'2026/05/20 获得' },
  { icon:'🥇', name:'日记达人', desc:'累计写满3篇孕育日记', date:'2026/06/08 获得' }
])
const lockedBadges = ref([
  { name:'孕中期守护者', condition:'完成孕中期全部里程碑', icon:'🔒' },
  { name:'足月准妈妈', condition:'进入孕晚期', icon:'🔒' },
  { name:'满分月子妈妈', condition:'完成月子期全部里程碑', icon:'🔒' },
  { name:'百天育儿达人', condition:'宝宝满百天', icon:'🔒' },
  { name:'日记之星', condition:'累计10篇日记', icon:'🔒' },
  { name:'连续打卡王', condition:'连续7天打卡', icon:'🔒' },
  { name:'成长陪伴官', condition:'完成宝宝1-3岁里程碑', icon:'🔒' },
  { name:'全勤妈妈', condition:'完成全旅程里程碑', icon:'🔒' },
  { name:'分享达人', condition:'分享3次日记到朋友圈', icon:'🔒' }
])
function goBack(){window.history.back()}
function onBadgeClick(b){
  const title = b.icon === '🔒' ? `🔒 ${b.name}` : `${b.icon} ${b.name}`
  const msg = b.icon === '🔒' ? `解锁条件：${b.condition}\n\n继续加油，很快就能获得～💪` : `${b.desc}\n\n${b.date}\n\n继续打卡，集齐更多勋章！`
  showDialog({ title, message:msg, confirmButtonText:'好的 💕', confirmButtonColor:'#F8A8B8' })
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.warm-banner strong { color:#F8A8B8; font-size:18px; }
.badge-stats { display:flex; align-items:center; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:16px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.bs-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
.bs-num { font-size:22px; font-weight:700; color:#F8A8B8; }
.bs-label { font-size:11px; color:#999; }
.bs-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }
.section-title { font-size:15px; font-weight:600; color:#333; margin-bottom:12px; margin-top:4px; }
.badge-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:16px; }
.badge-card { display:flex; flex-direction:column; align-items:center; gap:4px; padding:16px 8px; background:#fff; border-radius:14px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.badge-card:active { transform:scale(0.95); }
.badge-card.locked { background:#F8F8FA; }
.badge-icon { font-size:36px; }
.badge-icon.dim { opacity:0.4; }
.badge-name { font-size:12px; font-weight:600; color:#333; text-align:center; }
.badge-card.locked .badge-name { color:#bbb; }
.badge-date { font-size:9px; color:#bbb; }
.tip-text { text-align:center; font-size:11px; color:#ccc; padding:8px; }
</style>
