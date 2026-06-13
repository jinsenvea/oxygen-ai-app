<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">📋 护理报告</span>
      <button class="dp-action" @click="showToast('📅 完整护理日历')">📅 日历</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">💕 张阿姨每天细心记录，妈妈和宝宝都被照顾得很好～</div>

      <!-- ===== 宝妈/宝宝 Tab切换 ===== -->
      <div class="main-tabs">
        <div class="mt-tab" :class="{ active: mainTab === 'mom' }" @click="mainTab = 'mom'">
          <span class="mt-icon">🤱</span>
          <span class="mt-label">宝妈护理</span>
          <span class="mt-count">2项</span>
        </div>
        <div class="mt-tab" :class="{ active: mainTab === 'baby' }" @click="mainTab = 'baby'">
          <span class="mt-icon">👶</span>
          <span class="mt-label">宝宝护理</span>
          <span class="mt-count">4项</span>
        </div>
      </div>

      <!-- ===== 🤱 宝妈护理 ===== -->
      <template v-if="mainTab === 'mom'">
        <!-- 伤口护理 -->
        <div class="nurse-card" @click="onWoundDetail">
          <div class="nc-header">
            <span class="nc-icon">🩹</span>
            <span class="nc-name">伤口护理</span>
            <span class="nc-status green">🟢 恢复良好</span>
            <span class="nc-arrow">›</span>
          </div>
          <div class="nc-progress">
            <div class="nc-pbar"><div class="nc-pfill" style="width:100%"></div></div>
            <span class="nc-plabel">已护理 12 次 · 今日15:00第13次</span>
          </div>
          <div class="nc-note">💬 伤口愈合得很好，今天可以淋浴了～</div>
        </div>

        <!-- 通乳记录 -->
        <div class="nurse-card" @click="onMilkDetail">
          <div class="nc-header">
            <span class="nc-icon">🍼</span>
            <span class="nc-name">通乳记录</span>
            <span class="nc-status green">🟢 通畅</span>
            <span class="nc-arrow">›</span>
          </div>
          <div class="milk-stats">
            <div class="milk-stat"><span class="ms-num">6次</span><span class="ms-label">今日排奶</span></div>
            <div class="ms-div"></div>
            <div class="milk-stat"><span class="ms-num">480ml</span><span class="ms-label">总奶量</span></div>
            <div class="ms-div"></div>
            <div class="milk-stat"><span class="ms-num">✅</span><span class="ms-label">乳腺通畅</span></div>
          </div>
        </div>

        <!-- 情绪记录 -->
        <div class="nurse-card" @click="onMoodDetail">
          <div class="nc-header">
            <span class="nc-icon">💕</span>
            <span class="nc-name">情绪记录</span>
            <span class="nc-status green">🟢 心情良好</span>
            <span class="nc-arrow">›</span>
          </div>
          <div class="mood-summary">
            <span class="mood-today">😊 开心</span>
            <span class="mood-sleep">😴 睡眠 7.5h</span>
            <span class="mood-score">评分 8/10</span>
          </div>
        </div>
      </template>

      <!-- ===== 👶 宝宝护理 ===== -->
      <template v-if="mainTab === 'baby'">
        <!-- 宝宝概览 -->
        <div class="baby-hero">
          <div class="bh-item"><span class="bh-label">体重</span><span class="bh-val">3.2→3.8kg <span class="bh-up">📈</span></span></div>
          <div class="bh-div"></div>
          <div class="bh-item"><span class="bh-label">身长</span><span class="bh-val">50→54cm <span class="bh-up">📈</span></span></div>
          <div class="bh-div"></div>
          <div class="bh-item"><span class="bh-label">喂养</span><span class="bh-val">纯母乳</span></div>
        </div>

        <!-- 4项护理详情 -->
        <div class="baby-grid-detail">
          <div class="bg-item" @click="onBabyCare('洗澡')">
            <span class="bg-icon">🛁</span>
            <span class="bg-num">8次</span>
            <span class="bg-label">洗澡</span>
            <span class="bg-status">✅ 隔天一次</span>
          </div>
          <div class="bg-item" @click="onBabyCare('脐带')">
            <span class="bg-icon">🩹</span>
            <span class="bg-num">8次</span>
            <span class="bg-label">脐带护理</span>
            <span class="bg-status">✅ 已脱落</span>
          </div>
          <div class="bg-item" @click="onBabyCare('喂养')">
            <span class="bg-icon">🍼</span>
            <span class="bg-num">6次/日</span>
            <span class="bg-label">喂养</span>
            <span class="bg-status">✅ 吸吮有力</span>
          </div>
          <div class="bg-item" @click="onBabyCare('睡眠')">
            <span class="bg-icon">😴</span>
            <span class="bg-num">16h/日</span>
            <span class="bg-label">睡眠</span>
            <span class="bg-status">✅ 规律</span>
          </div>
          <div class="bg-item" @click="onBabyCare('黄疸')">
            <span class="bg-icon">☀️</span>
            <span class="bg-num">✅</span>
            <span class="bg-label">黄疸</span>
            <span class="bg-status">已消退</span>
          </div>
          <div class="bg-item" @click="onBabyCare('便便')">
            <span class="bg-icon">💩</span>
            <span class="bg-num">3-4次/日</span>
            <span class="bg-label">便便</span>
            <span class="bg-status">✅ 正常</span>
          </div>
        </div>

        <!-- 成长曲线 -->
        <div class="growth-card" @click="showToast('📈 完整成长曲线')">
          <span class="gc-icon">📈</span>
          <div class="gc-info">
            <span class="gc-title">宝宝成长曲线</span>
            <span class="gc-desc">体重、身长变化趋势 · 查看详细数据</span>
          </div>
          <span class="gc-arrow">›</span>
        </div>

        <!-- 今日喂养记录 -->
        <div class="feed-card">
          <div class="fc-title">🍼 今日喂养记录</div>
          <div class="fc-item" v-for="(f,i) in feedings" :key="i">
            <span class="fc-time">{{ f.time }}</span>
            <span class="fc-type" :class="f.type">{{ f.type==='left'?'左侧':'右侧' }}</span>
            <span class="fc-duration">{{ f.duration }}min</span>
            <span class="fc-amount">{{ f.amount }}ml</span>
          </div>
        </div>
      </template>

      <button class="view-all-btn" @click="showToast('📅 完整护理日历')">📅 查看完整护理日历 ›</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from 'vant'

