<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">📝 孕育日记</span>
      <div class="dp-actions">
        <button class="dp-action" @click="onEdit">✏️</button>
        <button class="dp-action" @click="onDelete">🗑️</button>
      </div>
    </div>
    <div class="dp-body">
      <div class="diary-hero">
        <span class="diary-mood">{{ diary.mood }}</span>
        <div class="diary-meta">
          <span class="diary-stage">{{ stageName }} · 第{{ stageDay }}天</span>
          <span class="diary-date">{{ diary.date }}</span>
        </div>
      </div>

      <div class="diary-content">{{ diary.text }}</div>

      <div v-if="diary.images && diary.images.length" class="diary-images">
        <div v-for="(img,i) in diary.images" :key="i" class="diary-img">{{ img }}</div>
      </div>

      <div class="diary-privacy">🔒 仅自己可见 · 氧宝严格保护你的隐私</div>

      <!-- 日记建议 -->
      <div class="ai-suggestion" @click="onAiPolish">
        <span class="ai-icon">🤖</span>
        <div class="ai-info">
          <span class="ai-title">氧宝AI润色建议</span>
          <span class="ai-text">让文字更温暖感人，一键润色 ✨</span>
        </div>
        <span class="ai-arrow">›</span>
      </div>

      <!-- 操作按钮 -->
      <div class="action-row">
        <button class="action-btn share" @click="onShare">📤 分享</button>
        <button class="action-btn export" @click="showToast('📥 已保存到本地')">💾 保存</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showDialog, showToast } from 'vant'
const route = useRoute()
const diary = ref({ mood:'🥰', date:'2026-06-08', text:'今天第一次感觉到胎动！像小鱼吐泡泡一样轻轻的～爸爸把手放在肚皮上也感受到了，两个人都哭了😭', images:['👶'] })
const stageName = ref('孕中期')
const stageDay = ref('24周+3天')

onMounted(()=>{
  // 实际会根据route.params.id从localStorage加载
})

function goBack(){window.history.back()}

function onEdit(){
  showDialog({
    title:'✏️ 编辑日记',
    message:'当前记录：\n'+diary.value.text+'\n\n你可以修改内容或添加照片',
    confirmButtonText:'去编辑', cancelButtonText:'取消',
    showCancelButton:true, confirmButtonColor:'#F8A8B8'
  }).then(()=>showToast('✏️ 编辑功能即将上线')).catch(()=>{})
}

function onDelete(){
  showDialog({
    title:'🗑️ 删除日记', message:'确定删除这条日记吗？删除后不可恢复哦 💕',
    confirmButtonText:'删除', cancelButtonText:'保留',
    showCancelButton:true, confirmButtonColor:'#FF4D4F'
  }).then(()=>{ showToast('日记已删除'); setTimeout(()=>goBack(),1000) }).catch(()=>{})
}

function onAiPolish(){
  showDialog({
    title:'🤖 氧宝AI润色',
    message:'✨ 润色前：\n「'+diary.value.text+'」\n\n✨ 润色后：\n「今天第一次感受到宝宝在肚子里轻轻游动，像小鱼吐泡泡一样～爸爸把手放在肚皮上的那一刻，他也感受到了！我们两个人都激动得哭了。生命的奇迹，每天都在上演 💕」\n\n是否替换为润色后的版本？',
    confirmButtonText:'替换', cancelButtonText:'不需要',
    showCancelButton:true, confirmButtonColor:'#F8A8B8'
  }).then(()=>{
    diary.value.text = '今天第一次感受到宝宝在肚子里轻轻游动，像小鱼吐泡泡一样～爸爸把手放在肚皮上的那一刻，他也感受到了！我们两个人都激动得哭了。生命的奇迹，每天都在上演 💕'
    showToast('✨ 润色完成！文字更温暖了～')
  }).catch(()=>{})
}

function onShare(){
  showDialog({
    title:'📤 分享日记',
    message:'将这份美好分享给家人朋友 💕\n\n1️⃣ 分享到朋友圈\n2️⃣ 分享给家人群\n3️⃣ 保存为精美卡片',
    confirmButtonText:'分享到朋友圈', cancelButtonText:'取消',
    showCancelButton:true, confirmButtonColor:'#F8A8B8'
  }).then(()=>showToast('✅ 已生成分享图片')).catch(()=>{})
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-actions { display:flex; gap:4px; }
.dp-action { font-size:16px; background:none; border:none; cursor:pointer; padding:4px; opacity:0.4; }
.dp-action:active { opacity:1; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.diary-hero { display:flex; align-items:center; gap:14px; padding:20px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:18px; margin-bottom:16px; }
.diary-mood { font-size:48px; }
.diary-meta { display:flex; flex-direction:column; }
.diary-stage { font-size:14px; font-weight:600; color:#333; }
.diary-date { font-size:12px; color:#888; margin-top:2px; }
.diary-content { font-size:16px; color:#444; line-height:2; padding:16px; background:#fff; border-radius:16px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); white-space:pre-wrap; }
.diary-images { display:flex; gap:8px; margin-bottom:14px; }
.diary-img { width:64px; height:64px; border-radius:12px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); display:flex; align-items:center; justify-content:center; font-size:28px; }
.diary-privacy { font-size:11px; color:#bbb; text-align:center; padding:8px; margin-bottom:12px; }
.ai-suggestion { display:flex; align-items:center; gap:10px; padding:12px 14px; background:linear-gradient(135deg,#F0E6FF,#FFF0F3); border-radius:14px; cursor:pointer; margin-bottom:12px; }
.ai-suggestion:active { opacity:0.7; }
.ai-icon { font-size:24px; }
.ai-info { flex:1; }
.ai-title { font-size:13px; font-weight:600; color:#888; display:block; }
.ai-text { font-size:11px; color:#bbb; margin-top:1px; display:block; }
.ai-arrow { color:#ccc; font-size:14px; }
.action-row { display:flex; gap:10px; }
.action-btn { flex:1; height:42px; border-radius:12px; font-size:14px; font-weight:500; cursor:pointer; border:none; }
.action-btn.share { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.action-btn.share:active { transform:scale(0.97); }
.action-btn.export { background:#fff; color:#666; border:1.5px solid #eee; }
.action-btn.export:active { transform:scale(0.97); }
</style>
