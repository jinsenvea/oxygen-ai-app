<template>
  <div class="detail-page">
    <div class="dp-header"><button class="dp-back" @click="goBack">‹ 返回</button><span class="dp-title">🍼 母乳记录</span><button class="dp-action" @click="onAdd">＋记录</button></div>
    <div class="dp-body">
      <div class="warm-banner">🤱 今日已喂 <strong>6</strong> 次，总量约 <strong>480ml</strong>，宝宝吃得很好哦～</div>
      <div class="stats-card"><div class="stats-item" v-for="(s,i) in stats" :key="i"><span class="stats-num">{{ s.num }}</span><span class="stats-label">{{ s.label }}</span></div></div>
      <div class="list-card"><div class="list-title">📋 今日记录</div>
        <div v-for="(f,i) in feedings" :key="i" class="list-item" @click="onDetail(f)">
          <span class="list-time">{{ f.time }}</span><span class="list-type" :class="f.type">{{ f.type==='left'?'左侧':'右侧' }}</span>
          <div class="list-info"><span class="list-dur">{{ f.duration }}分钟</span><span class="list-amount">{{ f.amount }}ml</span></div>
        </div>
        <div v-if="feedings.length===0" class="empty">暂无记录</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
const stats = ref([{num:'6次',label:'今日喂养'},{num:'480ml',label:'总奶量'},{num:'3h',label:'平均间隔'}])
const feedings = ref([
  { time:'06:30', type:'right', duration:15, amount:80 },
  { time:'09:00', type:'left', duration:18, amount:90 },
  { time:'11:30', type:'right', duration:12, amount:70 },
  { time:'14:00', type:'left', duration:20, amount:100 },
  { time:'16:30', type:'right', duration:14, amount:75 },
  { time:'19:00', type:'left', duration:16, amount:65 }
])
function goBack(){window.history.back()}
function onAdd(){showToast('📝 记录喂养即将上线')}
function onDetail(f){showToast(`${f.time} ${f.type==='left'?'左侧':'右侧'}喂养 ${f.duration}分钟 ${f.amount}ml`)}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; margin-bottom:14px; }
.warm-banner strong { color:#F8A8B8; }
.stats-card { display:flex; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.stats-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
.stats-num { font-size:20px; font-weight:700; color:#F8A8B8; }
.stats-label { font-size:11px; color:#999; }
.list-card { background:#fff; border-radius:16px; padding:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.list-title { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; }
.list-item { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #F5F5F5; cursor:pointer; }
.list-item:last-child { border:none; }
.list-time { font-size:13px; color:#999; width:44px; }
.list-type { font-size:11px; padding:2px 8px; border-radius:4px; }
.list-type.left { color:#F8A8B8; background:#FFF0F3; }
.list-type.right { color:#E0C3FC; background:#F8E8FF; }
.list-info { flex:1; display:flex; justify-content:space-between; }
.list-dur { font-size:13px; color:#333; }
.list-amount { font-size:13px; color:#F8A8B8; font-weight:500; }
.empty { text-align:center; padding:20px; color:#bbb; }
</style>