const mainTab = ref('mom')

const feedings = ref([
  { time:'06:30', type:'right', duration:15, amount:80 },
  { time:'09:00', type:'left', duration:18, amount:90 },
  { time:'11:30', type:'right', duration:12, amount:70 },
  { time:'14:00', type:'left', duration:20, amount:100 }
])

function goBack(){window.history.back()}

function onWoundDetail(){
  showDialog({ title:'🩹 伤口护理详情', message:'🟢 恢复良好\n\n📅 已护理12次\n📅 下次护理：今日15:00\n\n✅ 伤口无红肿\n✅ 愈合良好\n✅ 可正常淋浴\n\n💬 张阿姨说：宝妈恢复得很快，继续保持～', confirmButtonText:'知道了 💕', confirmButtonColor:'#F8A8B8' })
}

function onMilkDetail(){
  showDialog({ title:'🍼 通乳记录', message:'🟢 乳腺通畅\n\n📊 今日数据：\n• 排奶次数：6次\n• 总奶量：480ml\n• 单次最大：100ml\n\n✅ 乳房无硬块\n✅ 宝宝吸吮有力\n✅ 含接姿势正确\n\n💬 保持心情愉快，多喝汤水，奶量会越来越好～', confirmButtonText:'好的 💕', confirmButtonColor:'#F8A8B8' })
}

function onMoodDetail(){
  showDialog({ title:'💕 情绪记录', message:'😊 今日心情：开心\n😴 睡眠质量：7.5小时 良好\n📊 情绪评分：8/10\n\n💬 今天和妈妈视频了很开心，宝宝也很乖～\n\n🌟 保持好心情是最好的月子调理～', confirmButtonText:'好的 💕', confirmButtonColor:'#F8A8B8' })
}

