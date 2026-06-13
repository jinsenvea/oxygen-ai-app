<template>
  <div class="tab-journey fade-in">
    <div class="page-container">
      <!-- ===== 顶部生命周期总时间轴 ===== -->
      <div class="timeline-header">
        <div class="th-title">👣 我的时光足迹</div>
        <div class="th-scroll">
          <div class="th-track-wrap"><div class="th-track"><div class="th-fill" :style="{ width: timelineProgress + '%' }"></div></div></div>
          <div class="th-nodes">
            <div v-for="(node, idx) in lifeNodes" :key="idx" class="th-node" :class="{ passed: idx < currentStageIdx, current: idx === currentStageIdx, future: idx > currentStageIdx }" @click="onStageClick(idx)">
              <div class="th-dot"><span class="th-emoji">{{ node.emoji }}</span></div>
              <div class="th-label">{{ node.label }}</div>
              <div class="th-sub">{{ idx === currentStageIdx ? node.status : (idx < currentStageIdx ? '已完成' : '未解锁') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 本阶段里程碑打卡 ===== -->
      <div class="milestone-card">
        <div class="mc-header" @click="onMilestoneAll">
          <span class="mc-title">📍 {{ currentStage.label }} · 里程碑打卡</span>
          <span class="mc-count" style="cursor:pointer">{{ doneMilestones }}/{{ currentStage.milestones.length }} ›</span>
        </div>
        <div class="mc-list">
          <div v-for="(ms, idx) in currentStage.milestones" :key="idx" class="mc-item" :class="{ done: ms.done }" @click="onMilestoneClick(ms)">
            <div class="mc-check" :class="{ checked: ms.done }"><span v-if="ms.done">✓</span></div>
            <div class="mc-info">
              <div class="mc-name" :class="{ 'text-done': ms.done }">{{ ms.name }}</div>
              <div class="mc-desc">{{ ms.desc }}</div>
            </div>
            <div v-if="ms.done" class="mc-badge">✅ 已打卡</div>
            <button v-else class="mc-btn" @click.stop="onMilestoneCheckin(ms)">去打卡</button>
          </div>
        </div>
        <div v-if="doneMilestones === currentStage.milestones.length && currentStage.milestones.length > 0" class="mc-reward" @click="onClaimReward">
          🎉 全部完成！领取「{{ currentStage.badge }}」勋章
        </div>
      </div>

      <!-- ===== 孕育日记 ===== -->
      <div class="diary-card">
        <div class="dc-header">
          <span class="dc-title">📝 孕育日记</span>
          <span class="dc-actions">
            <span class="dc-action" @click="onShareDiary">📤 分享</span>
            <span class="dc-count">{{ currentStage.diaries.length }}篇</span>
          </span>
        </div>
        <div class="dc-entries">
          <div v-for="(entry, idx) in currentStage.diaries" :key="idx" class="dc-entry" @click="onDiaryDetail(entry)">
            <div class="dc-entry-top">
              <div class="dc-entry-mood">{{ entry.mood }}</div>
              <div class="dc-entry-date">{{ entry.date }}</div>
              <div class="dc-entry-actions">
                <span class="dc-edit" @click.stop="onEditDiary(entry)">✏️</span>
                <span class="dc-del" @click.stop="onDeleteDiary(entry)">🗑️</span>
              </div>
            </div>
            <div class="dc-entry-text">{{ entry.text }}</div>
            <div v-if="entry.images && entry.images.length" class="dc-entry-imgs">
              <div v-for="(img, i) in entry.images.slice(0,3)" :key="i" class="dc-thumb">{{ img }}</div>
            </div>
          </div>
        </div>
        <div class="dc-ai-tip" @click="onAiWriteDiary">
          <span class="dc-ai-icon">🤖</span>
          <span class="dc-ai-text">氧宝AI帮你润色日记 → 更温暖更感人</span>
          <span class="dc-ai-arrow">›</span>
        </div>
        <button class="dc-write-btn" @click="onWriteDiary">✏️ 写30秒日记</button>
      </div>

      <!-- ===== 本阶段适配服务 ===== -->
      <div class="service-card">
        <div class="sc-header">
          <span class="sc-title">🎯 {{ currentStage.label }}推荐服务</span>
          <span class="sc-sub">根据你当前阶段智能匹配</span>
        </div>
        <div v-for="svc in currentStage.services" :key="svc.id" class="sc-item" @click="onServiceClick(svc)">
          <div class="sc-icon">{{ svc.icon }}</div>
          <div class="sc-info">
            <div class="sc-name">{{ svc.name }}</div>
            <div class="sc-desc">{{ svc.desc }}</div>
            <div class="sc-bottom">
              <span class="sc-price" :class="{ free: svc.price === 0 }">{{ svc.price === 0 ? '免费' : '¥'+svc.price.toLocaleString() }}</span>
              <span class="sc-rating">⭐ {{ svc.rating }}</span>
            </div>
          </div>
          <button class="sc-ask-btn" @click.stop="onServiceAsk(svc)">咨询预约</button>
        </div>
      </div>

      <!-- ===== 全旅程回忆相册 ===== -->
      <div class="album-card" @click="onAlbumClick">
        <div class="album-header">
          <span class="album-title">📸 全旅程回忆相册</span>
          <span class="album-more" @click.stop="onGenerateAlbum">📖 生成纪念册 ›</span>
        </div>
        <div class="album-grid">
          <div class="album-photo" v-for="(p, idx) in previewPhotos" :key="idx">{{ p }}</div>
          <div class="album-more-btn">+{{ totalPhotos }}张</div>
        </div>
        <div class="album-actions">
          <button class="album-btn primary" @click.stop="onGenerateAlbum">📖 生成电子纪念册</button>
          <button class="album-btn outline" @click.stop="onShareAlbum">🖼️ 分享到朋友圈</button>
        </div>
      </div>

      <div style="height:20px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast, showDialog } from 'vant'

const currentStageIdx = ref(1)

const lifeNodes = [
  { emoji:'🌸', label:'备孕期', status:'准备中', doneNum:2 },
  { emoji:'🤰', label:'孕早期', status:'孕8周+2天', doneNum:3 },
  { emoji:'👶', label:'孕中期', status:'孕24周+3天', doneNum:1 },
  { emoji:'🏥', label:'孕晚期', status:'即将开启', doneNum:0 },
  { emoji:'🌙', label:'月子期', status:'未解锁', doneNum:0 },
  { emoji:'🍼', label:'宝宝0-1岁', status:'未解锁', doneNum:0 },
  { emoji:'🧸', label:'宝宝1-3岁', status:'未解锁', doneNum:0 }
]

const stageData = [
  { badge:'备孕达人', milestones:[
    { name:'完成孕前检查', desc:'双方全面身体检查', done:true },
    { name:'开始补充叶酸', desc:'每日400μg叶酸', done:true },
    { name:'测出早孕', desc:'记录发现怀孕的喜悦时刻', done:false }
  ], diaries:[
    { mood:'🥰', date:'2026-05-20', text:'今天测出两条杠了！老公激动得抱着我转圈，我们的小天使终于来了～', images:['🎯'] },
    { mood:'📚', date:'2026-05-15', text:'开始做孕前功课，买了叶酸和基础体温计，加油！', images:[] }
  ], services:[
    { id:1, icon:'🥗', name:'备孕期调理咨询', desc:'专业营养师一对一指导', price:299, rating:4.8 },
    { id:2, icon:'🧘', name:'备孕瑜伽小班课', desc:'提升体质 放松身心', price:1680, rating:4.7 }
  ]},
  { badge:'孕早期守护者', milestones:[
    { name:'第一次B超见胎心', desc:'上传B超单拍照打卡', done:true },
    { name:'完成建档产检', desc:'医院建档 领取母子手册', done:true },
    { name:'NT检查通过', desc:'早期唐氏筛查', done:true },
    { name:'开始记录孕吐日记', desc:'记录早孕反应', done:false }
  ], diaries:[
    { mood:'😭', date:'2026-04-10', text:'孕吐第7天了，吃什么吐什么…但听到宝宝心跳那瞬间觉得一切都值得', images:['📋'] },
    { mood:'🥰', date:'2026-03-28', text:'B超看到胎心了！一个小点点在屏幕上跳动，生命的奇迹✨', images:['📋'] }
  ], services:[
    { id:3, icon:'🥦', name:'孕期营养指导', desc:'科学饮食缓解早孕反应', price:399, rating:4.9 },
    { id:4, icon:'👩‍⚕️', name:'孕妈社群VIP', desc:'同孕期妈妈交流陪伴', price:0, rating:4.8 }
  ]},
  { badge:'孕中期守护者', milestones:[
    { name:'第一次感受到胎动', desc:'记录初次胎动的感动瞬间', done:true },
    { name:'四维大排畸通过', desc:'上传报告拍照打卡', done:false },
    { name:'糖耐量筛查', desc:'喝糖水检查妊娠糖尿病', done:false },
    { name:'拍孕妇照', desc:'记录最美的孕肚时刻', done:false }
  ], diaries:[
    { mood:'🥰', date:'2026-06-08', text:'今天第一次感觉到胎动！像小鱼吐泡泡一样轻轻的～爸爸把手放在肚皮上也感受到了，两个人都哭了😭', images:['👶'] },
    { mood:'📝', date:'2026-06-01', text:'四维预约好了，好期待看到宝宝的小脸🥰', images:[] }
  ], services:[
    { id:5, icon:'🤱', name:'月嫂见面会', desc:'金牌月嫂面对面沟通', price:0, rating:4.9 },
    { id:6, icon:'🏠', name:'月子房型参观', desc:'28天尊享套餐提前锁房', price:26800, rating:4.8 }
  ]},
  { badge:'足月准妈妈', milestones:[
    { name:'足月37周', desc:'宝宝足月 随时准备见面', done:false },
    { name:'入盆', desc:'记录宝宝入盆时刻', done:false },
    { name:'备好待产包', desc:'待产物品全部准备齐全', done:false }
  ], diaries:[
    { mood:'😊', date:'2026-07-20', text:'足月了！随时准备和宝宝见面，期待又紧张～', images:[] }
  ], services:[
    { id:7, icon:'🤱', name:'42天高级月嫂套餐', desc:'金牌月嫂住家服务', price:13800, rating:4.9 },
    { id:8, icon:'🏠', name:'月子中心28天', desc:'一站式月子照护', price:26800, rating:4.8 },
    { id:9, icon:'💆', name:'开奶通乳上门', desc:'专业通乳师3次上门', price:1980, rating:4.9 }
  ]},
  { badge:'满分月子妈妈', milestones:[
    { name:'宝宝满月', desc:'庆祝宝宝满月', done:false },
    { name:'产后42天复查', desc:'妈妈和宝宝一起复查', done:false },
    { name:'通乳完成', desc:'顺利母乳喂养', done:false }
  ], diaries:[], services:[
    { id:10, icon:'💪', name:'盆底肌修复', desc:'专业仪器+手法 10次', price:2980, rating:4.7 },
    { id:11, icon:'🧘', name:'产后体态管理', desc:'私教一对一恢复身材', price:3980, rating:4.8 }
  ]},
  { badge:'百天育儿达人', milestones:[
    { name:'宝宝百天', desc:'记录百天成长', done:false },
    { name:'第一颗牙', desc:'记录萌牙时刻', done:false },
    { name:'周岁生日', desc:'庆祝第一个生日', done:false }
  ], diaries:[], services:[
    { id:12, icon:'👶', name:'育儿陪护服务', desc:'专业育儿嫂上门', price:8800, rating:4.8 },
    { id:13, icon:'🧸', name:'早教咨询指导', desc:'科学早教方案定制', price:599, rating:4.7 }
  ]},
  { badge:'成长陪伴官', milestones:[
    { name:'疫苗接种完成', desc:'按计划完成疫苗', done:false },
    { name:'第一次走路', desc:'记录宝宝迈出第一步', done:false }
  ], diaries:[], services:[
    { id:14, icon:'🎓', name:'托育早教服务', desc:'专业托育+早教一体', price:12800, rating:4.8 }
  ]}
]

const currentStage = computed(() => stageData[currentStageIdx.value])
const timelineProgress = computed(() => ((currentStageIdx.value+1)/lifeNodes.length)*100)
const doneMilestones = computed(() => currentStage.value.milestones.filter(m=>m.done).length)
const previewPhotos = ['🌸','👶','📋','🥰']
const totalPhotos = computed(() => {
  let c=0; stageData.forEach(s=>s.diaries.forEach(d=>{if(d.images)c+=d.images.length})); return c||12
})

/* ========== 阶段节点 ========== */
function onStageClick(idx) {
  if (idx > currentStageIdx.value) {
    showToast('⏳ 该阶段尚未解锁')
    return
  }
  currentStageIdx.value = idx
}

/* ========== 里程碑交互 ========== */
function onMilestoneClick(ms) {
  if (ms.done) {
    showDialog({ title:'✅ '+ms.name, message:`${ms.desc}\n\n已完成打卡 ✅\n\n继续完成其他里程碑吧～`, confirmButtonText:'知道了', confirmButtonColor:'#F8A8B8' })
  }
}

function onMilestoneCheckin(ms) {
  showDialog({
    title: `📌 打卡确认`,
    message: `${ms.name}\n${ms.desc}\n\n打卡后可获得积分+10\n集齐里程碑可解锁勋章 🎖️`,
    confirmButtonText: '确认打卡',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    ms.done = true
    showToast('🎉 打卡成功！积分+10')
    if (doneMilestones.value === currentStage.value.milestones.length) {
      setTimeout(() => {
        showDialog({
          title: '🎊 全部里程碑已完成！',
          message: `恭喜完成「${currentStage.value.label}」全部里程碑\n获得「${currentStage.value.badge}」勋章`,
          confirmButtonText: '查看勋章墙',
          confirmButtonColor: '#F8A8B8'
        }).then(() => window.location.hash = '#/badge-wall').catch(() => {})
      }, 500)
    }
  }).catch(() => {})
}

function onClaimReward() {
  window.location.hash = '#/badge-wall'
}

function onMilestoneAll() {
  window.location.hash = '#/milestone-list'
}

/* ========== 日记交互 ========== */
function onDiaryDetail(entry) {
  window.location.hash = '#/diary-detail'
}

function onEditDiary(entry) {
  window.location.hash = '#/diary-detail'
}

function onDeleteDiary(entry) {
  showDialog({
    title: '🗑️ 删除日记',
    message: '确定删除这条日记吗？删除后不可恢复',
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonColor: '#FF4D4F'
  }).then(() => {
    const idx = currentStage.value.diaries.indexOf(entry)
    if (idx > -1) currentStage.value.diaries.splice(idx, 1)
    showToast('日记已删除')
  }).catch(() => {})
}

function onWriteDiary() {
  window.location.hash = '#/write-diary'
}

function onAiWriteDiary() {
  window.location.hash = '#/write-diary'
}

function onShareDiary() {
  showDialog({
    title: '📤 分享日记',
    message: '将孕育日记分享给家人朋友，共同感受这份美好 💕\n\n分享方式：\n• 分享到微信朋友圈\n• 分享给家人群\n• 保存为精美卡片',
    confirmButtonText: '分享到朋友圈',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => showToast('✅ 已生成分享图片')).catch(() => {})
}

/* ========== 服务交互 ========== */
function onServiceClick(svc) {
  onServiceAsk(svc)
}

function onServiceAsk(svc) {
  const priceInfo = svc.price === 0 ? '免费' : '¥'+svc.price.toLocaleString()
  showDialog({
    title: '💬 ' + svc.name,
    message: `${svc.desc}\n${priceInfo}  ⭐ ${svc.rating}\n\n点击「去咨询」跳转氧宝私语\nAI为您详细介绍并预约到店`,
    confirmButtonText: '去咨询预约',
    cancelButtonText: '再看看',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' }))
  }).catch(() => {})
}

/* ========== 相册交互 ========== */
function onAlbumClick() {
  window.location.hash = '#/album'
}

function onGenerateAlbum() {
  showDialog({
    title: '📖 生成电子纪念册',
    message: '将您全旅程的照片和日记自动生成一本精美的电子纪念册 📕\n\n包含：\n• 所有上传的照片\n• 精选日记内容\n• 里程碑成就\n• 宝宝成长记录\n\n可保存为PDF或分享给家人',
    confirmButtonText: '立即生成',
    cancelButtonText: '稍后',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => {
    showToast('✅ 电子纪念册正在生成中...')
  }).catch(() => {})
}

function onShareAlbum() {
  showDialog({
    title: '🖼️ 分享到朋友圈',
    message: '将您的孕育旅程分享给亲朋好友 💕\n\n分享内容：\n📸 精选照片墙\n📝 暖心日记摘选\n🏆 里程碑成就\n\n按「分享」生成带氧阁品牌水印的精美长图',
    confirmButtonText: '生成分享图',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => showToast('✅ 已生成分享图片')).catch(() => {})
}
</script>

<style scoped>
.tab-journey { height:100%; display:flex; flex-direction:column; background:#F5F5F7; }
.page-container { padding-bottom:110px; }

/* 顶部时间轴 */
.timeline-header { background:#fff; padding:50px 16px 16px; }
.th-title { font-size:17px; font-weight:700; color:#333; margin-bottom:18px; }
.th-scroll { overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; padding-bottom:4px; }
.th-scroll::-webkit-scrollbar { display:none; }
.th-track-wrap { position:relative; margin:0 4px 8px; height:3px; background:#F0F0F0; border-radius:2px; }
.th-fill { height:100%; background:linear-gradient(90deg,#F8A8B8,#E0C3FC); border-radius:2px; transition:width 0.5s ease; }
.th-nodes { display:flex; gap:0; min-width:max-content; }
.th-node { display:flex; flex-direction:column; align-items:center; gap:4px; padding:0 10px; cursor:pointer; opacity:0.35; transition:all 0.3s; min-width:72px; }
.th-node.passed { opacity:0.65; }
.th-node.current { opacity:1; }
.th-node.future { opacity:0.3; }
.th-dot { width:38px; height:38px; border-radius:50%; background:#F0F0F0; display:flex; align-items:center; justify-content:center; font-size:17px; transition:all 0.3s; border:2.5px solid transparent; }
.th-node.current .th-dot { background:linear-gradient(135deg,#F8A8B8,#E0C3FC); border-color:#F8A8B8; box-shadow:0 3px 12px rgba(248,168,184,0.35); transform:scale(1.1); }
.th-node.passed .th-dot { background:#FFF0F3; border-color:#F8A8B8; }
.th-label { font-size:11px; color:#555; font-weight:500; white-space:nowrap; }
.th-node.current .th-label { color:#F8A8B8; font-weight:700; }
.th-sub { font-size:8px; color:#bbb; white-space:nowrap; }
.th-node.passed .th-sub { color:#F8A8B8; }

/* 里程碑 */
.milestone-card { margin:12px 16px 0; background:#fff; border-radius:18px; padding:16px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.mc-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.mc-title { font-size:15px; font-weight:600; color:#333; }
.mc-count { font-size:13px; color:#F8A8B8; font-weight:600; }
.mc-list { display:flex; flex-direction:column; gap:8px; }
.mc-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#FFF8FA; border-radius:12px; cursor:pointer; transition:all 0.2s; }
.mc-item.done { background:#F8FAF8; }
.mc-item:active { transform:scale(0.98); }
.mc-check { width:22px; height:22px; border-radius:50%; border:2px solid #ddd; display:flex; align-items:center; justify-content:center; font-size:12px; color:#fff; flex-shrink:0; transition:all 0.2s; }
.mc-check.checked { background:#52C41A; border-color:#52C41A; }
.mc-info { flex:1; min-width:0; }
.mc-name { font-size:14px; font-weight:500; color:#333; }
.mc-name.text-done { color:#999; }
.mc-desc { font-size:11px; color:#bbb; margin-top:1px; }
.mc-badge { font-size:10px; color:#52C41A; background:#F0FFF0; padding:3px 8px; border-radius:6px; font-weight:500; flex-shrink:0; }
.mc-btn { font-size:11px; color:#fff; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; padding:5px 12px; border-radius:8px; cursor:pointer; font-weight:500; flex-shrink:0; }
.mc-btn:active { transform:scale(0.92); }
.mc-reward { margin-top:12px; padding:10px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:10px; font-size:13px; color:#F8A8B8; font-weight:500; text-align:center; cursor:pointer; }
.mc-reward:active { opacity:0.8; }

/* 日记 */
.diary-card { margin:12px 16px 0; background:#fff; border-radius:18px; padding:16px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.dc-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.dc-title { font-size:15px; font-weight:600; color:#333; }
.dc-actions { display:flex; align-items:center; gap:10px; }
.dc-action { font-size:12px; color:#F8A8B8; cursor:pointer; font-weight:500; }
.dc-action:active { opacity:0.6; }
.dc-count { font-size:12px; color:#bbb; }
.dc-entries { display:flex; flex-direction:column; gap:10px; margin-bottom:12px; }
.dc-entry { background:#FFF8FA; border-radius:12px; padding:12px; cursor:pointer; }
.dc-entry:active { opacity:0.7; }
.dc-entry-top { display:flex; align-items:center; gap:6px; margin-bottom:4px; }
.dc-entry-mood { font-size:14px; }
.dc-entry-date { font-size:10px; color:#bbb; flex:1; }
.dc-entry-actions { display:flex; gap:4px; }
.dc-edit, .dc-del { font-size:12px; cursor:pointer; opacity:0.4; }
.dc-edit:hover, .dc-del:hover { opacity:1; }
.dc-entry-text { font-size:13px; color:#555; line-height:1.6; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
.dc-entry-imgs { display:flex; gap:4px; margin-top:6px; }
.dc-thumb { width:40px; height:40px; border-radius:6px; background:#F0E6FF; display:flex; align-items:center; justify-content:center; font-size:16px; }
.dc-ai-tip { display:flex; align-items:center; gap:6px; padding:8px 12px; background:linear-gradient(135deg,#F0E6FF,#FFF0F3); border-radius:10px; margin-bottom:10px; cursor:pointer; }
.dc-ai-tip:active { opacity:0.7; }
.dc-ai-icon { font-size:16px; }
.dc-ai-text { flex:1; font-size:12px; color:#888; }
.dc-ai-arrow { color:#ccc; font-size:12px; }
.dc-write-btn { width:100%; height:40px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border:1.5px dashed #F8A8B8; border-radius:20px; font-size:14px; color:#F8A8B8; font-weight:500; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; transition:all 0.2s; }
.dc-write-btn:active { background:#FFE4E9; }

/* 服务 */
.service-card { margin:12px 16px 0; background:#fff; border-radius:18px; padding:16px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.sc-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.sc-title { font-size:15px; font-weight:600; color:#333; }
.sc-sub { font-size:11px; color:#bbb; }
.sc-item { display:flex; align-items:center; gap:10px; padding:12px; background:#FFF8FA; border-radius:12px; margin-bottom:8px; cursor:pointer; }
.sc-item:active { transform:scale(0.98); }
.sc-item:last-child { margin-bottom:0; }
.sc-icon { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
.sc-info { flex:1; min-width:0; }
.sc-name { font-size:14px; font-weight:600; color:#333; margin-bottom:2px; }
.sc-desc { font-size:11px; color:#999; margin-bottom:4px; }
.sc-bottom { display:flex; align-items:center; gap:8px; }
.sc-price { font-size:15px; font-weight:700; color:#FF6B81; }
.sc-price.free { color:#52C41A; }
.sc-rating { font-size:11px; color:#FAAD14; }
.sc-ask-btn { font-size:11px; color:#fff; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; padding:7px 12px; border-radius:8px; cursor:pointer; font-weight:500; flex-shrink:0; white-space:nowrap; }
.sc-ask-btn:active { transform:scale(0.92); }

/* 相册 */
.album-card { margin:12px 16px 0; background:#fff; border-radius:18px; padding:16px; box-shadow:0 1px 4px rgba(0,0,0,0.04); cursor:pointer; }
.album-card:active { opacity:0.8; }
.album-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.album-title { font-size:15px; font-weight:600; color:#333; }
.album-more { font-size:11px; color:#F8A8B8; font-weight:500; cursor:pointer; }
.album-grid { display:flex; gap:6px; margin-bottom:12px; }
.album-photo { width:56px; height:56px; border-radius:10px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); display:flex; align-items:center; justify-content:center; font-size:20px; }
.album-more-btn { width:56px; height:56px; border-radius:10px; background:#F5F5F5; display:flex; align-items:center; justify-content:center; font-size:10px; color:#999; }
.album-actions { display:flex; gap:8px; }
.album-btn { flex:1; height:34px; border-radius:10px; font-size:12px; font-weight:500; cursor:pointer; border:none; }
.album-btn.primary { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.album-btn.primary:active { transform:scale(0.96); }
.album-btn.outline { background:#FFF0F3; color:#F8A8B8; }
.album-btn.outline:active { transform:scale(0.96); }
</style>
