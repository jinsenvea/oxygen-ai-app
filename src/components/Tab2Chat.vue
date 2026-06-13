<template>
  <div class="tab-chat fade-in">
    <!-- ===== 内容区 ===== -->
    <div class="chat-messages" ref="msgContainer" @scroll="onScroll">
      <!-- 初始空白态 -> 展示氧宝形象引导提问 -->
      <div v-if="messages.length === 0" class="welcome-section">
        <div class="welcome-bg">
          <div class="welcome-circle c1"></div>
          <div class="welcome-circle c2"></div>
          <div class="welcome-circle c3"></div>
        </div>

        <div class="oxygen-character">
          <div class="character-container">
            <div class="character-glow"></div>
            <div class="character-body">
              <div class="char-face">
                <div class="char-eye left-eye"></div>
                <div class="char-eye right-eye"></div>
                <div class="char-mouth"></div>
                <div class="char-blush left-blush"></div>
                <div class="char-blush right-blush"></div>
              </div>
              <div class="char-body-shape">
                <div class="char-heart">💕</div>
              </div>
            </div>
          </div>
          <div class="character-label">氧宝</div>
        </div>

        <div class="welcome-text">
          <div class="welcome-title">Hi~ 孕妈妈 <span class="wave-hand">👋</span></div>
          <div class="welcome-subtitle">今天有什么想知道的吗？</div>
          <div class="welcome-desc">随便问，氧宝随时在线为你解答 💕</div>
        </div>

        <div class="divider-bear">
          <span class="bear-icon">🧸</span>
          <span class="divider-line"></span>
          <span class="bear-text">试试问这些</span>
          <span class="divider-line"></span>
          <span class="bear-icon">🧸</span>
        </div>

        <div class="quick-questions">
          <div class="quick-q-row">
            <div class="quick-bubble bubble-left" @click="sendMessage(quickQuestions[0])">
              <span class="bubble-icon">🦶</span>
              <span>{{ quickQuestions[0] }}</span>
            </div>
            <div class="quick-bubble bubble-right" @click="sendMessage(quickQuestions[1])">
              <span class="bubble-icon">🤱</span>
              <span>{{ quickQuestions[1] }}</span>
            </div>
          </div>
          <div class="quick-q-row">
            <div class="quick-bubble bubble-left" @click="sendMessage(quickQuestions[2])">
              <span class="bubble-icon">📋</span>
              <span>{{ quickQuestions[2] }}</span>
            </div>
            <div class="quick-bubble bubble-right" @click="sendMessage(quickQuestions[3])">
              <span class="bubble-icon">👶</span>
              <span>{{ quickQuestions[3] }}</span>
            </div>
          </div>
          <div class="quick-q-row">
            <div class="quick-bubble bubble-left" @click="sendMessage(quickQuestions[4])">
              <span class="bubble-icon">🍲</span>
              <span>{{ quickQuestions[4] }}</span>
            </div>
            <div class="quick-bubble bubble-right" @click="sendMessage(quickQuestions[5])">
              <span class="bubble-icon">💆</span>
              <span>{{ quickQuestions[5] }}</span>
            </div>
          </div>
        </div>

        <div class="safety-tip">
          <span class="tip-icon">🛡️</span>
          <span>您的每次咨询都严格保密</span>
        </div>
      </div>

      <!-- ===== 有消息时的对话区 ===== -->
      <template v-else>
        <div class="chat-tip-bar">
          <span class="tip-avatar">🐣</span>
          <span class="tip-text">继续问氧宝吧，我一直在这里～</span>
        </div>

        <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-wrapper"
          :class="{ 'is-user': msg.role === 'user', 'is-ai': msg.role === 'ai' }"
        >
          <div v-if="msg.role === 'ai'" class="msg-avatar-wrap">
            <div class="msg-avatar">🐣</div>
          </div>
          <div class="msg-content">
            <div class="msg-bubble" :class="{ 'user-bubble': msg.role === 'user', 'ai-bubble': msg.role === 'ai' }">
              <div v-if="msg.type === 'text' && msg.status !== 'loading'" class="msg-text" v-html="formatContent(msg.content)"></div>
              <div v-if="msg.status === 'loading'" class="loading-dots">
                <span class="dot dot1"></span>
                <span class="dot dot2"></span>
                <span class="dot dot3"></span>
                <span class="loading-text">氧宝正在输入...</span>
              </div>
            </div>
            <div v-if="msg.quickReplies" class="quick-replies">
              <div v-for="(reply, idx) in msg.quickReplies" :key="idx" class="quick-reply-btn" @click="sendMessage(reply.value)">{{ reply.label }}</div>
            </div>
            <div v-if="msg.serviceCard" class="service-card" @click="onServiceClick(msg.serviceCard)">
              <div class="service-card-img">🏥</div>
              <div class="service-card-info">
                <div class="service-card-title">{{ msg.serviceCard.title }}</div>
                <div class="service-card-desc">{{ msg.serviceCard.desc }}</div>
                <div class="service-card-bottom">
                  <span class="price">{{ msg.serviceCard.price }}</span>
                  <span class="service-card-rating">⭐ {{ msg.serviceCard.rating }}</span>
                </div>
              </div>
              <button class="view-btn" @click.stop="showToast('正在跳转...')">查看</button>
            </div>
            <div v-if="msg.orderCard" class="order-card">
              <div class="order-card-header">📋 预约工单</div>
              <div class="order-card-body">
                <div class="order-row"><span>单号</span><span>{{ msg.orderCard.id }}</span></div>
                <div class="order-row"><span>服务</span><span>{{ msg.orderCard.service }}</span></div>
                <div class="order-row"><span>时间</span><span>{{ msg.orderCard.time }}</span></div>
                <div class="order-row"><span>状态</span><span class="status-tag">{{ msg.orderCard.statusText }}</span></div>
              </div>
            </div>
            <div v-if="msg.role === 'ai' && msg.status !== 'loading'" class="msg-feedback">
              <span class="feedback-btn" :class="{ active: msg.feedback === 'like' }" @click="onFeedback(msg, 'like')">👍 有用</span>
              <span class="feedback-btn" :class="{ active: msg.feedback === 'dislike' }" @click="onFeedback(msg, 'dislike')">👎 没用</span>
            </div>
          </div>
        </div>
        <div style="height: 20px;"></div>
      </template>
    </div>

    <!-- ===== 孕期核心功能卡片（输入区上方，始终可见） ===== -->
    <div class="quick-tools-bar">
      <div class="quick-tool-card" @click="sendMessage('孕期营养要注意什么')">
        <div class="qtc-icon"><span>🥦</span></div>
        <div class="qtc-info">
          <div class="qtc-title">孕期营养</div>
          <div class="qtc-desc">科学饮食指导</div>
        </div>
        <div class="qtc-arrow">›</div>
      </div>
      <div class="quick-tool-card" @click="sendMessage('孕24周胎儿发育标准')">
        <div class="qtc-icon green"><span>👶</span></div>
        <div class="qtc-info">
          <div class="qtc-title">胎儿发育</div>
          <div class="qtc-desc">各孕周对照参考</div>
        </div>
        <div class="qtc-arrow">›</div>
      </div>
      <div class="quick-tool-card" @click="sendMessage('我想在线问诊')">
        <div class="qtc-icon purple"><span>🩺</span></div>
        <div class="qtc-info">
          <div class="qtc-title">在线问诊</div>
          <div class="qtc-desc">AI智能分析图文</div>
        </div>
        <div class="qtc-arrow">›</div>
      </div>
    </div>

    <!-- ===== 底部固定栏（互动提示 + 输入框） ===== -->
    <div class="bottom-fixed-bar">
      <div class="prompt-box">
        <div class="prompt-row">
          <span class="prompt-chip" @click="sendMessage('孕晚期脚肿怎么办？')">🦶 脚肿怎么办</span>
          <span class="prompt-chip" @click="sendMessage('怎么数胎动？')">👶 怎么数胎动</span>
          <span class="prompt-chip" @click="sendMessage('帮我预约月嫂见面会')">🤱 预约月嫂</span>
          <span class="prompt-chip" @click="sendMessage('产后修复什么时候开始？')">💆 产后修复</span>
        </div>
      </div>
      <div class="chat-input-area">
        <div class="input-bar">
          <div class="input-bar-left" @click="showToast('上传文件/照片/报告')">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="#999" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="4" stroke="#999" stroke-width="1.5" fill="none"/><path d="M17 8h.01" stroke="#999" stroke-width="2" stroke-linecap="round"/><path d="M8 4l1-2h6l1 2" stroke="#999" stroke-width="1.5" stroke-linejoin="round" fill="none"/></svg>
          </div>
          <input v-model="inputText" placeholder="问问氧宝吧…" class="input-bar-text" @keydown.enter="sendMessage(inputText)" />
          <div v-if="inputText.trim()" class="input-bar-send" @click="sendMessage(inputText)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
          <div class="input-bar-right" @click="showToast('语音对话')">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="13" rx="3" stroke="#999" stroke-width="1.5" fill="none"/><path d="M5 10c0 3.87 3.13 7 7 7s7-3.13 7-7" stroke="#999" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M12 22v-5" stroke="#999" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M16 19l-4 3-4-3" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { showToast, showDialog } from 'vant'
