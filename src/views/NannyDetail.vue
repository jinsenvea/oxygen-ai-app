<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回小筑</button>
      <span class="dp-title">🤱 月嫂服务</span>
      <button class="dp-action" @click="onContact">📞联系</button>
    </div>
    <div class="dp-body">
      <!-- 月嫂信息卡 -->
      <div class="nanny-hero">
        <div class="nanny-avatar">👩‍⚕️</div>
        <div class="nanny-info">
          <div class="nanny-name">张秀兰<span class="nanny-tag">⭐ 金牌月嫂</span></div>
          <div class="nanny-meta">5年经验 · 已服务86个家庭</div>
          <div class="nanny-tags">
            <span class="nt">📅 06/01-07/12</span>
            <span class="nt">❤️ 98分</span>
          </div>
        </div>
      </div>

      <!-- 进度 -->
      <div class="progress-card">
        <div class="pc-header">📅 服务第18天 / 共42天 <span class="pc-ratio">43%</span></div>
        <div class="pc-bar"><div class="pc-fill" style="width:43%"></div></div>
        <div class="pc-labels"><span>📅 06/01 开始</span><span>📅 07/12 结束</span></div>
      </div>

      <!-- 数据行 -->
      <div class="stats-card">
        <div class="stats-item" @click="showToast('📊 全部打卡')">
          <span class="stats-num">756</span>
          <span class="stats-label">服务打卡</span>
        </div>
        <div class="stats-div"></div>
        <div class="stats-item" @click="showToast('⭐ 评价详情')">
          <span class="stats-num">4.9</span>
          <span class="stats-label">综合评分</span>
        </div>
        <div class="stats-div"></div>
        <div class="stats-item" @click="showToast('⏰ 出勤记录')">
          <span class="stats-num">0</span>
          <span class="stats-label">缺勤</span>
        </div>
      </div>

      <!-- 功能菜单 -->
      <div class="menu-section">
        <div class="menu-item" @click="onServiceCalendar">
          <span class="mi-icon">📅</span>
          <span class="mi-text">服务日历</span>
          <span class="mi-desc">查看每日服务项目</span>
          <span class="mi-arrow">›</span>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="onBabyData">
          <span class="mi-icon">👶</span>
          <span class="mi-text">宝宝成长数据</span>
          <span class="mi-desc">体重·身高·喂养记录</span>
          <span class="mi-arrow">›</span>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="onMealPlan">
          <span class="mi-icon">🍱</span>
          <span class="mi-text">月子餐计划</span>
          <span class="mi-desc">本周餐单·营养搭配</span>
          <span class="mi-arrow">›</span>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="onNannyNote">
          <span class="mi-icon">💬</span>
          <span class="mi-text">沟通记录</span>
          <span class="mi-desc">与张阿姨的聊天内容</span>
          <span class="mi-arrow">›</span>
        </div>
      </div>

      <!-- 今日服务内容 -->
      <div class="today-card">
        <div class="today-title">📋 今日服务 · 06/13</div>
        <div class="today-item" v-for="(t,i) in todayTasks" :key="i">
          <span class="today-check" :class="{ done: t.done }">{{ t.done ? '✅' : '⏳' }}</span>
          <span class="today-text" :class="{ done: t.done }">{{ t.name }}</span>
          <span class="today-time">{{ t.time }}</span>
        </div>
      </div>

      <!-- 张阿姨的话 -->
      <div class="nanny-quote">
        <span class="nq-icon">💕</span>
        <div class="nq-text">「照顾宝妈和宝宝是我的责任，每天看着宝宝一点点长大，就是最幸福的事～」</div>
      </div>

      <button class="chat-btn" @click="onContact">💬 给张阿姨留言</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from 'vant'
