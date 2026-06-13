<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">{{ sceneData.title }}</span>
      <button class="dp-action" @click="goToChat">💬 问氧宝</button>
    </div>
    <div class="dp-body">
      <!-- 孕期守护日记 -->
      <template v-if="sceneId === 1">
        <div class="hero-banner" style="background:linear-gradient(135deg,#FFF0F3,#F8E8FF)">
          <span class="hero-emoji">🤰</span>
          <div class="hero-info">
            <span class="hero-title">孕期守护日记</span>
            <span class="hero-desc">孕24周+3天 · 已守护168天</span>
          </div>
        </div>
        <div class="stats-card">
          <div class="stats-item"><span class="stats-num">65.2</span><span class="stats-unit">kg</span><span class="stats-label">体重</span></div>
          <div class="stats-div"></div>
          <div class="stats-item"><span class="stats-num">120/80</span><span class="stats-unit"></span><span class="stats-label">血压</span></div>
          <div class="stats-div"></div>
          <div class="stats-item"><span class="stats-num">650</span><span class="stats-unit">g</span><span class="stats-label">预估胎重</span></div>
        </div>
        <div class="task-card">
          <div class="task-title">📋 今日任务 <span class="task-count">{{ doneTasks }}/4</span></div>
          <div v-for="(t, i) in tasks" :key="i" class="task-item" @click="toggleTask(t)">
            <div class="task-check" :class="{ checked: t.done }"><span v-if="t.done">✓</span></div>
            <span class="task-text" :class="{ done: t.done }">{{ t.text }}</span>
          </div>
        </div>
        <div class="advice-card" @click="goToChat">
          <span class="advice-icon">💡</span>
          <span class="advice-text">孕24周可以做四维彩超排畸了，记得提前预约哦～</span>
          <span class="advice-arrow">›</span>
        </div>
      </template>

      <!-- 月子安心陪伴 -->
      <template v-if="sceneId === 2">
        <div class="hero-banner" style="background:linear-gradient(135deg,#F8E8FF,#E8D5FF)">
          <span class="hero-emoji">🌙</span>
          <div class="hero-info">
            <span class="hero-title">月子安心陪伴</span>
            <span class="hero-desc">科学坐月子 · 提前规划更从容</span>
          </div>
        </div>

        <div class="step-card" @click="showToast('🤱 查看月嫂套餐')">
          <span class="step-num">01</span>
          <div class="step-info">
            <span class="step-title">预约月嫂</span>
            <span class="step-desc">金牌月嫂住家服务，提前锁档期</span>
          </div>
          <span class="step-arrow">›</span>
        </div>
        <div class="step-card" @click="showToast('🏠 查看月子中心')">
          <span class="step-num">02</span>
          <div class="step-info">
            <span class="step-title">参观月子中心</span>
            <span class="step-desc">实地参观，选择心仪房型</span>
          </div>
          <span class="step-arrow">›</span>
        </div>
        <div class="step-card" @click="showToast('📋 查看月子餐')">
          <span class="step-num">03</span>
          <div class="step-info">
            <span class="step-title">定制月子餐</span>
            <span class="step-desc">营养师搭配，月嫂亲手制作</span>
          </div>
          <span class="step-arrow">›</span>
        </div>
        <div class="step-card" @click="showToast('📦 查看待产包')">
          <span class="step-num">04</span>
          <div class="step-info">
            <span class="step-title">准备待产包</span>
            <span class="step-desc">一键生成清单，从容待产</span>
          </div>
          <span class="step-arrow">›</span>
        </div>

        <div class="tip-card-scene" @click="goToChat">
          <span>💬 有什么关于月子的疑问？随时问氧宝～</span>
          <span>›</span>
        </div>
      </template>

      <!-- 产后修复计划 -->
      <template v-if="sceneId === 3">
        <div class="hero-banner" style="background:linear-gradient(135deg,#FFF0F3,#FFE4E9)">
          <span class="hero-emoji">💪</span>
          <div class="hero-info">
            <span class="hero-title">产后修复计划</span>
            <span class="hero-desc">身体在慢慢恢复，每一天都离更好的自己更近一步 💕</span>
          </div>
        </div>

        <!-- ① 身体数据看板（月嫂服务自动同步+用户自记录） -->
        <div class="data-board">
          <div class="db-header">
            <span>📊 身体恢复数据</span>
            <span class="db-source">
              <span class="db-tag auto">🤱 月嫂同步</span>
              <span class="db-tag manual">✏️ 自己记录</span>
            </span>
          </div>
          <div class="db-grid">
            <div class="db-item" @click="onBodyRecord">
              <span class="db-emoji">⚖️</span>
              <div class="db-info">
                <span class="db-label">体重</span>
                <span class="db-value">— <span class="db-hint">待记录</span></span>
              </div>
              <span class="db-edit">✏️</span>
            </div>
            <div class="db-item auto-sync" @click="showToast('📋 查看护理报告')">
              <span class="db-emoji">🩹</span>
              <div class="db-info">
                <span class="db-label">伤口恢复</span>
                <span class="db-value">✅ {{ nannyWoundData }}</span>
              </div>
              <span class="db-tag-sm">🤱</span>
            </div>
            <div class="db-item auto-sync" @click="showToast('📋 查看护理报告')">
              <span class="db-emoji">🍼</span>
              <div class="db-info">
                <span class="db-label">泌乳情况</span>
                <span class="db-value">{{ nannyMilkData }}</span>
              </div>
              <span class="db-tag-sm">🤱</span>
            </div>
            <div class="db-item" @click="onBodyRecord">
              <span class="db-emoji">📏</span>
              <div class="db-info">
                <span class="db-label">腹围</span>
                <span class="db-value">— <span class="db-hint">待记录</span></span>
              </div>
              <span class="db-edit">✏️</span>
            </div>
          </div>
          <div class="db-footer" @click="onBodyRecord">
            <span>💕 身体每一天都在悄悄变好，记录下这些变化，未来回头看会感动到自己～</span>
            <span class="db-arrow">›</span>
          </div>
        </div>

        <!-- ② 时间轴：产后恢复阶段 -->
        <div class="section-label">🌸 产后恢复时间轴</div>
        <div class="timeline-scene">
          <div class="tl-s-item current" @click="onRecoveryTip('休养期')">
            <div class="tl-s-dot"></div>
            <div class="tl-s-content">
              <span class="tl-s-phase">产后 0-42 天 · 休养期</span>
              <span class="tl-s-desc">身体在慢慢修复，好好吃饭、好好休息，就是对自己最好的爱</span>
            </div>
          </div>
          <div class="tl-s-item" @click="onRecoveryTip('复查期')">
            <div class="tl-s-dot"></div>
            <div class="tl-s-content">
              <span class="tl-s-phase">产后 42 天 · 复查期</span>
              <span class="tl-s-desc">和宝宝一起去做产后复查<br/>盆底肌、腹直肌、伤口恢复情况全面评估</span>
            </div>
          </div>
          <div class="tl-s-item" @click="onRecoveryTip('黄金修复期')">
            <div class="tl-s-dot"></div>
            <div class="tl-s-content">
              <span class="tl-s-phase">产后 2-6 个月 · 黄金修复期</span>
              <span class="tl-s-desc">身体准备好了，可以开始温和修复<br/>就像春天的种子，慢慢发芽🌱</span>
            </div>
          </div>
          <div class="tl-s-item" @click="onRecoveryTip('巩固期')">
            <div class="tl-s-dot"></div>
            <div class="tl-s-content">
              <span class="tl-s-phase">产后 6-12 个月 · 巩固期</span>
              <span class="tl-s-desc">身体逐渐恢复活力<br/>享受和宝宝一起运动的快乐时光</span>
            </div>
          </div>
        </div>

        <!-- ③ AI膳食推荐（温暖情绪化） -->
        <div class="section-label">🥗 今天吃点什么对身体好？</div>
        <div class="meal-suggestion" @click="onMealSuggest">
          <div class="ms-header">
            <span class="ms-icon">🍲</span>
            <div class="ms-info">
              <span class="ms-title">氧宝的今日推荐</span>
              <span class="ms-date">{{ todayDate }}</span>
            </div>
            <span class="ms-refresh" @click.stop="refreshMeal">🔄 换一个</span>
          </div>
          <div class="ms-card">
            <div class="ms-emoji">{{ currentMeal.emoji }}</div>
            <div class="ms-body">
              <span class="ms-name">{{ currentMeal.name }}</span>
              <span class="ms-desc">{{ currentMeal.desc }}</span>
              <span class="ms-why">{{ currentMeal.why }}</span>
            </div>
          </div>
          <div class="ms-footer" @click.stop="goToChat">
            💬 告诉氧宝你的口味偏好，为你定制专属食谱～
          </div>
        </div>

        <!-- ④ 温柔推荐（情绪价值方式，非硬广） -->
        <div class="section-label">💕 给自己多一些关爱</div>
        <div class="soft-rec" @click="onSoftRecommend('盆底肌')">
          <span class="sr-icon">🌷</span>
          <div class="sr-info">
            <span class="sr-title">产后修复，是对自己的一份温柔</span>
            <span class="sr-desc">生了宝宝之后，身体需要一些专业的帮助来恢复～很多妈妈都会选择在专业指导下进行盆底肌和腹直肌的修复，就像给自己的一份礼物 🎁</span>
          </div>
          <span class="sr-arrow">›</span>
        </div>
        <div class="soft-rec" @click="onSoftRecommend('体态')">
          <span class="sr-icon">🌟</span>
          <div class="sr-info">
            <span class="sr-title">找回那个自信的自己</span>
            <span class="sr-desc">产后体态管理不是减肥，而是和自己的身体重新做朋友。通过温和的修复训练，慢慢找回轻盈和力量感～🧘‍♀️</span>
          </div>
          <span class="sr-arrow">›</span>
        </div>
        <div class="soft-rec" @click="onSoftRecommend('情绪')">
          <span class="sr-icon">💕</span>
          <div class="sr-info">
            <span class="sr-title">心情也需要被呵护</span>
            <span class="sr-desc">产后情绪波动很正常，给自己多一些耐心和温柔。氧宝随时在这里听你说说话，也可以和有经验的妈妈们聊聊天～</span>
          </div>
          <span class="sr-arrow">›</span>
        </div>

        <div class="chat-entry" @click="goToChat">
          <span>🐣 和氧宝聊聊产后修复那些事～</span>
          <span>›</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const sceneId = ref(1)

