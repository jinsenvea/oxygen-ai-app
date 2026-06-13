<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">{{ selectedCourse ? '📖 ' + selectedCourse.name : '📚 妈妈课堂' }}</span>
      <button v-if="!selectedCourse" class="dp-action" style="visibility:hidden">　</button>
      <button v-else class="dp-action" @click="selectedCourse = null">✕ 关闭</button>
    </div>

    <!-- 课程列表 -->
    <div v-if="!selectedCourse" class="dp-body">
      <div class="warm-banner">📚 精选孕产课程，由氧阁专业团队打造，陪你从容度过孕期每个阶段～</div>
      <div class="course-filter">
        <span v-for="(f,i) in filters" :key="i" class="cf-tab" :class="{active:activeFilter===i}" @click="activeFilter = i">{{ f }}</span>
      </div>
      <div v-for="(c,i) in filteredCourses" :key="i" class="course-card" @click="onCourseClick(c)" :style="{animationDelay: i*0.06+'s'}">
        <div class="cc-icon-wrap" :style="{background: c.bg}">{{ c.icon }}</div>
        <div class="cc-info">
          <span class="cc-name">{{ c.name }}</span>
          <span class="cc-desc">{{ c.desc }}</span>
          <div class="cc-meta">
            <span class="cc-tag">{{ c.tag }}</span>
            <span>⏱ {{ c.duration }}</span>
            <span>{{ c.lessons }}节课</span>
          </div>
        </div>
        <div class="cc-right">
          <span class="cc-collect" @click.stop="onCollect(c)">{{ c.collected ? '⭐' : '☆' }}</span>
          <span class="cc-arrow">›</span>
        </div>
      </div>
    </div>

    <!-- 课程详情 -->
    <div v-else class="dp-body">
      <div class="cd-hero" :style="{background: selectedCourse.bg}">
        <span class="cd-hero-icon">{{ selectedCourse.icon }}</span>
        <div class="cd-hero-info">
          <span class="cd-hero-name">{{ selectedCourse.name }}</span>
          <span class="cd-hero-desc">{{ selectedCourse.desc }}</span>
          <div class="cd-hero-tags">
            <span>⏱ {{ selectedCourse.duration }}</span>
            <span>{{ selectedCourse.lessons }}节课</span>
          </div>
        </div>
      </div>

      <!-- 讲师信息 -->
      <div class="cd-teacher">
        <span class="cd-teacher-avatar">{{ selectedCourse.teacherAvatar || '👩‍🏫' }}</span>
        <div class="cd-teacher-info">
          <span class="cd-teacher-name">{{ selectedCourse.teacher }}</span>
          <span class="cd-teacher-desc">{{ selectedCourse.teacherDesc }}</span>
        </div>
      </div>

      <!-- 课程大纲 -->
      <div class="cd-section">
        <span class="cd-section-title">📋 课程大纲</span>
        <div v-for="(l,i) in selectedCourse.lessonsList" :key="i" class="cd-lesson" @click="onLessonClick(l)">
          <span class="cd-lesson-num">0{{ i+1 }}</span>
          <div class="cd-lesson-info">
            <span class="cd-lesson-name">{{ l.name }}</span>
            <span class="cd-lesson-desc">{{ l.desc }}</span>
          </div>
          <span class="cd-lesson-time">{{ l.time }}</span>
        </div>
      </div>

      <!-- 课程介绍 -->
      <div class="cd-section">
        <span class="cd-section-title">📝 课程介绍</span>
        <div class="cd-intro">{{ selectedCourse.intro }}</div>
      </div>

      <!-- 适合人群 -->
      <div class="cd-section">
        <span class="cd-section-title">🎯 适合人群</span>
        <div class="cd-audience">
          <span v-for="(a,i) in selectedCourse.audience" :key="i" class="cd-audience-tag">{{ a }}</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="cd-actions">
        <button class="cd-btn primary" @click="onStartLearn">📖 开始学习</button>
        <button class="cd-btn outline" @click="onCollect(selectedCourse)">{{ selectedCourse.collected ? '⭐ 已收藏' : '☆ 收藏课程' }}</button>
      </div>
      <div class="cd-footer" @click="goToChat">
        <span>💬 有什么疑问？随时问氧宝～</span>
        <span>›</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast, showDialog } from 'vant'

