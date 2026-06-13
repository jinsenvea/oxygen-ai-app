<template>
  <div class="tab-nest fade-in">
    <div class="page-container">

      <!-- ===== 温馨小窝头部 ===== -->
      <div class="nest-header">
        <div class="nh-bg-deco"></div>
        <div class="nh-content">
          <div class="nh-top" @click="onAvatarClick">
            <div class="nh-avatar">👩</div>
            <div class="nh-info">
              <div class="nh-name">{{ userInfo.nickname }}<span class="nh-badge">VIP</span></div>
              <div class="nh-meta">{{ userInfo.pregnancyWeek }} · 已和氧宝相伴 126 天</div>
            </div>
            <div class="nh-setting" @click.stop="onSettingClick('account')">⚙️</div>
          </div>
        </div>

        <div class="nh-acts">
          <div class="nh-act" @click="onStatClick('appointments')">
            <span class="nh-act-num">{{ serviceStatus.appointments }}</span>
            <span class="nh-act-label">我的预约</span>
          </div>
          <div class="nh-act-div"></div>
          <div class="nh-act" @click="onStatClick('inProgress')">
            <span class="nh-act-num">{{ serviceStatus.inProgress }}</span>
            <span class="nh-act-label">服务中</span>
          </div>
          <div class="nh-act-div"></div>
          <div class="nh-act" @click="onStatClick('completed')">
            <span class="nh-act-num">{{ serviceStatus.completed }}</span>
            <span class="nh-act-label">已完成</span>
          </div>
        </div>
      </div>

      <!-- ===== 爱巢服务卡片 ===== -->
      <div class="cozy-card">
        <div class="cozy-title" @click="onNannyDetail">
          <span>🏡 爱巢服务</span>
          <span class="cozy-sub">月嫂张阿姨 · 服务第18天 ›</span>
        </div>
        <div class="cozy-progress">
          <div class="cozy-pbar"><div class="cozy-pfill" style="width:43%"></div></div>
          <div class="cozy-plabel"><span>📅 06/01</span><span>📅 07/12</span></div>
        </div>
        <div class="cozy-grid">
          <div class="cozy-gitem" @click="onReportClick">
            <span class="cozy-gicon">📋</span>
            <span class="cozy-glabel">产检报告</span>
            <span class="cozy-gnum">3份</span>
          </div>
          <div class="cozy-gitem" @click="onNursingClick">
            <span class="cozy-gicon">🩹</span>
            <span class="cozy-glabel">护理报告</span>
            <span class="cozy-gnum">4项</span>
          </div>
          <div class="cozy-gitem" @click="onMealClick">
            <span class="cozy-gicon">🍱</span>
            <span class="cozy-glabel">今日餐单</span>
            <span class="cozy-gnum">5餐</span>
          </div>
          <div class="cozy-gitem" @click="onBodyClick">
            <span class="cozy-gicon">💪</span>
            <span class="cozy-glabel">身材记录</span>
            <span class="cozy-gnum">3次</span>
          </div>
        </div>
        <div class="cozy-nanny">
          <div class="cn-item" @click="onNannyScore"><span class="cn-label">月嫂评分</span><span class="cn-val">98分</span></div>
          <div class="cn-div"></div>
          <div class="cn-item" @click="onNannyCheckin"><span class="cn-label">服务打卡</span><span class="cn-val">756次</span></div>
          <div class="cn-div"></div>
          <div class="cn-item" @click="onNannyAbsence"><span class="cn-label">缺勤</span><span class="cn-val green">0次</span></div>
        </div>
      </div>

      <!-- ===== 今日小确幸 ===== -->
      <div class="happy-card">
        <div class="happy-icon">☀️</div>
        <div class="happy-content">
          <div class="happy-label">今日小确幸 💕</div>
          <div class="happy-text">{{ happyText }}</div>
          <div class="happy-actions">
            <span v-for="mood in moods" :key="mood.label" class="happy-tag" @click="onMoodClick(mood)">{{ mood.icon }} {{ mood.label }}</span>
          </div>
        </div>
      </div>

      <!-- ===== 最近服务 ===== -->
      <div class="status-card">
        <div class="status-header">
          <span>📋 最近服务</span>
          <span class="status-more" @click="goToOrders">查看全部 ›</span>
        </div>
        <div class="status-list">
          <div class="status-item" @click="onOrderClick(orderData[0])">
            <span class="si-icon">🤱</span>
            <div class="si-info"><span class="si-name">月嫂见面会 · 天河店</span><span class="si-date">06/15 10:00 待确认</span></div>
            <span class="si-badge yellow">⏳ 待确认</span>
          </div>
          <div class="status-item" @click="onOrderClick(orderData[1])">
            <span class="si-icon">💆</span>
            <div class="si-info"><span class="si-name">产康体验 · 盆底肌修复</span><span class="si-date">06/12 14:00 已确认</span></div>
            <span class="si-badge green">🟢 已确认</span>
          </div>
          <div class="status-item" @click="onOrderClick(orderData[2])">
            <span class="si-icon">✅</span>
            <div class="si-info"><span class="si-name">孕期按摩 · 3次套餐</span><span class="si-date">06/01 已完成</span></div>
            <span class="si-badge gray">✅ 已完成</span>
          </div>
        </div>
      </div>

      <!-- ===== 一家人旅程 ===== -->
      <div class="family-card" @click="onFamilyClick">
        <div class="family-left">
          <span class="family-icon">🌸</span>
          <div class="family-info">
            <div class="family-title">一家人的成长旅程</div>
            <div class="family-desc">4篇日记 · 5个里程碑 · 3枚勋章</div>
          </div>
        </div>
        <div class="family-right">
          <span class="family-btn">去看看 ›</span>
        </div>
      </div>

      <!-- ===== 快捷入口 ===== -->
      <div class="quick-row">
        <div class="quick-chip" @click="onChatHistory">
          <span class="qc-icon blue">💬</span>
          <span class="qc-label">对话历史</span>
        </div>
        <div class="quick-chip" @click="onContactNanny">
          <span class="qc-icon purple">🤱</span>
          <span class="qc-label">联系月嫂</span>
        </div>
        <div class="quick-chip" @click="onHealthClick">
          <span class="qc-icon green">📁</span>
          <span class="qc-label">健康档案</span>
        </div>
        <div class="quick-chip" @click="onInviteFamily">
          <span class="qc-icon pink">🏠</span>
          <span class="qc-label">邀请家人</span>
        </div>
      </div>

      <!-- ===== 设置入口 ===== -->
      <div class="settings-row">
        <span @click="onSettingClick('account')">👤 账号设置</span>
        <span class="s-dot">·</span>
        <span @click="onSettingClick('ai')">🤖 AI对话</span>
        <span class="s-dot">·</span>
        <span @click="onSettingClick('about')">ℹ️ 关于氧阁</span>
      </div>

      <div style="height:16px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from 'vant'