const sceneData = computed(() => {
  const map = {
    1: { title:'孕期守护日记', emoji:'🤰' },
    2: { title:'月子安心陪伴', emoji:'🌙' },
    3: { title:'产后修复计划', emoji:'💪' }
  }
  return map[sceneId.value] || { title:'场景详情', emoji:'🏠' }
})

const tasks = ref([
  { text:'每日胎动计数', done:true },
  { text:'补钙 + 维生素', done:false },
  { text:'预约下周三产检', done:false },
  { text:'做凯格尔运动15分钟', done:true }
])
const doneTasks = computed(() => tasks.value.filter(t => t.done).length)

/* ========== 产后修复计划专属数据 ========== */

// 月嫂服务自动同步数据
const nannyWoundData = ref('已护理12次 恢复良好')
const nannyMilkData = ref('日均480ml 通畅')

// AI膳食推荐
const mealRecommendations = [
  { emoji:'🍲', name:'红枣枸杞乌鸡汤', desc:'温补气血 · 促进伤口愈合', why:'乌鸡富含优质蛋白和铁元素，红枣和枸杞温补气血，特别适合产后妈妈调理身体。汤温温的喝下去，整个人都暖暖的～' },
  { emoji:'🥣', name:'鲫鱼豆腐汤', desc:'高蛋白补钙 · 促进泌乳', why:'鲫鱼的鲜甜配上豆腐的嫩滑，汤色奶白～富含蛋白质和钙质，有助于产后恢复和乳汁分泌。张阿姨说：文火慢炖2小时，精华都在汤里了 💕' },
  { emoji:'🌰', name:'小米红枣粥', desc:'养胃易消化 · 补气血', why:'小米是传统的月子食材，温和养胃，配上红枣的天然甜味，每一口都是家的味道。早晨喝一碗，暖暖的一整天～' },
  { emoji:'🥗', name:'西兰花炒虾仁', desc:'高纤维低脂 · 补充维生素', why:'西兰花富含维生素C和膳食纤维，虾仁提供优质蛋白，清淡不油腻。产后恢复身材的好帮手，颜色也很治愈呢～' },
  { emoji:'🍵', name:'红豆薏米水', desc:'祛湿消肿 · 促进代谢', why:'红豆和薏米都是祛湿的好食材，产后身体容易水肿，来一杯温温的红豆薏米水，淡淡的甜味，舒服又养生～' },
  { emoji:'🥑', name:'牛油果沙拉', desc:'优质脂肪 · 促进伤口恢复', why:'牛油果富含健康的不饱和脂肪酸和维生素E，搭配蔬菜做成沙拉，清爽又有营养。对自己好一点，从一餐精致的沙拉开始～' }
]