import { quickQuestions } from '../mock/data.js'

const inputText = ref('')
const messages = ref([])
const msgContainer = ref(null)
let msgId = 0

function scrollToBottom() {
  nextTick(() => {
    const el = msgContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

function onScroll() {}

function formatContent(text) {
  if (!text) return ''
  return text
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+[️⃣]?)/gm, '<span style="color:#F8A8B8;font-weight:600;">$1</span>')
    .replace(/^- (.*)/gm, '• $1')
}

function sendMessage(text) {
  if (!text || !text.trim()) return
  if (text.startsWith('tel:')) { window.location.href = text; return }

  msgId++
  messages.value.push({
    id: msgId,
    role: 'user',
    content: text.trim(),
    type: 'text',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })
  inputText.value = ''
  scrollToBottom()

  setTimeout(() => {
    msgId++
    const aiMsg = { id: msgId, role: 'ai', content: '', type: 'text', status: 'loading', feedback: null }
    messages.value.push(aiMsg)
    scrollToBottom()

    setTimeout(() => {
      const reply = generateReply(text)
      aiMsg.status = 'done'
      aiMsg.content = reply.content
      if (reply.serviceCard) aiMsg.serviceCard = reply.serviceCard
      if (reply.quickReplies) aiMsg.quickReplies = reply.quickReplies
      if (reply.orderCard) aiMsg.orderCard = reply.orderCard
      messages.value = [...messages.value]
      scrollToBottom()
    }, 1500)
  }, 600)
}

function generateReply(text) {
  const t = text.includes('月嫂') || text.includes('预约') || text.includes('见面')
  const e = text.includes('脚肿') || text.includes('水肿')
  const k = text.includes('胎动') || text.includes('数胎动')
  const c = text.includes('产检') || text.includes('报告')
  const y = text.includes('月子') || text.includes('月子餐')
  const r = text.includes('产后') || text.includes('修复')
  const due = text.includes('预产期')
  const growth = text.includes('发育') || text.includes('胎儿')
  const schedule = text.includes('在线问诊') || text.includes('产检时间') || text.includes('产检表')
  const consult = text.includes('问诊') || text.includes('咨询医生')
  const customerService = text.includes('人工') || text.includes('转接')
  const recommend = text.includes('查看相关') || text.includes('推荐')

  if (customerService) return { content: '👩‍💼 正在为您转接人工客服<br/><br/>📞 **客服热线：400-800-8888**<br/>⏰ 服务时间：08:00 - 22:00<br/><br/>您也可以选择在线留言，客服会在30分钟内回复 💕', quickReplies: [
    { label: '💬 在线留言', value: '我想留言给客服' },
    { label: '📞 拨打热线', value: 'tel:400-800-8888' }
  ] }

  if (text.includes('留言给客服')) return { content: '💬 在线留言已开启～<br/><br/>请留言您的问题，客服会在30分钟内回复 💕<br/><br/>💡 氧宝也会同步记录您的问题，转交给对应客服跟进哦～', serviceCard: { title: '氧阁在线客服', desc: '专业客服团队为您服务', price: '免费', rating: 4.9 } }

  if (recommend) return { content: '🎯 为您精选以下服务<br/><br/>**1️⃣ 月嫂见面会** 🤱 免费 · ⭐4.9<br/>**2️⃣ 孕期营养指导** 🥦 ¥399 · ⭐4.9<br/>**3️⃣ 在线问诊** 🩺 免费 · AI智能分析<br/><br/>点击下方按钮了解详情👇', quickReplies: [
    { label: '🤱 月嫂见面会', value: '帮我预约月嫂见面会' },
    { label: '🥦 孕期营养', value: '孕期营养要注意什么' },
    { label: '🩺 在线问诊', value: '我想在线问诊' }
  ] }

  if (consult) return { content: '🩺 在线问诊 · AI智能分析<br/><br/>上传您的检查报告或描述症状，氧宝AI大模型将在几秒内为您分析解读 🔬<br/><br/>**支持分析的报告类型：**<br/><br/>**📷 产检报告** 🏥<br/>   B超、血常规、糖耐量等<br/>   自动识别指标并解读<br/><br/>**📝 症状描述** 🤒<br/>   描述您的不适感受<br/>   AI给出专业分析和建议<br/><br/>**📸 皮肤/身体照片**<br/>   拍照上传皮肤问题<br/>   AI初步分析判断<br/><br/>⚠️ 温馨提醒：AI分析仅供参考，不能替代专业医疗诊断。如有紧急情况请及时就医。<br/><br/>请点击下方📷按钮上传报告或照片 👇', quickReplies: [
    { label: '📷 上传产检报告', value: '上传产检报告' },
    { label: '📝 描述症状', value: '我最近有点不舒服' },
    { label: '📸 拍照咨询', value: '拍个照片给氧宝看看' }
  ] }
  const nutrition = text.includes('营养')

  if (nutrition) return { content: '为您整理孕期营养指南 🥦<br/><br/>**🥩 蛋白质** 鱼、禽、蛋、豆制品 每天60-75g<br/>**🍚 碳水** 全谷物为主 每天250-300g<br/>**🥬 叶酸** 深绿色蔬菜 每天400-600μg<br/>**🦴 钙** 牛奶、豆制品 每天1000mg<br/>**🧂 铁** 红肉、动物肝脏 每天27mg<br/><br/>**🍽️ 三餐搭配建议：**<br/>早餐：全麦面包+鸡蛋+牛奶<br/>午餐：杂粮饭+鱼肉+青菜+豆腐汤<br/>晚餐：小米粥+瘦肉+蒸蔬菜<br/><br/>记得少食多餐，每天加2-3次健康小食哦～' }
  if (due) return { content: '帮您算预产期 📅<br/><br/>**计算方法：** 末次月经第一天 + 280天（40周）<br/><br/>**举个例子：**<br/>• 末次月经：2026年1月1日<br/>• 预产期：**2026年10月8日**<br/><br/>您可以把末次月经日期告诉我，我帮您精确计算～', serviceCard: { title: '孕期产检套餐', desc: '全程产检跟踪服务', price: '咨询顾问', rating: 4.9 } }
  if (growth) return { content: '孕24周胎儿发育标准 👶<br/><br/>**📏 标准参考：**<br/>• 身长：约 **30cm**<br/>• 体重：约 **600-650g**<br/>• 双顶径：约 **6.0cm**<br/>• 股骨长：约 **4.3cm**<br/><br/>**✨ 发育特点：** 宝宝已经会打嗝了，听觉发育完善<br/><br/>每个宝宝有个体差异，在正常范围就不用担心哦～' }
  if (schedule) return { content: '为您整理产检时间表 🏥<br/><br/>**📋 产检全攻略：**<br/>**孕6-8周** 确认妊娠+B超<br/>**孕11-13周** NT筛查<br/>**孕20-24周** 四维彩超排畸✨<br/>**孕24-28周** 糖耐量检查<br/>**孕28-32周** 小排畸<br/>**孕32-36周** 每2周产检<br/>**孕36-40周** 每周产检<br/><br/>您现在**孕24周**，适合做四维彩超哦！', serviceCard: { title: '产检预约服务', desc: '一键预约，到院免排队', price: '免费预约', rating: 4.8 } }
  if (t) return { content: '好的！我来帮您预约月嫂见面会 🎉<br/><br/>请问您方便的时间是？👇', quickReplies: [{ label: '📅 本周六上午', value: '本周六上午' }, { label: '📅 本周日下午', value: '本周日下午' }, { label: '📅 下周六', value: '下周六' }] }
  if (e) return { content: '孕晚期脚肿很常见，给您几个实用小方法：<br/><br/>**1️⃣ 抬高双腿** 休息时用枕头垫高双腿<br/>**2️⃣ 避免久站** 每隔1小时活动一下<br/>**3️⃣ 控盐** 每日不超过5g<br/>**4️⃣ 多喝水** 每天1.5-2L<br/><br/>⚠️ 如果突然加重或伴头痛，请及时就医哦～', serviceCard: { title: '孕期舒缓按摩', desc: '专业孕产按摩师上门服务', price: '¥298/次', rating: 4.8 } }
  if (k) return { content: '教您数胎动 👶<br/><br/>**⏰ 时间：** 每天早中晚各1次，饭后1小时<br/>**📝 方法：** 左侧卧位，计数1小时<br/>**✅ 正常：** ≥3-5次/小时<br/><br/>需要氧宝帮您记录吗？' }
  if (c) return { content: '您可以上传产检报告图片，氧宝帮您解读 🏥<br/><br/>目前支持：B超 / 血常规 / 唐筛 / 糖耐量 / 四维彩超<br/><br/>点击下方📷按钮上传即可～' }
  if (y) return { content: '为您介绍月子餐科学搭配 🍲<br/><br/>**第1周** 排恶露：小米粥、蒸蛋羹<br/>**第2周** 调脾胃：鸡汤、鱼汤<br/>**第3-4周** 补气血：猪蹄汤、鲫鱼汤<br/><br/>需要推荐月子餐服务吗？', serviceCard: { title: '定制月子餐 · 28天套餐', desc: '专业营养师搭配，每日六餐', price: '¥3680/月', rating: 4.9 } }
  if (r) return { content: '产后修复最佳时间表 📋<br/><br/>**⏰ 黄金期：产后42天-6个月**<br/>• 盆底肌修复：产后42天<br/>• 腹直肌修复：产后2个月<br/>• 骨盆修复：产后3个月<br/><br/>需要了解产康项目吗？', serviceCard: { title: '盆底肌修复 · 10次套餐', desc: '专业仪器+手法修复', price: '¥2980', rating: 4.7 } }
  return { content: '收到您的问题啦！🤗<br/><br/>让我想想怎么帮您…<br/><br/>您也可以试试下面的快捷操作👇', quickReplies: [
    { label: '📋 帮我预约服务', value: '帮我预约月嫂见面会' },
    { label: '🎯 查看相关推荐', value: '查看相关推荐' },
    { label: '👩‍💼 转接人工客服', value: '转接人工客服' }
  ] }
}

function onFeedback(msg, type) {
  msg.feedback = msg.feedback === type ? null : type
  showToast(type === 'like' ? '💕 谢谢您的喜欢！' : '🙏 我们会努力改进')
}

function onServiceClick(card) {
  window.location.hash = '#/service/1'
}

function onClearChat() {
  showDialog({
    title: '清空对话记录？',
    message: '确定要清空所有对话记录吗？',
    showCancelButton: true,
    confirmButtonText: '清空',
    confirmButtonColor: '#FF4D4F',
    cancelButtonText: '取消'
  }).then(() => {
    messages.value = []
    showToast('对话已清空')
  }).catch(() => {})
}
</script>

<style scoped>
.tab-chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #FFF8FA;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 98px;
}

