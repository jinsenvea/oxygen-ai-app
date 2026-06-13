<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">🏥 产检记录</span>
      <button class="dp-action" @click="showToast('📅 添加产检记录')">＋添加</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">📋 已记录 <strong>5</strong> 次产检，按时产检是给宝宝最好的保护～</div>
      <div class="timeline">
        <div v-for="(r,i) in records" :key="i" class="tl-item" @click="onRecordClick(r)">
          <div class="tl-dot" :class="{active: r.current}"></div>
          <div class="tl-card">
            <div class="tl-header"><span class="tl-week">{{ r.week }}</span><span class="tl-date">{{ r.date }}</span></div>
            <div class="tl-name">{{ r.name }}</div>
            <div class="tl-status" :class="r.status">{{ r.badge }}</div>
          </div>
        </div>
      </div>
      <button class="add-btn" @click="showToast('📅 添加产检记录')">＋ 记录下次产检</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from 'vant'
const records = ref([
  { week:'孕6周', date:'2026/03/15', name:'确认妊娠+B超见胎心', status:'success', badge:'✅ 已完成', current:false },
  { week:'孕12周', date:'2026/04/26', name:'NT筛查＋建档', status:'success', badge:'✅ 已完成', current:false },
  { week:'孕16周', date:'2026/05/24', name:'中期唐筛', status:'success', badge:'✅ 已完成', current:false },
  { week:'孕24周', date:'2026/06/01', name:'四维彩超排畸', status:'success', badge:'✅ 已完成', current:true },
  { week:'孕24周', date:'2026/06/10', name:'糖耐量筛查', status:'success', badge:'✅ 已完成', current:false },
  { week:'孕28周', date:'2026/07/08（预计）', name:'小排畸B超', status:'pending', badge:'⏳ 待产检', current:false }
])
function goBack(){window.history.back()}
function onRecordClick(r){
  showDialog({ title:`${r.week} ${r.name}`, message:`📅 ${r.date}\n${r.badge}\n\n🔍 查看完整产检记录和AI解读报告`, confirmButtonText:'查看详情', cancelButtonText:'关闭', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(()=>window.location.hash='#/report-list').catch(()=>{})
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
.warm-banner strong { color:#F8A8B8; font-size:18px; }
.timeline { padding-left:8px; }
.tl-item { display:flex; gap:12px; padding-bottom:16px; position:relative; }
.tl-item::before { content:''; position:absolute; left:10px; top:20px; bottom:0; width:2px; background:#F0F0F0; }
.tl-item:last-child::before { display:none; }
.tl-dot { width:12px; height:12px; border-radius:50%; background:#ddd; border:2.5px solid #fff; flex-shrink:0; margin-top:4px; box-shadow:0 0 0 2px #ddd; z-index:1; }
.tl-dot.active { background:linear-gradient(135deg,#F8A8B8,#E8889E); box-shadow:0 0 0 2px #F8A8B8,0 0 8px rgba(248,168,184,0.4); }
.tl-card { flex:1; background:#fff; border-radius:12px; padding:12px 14px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.tl-card:active { transform:scale(0.98); }
.tl-header { display:flex; justify-content:space-between; margin-bottom:2px; }
.tl-week { font-size:13px; font-weight:600; color:#F8A8B8; }
.tl-date { font-size:11px; color:#bbb; }
.tl-name { font-size:14px; color:#333; margin-bottom:4px; }
.tl-status { font-size:10px; padding:2px 8px; border-radius:4px; display:inline-block; }
.tl-status.success { color:#52C41A; background:#F0FFF0; }
.tl-status.pending { color:#FAAD14; background:#FFF8F0; }
.add-btn { width:100%; padding:14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border:1.5px dashed #F8A8B8; border-radius:12px; font-size:14px; color:#F8A8B8; font-weight:500; cursor:pointer; margin-top:4px; }
</style>