const currentMealIndex = ref(0)
const currentMeal = computed(() => mealRecommendations[currentMealIndex.value])
const todayDate = computed(() => {
  const d = new Date()
  return `${d.getMonth()+1}月${d.getDate()}日`
})

function refreshMeal() {
  currentMealIndex.value = (currentMealIndex.value + 1) % mealRecommendations.length
}

onMounted(() => {
  sceneId.value = parseInt(route.params.id) || 1
  // 随机起始膳食
  currentMealIndex.value = Math.floor(Math.random() * mealRecommendations.length)
})

function goBack(){window.history.back()}
function toggleTask(t){t.done = !t.done}
function goToChat(){window.dispatchEvent(new CustomEvent('switch-tab',{detail:'chat'}))}
function onBodyRecord(){window.location.hash = '#/body-record'}

/* 产后修复交互 */
function onRecoveryTip(phase) {
  const tips = {
    '休养期': { emoji:'🌷', msg:'产后第一个月，最重要的是让身体好好休息。\n\n✅ 尽量躺卧休息，避免久站久坐\n✅ 保持伤口清洁干燥\n✅ 饮食清淡有营养\n✅ 心情放轻松，有情绪波动很正常\n\n你刚完成了一件伟大的事，给自己一些时间慢慢恢复 💕' },
    '复查期': { emoji:'🏥', msg:'产后42天复查非常重要哦～\n\n医生会评估：\n• 子宫恢复情况\n• 伤口愈合程度\n• 盆底肌功能\n• 腹直肌分离情况\n\n拿到复查报告后可以给氧宝看看，帮你解读分析 📋' },
    '黄金修复期': { emoji:'🌱', msg:'产后2-6个月是身体修复的黄金期，身体已经准备好了～\n\n🌟 可以开始温和的修复训练：\n• 凯格尔运动（随时都能做）\n• 产后瑜伽（建议专业指导）\n• 腹式呼吸（简单有效）\n\n很多妈妈都说，这个阶段开始感受到身体在慢慢变好，那种感觉很棒～' },
    '巩固期': { emoji:'💪', msg:'产后6个月以后，身体进入稳定恢复期～\n\n可以逐渐增加运动强度：\n🧘‍♀️ 普拉提 / 瑜伽\n🚶‍♀️ 快走 / 慢跑\n🏊‍♀️ 游泳（低冲击）\n\n记住：不要着急，每个人的恢复节奏不同，和自己的身体温柔相处～' }
  }
  const t = tips[phase] || { emoji:'💕', msg:'慢慢来，比较快～' }
  showDialog({ title:`${t.emoji} ${phase}`, message:t.msg, confirmButtonText:'知道了 💕', confirmButtonColor:'#F8A8B8' })
}