const todayTasks = ref([
  { name:'早餐准备', time:'07:30', done:true },
  { name:'宝宝洗澡+抚触', time:'08:30', done:true },
  { name:'伤口护理', time:'09:30', done:true },
  { name:'加餐准备', time:'10:30', done:true },
  { name:'午餐准备', time:'11:30', done:true },
  { name:'伤口护理', time:'15:00', done:false }
])
function goBack(){window.history.back()}
function onContact(){
  showDialog({ title:'🤱 联系张阿姨', message:'💬 在线留言：随时发送，看到就会回复\n📞 紧急联系：400-800-8888\n\n💕 非紧急问题建议留言，张阿姨正在照顾宝宝', confirmButtonText:'💬 去留言', cancelButtonText:'📞 打电话', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(() => showToast('💬 跳转对话页')).catch(() => showToast('📞 400-800-8888'))
}
function onServiceCalendar(){showToast('📅 服务日历即将上线')}
function onBabyData(){showToast('👶 宝宝成长数据即将上线')}
function onMealPlan(){window.location.hash='#/meal-record'}
function onNannyNote(){showToast('💬 沟通记录即将上线')}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.nanny-hero { display:flex; gap:14px; padding:16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:18px; margin-bottom:12px; }
.nanny-avatar { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E0C3FC); display:flex; align-items:center; justify-content:center; font-size:30px; flex-shrink:0; box-shadow:0 3px 10px rgba(248,168,184,0.3); }
.nanny-info { flex:1; }
.nanny-name { font-size:18px; font-weight:700; color:#333; display:flex; align-items:center; gap:6px; }
.nanny-tag { font-size:10px; color:#F8A8B8; background:#fff; padding:1px 6px; border-radius:4px; font-weight:500; }
.nanny-meta { font-size:12px; color:#888; margin:4px 0; }
.nanny-tags { display:flex; gap:4px; }
.nt { font-size:10px; color:#666; background:rgba(255,255,255,0.6); padding:2px 8px; border-radius:4px; }
.progress-card { background:#fff; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.pc-header { font-size:13px; font-weight:500; color:#333; margin-bottom:8px; display:flex; align-items:center; gap:8px; }
.pc-ratio { font-size:12px; color:#F8A8B8; font-weight:700; }
.pc-bar { height:6px; background:rgba(248,168,184,0.12); border-radius:3px; overflow:hidden; }
.pc-fill { height:100%; background:linear-gradient(90deg,#F8A8B8,#E0C3FC); border-radius:3px; }
.pc-labels { display:flex; justify-content:space-between; font-size:10px; color:#bbb; margin-top:4px; }
.stats-card { display:flex; align-items:center; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.stats-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; cursor:pointer; }
.stats-item:active { opacity:0.6; }
.stats-num { font-size:22px; font-weight:700; color:#F8A8B8; }
.stats-label { font-size:11px; color:#999; }
.stats-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }
.menu-section { background:#fff; border-radius:14px; overflow:hidden; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.menu-item { display:flex; align-items:center; gap:10px; padding:14px 16px; cursor:pointer; }
.menu-item:active { background:#FFF8FA; }
.mi-icon { font-size:20px; width:28px; text-align:center; }
.mi-text { font-size:14px; font-weight:500; color:#333; }
.mi-desc { flex:1; text-align:right; font-size:11px; color:#bbb; }
.mi-arrow { color:#ddd; font-size:14px; }
.menu-divider { height:1px; background:#F5F5F5; margin:0 16px; }
.today-card { background:#fff; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.today-title { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; }
.today-item { display:flex; align-items:center; gap:8px; padding:5px 0; font-size:13px; }
.today-check { font-size:12px; width:24px; }
.today-text { flex:1; color:#555; }
.today-text.done { color:#bbb; }
.today-time { font-size:11px; color:#bbb; }
.nanny-quote { display:flex; gap:8px; padding:12px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; margin-bottom:12px; }
.nq-icon { font-size:18px; }
.nq-text { font-size:13px; color:#888; line-height:1.6; font-style:italic; }
.chat-btn { width:100%; padding:14px; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; border-radius:12px; font-size:14px; color:#fff; font-weight:500; cursor:pointer; }
</style>