const selectedCourse = ref(null)
const activeFilter = ref(0)
const filters = ['全部', '孕期', '月子', '育儿', '产后']

const courses = ref([
  {
    icon:'🥦', name:'孕晚期营养与运动', desc:'科学饮食搭配·安全运动方案', tag:'孕期', duration:'15min', lessons:4, bg:'linear-gradient(135deg,#FFF0F3,#FFE4E9)',
    teacher:'李婷 营养师', teacherDesc:'国家注册营养师 · 孕期营养指导经验8年', teacherAvatar:'👩‍⚕️',
    collected: false,
    intro:'孕晚期是宝宝发育最快的阶段，也是妈妈身体负担最重的时期。本课程由资深营养师精心打造，帮助你科学安排每日饮食，合理控制体重增长，同时通过安全的运动缓解身体不适，为顺利分娩做好准备。',
    audience:['孕28周以上准妈妈','体重增长过快需要指导','希望顺产的妈妈','有孕期不适的妈妈'],
    lessonsList:[
      { name:'孕晚期营养需求', desc:'了解宝宝和妈妈需要的核心营养素', time:'4min' },
      { name:'一日三餐科学搭配', desc:'实操案例：早中晚餐怎么吃', time:'4min' },
      { name:'安全运动指南', desc:'适合孕晚期的温和运动推荐', time:'4min' },
      { name:'体重管理策略', desc:'合理控制体重，为分娩做准备', time:'3min' }
    ]
  },
  {
    icon:'🍼', name:'母乳喂养技巧准备', desc:'正确含接姿势·哺乳常见问题', tag:'月子', duration:'20min', lessons:5, bg:'linear-gradient(135deg,#F8E8FF,#E8D5FF)',
    teacher:'王芳 哺乳指导', teacherDesc:'国际认证哺乳顾问 · 指导过500+位妈妈', teacherAvatar:'🤱',
    collected: false,
    intro:'母乳喂养是妈妈和宝宝之间最亲密的连接。本课程从最基础的含接姿势开始，一步步带你掌握正确的哺乳方法，提前了解可能遇到的问题和解决方案，让你在宝宝出生后更加从容自信。',
    audience:['孕晚期准妈妈','计划母乳喂养的妈妈','希望提前学习的妈妈','一胎新手妈妈'],
    lessonsList:[
      { name:'母乳喂养的好处', desc:'为什么母乳是宝宝最好的食物', time:'4min' },
      { name:'正确的含接姿势', desc:'图文并茂讲解含接要点', time:'5min' },
      { name:'哺乳频率与信号', desc:'如何识别宝宝饿了的表现', time:'4min' },
      { name:'常见问题处理', desc:'乳头皲裂·胀奶·乳腺炎预防', time:'4min' },
      { name:'母乳储存方法', desc:'背奶妈妈的必备知识', time:'3min' }
    ]
  },
  {
    icon:'👶', name:'新生儿护理入门', desc:'洗澡·抚触·脐带护理·黄疸观察', tag:'育儿', duration:'25min', lessons:6, bg:'linear-gradient(135deg,#E8F4FF,#D0ECFF)',
    teacher:'张秀兰', teacherDesc:'金牌月嫂 · 护理过100+新生儿', teacherAvatar:'👩‍⚕️',
    collected: true,
    intro:'迎接新生命的到来，既幸福又紧张。本课程由经验丰富的金牌月嫂手把手教你新生儿护理的每一个细节：如何给宝宝洗澡、做抚触、护理脐带、观察黄疸……让你从手足无措到得心应手。',
    audience:['新手爸妈','即将生产的孕妈妈','请了月嫂也想自己学','二胎想温习的妈妈'],
    lessonsList:[
      { name:'新生儿特点', desc:'了解新生儿的生理特点和行为表现', time:'4min' },
      { name:'正确抱姿与安抚', desc:'横抱·竖抱·飞机抱的正确方法', time:'4min' },
      { name:'洗澡与抚触', desc:'洗澡步骤+抚触手法演示', time:'5min' },
      { name:'脐带护理', desc:'脐带脱落前后的护理要点', time:'4min' },
      { name:'黄疸观察', desc:'生理性黄疸vs病理性黄疸区别', time:'4min' },
      { name:'睡眠与喂养', desc:'新生儿作息规律培养', time:'4min' }
    ]
  },
  {
    icon:'🤱', name:'如何选择月嫂', desc:'面试技巧·资质辨别·避坑指南', tag:'月子', duration:'12min', lessons:3, bg:'linear-gradient(135deg,#FFF8F0,#FFE8CC)',
    teacher:'氧阁顾问团队', teacherDesc:'氧阁资深母婴顾问 · 服务过10000+家庭', teacherAvatar:'👩‍💼',
    collected: false,
    intro:'选对月嫂，整个月子都轻松。本课程由氧阁资深顾问团队总结多年经验，告诉你如何从资质、经验、性格、技能等多个维度甄选靠谱月嫂，面试时问什么问题，签约时注意哪些细节。',
    audience:['计划请月嫂的孕妈妈','对月嫂市场不了解','担心遇到不靠谱月嫂','希望提前规划的家庭'],
    lessonsList:[
      { name:'月嫂的资质怎么看', desc:'证件·经验·口碑·背景调查全攻略', time:'5min' },
      { name:'面试月嫂必问清单', desc:'10个关键问题帮你选对人', time:'4min' },
      { name:'签约注意事项', desc:'合同条款·试用期·更换机制', time:'3min' }
    ]
  },
  {
    icon:'💪', name:'产后恢复必修课', desc:'盆底肌修复·腹直肌分离·体态管理', tag:'产后', duration:'18min', lessons:4, bg:'linear-gradient(135deg,#FFF0F3,#FFE4E9)',
    teacher:'陈静 产康师', teacherDesc:'资深产后康复师 · 8年产后修复经验', teacherAvatar:'💪',
    collected: false,
    intro:'产后恢复不是减肥，而是让身体回归健康状态。本课程带你了解产后身体的变化、盆底肌和腹直肌的重要性、以及科学的修复方法。提前学习，等宝宝出生后就能从容开启修复计划。',
    audience:['孕晚期准妈妈','产后妈妈','关注产后身材','希望科学恢复的妈妈'],
    lessonsList:[
      { name:'产后身体变化', desc:'了解产后身体自然恢复过程', time:'5min' },
      { name:'盆底肌修复入门', desc:'什么是盆底肌·为什么需要修复', time:'5min' },
      { name:'腹直肌分离自测', desc:'在家就能做的简单检测方法', time:'4min' },
      { name:'产后体态管理', desc:'从呼吸开始，找回身体的正位', time:'4min' }
    ]
  }
])