function onMealSuggest() {
  showDialog({ title:`🍲 ${currentMeal.value.name}`, message:`${currentMeal.value.desc}\n\n${currentMeal.value.why}\n\n💡 想换换口味？点击「换一个」看看氧宝的其他推荐～`, confirmButtonText:'换一个看看', cancelButtonText:'好的，记下了', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(() => refreshMeal()).catch(() => {})
}

function onSoftRecommend(type) {
  const msgs = {
    '盆底肌': { emoji:'🌷', msg:'很多产后妈妈都会选择做盆底肌修复，不是因为它"必须做"，而是因为——你值得对自己的身体好一点 💕\n\n就像给辛苦了很久的身体一个温柔的拥抱，让它恢复到舒适的状态。氧阁有很多妈妈做完后都说：「早知道这么舒服，应该早点来的～」\n\n如果你感兴趣，氧宝可以帮你了解更多～' },
    '体态': { emoji:'🌟', msg:'产后体态调整不是为了变回"产前的样子"，而是和新的自己好好相处 💕\n\n你的身体经历了孕育生命的奇迹，它值得被温柔对待。温和的体态训练，不仅能让你站得更直、走得更轻松，还能缓解带娃带来的腰背酸痛～\n\n想了解一下吗？氧宝可以给你一些简单的小练习 ✨' },
    '情绪': { emoji:'💕', msg:'从怀孕到生产，你的身体和情绪都经历了巨大的变化。有时候感到疲惫、焦虑、情绪低落，这些都是非常正常的～\n\n给自己多一些耐心和温柔，就像对待最好的朋友那样。\n\n氧宝随时在这里，听你说说话。也可以和有经验的妈妈们聊聊，你会发现，原来不是一个人 💕' }
  }
  const m = msgs[type] || { emoji:'💕', msg:'对自己好一点～' }
  showDialog({ title:`${m.emoji} 给自己多一些关爱`, message:m.msg, confirmButtonText:'💬 和氧宝聊聊', cancelButtonText:'好的，我知道了', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(() => goToChat()).catch(() => {})
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:13px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }

/* 通用 */
.hero-banner { display:flex; align-items:center; gap:14px; padding:20px; border-radius:20px; margin-bottom:14px; }
.hero-emoji { font-size:42px; }
.hero-info { display:flex; flex-direction:column; }
.hero-title { font-size:18px; font-weight:700; color:#333; }
.hero-desc { font-size:12px; color:#888; margin-top:2px; }

/* 孕期守护 - 统计 */
.stats-card { display:flex; align-items:center; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.stats-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:1px; }
.stats-num { font-size:22px; font-weight:700; color:#F8A8B8; line-height:1.2; }
.stats-unit { font-size:10px; color:#bbb; }
.stats-label { font-size:10px; color:#999; }
.stats-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }

/* 任务 */
.task-card { background:#fff; border-radius:16px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.task-title { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; display:flex; justify-content:space-between; }
.task-count { color:#F8A8B8; font-weight:400; font-size:12px; }
.task-item { display:flex; align-items:center; gap:10px; padding:8px 0; cursor:pointer; }
.task-check { width:20px; height:20px; border-radius:50%; border:2px solid #ddd; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; flex-shrink:0; }
.task-check.checked { background:#52C41A; border-color:#52C41A; }
.task-text { font-size:13px; color:#333; }
.task-text.done { color:#bbb; text-decoration:line-through; }

/* 建议 */
.advice-card { display:flex; align-items:center; gap:10px; padding:12px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; cursor:pointer; }
.advice-icon { font-size:18px; }
.advice-text { flex:1; font-size:13px; color:#666; line-height:1.5; }
.advice-arrow { color:#ccc; font-size:14px; }

/* 月子 - 步骤 */
.step-card { display:flex; align-items:center; gap:12px; padding:14px 16px; background:#fff; border-radius:14px; margin-bottom:8px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.step-card:active { transform:scale(0.98); background:#FFF8FA; }
.step-num { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E0C3FC); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; flex-shrink:0; }
.step-info { flex:1; }
.step-title { font-size:14px; font-weight:600; color:#333; display:block; }
.step-desc { font-size:11px; color:#bbb; margin-top:1px; display:block; }
.step-arrow { color:#ddd; font-size:16px; }

/* 产后 - 时间轴 */
.timeline-scene { padding-left:4px; margin-bottom:12px; }
.tl-s-item { display:flex; gap:12px; padding:12px 0; cursor:pointer; }
.tl-s-item:active { opacity:0.7; }
.tl-s-dot { width:12px; height:12px; border-radius:50%; background:#ddd; border:2.5px solid #fff; flex-shrink:0; margin-top:4px; box-shadow:0 0 0 2px #ddd; }
.tl-s-item.current .tl-s-dot { background:linear-gradient(135deg,#F8A8B8,#E8889E); box-shadow:0 0 0 2px #F8A8B8,0 0 8px rgba(248,168,184,0.4); }
.tl-s-content { flex:1; }
.tl-s-phase { font-size:14px; font-weight:600; color:#333; display:block; }
.tl-s-desc { font-size:12px; color:#888; margin-top:2px; line-height:1.6; display:block; }

.recom-card { display:flex; align-items:center; gap:10px; padding:12px 14px; background:#fff; border-radius:14px; margin-bottom:8px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.recom-card:active { transform:scale(0.98); }
.recom-icon { font-size:22px; }
.recom-info { flex:1; }
.recom-title { font-size:13px; font-weight:600; color:#333; display:block; }
.recom-desc { font-size:11px; color:#bbb; margin-top:1px; display:block; }
.recom-arrow { color:#ddd; font-size:14px; }

.tip-card-scene { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:#fff; border-radius:14px; margin-top:4px; font-size:12px; color:#888; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.tip-card-scene:active { transform:scale(0.98); }

/* ===== 产后修复 - 身体数据看板 ===== */
.data-board { background:#fff; border-radius:18px; padding:16px; margin-bottom:14px; box-shadow:0 2px 12px rgba(248,168,184,0.06); }
.db-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; font-size:14px; font-weight:600; color:#333; }
.db-source { display:flex; gap:4px; }
.db-tag { font-size:8px; padding:1px 6px; border-radius:4px; font-weight:400; }
.db-tag.auto { color:#E0C3FC; background:#F8E8FF; }
.db-tag.manual { color:#F8A8B8; background:#FFF0F3; }
.db-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px; }
.db-item { display:flex; align-items:center; gap:8px; padding:10px 10px; background:#FFF8FA; border-radius:12px; cursor:pointer; }
.db-item:active { transform:scale(0.97); }
.db-item.auto-sync { background:linear-gradient(135deg,#F8E8FF,#FFF8FA); }
.db-emoji { font-size:18px; width:28px; text-align:center; }
.db-info { flex:1; display:flex; flex-direction:column; }
.db-label { font-size:11px; color:#999; }
.db-value { font-size:13px; color:#333; font-weight:500; }
.db-hint { font-size:11px; color:#bbb; font-weight:400; }
.db-edit { font-size:12px; color:#ddd; cursor:pointer; }
.db-tag-sm { font-size:9px; color:#E0C3FC; }
.db-footer { display:flex; align-items:center; gap:6px; padding:8px 0 0; border-top:1px solid #F5F5F5; font-size:11px; color:#999; cursor:pointer; }
.db-footer:active { color:#F8A8B8; }
.db-arrow { color:#ddd; font-size:12px; margin-left:auto; }

/* 分区标题 */
.section-label { font-size:14px; font-weight:600; color:#333; margin-bottom:8px; margin-top:4px; padding:0 2px; }

/* 膳食推荐 */
.meal-suggestion { background:#fff; border-radius:18px; padding:14px; margin-bottom:12px; box-shadow:0 2px 12px rgba(248,168,184,0.06); cursor:pointer; }
.meal-suggestion:active { transform:scale(0.98); }
.ms-header { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.ms-icon { font-size:20px; }
.ms-info { flex:1; }
.ms-title { font-size:13px; font-weight:600; color:#333; display:block; }
.ms-date { font-size:10px; color:#bbb; display:block; margin-top:1px; }
.ms-refresh { font-size:10px; color:#F8A8B8; cursor:pointer; font-weight:500; }
.ms-card { display:flex; gap:12px; padding:12px; background:linear-gradient(135deg,#FFF8F0,#FFF0F3); border-radius:14px; margin-bottom:8px; }
.ms-emoji { font-size:36px; }
.ms-body { flex:1; }
.ms-name { font-size:14px; font-weight:600; color:#333; display:block; margin-bottom:2px; }
.ms-desc { font-size:11px; color:#E8889E; display:block; margin-bottom:4px; }
.ms-why { font-size:12px; color:#888; line-height:1.6; display:block; }
.ms-footer { font-size:11px; color:#bbb; text-align:center; padding-top:4px; }

/* 温柔推荐 */
.soft-rec { display:flex; align-items:flex-start; gap:10px; padding:14px 14px; background:#fff; border-radius:16px; margin-bottom:8px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.soft-rec:active { transform:scale(0.98); }
.sr-icon { font-size:22px; margin-top:2px; flex-shrink:0; }
.sr-info { flex:1; }
.sr-title { font-size:13px; font-weight:600; color:#333; display:block; margin-bottom:4px; }
.sr-desc { font-size:12px; color:#888; line-height:1.7; display:block; }
.sr-arrow { color:#ddd; font-size:14px; margin-top:4px; flex-shrink:0; }

.chat-entry { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:linear-gradient(135deg,#F8A8B8,#E0C3FC); color:#fff; border-radius:16px; font-size:14px; font-weight:500; cursor:pointer; margin-top:4px; }
.chat-entry:active { transform:scale(0.97); }
</style>
