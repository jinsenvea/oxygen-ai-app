<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">⏱️ 宫缩记录</span>
      <button class="dp-action" @click="onStart">{{ isCounting ? '停止' : '开始计时' }}</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🤰 记录宫缩频率，帮助判断产程进展～</div>
      <div class="counter-card">
        <div class="counter-display">{{ displayTime }}</div>
        <div class="counter-info" v-if="isCounting">🟢 正在计时中…</div>
        <div class="counter-info" v-else>⏸️ 已停止</div>
        <div class="counter-btns">
          <button class="counter-btn primary" @click="onMark">🔼 标记一次宫缩</button>
          <button class="counter-btn outline" @click="onStart">{{ isCounting ? '⏹ 停止' : '▶ 开始' }}</button>
        </div>
      </div>
      <div class="records-card">
        <div class="rc-title">📋 本次记录</div>
        <div class="rc-row" v-for="(r,i) in contractions" :key="i">
          <span class="rc-num">#{{ i+1 }}</span>
          <span class="rc-time">{{ r.time }}</span>
          <span class="rc-duration">{{ r.duration }}</span>
          <span class="rc-interval">{{ r.interval }}</span>
        </div>
        <div v-if="contractions.length===0" class="rc-empty">点击「开始计时」记录宫缩</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
const isCounting = ref(false)
const seconds = ref(0)
const contractions = ref([])
const displayTime = computed(() => {
  const m = Math.floor(seconds.value/60), s = seconds.value%60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
})
let timer = null
function goBack(){window.history.back()}
function onStart(){
  isCounting.value = !isCounting.value
  if(isCounting.value) timer = setInterval(()=>seconds.value++,1000)
  else { clearInterval(timer); showToast(`⏹ 本次计时 ${displayTime.value}`) }
}
function onMark(){
  if(!isCounting.value){ showToast('请先开始计时'); return }
  contractions.value.push({ time:displayTime.value, duration:'30s', interval: contractions.value.length ? '5min' : '-' })
  showToast(`✅ 第 ${contractions.value.length} 次宫缩已记录`)
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:13px; color:#666; padding:12px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; margin-bottom:14px; }
.counter-card { background:#fff; border-radius:20px; padding:24px; text-align:center; margin-bottom:14px; box-shadow:0 2px 12px rgba(248,168,184,0.08); }
.counter-display { font-size:56px; font-weight:300; color:#333; font-variant-numeric:tabular-nums; margin-bottom:4px; letter-spacing:2px; }
.counter-info { font-size:13px; color:#999; margin-bottom:16px; }
.counter-btns { display:flex; gap:10px; }
.counter-btn { flex:1; height:44px; border-radius:12px; font-size:14px; font-weight:500; cursor:pointer; border:none; }
.counter-btn.primary { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.counter-btn.primary:active { transform:scale(0.97); }
.counter-btn.outline { background:#fff; color:#666; border:1.5px solid #eee; }
.records-card { background:#fff; border-radius:16px; padding:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.rc-title { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; }
.rc-row { display:flex; gap:8px; padding:6px 0; font-size:12px; color:#555; border-bottom:1px solid #F5F5F5; }
.rc-num { width:28px; color:#F8A8B8; font-weight:600; }
.rc-time { flex:1; }
.rc-duration { width:50px; color:#999; }
.rc-interval { width:50px; text-align:right; color:#999; }
.rc-empty { text-align:center; padding:20px; color:#bbb; font-size:13px; }
</style>
