<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">✏️ 写日记</span>
      <button class="dp-action" @click="onSave">💾 保存</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🌸 今天有什么想记录的呢？写下你想对宝宝说的话吧～</div>

      <!-- 心情选择 -->
      <div class="mood-selector">
        <span class="ms-label">今天的心情</span>
        <div class="ms-grid">
          <span v-for="m in moods" :key="m.emoji" class="ms-item" :class="{ active: selectedMood === m.emoji }" @click="selectedMood = m.emoji">
            <span class="ms-emoji">{{ m.emoji }}</span>
            <span class="ms-text">{{ m.label }}</span>
          </span>
        </div>
      </div>

      <!-- 日期 -->
      <div class="date-display">📅 {{ currentDate }}</div>

      <!-- 日记输入 -->
      <textarea v-model="diaryText" class="diary-textarea" placeholder="写下今天的心情、感受、想对宝宝说的话…" rows="6"></textarea>

      <!-- 添加照片 -->
      <div class="photo-upload" @click="showToast('📸 拍照上传即将上线')">
        <span class="pu-icon">📷</span>
        <span class="pu-text">添加照片</span>
      </div>

      <!-- 字数 -->
      <div class="word-count">{{ diaryText.length }}字</div>

      <!-- AI润色 -->
      <div class="ai-section" v-if="diaryText.length > 5">
        <div class="ai-title">🤖 氧宝AI润色</div>
        <div class="ai-preview" @click="onAiPolish">
          <div class="ai-before">📝 原文：{{ diaryText.slice(0,50) }}{{ diaryText.length>50?'…':'' }}</div>
          <div class="ai-after" v-if="polishedText">✨ 润色：{{ polishedText }}</div>
          <span v-if="!polishedText" class="ai-hint">点击让氧宝帮你润色 ✨</span>
        </div>
      </div>

      <!-- 隐私设置 -->
      <div class="privacy-toggle">
        <span class="privacy-label">🔒 仅自己可见</span>
        <span class="privacy-hint">可分享给家人</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { showDialog, showToast } from 'vant'
const moods = ref([
  { emoji:'🥰', label:'幸福' }, { emoji:'😊', label:'开心' }, { emoji:'😭', label:'感动' },
  { emoji:'😴', label:'疲惫' }, { emoji:'🤰', label:'期待' }, { emoji:'💪', label:'加油' }
])
const selectedMood = ref('🥰')
const diaryText = ref('')
const polishedText = ref('')

const currentDate = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
})

function goBack(){window.history.back()}

function onSave(){
  if(!diaryText.value.trim()){ showToast('💕 写点什么再保存吧～'); return }
  showDialog({
    title:'💾 保存日记', message:`${selectedMood.value} 已记录 ${diaryText.value.length}字\n\n日记已保存到「孕中期」旅程中 💕\n\n💡 氧宝建议：添加照片让回忆更生动`,
    confirmButtonText:'好的，已保存', cancelButtonText:'添加照片',
    showCancelButton:true, confirmButtonColor:'#F8A8B8'
  }).then(()=>{
    showToast('✅ 日记保存成功！')
    setTimeout(()=>goBack(),800)
  }).catch(()=>showToast('📸 照片上传即将上线'))
}

function onAiPolish(){
  const originals = [
    '今天脚肿了很难受',
    '宝宝今天踢了我好几下',
    '孕吐好辛苦什么都吃不下'
  ]
  const polished = [
    '今天脚丫子肿得像小馒头，虽然有点辛苦，但想到这是宝宝在提醒妈妈要注意休息，心里又暖暖的～',
    '今天宝宝在肚子里开运动会啦！踢了妈妈好几下，爸爸把手放上来的时候TA又安静了，真是个害羞的小家伙 👶💕',
    '孕吐的滋味真的不好受，但是每次想放弃的时候，想到宝宝在努力长大，就又有了力量。妈妈会加油的！💪'
  ]
  const idx = Math.floor(Math.random() * 3)
  showDialog({
    title:'🤖 氧宝AI润色 ✨', message:`✨ 润色前：\n「${diaryText.value.slice(0,60)}${diaryText.value.length>60?'…':''}」\n\n✨ 润色建议：\n「${polished[idx]}」\n\n是否替换为润色后的版本？`,
    confirmButtonText:'替换 ✨', cancelButtonText:'保持原样',
    showCancelButton:true, confirmButtonColor:'#F8A8B8'
  }).then(()=>{
    polishedText.value = polished[idx]
    diaryText.value = polished[idx]
    showToast('✨ 润色完成！文字更温暖了～')
  }).catch(()=>{})
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
.mood-selector { background:#fff; border-radius:14px; padding:14px 16px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.ms-label { font-size:13px; color:#666; display:block; margin-bottom:8px; }
.ms-grid { display:flex; gap:6px; }
.ms-item { display:flex; flex-direction:column; align-items:center; gap:2px; padding:6px 10px; border-radius:10px; cursor:pointer; }
.ms-item.active { background:#FFF0F3; }
.ms-emoji { font-size:22px; }
.ms-text { font-size:10px; color:#888; }
.ms-item.active .ms-text { color:#F8A8B8; font-weight:500; }
.date-display { font-size:13px; color:#888; margin-bottom:8px; padding:0 4px; }
.diary-textarea { width:100%; padding:14px; border:1.5px solid #eee; border-radius:14px; font-size:14px; color:#333; line-height:1.8; resize:vertical; background:#fff; outline:none; box-sizing:border-box; min-height:160px; font-family:inherit; }
.diary-textarea:focus { border-color:#F8A8B8; }
.diary-textarea::placeholder { color:#bbb; }
.photo-upload { display:flex; align-items:center; gap:8px; padding:12px 14px; margin-top:8px; background:#fff; border:1.5px dashed #eee; border-radius:12px; cursor:pointer; }
.photo-upload:active { background:#FFF8FA; }
.pu-icon { font-size:20px; }
.pu-text { font-size:13px; color:#999; }
.word-count { text-align:right; font-size:11px; color:#ccc; margin-top:4px; padding:0 4px; }
.ai-section { background:linear-gradient(135deg,#F0E6FF,#FFF0F3); border-radius:14px; padding:14px; margin-top:10px; }
.ai-title { font-size:13px; font-weight:600; color:#888; margin-bottom:6px; }
.ai-preview { cursor:pointer; }
.ai-before { font-size:12px; color:#888; margin-bottom:4px; }
.ai-after { font-size:12px; color:#F8A8B8; font-weight:500; }
.ai-hint { font-size:12px; color:#F8A8B8; font-weight:500; }
.privacy-toggle { display:flex; align-items:center; justify-content:space-between; padding:10px 0; margin-top:8px; }
.privacy-label { font-size:12px; color:#999; }
.privacy-hint { font-size:11px; color:#bbb; }
</style>
