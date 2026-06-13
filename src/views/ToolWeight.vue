<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">⚖️ 体重管理</span>
      <button class="dp-action" @click="onRecord">＋记录</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🌸 今日体重 <strong>72.5kg</strong>，累计增长 14.5kg，在正常范围内～</div>
      <div class="weight-chart">
        <div class="chart-title">📈 体重变化趋势</div>
        <div class="chart-bars">
          <div v-for="(w,i) in weights" :key="i" class="c-bar" @click="onBarClick(w)">
            <div class="c-bar-fill" :style="{height: w.h+'px', background: w.current?'linear-gradient(180deg,#F8A8B8,#E8889E)':'rgba(248,168,184,0.3)'}">
              <span class="c-bar-val">{{ w.v }}</span>
            </div>
            <span class="c-bar-label">{{ w.l }}</span>
          </div>
        </div>
        <div class="chart-range">
          <span>⬆ 正常上限 75kg</span>
          <span>⬇ 正常下限 58kg</span>
        </div>
      </div>
      <div class="list-card">
        <div class="list-title">📝 记录历史</div>
        <div v-for="(r,i) in records" :key="i" class="list-item">
          <span class="list-date">{{ r.date }}</span>
          <span class="list-val">{{ r.val }} kg</span>
          <span class="list-diff" :class="r.diff>0?'up':'down'">{{ r.diff>0?'+'+r.diff:r.diff }} kg</span>
        </div>
      </div>
      <div class="advice-card" @click="showToast('💪 产后修复方案')">
        <span>💡</span><span class="advice-text">产后体重管理建议：产后42天开始逐步恢复运动</span><span>›</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from 'vant'
const weights = ref([
  { v:'58', h:60, l:'孕前' },{ v:'62', h:80, l:'12周' },{ v:'65', h:90, l:'16周' },
  { v:'68', h:100, l:'20周' },{ v:'72.5', h:120, l:'24周', current:true }
])
const records = ref([
  { date:'06/10', val:72.5, diff:0.3 },{ date:'06/03', val:72.2, diff:0.5 },
  { date:'05/27', val:71.7, diff:0.4 },{ date:'05/20', val:71.3, diff:0.6 }
])
function goBack(){window.history.back()}
function onRecord(){showDialog({title:'📝 记录体重', message:'请准备好体重秤 ⚖️\n\n建议每天固定时间测量\n（如早起空腹）', confirmButtonText:'开始记录', confirmButtonColor:'#F8A8B8'}).then(()=>showToast('⚖️ 记录功能即将上线')).catch(()=>{})}
function onBarClick(w){showToast(`${w.l}：${w.v}kg`)}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.warm-banner strong { color:#F8A8B8; font-size:20px; }
.weight-chart { background:#fff; border-radius:16px; padding:16px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.chart-title { font-size:14px; font-weight:600; color:#333; margin-bottom:14px; }
.chart-bars { display:flex; align-items:flex-end; gap:8px; height:140px; }
.c-bar { flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end; cursor:pointer; }
.c-bar-fill { width:100%; max-width:40px; border-radius:6px 6px 2px 2px; position:relative; display:flex; justify-content:center; padding-top:4px; min-height:6px; }
.c-bar-val { font-size:9px; color:#fff; font-weight:600; }
.c-bar-label { font-size:9px; color:#999; margin-top:4px; }
.chart-range { display:flex; justify-content:space-between; font-size:10px; color:#bbb; margin-top:8px; }
.list-card { background:#fff; border-radius:16px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.list-title { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; }
.list-item { display:flex; align-items:center; padding:6px 0; font-size:13px; }
.list-date { width:56px; color:#999; }
.list-val { flex:1; color:#333; font-weight:500; }
.list-diff { width:50px; text-align:right; }
.list-diff.up { color:#F8A8B8; }
.list-diff.down { color:#52C41A; }
.advice-card { display:flex; align-items:center; gap:8px; padding:12px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:12px; cursor:pointer; font-size:13px; color:#888; }
</style>