import { userInfo, serviceStatus } from '../mock/data.js'

/* ========== 情绪数据 ========== */
const moods = [
  { icon: '😊', label: '开心', reply: '太棒了！开心是最好的胎教，宝宝也能感受到妈妈的快乐哦～ 💕' },
  { icon: '😴', label: '有点累', reply: '抱抱～孕育生命真的很辛苦，今天就多休息一会儿吧，氧宝陪着你 🫂' },
  { icon: '🥰', label: '感动', reply: '孕育的每一天都是奇迹，这份感动会伴随宝宝一生呢 ✨' },
  { icon: '💪', label: '加油', reply: '加油！每一天都在为宝宝努力，你是最棒的妈妈 🌟' }
]

const happyTexts = [
  '宝宝今天第一次对你笑了吗？😊',
  '今天的小惊喜：宝宝在肚子里踢了6下！👶',
  '好好吃一顿营养餐，就是对自己最好的爱 🥰',
  '每一次深呼吸，都是和宝宝最亲密的对话 🌸',
  '你的身体正在创造一个小小的奇迹，真了不起 ✨'
]

const happyText = ref(happyTexts[Math.floor(Math.random() * happyTexts.length)])

const orderData = [
  { id:'1', icon: '🤱', name: '月嫂见面会', store: '天河店', date: '2026/06/15', time: '10:00', status: 'pending', statusText: '⏳ 待确认' },
  { id:'2', icon: '💆', name: '产康体验·盆底肌修复', store: '海珠店', date: '2026/06/12', time: '14:00', status: 'confirmed', statusText: '🟢 已确认' },
  { id:'3', icon: '✅', name: '孕期按摩·3次套餐', store: '天河店', date: '2026/06/01', time: '', status: 'done', statusText: '✅ 已完成' }
]