function onBabyCare(type){
  const details = {
    '洗澡': { icon:'🛁', msg:'已洗 8 次，每隔一天洗一次\n\n✅ 水温37-38℃\n✅ 室温26-28℃\n✅ 洗完立即擦干\n✅ 脐带处注意防水\n\n张阿姨说：宝宝很喜欢洗澡，每次都很享受～' },
    '脐带': { icon:'🩹', msg:'已护理 8 次，现已自然脱落 ✅\n\n📅 脱落日期：06/10\n✅ 脐窝干燥\n✅ 无红肿\n✅ 无分泌物\n\n张阿姨说：脐带护理得很好，完全不用担心～' },
    '喂养': { icon:'🍼', msg:'纯母乳喂养·日均6次\n\n🍼 吸吮有力\n🍼 含接姿势正确\n🍼 每次10-15分钟\n🍼 大小便正常\n\n体重增长良好，说明吃得很好哦～' },
    '睡眠': { icon:'😴', msg:'日均睡眠 16 小时\n\n🌙 夜间睡眠：8-9小时\n☀️ 白天小睡：3-4次\n😴 睡眠规律：良好\n\n宝宝睡得好，妈妈也能休息好～' },
    '黄疸': { icon:'☀️', msg:'生理性黄疸 ✅ 已消退\n\n📅 出现时间：产后第3天\n📅 消退时间：产后第10天\n\n✅ 经皮胆红素值正常\n✅ 皮肤颜色正常\n✅ 精神状态良好\n\n完全不用担心～' },
    '便便': { icon:'💩', msg:'每日 3-4 次 · 性状正常\n\n✅ 颜色：金黄色\n✅ 性状：糊状\n✅ 气味：正常酸味\n\n张阿姨说：宝宝的便便很健康，说明消化吸收良好～' }
  }
  const d = details[type] || { icon:'👶', msg:'一切正常 ✅' }
  showDialog({ title:`${d.icon} ${type}护理详情`, message:d.msg, confirmButtonText:'知道了 💕', confirmButtonColor:'#F8A8B8' })
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:13px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:13px; color:#666; padding:12px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; margin-bottom:12px; line-height:1.6; }

/* 主Tab */
.main-tabs { display:flex; gap:8px; margin-bottom:12px; }
.mt-tab { flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:12px; background:#fff; border-radius:14px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); transition:all 0.2s; border:1.5px solid transparent; }
.mt-tab.active { border-color:#F8A8B8; background:#FFF8FA; }
.mt-icon { font-size:22px; }
.mt-label { font-size:14px; font-weight:600; color:#333; }
.mt-tab.active .mt-label { color:#F8A8B8; }
.mt-count { font-size:10px; color:#bbb; background:#F5F5F5; padding:1px 8px; border-radius:6px; }
.mt-tab.active .mt-count { background:#FFF0F3; color:#F8A8B8; }

/* 护理卡片（通用） */
.nurse-card { background:#fff; border-radius:16px; padding:14px; margin-bottom:8px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.nurse-card:active { transform:scale(0.98); }
.nc-header { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.nc-icon { font-size:20px; }
.nc-name { font-size:14px; font-weight:600; color:#333; flex:1; }
.nc-status { font-size:10px; padding:2px 8px; border-radius:4px; }
.nc-status.green { color:#52C41A; background:#F0FFF0; }
.nc-arrow { color:#ddd; font-size:14px; }
.nc-progress { margin-bottom:6px; }
.nc-pbar { height:4px; background:rgba(248,168,184,0.12); border-radius:2px; overflow:hidden; }
.nc-pfill { height:100%; background:linear-gradient(90deg,#F8A8B8,#E0C3FC); border-radius:2px; }
.nc-plabel { font-size:10px; color:#bbb; margin-top:2px; display:block; }
.nc-note { font-size:11px; color:#888; padding:6px 8px; background:#FFF8FA; border-radius:6px; font-style:italic; }

/* 通乳统计 */
.milk-stats { display:flex; align-items:center; background:#FFF8FA; border-radius:10px; padding:10px 0; }
.milk-stat { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
.ms-num { font-size:16px; font-weight:700; color:#F8A8B8; }
.ms-label { font-size:10px; color:#999; }
.ms-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }

/* 情绪摘要 */
.mood-summary { display:flex; gap:10px; }
.mood-today, .mood-sleep, .mood-score { font-size:12px; color:#666; background:#FFF8FA; padding:4px 10px; border-radius:6px; }

/* 宝宝概览 */
.baby-hero { display:flex; align-items:center; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:10px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.bh-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
.bh-label { font-size:10px; color:#999; }
.bh-val { font-size:13px; font-weight:600; color:#333; }
.bh-up { font-size:12px; }
.bh-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }

/* 宝宝6宫格 */
.baby-grid-detail { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:10px; }
.bg-item { display:flex; flex-direction:column; align-items:center; gap:3px; padding:14px 8px; background:#fff; border-radius:14px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.bg-item:active { transform:scale(0.95); }
.bg-icon { font-size:24px; }
.bg-num { font-size:15px; font-weight:700; color:#F8A8B8; }
.bg-label { font-size:11px; color:#333; font-weight:500; }
.bg-status { font-size:8px; color:#52C41A; }

/* 成长曲线 */
.growth-card { display:flex; align-items:center; gap:10px; padding:12px 14px; background:#fff; border-radius:14px; margin-bottom:10px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.growth-card:active { transform:scale(0.98); }
.gc-icon { font-size:22px; }
.gc-info { flex:1; }
.gc-title { font-size:13px; font-weight:600; color:#333; display:block; }
.gc-desc { font-size:10px; color:#bbb; display:block; margin-top:1px; }
.gc-arrow { color:#ddd; font-size:14px; }

/* 喂养记录 */
.feed-card { background:#fff; border-radius:16px; padding:14px; margin-bottom:10px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.fc-title { font-size:13px; font-weight:600; color:#333; margin-bottom:8px; }
.fc-item { display:flex; align-items:center; gap:6px; padding:5px 0; font-size:12px; color:#555; }
.fc-time { width:44px; color:#999; }
.fc-type { width:28px; padding:1px 4px; border-radius:3px; text-align:center; font-size:10px; }
.fc-type.left { color:#F8A8B8; background:#FFF0F3; }
.fc-type.right { color:#E0C3FC; background:#F8E8FF; }
.fc-duration { flex:1; text-align:center; color:#999; }
.fc-amount { width:40px; text-align:right; color:#F8A8B8; font-weight:500; }

.view-all-btn { width:100%; padding:12px; background:#fff; border:none; border-radius:12px; font-size:13px; color:#F8A8B8; font-weight:500; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.03); }
.view-all-btn:active { opacity:0.7; }
</style>