const filteredCourses = computed(() => {
  if (activeFilter.value === 0) return courses.value
  const filterMap = ['', '孕期', '月子', '育儿', '产后']
  const tag = filterMap[activeFilter.value]
  return courses.value.filter(c => c.tag === tag)
})

function goBack() {
  if (selectedCourse.value) { selectedCourse.value = null; return }
  window.history.back()
}

function onCourseClick(c) {
  selectedCourse.value = c
}

function onLessonClick(l) {
  showDialog({
    title: `📖 ${l.name}`,
    message: `${l.desc}\n\n⏱ ${l.time}\n\n点击「开始学习」跳转氧宝私语，AI为你详细讲解本节内容～`,
    confirmButtonText: '开始学习',
    cancelButtonText: '收藏',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => goToChat()).catch(() => showToast('⭐ 已收藏'))
}

function onCollect(c) {
  c.collected = !c.collected
  showToast(c.collected ? '⭐ 已收藏' : '已取消收藏')
}

function onStartLearn() {
  showDialog({
    title: `📖 开始学习「${selectedCourse.value.name}」`,
    message: `共 ${selectedCourse.value.lessons} 节课 · 约 ${selectedCourse.value.duration}\n\n跳转氧宝私语，AI为你逐节讲解～\n\n每节课后都有小测试，巩固知识哦！`,
    confirmButtonText: '开始学',
    cancelButtonText: '先收藏',
    showCancelButton: true,
    confirmButtonColor: '#F8A8B8'
  }).then(() => goToChat()).catch(() => { selectedCourse.value.collected = true })
}

function goToChat() {
  window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' }))
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:16px; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; flex-shrink:0; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }

.warm-banner { font-size:13px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; margin-bottom:12px; line-height:1.6; }

/* 筛选 */
.course-filter { display:flex; gap:6px; margin-bottom:12px; overflow-x:auto; padding-bottom:4px; }
.cf-tab { flex-shrink:0; padding:5px 16px; background:#F5F5F5; border-radius:14px; font-size:12px; color:#999; cursor:pointer; font-weight:500; }
.cf-tab.active { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }

/* 课程卡片 */
.course-card { display:flex; align-items:center; gap:12px; padding:14px; background:#fff; border-radius:16px; margin-bottom:8px; cursor:pointer; transition:all 0.25s; box-shadow:0 2px 8px rgba(248,168,184,0.06); border:1px solid rgba(248,168,184,0.04); animation:fadeUp 0.35s ease-out both; }
@keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
.course-card:active { transform:scale(0.97); box-shadow:0 1px 4px rgba(248,168,184,0.04); }
.cc-icon-wrap { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0; }
.cc-info { flex:1; min-width:0; }
.cc-name { font-size:14px; font-weight:700; color:#333; display:block; }
.cc-desc { font-size:11px; color:#888; margin:2px 0 4px; display:block; }
.cc-meta { display:flex; gap:8px; font-size:9px; color:#bbb; align-items:center; }
.cc-tag { color:#F8A8B8; background:#FFF0F3; padding:1px 6px; border-radius:4px; font-weight:500; }
.cc-right { display:flex; flex-direction:column; align-items:center; gap:4px; }
.cc-collect { font-size:18px; cursor:pointer; }
.cc-arrow { color:#ddd; font-size:14px; }

/* 课程详情 */
.cd-hero { display:flex; gap:14px; padding:20px; border-radius:18px; margin-bottom:12px; }
.cd-hero-icon { font-size:44px; }
.cd-hero-info { flex:1; }
.cd-hero-name { font-size:18px; font-weight:700; color:#333; display:block; }
.cd-hero-desc { font-size:12px; color:#888; margin:4px 0; display:block; }
.cd-hero-tags { display:flex; gap:8px; font-size:10px; color:#bbb; }

.cd-teacher { display:flex; align-items:center; gap:10px; padding:12px 14px; background:#fff; border-radius:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.cd-teacher-avatar { font-size:28px; }
.cd-teacher-info { flex:1; }
.cd-teacher-name { font-size:13px; font-weight:600; color:#333; display:block; }
.cd-teacher-desc { font-size:11px; color:#bbb; margin-top:1px; display:block; }

.cd-section { background:#fff; border-radius:16px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.cd-section-title { font-size:14px; font-weight:600; color:#333; display:block; margin-bottom:10px; }
.cd-lesson { display:flex; align-items:center; gap:10px; padding:8px 0; cursor:pointer; border-bottom:1px solid #F5F5F5; }
.cd-lesson:last-child { border:none; }
.cd-lesson:active { opacity:0.6; }
.cd-lesson-num { width:24px; height:24px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E0C3FC); color:#fff; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; }
.cd-lesson-info { flex:1; }
.cd-lesson-name { font-size:13px; font-weight:500; color:#333; display:block; }
.cd-lesson-desc { font-size:10px; color:#bbb; margin-top:1px; display:block; }
.cd-lesson-time { font-size:10px; color:#ccc; flex-shrink:0; }

.cd-intro { font-size:13px; color:#666; line-height:1.8; }
.cd-audience { display:flex; flex-wrap:wrap; gap:6px; }
.cd-audience-tag { font-size:11px; color:#F8A8B8; background:#FFF0F3; padding:4px 12px; border-radius:12px; }

.cd-actions { display:flex; gap:8px; margin-bottom:8px; }
.cd-btn { flex:1; height:42px; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer; border:none; }
.cd-btn.primary { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.cd-btn.primary:active { transform:scale(0.97); }
.cd-btn.outline { background:#fff; color:#666; border:1.5px solid #eee; }
.cd-btn.outline:active { transform:scale(0.97); }

.cd-footer { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; font-size:12px; color:#888; cursor:pointer; }
.cd-footer:active { opacity:0.7; }
</style>
