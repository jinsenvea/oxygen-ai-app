<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">🍱 月子餐</span>
      <button class="dp-action" @click="onWeekMenu">📅 本周</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🥘 张阿姨亲手做的月子餐，每一口都是对宝妈的爱～</div>

      <!-- 日期切换 -->
      <div class="date-nav">
        <button class="date-btn" @click="prevDay">‹</button>
        <div class="date-info">
          <span class="date-text">{{ dateText }}</span>
          <span class="date-week">{{ weekText }}</span>
        </div>
        <button class="date-btn" @click="nextDay">›</button>
      </div>

      <!-- 阶段提示 -->
      <div class="phase-badge">{{ phaseText }}</div>

      <!-- 餐单列表 -->
      <div class="meal-list">
        <div v-for="(m,i) in meals" :key="i" class="meal-item" @click="onMealDetail(m)">
          <div class="meal-time">{{ m.time }}</div>
          <div class="meal-icon">{{ m.icon }}</div>
          <div class="meal-info">
            <span class="meal-name">{{ m.name }}</span>
            <span class="meal-note">{{ m.note }}</span>
          </div>
          <div class="meal-status" :class="m.state">{{ m.badge }}</div>
        </div>
      </div>

      <!-- 营养师建议 -->
      <div class="nutrition-tip" @click="onNutrition">
        <span class="nt-icon">💡</span>
        <div class="nt-info">
          <span class="nt-title">今日营养推荐</span>
          <span class="nt-text">鲫鱼豆腐汤富含蛋白质和钙，促进产后恢复和乳汁分泌～</span>
        </div>
        <span class="nt-arrow">›</span>
      </div>

      <!-- 反馈 -->
      <div class="feedback-row">
        <span class="fb-label">今天的餐合口味吗？</span>
        <div class="fb-actions">
          <span class="fb-btn" @click="onFeedback('好吃')">😋 好吃</span>
          <span class="fb-btn" @click="onFeedback('一般')">😐 一般</span>
          <span class="fb-btn" @click="onFeedback('不想吃')">😣 没胃口</span>
        </div>
      </div>

      <button class="view-all-btn" @click="onWeekMenu">📅 查看本周完整餐单›</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { showDialog, showToast } from 'vant'
const currentDate = ref(new Date('2026/06/13'))
const meals = ref([
  { time:'07:30', icon:'🌅', name:'小米红枣粥 + 蒸蛋羹', note:'养胃易消化 · 补气血', state:'done', badge:'✅ 已用' },
  { time:'09:30', icon:'🍵', name:'木瓜炖牛奶（加餐）', note:'催乳佳品 · 补充蛋白质', state:'done', badge:'✅ 已用' },
  { time:'12:00', icon:'🍲', name:'鲫鱼豆腐汤 + 西兰花 + 杂粮饭', note:'高蛋白补钙 · 促进乳汁分泌', state:'current', badge:'🕐 用餐中' },
  { time:'15:00', icon:'🥤', name:'红豆薏米水（加餐）', note:'祛湿消肿 · 促进代谢', state:'wait', badge:'⏳ 待用' },
  { time:'18:00', icon:'🍗', name:'香菇鸡汤 + 清炒时蔬', note:'滋补增强免疫 · 易消化', state:'wait', badge:'⏳ 待用' }
])
const dateText = computed(() => {
  const d = currentDate.value
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
})
const weekText = computed(() => {
  const days = ['周日','周一','周二','周三','周四','周五','周六']
  return days[currentDate.value.getDay()]
})
const phaseText = computed(() => {
  return '📌 月子第6天 · 恢复期 · 调理脾胃 · 排恶露'
})
function goBack(){window.history.back()}
function prevDay(){currentDate.value = new Date(currentDate.value.getTime()-86400000)}
function nextDay(){currentDate.value = new Date(currentDate.value.getTime()+86400000)}
function onMealDetail(m){
  showDialog({ title:`${m.icon} ${m.time} ${m.name}`, message:`${m.note}\n\n${m.badge}\n\n🥘 张阿姨的烹饪心得：\n「这道菜火候很重要，炖足了时间营养才能出来，宝妈要多吃点哦～」`, confirmButtonText:'好的，谢谢张阿姨 💕', confirmButtonColor:'#F8A8B8' })
}
function onNutrition(){
  showDialog({ title:'💡 今日营养推荐', message:'🥣 鲫鱼豆腐汤\n\n✅ 鲫鱼富含优质蛋白和不饱和脂肪酸\n✅ 豆腐含钙量高，促进产后骨骼恢复\n✅ 汤色奶白是蛋白质充分溶解的表现\n\n张阿姨说：我特意用文火慢炖了2小时，汤特别鲜～宝妈多喝点，对奶水也好哦 💕', confirmButtonText:'好的，我会喝完的！', confirmButtonColor:'#F8A8B8' })
}
function onFeedback(v){showToast(`💕 已收到你的反馈「${v}」，告诉张阿姨调整口味～`)}
function onWeekMenu(){showToast('📅 本周餐单即将上线')}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.date-nav { display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:8px; }
.date-btn { width:36px; height:36px; border-radius:50%; border:1px solid #eee; background:#fff; font-size:18px; color:#999; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.date-btn:active { background:#FFF0F3; }
.date-info { text-align:center; }
.date-text { font-size:16px; font-weight:600; color:#333; }
.date-week { font-size:12px; color:#bbb; margin-left:6px; }
.phase-badge { font-size:12px; color:#F8A8B8; background:#FFF0F3; padding:6px 14px; border-radius:8px; margin-bottom:12px; text-align:center; font-weight:500; }
.meal-list { display:flex; flex-direction:column; gap:4px; background:#fff; border-radius:16px; padding:8px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.meal-item { display:flex; align-items:center; gap:10px; padding:10px 8px; cursor:pointer; border-radius:10px; }
.meal-item:active { background:#FFF8FA; }
.meal-time { font-size:12px; color:#999; width:42px; flex-shrink:0; font-weight:500; }
.meal-icon { font-size:20px; }
.meal-info { flex:1; }
.meal-name { font-size:13px; color:#333; display:block; }
.meal-note { font-size:10px; color:#bbb; margin-top:1px; display:block; }
.meal-status { font-size:11px; flex-shrink:0; }
.meal-status.done { color:#52C41A; }
.meal-status.current { color:#FAAD14; }
.meal-status.wait { color:#bbb; }
.nutrition-tip { display:flex; align-items:center; gap:10px; padding:12px 14px; background:linear-gradient(135deg,#FFF8F0,#FFF0F3); border-radius:14px; cursor:pointer; margin-bottom:12px; }
.nutrition-tip:active { opacity:0.7; }
.nt-icon { font-size:20px; }
.nt-info { flex:1; }
.nt-title { font-size:13px; font-weight:600; color:#E8889E; display:block; }
.nt-text { font-size:12px; color:#888; margin-top:2px; display:block; line-height:1.5; }
.nt-arrow { color:#ccc; font-size:14px; }
.feedback-row { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:#fff; border-radius:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.fb-label { font-size:12px; color:#666; }
.fb-actions { display:flex; gap:6px; }
.fb-btn { font-size:11px; padding:4px 10px; background:#FFF8FA; border-radius:10px; color:#888; cursor:pointer; }
.fb-btn:active { background:#F8A8B8; color:#fff; }
.view-all-btn { width:100%; padding:12px; background:#fff; border:none; border-radius:12px; font-size:13px; color:#F8A8B8; font-weight:500; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.03); }
</style>