/* ========== 1. 头像点击 - 编辑资料 ========== */
function onAvatarClick() {
  showDialog({
    title: '👩 欢迎回到小筑 💕',
    message: `${userInfo.nickname}，你和宝宝已经一起走过了 ${userInfo.pregnancyWeek.replace('孕','').replace('+','周+')} 的奇妙旅程～\n\n这里是你和氧阁的小家，每一份服务、每一次记录，都是我们对你和宝宝的用心守护。`,
    confirmButtonText: '编辑个人资料',
    cancelButtonText: '看看相伴天数',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    showToast('✏️ 个人资料编辑即将开放')
  }).catch(() => {
    showDialog({
      title: '📅 相伴126天',
      message: '从你第一次打开氧阁到现在，已经126天了 💕\n\n这126天里：\n📋 我们为你解读了 3 份产检报告\n🤱 帮你预约了月嫂见面会\n📝 陪你记录了 4 篇孕育日记\n\n未来的每一天，氧宝都会在这里 🏡',
      confirmButtonText: '❤️ 谢谢氧宝',
      confirmButtonColor: '#F8A8B8'
    })
  })
}

/* ========== 2. 统计点击 ========== */
function onStatClick(type) {
  const titles = {
    appointments: '📅 我的预约',
    inProgress: '🏠 服务中',
    completed: '✅ 已完成'
  }
  const messages = {
    appointments: `您当前有 ${serviceStatus.appointments} 个预约\n\n1️⃣ 月嫂见面会 · 天河店 ⏳\n2️⃣ 产康体验 · 海珠店 🟢\n\n氧宝温馨提醒：记得提前15分钟到店哦，有什么需要随时找我～`,
    inProgress: `您当前有 ${serviceStatus.inProgress} 个服务进行中\n\n1️⃣ 月嫂张阿姨 · 服务第18天/42天\n2️⃣ 产康修复 · 正在进行第3次/10次\n\n张阿姨说：宝妈今天气色很好，继续保持哦 💪`,
    completed: `已完成 ${serviceStatus.completed} 个服务 🎉\n\n1️⃣ 孕期按摩·3次套餐 ✅\n2️⃣ 孕期营养咨询 ✅\n3️⃣ 孕早期检查套餐 ✅\n\n每一次选择，都是对我们的信任，谢谢你 💕`
  }
  showDialog({
    title: titles[type],
    message: messages[type],
    confirmButtonText: '查看详情',
    cancelButtonText: '关闭',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => goToOrders()).catch(() => {})
}

/* ========== 3. 爱巢服务标题 ========== */
function onNannyDetail() {
  window.location.hash = '#/nanny-detail'
}

/* ========== 4. 产检报告 ========== */
function onReportClick() {
  window.location.hash = '#/report-list'
}

/* ========== 5. 护理报告 ========== */
function onNursingClick() {
  window.location.hash = '#/nursing-report'
}

/* ========== 6. 今日餐单 ========== */
function onMealClick() {
  window.location.hash = '#/meal-record'
}

/* ========== 7. 身材变化 ========== */
function onBodyClick() {
  window.location.hash = '#/body-record'
}

/* ========== 8. 月嫂评分/打卡/缺勤 ========== */
function onNannyScore() {
  showDialog({
    title: '⭐ 月嫂综合评分',
    message: '张秀兰阿姨 · 综合评分 98分 🏆\n\n📊 评分维度：\n❤️ 专业能力：4.9/5.0\n❤️ 服务态度：5.0/5.0\n❤️ 沟通能力：4.8/5.0\n❤️ 宝宝护理：5.0/5.0\n❤️ 月子餐：4.9/5.0\n\n来自 28 位宝妈的真实评价 💕',
    confirmButtonText: '查看全部评价',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => showToast('📋 全部评价即将上线')).catch(() => {})
}

function onNannyCheckin() {
  window.location.hash = '#/nanny-detail'
}

function onNannyAbsence() {
  showDialog({
    title: '⏰ 出勤记录',
    message: '张阿姨出勤率 100% 🎉\n\n服务18天以来：\n⏰ 准时到岗：18/18 天\n❌ 缺勤：0 次\n⏳ 迟到：0 次\n📋 请假：0 次\n\n张阿姨说：「照顾宝妈和宝宝是我的责任，每天能看着宝宝一点点长大，是最幸福的事 💕」',
    confirmButtonText: '给张阿姨点赞 👍',
    confirmButtonColor: '#F8A8B8'
  }).then(() => showToast('👍 已点赞！张阿姨收到了你的鼓励 💕'))
}

/* ========== 9. 今日小确幸 ========== */
function onMoodClick(mood) {
  showDialog({
    title: `${mood.icon} ${mood.label}`,
    message: mood.reply + '\n\n氧宝已悄悄记下今天的心情，它将成为你孕育旅程中温暖的一页 📖',
    confirmButtonText: '好的 💕',
    cancelButtonText: '我想多说几句',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {}).catch(() => {
    showDialog({
      title: '💬 和氧宝聊聊',
      message: '想和氧宝说说心里话吗？我随时都在这里听着～\n\n👂 开心的、不开心的、担心的、期待的……\n什么都可以跟我说哦 💕',
      confirmButtonText: '去找氧宝聊天',
      confirmButtonColor: '#F8A8B8'
    }).then(() => goToChat()).catch(() => {})
  })
}

/* ========== 10. 服务单点击 ========== */
function onOrderClick(order) {
  window.location.hash = `#/order-detail/${order.id}`
}

/* ========== 11. 一家人旅程 ========== */
function onFamilyClick() {
  showDialog({
    title: '🌸 一家人的成长旅程',
    message: '这是你和家人一起走过的孕育时光 💕\n\n📝 已记录 4 篇孕育日记\n🏆 完成 5 个里程碑打卡\n🎖️ 获得 3 枚成长勋章\n📸 珍藏 12 张珍贵照片\n\n每一次记录，都是未来最珍贵的回忆。\n等宝宝长大了，可以告诉TA：\n「你看，这是你在妈妈肚子里的故事哦」👶',
    confirmButtonText: '去看看 ›',
    cancelButtonText: '邀请家人一起',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => goToJourney()).catch(() => {
    showDialog({
      title: '👨‍👩‍👧‍👦 邀请家人',
      message: '邀请老公、爸妈一起加入你们的成长旅程 🏡\n\n家人可以看到：\n🌸 回忆相册 · 📝 孕育日记\n🏆 里程碑 · 🎖️ 勋章墙\n\n扫码即可加入，无需注册～',
      confirmButtonText: '邀请家人',
      confirmButtonColor: '#F8A8B8'
    }).then(() => showToast('✅ 邀请链接已生成，分享给家人吧！💕')).catch(() => {})
  })
}

/* ========== 12. 快速入口 ========== */
function onChatHistory() {
  showDialog({
    title: '💬 最近对话',
    message: '最近的聊天记录 📝\n\n1️⃣ 产后修复方案 · 2小时前\n2️⃣ 孕晚期脚肿怎么办 · 昨天\n3️⃣ 预约月嫂见面会 · 3天前\n4️⃣ 四维彩超报告解读 · 1周前\n\n氧宝记得你问过的每一个问题 💕',
    confirmButtonText: '去聊天',
    cancelButtonText: '查看全部',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => goToChat()).catch(() => {})
}

function onContactNanny() {
  showDialog({
    title: '🤱 联系月嫂',
    message: '张秀兰阿姨 · 当前在线 🟢\n\n💬 在线留言：随时发送，张阿姨看到就会回复\n📞 紧急联系：400-800-8888\n\n💕 温馨提醒：非紧急问题建议文字留言，张阿姨正在照顾宝宝，看到后会第一时间回复你～',
    confirmButtonText: '💬 给张阿姨留言',
    cancelButtonText: '📞 打电话',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => goToChat()).catch(() => showToast('📞 400-800-8888'))
}

function onHealthClick() {
  showDialog({
    title: '📁 健康档案',
    message: '已完善 70% · 继续加油 💪\n\n✅ 基本信息 · 已完成\n✅ 孕周信息 · 已完成\n✅ 既往病史 · 已完成\n⏳ 产检记录 · 待补充 2 份\n⏳ 家族病史 · 待补充\n\n完善健康档案后，氧宝能给你更精准的孕产建议哦～',
    confirmButtonText: '去完善',
    cancelButtonText: '下次再说',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => showToast('📝 档案编辑即将上线，氧宝正在努力开发中 💕')).catch(() => {})
}

function onInviteFamily() {
  showDialog({
    title: '🏠 邀请家人回到小筑',
    message: '一个人的幸福，分享给爱的人就变成了双倍 💕\n\n邀请老公、爸妈、公婆一起加入你们的小筑：\n\n👨 爸爸可以：\n   看到宝宝的成长记录、产检进展\n\n👵 爷爷奶奶可以：\n   看到宝宝的B超照片、每日日记\n\n选择邀请方式：',
    confirmButtonText: '📤 分享到微信',
    cancelButtonText: '👨‍👩‍👧 生成邀请二维码',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => showToast('✅ 微信邀请链接已生成，分享给家人吧！')).catch(() => showToast('📱 邀请二维码已生成'))
}

/* ========== 导航 ========== */
function goToOrders() { window.location.hash = '#/order-list' }
function goToJourney() { window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'footprint' })) }
function goToChat() { window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' })) }

function onSettingClick(type) {
  const settingNames = { account: '账号设置', ai: 'AI对话管理', about: '关于氧阁' }
  showDialog({
    title: `⚙️ ${settingNames[type]}`,
    message: `即将前往「${settingNames[type]}」页面\n\n在这里你可以管理自己的账号信息、AI对话偏好，和了解氧阁的故事 💕`,
    confirmButtonText: '去看看',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    if (type === 'account') window.location.hash = '#/setting/account'
    else if (type === 'ai') window.location.hash = '#/setting/ai'
    else if (type === 'about') window.location.hash = '#/setting/about'
  }).catch(() => {})
}
</script>

<style scoped>
.tab-nest { height:100%; display:flex; flex-direction:column; background: #FFF8FA; }
.page-container { padding-bottom:110px; }

/* ===== 温馨小窝头部 ===== */
.nest-header { position:relative; padding:48px 16px 16px; overflow:hidden; }
.nh-bg-deco { position:absolute; inset:0; background:linear-gradient(145deg, #FDF0F3 0%, #F8E8FF 50%, #FFF0F3 100%); border-radius:0 0 36px 36px; }
.nh-bg-deco::before { content:''; position:absolute; top:-80px; right:-60px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle, rgba(248,168,184,0.12), transparent); }
.nh-bg-deco::after { content:''; position:absolute; bottom:-40px; left:-30px; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle, rgba(224,195,252,0.1), transparent); }
.nh-content { position:relative; z-index:1; }
.nh-top { display:flex; align-items:center; gap:12px; margin-bottom:16px; cursor:pointer; }
.nh-avatar { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E0C3FC); display:flex; align-items:center; justify-content:center; font-size:26px; box-shadow:0 3px 12px rgba(248,168,184,0.3); cursor:pointer; flex-shrink:0; }
.nh-avatar:active { transform:scale(0.95); }
.nh-info { flex:1; }
.nh-name { font-size:18px; font-weight:700; color:#333; display:flex; align-items:center; gap:6px; }
.nh-badge { font-size:8px; background:linear-gradient(135deg,#FFD700,#FFA500); color:#fff; padding:1px 6px; border-radius:4px; font-weight:700; }
.nh-meta { font-size:12px; color:#aaa; margin-top:2px; }
.nh-setting { font-size:18px; cursor:pointer; opacity:0.4; transition:opacity 0.2s; }
.nh-setting:active { opacity:1; }

.nh-acts { display:flex; align-items:center; background:rgba(255,255,255,0.65); backdrop-filter:blur(12px); border-radius:14px; padding:10px 0; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.4); }
.nh-acts:active { transform:scale(0.97); }
.nh-act { flex:1; display:flex; flex-direction:column; align-items:center; gap:1px; cursor:pointer; }
.nh-act:active { opacity:0.6; }
.nh-act-num { font-size:20px; font-weight:700; color:#F8A8B8; }
.nh-act-label { font-size:10px; color:#999; }
.nh-act-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }

/* ===== 温馨卡片 ===== */
.cozy-card { margin:12px 16px 0; background:linear-gradient(145deg,#FFFFFF,#FFF8FA); border-radius:20px; padding:16px 16px 14px; box-shadow:0 2px 12px rgba(248,168,184,0.08); border:1px solid rgba(248,168,184,0.06); }
.cozy-title { display:flex; align-items:center; justify-content:space-between; font-size:14px; font-weight:600; color:#333; margin-bottom:8px; cursor:pointer; }
.cozy-title:active { opacity:0.6; }
.cozy-sub { font-size:10px; color:#bbb; font-weight:400; }
.cozy-progress { margin-bottom:12px; }
.cozy-pbar { height:4px; background:rgba(248,168,184,0.12); border-radius:2px; overflow:hidden; }
.cozy-pfill { height:100%; background:linear-gradient(90deg,#F8A8B8,#E0C3FC); border-radius:2px; }
.cozy-plabel { display:flex; justify-content:space-between; font-size:9px; color:#bbb; margin-top:3px; }
.cozy-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:8px; margin-bottom:10px; }
.cozy-gitem { display:flex; flex-direction:column; align-items:center; gap:4px; padding:10px 4px; background:linear-gradient(135deg,#FFF8FA,#FFF0F3); border-radius:12px; cursor:pointer; transition:all 0.2s; }
.cozy-gitem:active { transform:scale(0.93); background:linear-gradient(135deg,#F8A8B8,#E8889E); }
.cozy-gitem:active .cozy-glabel,
.cozy-gitem:active .cozy-gnum { color:#fff; }
.cozy-gicon { font-size:22px; }
.cozy-glabel { font-size:10px; color:#666; font-weight:500; }
.cozy-gnum { font-size:10px; color:#F8A8B8; font-weight:600; }
.cozy-nanny { display:flex; align-items:center; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:10px; padding:8px 0; cursor:pointer; }
.cn-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:1px; cursor:pointer; padding:4px 0; }
.cn-item:active { opacity:0.6; }
.cn-label { font-size:9px; color:#999; }
.cn-val { font-size:15px; font-weight:700; color:#F8A8B8; }
.cn-val.green { color:#52C41A; }
.cn-div { width:1px; height:16px; background:rgba(248,168,184,0.12); }

/* ===== 今日小确幸 ===== */
.happy-card { margin:10px 16px 0; background:linear-gradient(135deg,#FFF8F0,#FFF0F3); border-radius:18px; padding:14px 16px; display:flex; gap:12px; align-items:flex-start; border:1px solid rgba(248,168,184,0.08); }
.happy-icon { font-size:28px; flex-shrink:0; margin-top:2px; }
.happy-content { flex:1; }
.happy-label { font-size:13px; font-weight:600; color:#E8889E; margin-bottom:2px; }
.happy-text { font-size:13px; color:#666; margin-bottom:6px; }
.happy-actions { display:flex; gap:6px; flex-wrap:wrap; }
.happy-tag { font-size:11px; padding:4px 12px; background:#fff; border-radius:14px; color:#888; cursor:pointer; transition:all 0.2s; border:1px solid rgba(248,168,184,0.08); }
.happy-tag:active { background:#F8A8B8; color:#fff; border-color:#F8A8B8; transform:scale(0.95); }

/* ===== 最近服务 ===== */
.status-card { margin:10px 16px 0; background:#fff; border-radius:18px; padding:14px 16px; box-shadow:0 1px 6px rgba(0,0,0,0.04); }
.status-header { display:flex; align-items:center; justify-content:space-between; font-size:14px; font-weight:600; color:#333; margin-bottom:8px; }
.status-more { font-size:11px; color:#bbb; font-weight:400; cursor:pointer; }
.status-more:active { color:#F8A8B8; }
.status-list { display:flex; flex-direction:column; gap:6px; }
.status-item { display:flex; align-items:center; gap:10px; padding:8px 10px; background:#FFF8FA; border-radius:10px; cursor:pointer; }
.status-item:active { opacity:0.6; }
.si-icon { font-size:18px; }
.si-info { flex:1; display:flex; flex-direction:column; }
.si-name { font-size:13px; color:#333; }
.si-date { font-size:10px; color:#bbb; margin-top:1px; }
.si-badge { font-size:9px; padding:2px 8px; border-radius:6px; font-weight:500; }
.si-badge.yellow { color:#FAAD14; background:#FFF8F0; }
.si-badge.green { color:#52C41A; background:#F0FFF0; }
.si-badge.gray { color:#999; background:#F5F5F5; }

/* ===== 一家人旅程 ===== */
.family-card { margin:10px 16px 0; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; }
.family-card:active { transform:scale(0.98); }
.family-left { display:flex; align-items:center; gap:10px; }
.family-icon { font-size:24px; }
.family-title { font-size:13px; font-weight:600; color:#333; }
.family-desc { font-size:10px; color:#999; margin-top:1px; }
.family-btn { font-size:11px; color:#F8A8B8; font-weight:500; padding:4px 10px; background:rgba(255,255,255,0.6); border-radius:8px; }

/* ===== 快捷入口 ===== */
.quick-row { margin:10px 16px 0; display:flex; gap:8px; }
.quick-chip { display:flex; align-items:center; gap:4px; flex:1; padding:10px 6px; background:#fff; border-radius:12px; justify-content:center; cursor:pointer; transition:all 0.2s; box-shadow:0 1px 4px rgba(0,0,0,0.03); }
.quick-chip:active { transform:scale(0.95); background:#FFF8FA; }
.qc-icon { font-size:14px; width:24px; height:24px; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.qc-icon.blue { background:#E8F4FF; }
.qc-icon.purple { background:#F0E6FF; }
.qc-icon.green { background:#E8FFE8; }
.qc-icon.pink { background:#FFF0F3; }
.qc-label { font-size:11px; color:#666; font-weight:500; }

/* ===== 设置 ===== */
.settings-row { margin:14px 16px 0; display:flex; align-items:center; justify-content:center; gap:6px; font-size:12px; color:#bbb; }
.settings-row span { cursor:pointer; padding:4px 2px; }
.settings-row span:active { color:#F8A8B8; }
.s-dot { color:#eee; }
</style>
