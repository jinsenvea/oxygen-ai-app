<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">📸 回忆相册</span>
      <button class="dp-action" @click="onShare">分享</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🌸 这里收藏着你和宝宝一路走来的珍贵瞬间～每一张都是爱的印记 💕</div>

      <div class="stats-bar">
        <div class="sb-item"><span class="sb-num">12</span><span class="sb-label">照片</span></div>
        <div class="sb-div"></div>
        <div class="sb-item"><span class="sb-num">4</span><span class="sb-label">日记</span></div>
        <div class="sb-div"></div>
        <div class="sb-item"><span class="sb-num">3</span><span class="sb-label">阶段</span></div>
      </div>

      <div class="section-tabs">
        <span class="st-tab active" @click="activeView='album'">📸 照片</span>
        <span class="st-tab" @click="activeView='diary'">📝 日记</span>
      </div>

      <div v-if="activeView==='album'">
        <div v-for="(g,gi) in groups" :key="gi" class="album-group">
          <div class="ag-header">
            <span>{{ g.label }}</span>
            <span class="ag-count">{{ g.photos.length }}张</span>
          </div>
          <div class="ag-grid">
            <div v-for="(p,pi) in g.photos" :key="pi" class="ag-photo" @click="onPhotoView(g,p)">
              <span class="ag-emoji">{{ p.emoji }}</span>
              <span class="ag-desc">{{ p.desc }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="diary-list">
        <div v-for="(d,i) in diaries" :key="i" class="diary-item" @click="onDiaryView(d)">
          <div class="diary-mood">{{ d.mood }}</div>
          <div class="diary-info">
            <div class="diary-preview">{{ d.text }}</div>
            <div class="diary-date">{{ d.date }}</div>
          </div>
          <span class="diary-arrow">›</span>
        </div>
      </div>

      <div class="album-actions">
        <button class="aa-btn primary" @click="onGenerate">📖 生成纪念册</button>
        <button class="aa-btn outline" @click="onShare">🖼️ 分享</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
const activeView = ref('album')
const groups = ref([
  { label:'🌸 备孕期', photos:[{emoji:'🎯',desc:'测出怀孕'},{emoji:'📚',desc:'孕前准备'}] },
  { label:'🤰 孕早期', photos:[{emoji:'📋',desc:'第一次B超'},{emoji:'🥰',desc:'孕8周'},{emoji:'👩',desc:'孕肚初显'}] },
  { label:'👶 孕中期', photos:[{emoji:'👶',desc:'胎动记录'},{emoji:'🏥',desc:'四维彩超'},{emoji:'🌰',desc:'20周'},{emoji:'🌸',desc:'孕妇照'},{emoji:'🥰',desc:'和爸爸'},{emoji:'📸',desc:'24周'},{emoji:'💕',desc:'自拍'}] }
])
const diaries = ref([
  { mood:'🥰', date:'2026-06-08', text:'今天第一次感觉到胎动！像小鱼吐泡泡一样～爸爸也感受到了，两个人都哭了😭' },
  { mood:'📝', date:'2026-06-01', text:'四维预约好了，好期待看到宝宝的小脸🥰' },
  { mood:'😭', date:'2026-04-10', text:'孕吐第7天了…但听到宝宝心跳那瞬间觉得一切都值得' },
  { mood:'✨', date:'2026-03-28', text:'B超看到胎心了！一个小点点在屏幕上跳动，生命的奇迹✨' }
])
function goBack(){window.history.back()}
function onPhotoView(g,p){
  showDialog({ title:`${g.label} · ${p.desc}`, message:`📅 ${p.desc}\n\n这是你和宝宝的珍贵回忆 💕\n\n💡 可分享给家人一起看看`, confirmButtonText:'好的 💕', cancelButtonText:'分享', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(()=>{}).catch(()=>showToast('📤 分享功能已打开'))
}
function onDiaryView(d){
  showDialog({ title:`${d.mood} ${d.date}`, message:d.text+'\n\n🔒 仅自己可见', confirmButtonText:'关闭', cancelButtonText:'分享', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(()=>{}).catch(()=>showToast('📤 已生成分享图片'))
}
function onGenerate(){
  showDialog({ title:'📖 生成电子纪念册', message:'将全旅程照片和日记自动生成精美电子纪念册 📕\n\n可保存为PDF或分享给家人', confirmButtonText:'立即生成', cancelButtonText:'稍后', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(()=>showToast('✅ 电子纪念册正在生成中...')).catch(()=>{})
}
function onShare(){
  showDialog({ title:'🖼️ 分享回忆', message:'将孕育旅程分享给亲朋好友 💕\n\n生成带氧阁品牌水印的精美长图', confirmButtonText:'生成分享图', cancelButtonText:'取消', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(()=>showToast('✅ 已生成分享图片')).catch(()=>{})
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
.stats-bar { display:flex; align-items:center; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.sb-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
.sb-num { font-size:24px; font-weight:700; color:#F8A8B8; }
.sb-label { font-size:11px; color:#999; }
.sb-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }
.section-tabs { display:flex; gap:8px; margin-bottom:14px; }
.st-tab { padding:6px 18px; background:#f0f0f0; border-radius:16px; font-size:13px; color:#999; cursor:pointer; }
.st-tab.active { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; font-weight:500; }
.album-group { margin-bottom:16px; }
.ag-header { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; display:flex; align-items:center; gap:6px; }
.ag-count { font-size:11px; color:#bbb; font-weight:400; }
.ag-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; }
.ag-photo { aspect-ratio:1; border-radius:12px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; cursor:pointer; }
.ag-photo:active { transform:scale(0.93); }
.ag-emoji { font-size:24px; }
.ag-desc { font-size:8px; color:#999; }
.diary-list { display:flex; flex-direction:column; gap:8px; }
.diary-item { display:flex; align-items:center; gap:10px; padding:12px 14px; background:#fff; border-radius:14px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.diary-item:active { transform:scale(0.98); }
.diary-mood { font-size:24px; }
.diary-info { flex:1; }
.diary-preview { font-size:13px; color:#555; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.5; }
.diary-date { font-size:10px; color:#bbb; margin-top:2px; }
.diary-arrow { color:#ddd; font-size:14px; }
.album-actions { display:flex; gap:8px; margin-top:12px; }
.aa-btn { flex:1; height:40px; border-radius:12px; font-size:13px; font-weight:500; cursor:pointer; border:none; }
.aa-btn.primary { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.aa-btn.primary:active { transform:scale(0.97); }
.aa-btn.outline { background:#FFF0F3; color:#F8A8B8; }
.aa-btn.outline:active { transform:scale(0.97); }
</style>