.chat-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

/* ===== 欢迎引导区 ===== */
.welcome-section {
  position: relative;
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.welcome-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 360px;
  overflow: hidden;
  pointer-events: none;
}

.welcome-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
}

.c1 { top: -60px; right: -40px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(248,168,184,0.3), transparent); animation: floatCircle 6s ease-in-out infinite; }
.c2 { top: 20px; left: -60px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(224,195,252,0.25), transparent); animation: floatCircle 8s ease-in-out infinite; }
.c3 { top: 120px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(248,168,184,0.2), transparent); animation: floatCircle 5s ease-in-out infinite reverse; }

@keyframes floatCircle {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

/* ===== 氧宝IP形象 ===== */
.oxygen-character {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 16px;
}

.character-container { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
.character-glow { position: absolute; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, rgba(248,168,184,0.25), transparent 70%); animation: glowPulse 2.5s ease-in-out infinite; }
@keyframes glowPulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.12); opacity: 0.9; } }
.character-body { width: 110px; height: 110px; border-radius: 50%; background: linear-gradient(145deg, #FFE4E9, #F8A8B8, #E0C3FC); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; box-shadow: 0 8px 30px rgba(248,168,184,0.35), inset 0 -4px 12px rgba(0,0,0,0.05); animation: gentleBob 3s ease-in-out infinite; }
@keyframes gentleBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.char-face { position: relative; width: 60px; height: 45px; }
.char-eye { position: absolute; width: 10px; height: 12px; background: #5D4037; border-radius: 50%; top: 8px; animation: blink 3.5s ease-in-out infinite; }
.char-eye::after { content: ''; position: absolute; width: 4px; height: 4px; background: #fff; border-radius: 50%; top: 2px; right: 1px; }
.left-eye { left: 10px; }
.right-eye { right: 10px; }
@keyframes blink { 0%, 45%, 55%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
.char-mouth { position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 18px; height: 9px; border-bottom: 3px solid #E8889E; border-radius: 0 0 18px 18px; animation: smile 2s ease-in-out infinite; }
@keyframes smile { 0%, 100% { height: 9px; } 50% { height: 12px; } }
.char-blush { position: absolute; width: 12px; height: 8px; background: rgba(248,168,184,0.5); border-radius: 50%; bottom: 6px; }
.left-blush { left: 0; }
.right-blush { right: 0; }
.char-body-shape { margin-top: 6px; }
.char-heart { font-size: 20px; animation: heartBeat 1.8s ease-in-out infinite; }
@keyframes heartBeat { 0%, 100% { transform: scale(1); } 30% { transform: scale(1.2); } 50% { transform: scale(1); } 70% { transform: scale(1.15); } }
.character-label { margin-top: 10px; font-size: 16px; font-weight: 700; color: #F8A8B8; text-shadow: 0 1px 4px rgba(248,168,184,0.2); }

.welcome-text { text-align: center; z-index: 2; margin-bottom: 20px; }
.welcome-title { font-size: 22px; font-weight: 700; color: #333; margin-bottom: 8px; }
.wave-hand { display: inline-block; animation: wave 1.5s ease-in-out infinite; transform-origin: 70% 70%; }
@keyframes wave { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(15deg); } 50% { transform: rotate(-5deg); } 75% { transform: rotate(10deg); } }
.welcome-subtitle { font-size: 17px; font-weight: 500; color: #666; margin-bottom: 6px; }
.welcome-desc { font-size: 13px; color: #999; }

.divider-bear { display: flex; align-items: center; gap: 10px; width: 100%; margin-bottom: 16px; z-index: 2; }
.bear-icon { font-size: 16px; animation: bearJump 2s ease-in-out infinite; }
@keyframes bearJump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #F8A8B8, transparent); }
.bear-text { font-size: 12px; color: #F8A8B8; font-weight: 500; white-space: nowrap; }

.quick-questions { width: 100%; z-index: 2; display: flex; flex-direction: column; gap: 10px; }
.quick-q-row { display: flex; gap: 10px; }
.quick-bubble { flex: 1; display: flex; align-items: center; gap: 6px; padding: 14px 12px; background: #fff; border-radius: 16px; font-size: 13px; color: #555; cursor: pointer; transition: all 0.25s; box-shadow: 0 2px 10px rgba(248,168,184,0.10); border: 1px solid rgba(248,168,184,0.12); line-height: 1.3; }
.quick-bubble:active { transform: scale(0.96); box-shadow: 0 1px 4px rgba(248,168,184,0.08); background: #FFF8FA; }
.bubble-icon { font-size: 18px; flex-shrink: 0; }

.safety-tip { display: flex; align-items: center; gap: 4px; margin-top: 20px; font-size: 11px; color: #bbb; z-index: 2; }
.tip-icon { font-size: 12px; }

.chat-tip-bar { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 16px; margin: 0 16px 12px; background: linear-gradient(135deg, #FFF0F3, #F8E8FF); border-radius: 14px; font-size: 12px; color: #888; }
.tip-avatar { font-size: 16px; }

/* 消息条目 */
.message-wrapper { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 18px; padding: 0 16px; animation: msgIn 0.3s ease-out; }
@keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.message-wrapper.is-user { flex-direction: row-reverse; }
.msg-avatar-wrap { flex-shrink: 0; }
.msg-avatar { width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #FFF0F3, #F8E8FF); display: flex; align-items: center; justify-content: center; font-size: 18px; }
.msg-content { max-width: 75%; }
.msg-bubble { padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.7; word-break: break-word; }
.user-bubble { background: linear-gradient(135deg, #F8A8B8, #E8889E); color: #fff; border-bottom-right-radius: 4px; }
.ai-bubble { background: #fff; color: #444; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-bottom-left-radius: 4px; }
.msg-text :deep(br) { display: block; margin: 4px 0; }
.msg-text :deep(strong) { color: #F8A8B8; }

.loading-dots { display: flex; align-items: center; gap: 4px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #F8A8B8; animation: bounce 1.4s ease-in-out infinite; }
.dot2 { animation-delay: 0.2s; }
.dot3 { animation-delay: 0.4s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
.loading-text { margin-left: 8px; font-size: 12px; color: #bbb; }

.quick-replies { display: flex; gap: 8px; flex-wrap: wrap; margin: 8px 0 4px; }
.quick-reply-btn { padding: 8px 16px; background: #FFF0F3; color: #F8A8B8; font-size: 13px; font-weight: 500; border-radius: 18px; cursor: pointer; transition: all 0.2s; border: 1px solid rgba(248,168,184,0.25); }
.quick-reply-btn:active { background: #FFE4E9; transform: scale(0.95); }

.service-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 12px; display: flex; align-items: center; gap: 10px; margin: 8px 0; cursor: pointer; transition: all 0.2s; }
.service-card:active { transform: scale(0.98); }
.service-card-img { width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #FFF0F3, #F8E8FF); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
.service-card-info { flex: 1; min-width: 0; }
.service-card-title { font-size: 13px; font-weight: 600; color: #333; margin-bottom: 2px; }
.service-card-desc { font-size: 11px; color: #999; margin-bottom: 4px; }
.service-card-bottom { display: flex; align-items: center; gap: 8px; }
.service-card-rating { font-size: 11px; color: #999; }
.view-btn { flex-shrink: 0; height: 28px; padding: 0 12px; background: linear-gradient(135deg, #F8A8B8, #E8889E); color: #fff; font-size: 12px; font-weight: 500; border: none; border-radius: 10px; cursor: pointer; }
.view-btn:active { transform: scale(0.92); }

.order-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); overflow: hidden; margin: 8px 0; }
.order-card-header { background: linear-gradient(135deg, #FFF0F3, #F8E8FF); padding: 10px 14px; font-size: 13px; font-weight: 600; color: #333; }
.order-card-body { padding: 10px 14px; }
.order-row { display: flex; justify-content: space-between; font-size: 13px; padding: 4px 0; color: #333; }
.order-row span:first-child { color: #999; }
.status-tag { color: #FAAD14; font-weight: 500; }

.msg-feedback { display: flex; gap: 12px; margin-top: 6px; padding-left: 4px; }
.feedback-btn { font-size: 11px; color: #ccc; cursor: pointer; padding: 2px 8px; border-radius: 6px; transition: all 0.2s; }
.feedback-btn.active { color: #F8A8B8; background: #FFF0F3; }
.feedback-btn:active { background: #FFF0F3; }

/* ===== 孕期核心功能卡片 ===== */
.quick-tools-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px 16px 6px;
  background: #fff;
  flex-shrink: 0;
}

.quick-tool-card {
  width: 32%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 8px;
  background: linear-gradient(135deg, #FFF8FA, #FFF0F3);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s;
  border: 1px solid rgba(248,168,184,0.12);
  box-shadow: 0 2px 8px rgba(248,168,184,0.06);
}

.quick-tool-card:active {
  transform: scale(0.96);
  background: linear-gradient(135deg, #F8A8B8, #E8889E);
  border-color: #F8A8B8;
  box-shadow: 0 4px 12px rgba(248,168,184,0.25);
}

.quick-tool-card:active .qtc-title,
.quick-tool-card:active .qtc-desc,
.quick-tool-card:active .qtc-arrow { color: #fff; }

.quick-tool-card:active .qtc-icon { background: rgba(255,255,255,0.25); }

.qtc-icon { width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #FFE4E9, #FFF0F3); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; transition: background 0.25s; }
.qtc-icon.green { background: linear-gradient(135deg, #E8FFE8, #F0FFF0); }
.qtc-icon.purple { background: linear-gradient(135deg, #F0E6FF, #F8E8FF); }
.qtc-info { flex: 1; min-width: 0; }
.qtc-title { font-size: 13px; font-weight: 600; color: #333; transition: color 0.25s; }
.qtc-desc { font-size: 10px; color: #bbb; margin-top: 1px; transition: color 0.25s; }
.qtc-arrow { font-size: 16px; color: #ddd; flex-shrink: 0; transition: color 0.25s; }

/* ===== 底部固定栏 ===== */
.bottom-fixed-bar {
  flex-shrink: 0;
  background: #fff;
  border-top: 1px solid #F0F0F0;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* ===== 互动提示框 ===== */
.prompt-box {
  padding: 6px 16px 4px;
}

.prompt-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.prompt-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 5px 10px;
  background: #F8F8FA;
  color: #888;
  font-size: 11px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.prompt-chip:active {
  transform: scale(0.95);
  background: #FFF0F3;
  color: #F8A8B8;
}

/* ===== 底部输入对话框 ===== */
.chat-input-area {
  padding: 6px 12px 10px;
}

.input-bar {
  display: flex;
  align-items: center;
  background: #F5F5F7;
  border-radius: 22px;
  padding: 0 4px 0 14px;
  border: 1.5px solid transparent;
  transition: all 0.25s;
}

.input-bar:focus-within {
  background: #fff;
  border-color: #F8A8B8;
  box-shadow: 0 0 0 4px rgba(248,168,184,0.10);
}

.input-bar-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 50%;
  transition: all 0.2s;
}

.input-bar-left:active {
  background: #E8E8ED;
}

.input-bar-text {
  flex: 1;
  height: 40px;
  background: transparent;
  border: none;
  font-size: 15px;
  color: #333;
  outline: none;
  padding: 0 6px;
}

.input-bar-text::placeholder {
  color: #bbb;
  font-size: 14px;
}

.input-bar-send {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F8A8B8, #E8889E);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(248,168,184,0.3);
  transition: all 0.2s;
}

.input-bar-send:active { transform: scale(0.88); }

.input-bar-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 50%;
  transition: all 0.2s;
}

.input-bar-right:active {
  background: #E8E8ED;
}
</style>
