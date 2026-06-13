<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">🏆 里程碑打卡</span>
      <button class="dp-action" style="visibility:hidden">　</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🎯 你已完成了 <strong>5</strong> 项里程碑，继续加油集齐所有勋章！</div>

      <div class="stage-tabs">
        <span v-for="(s, i) in stages" :key="i" class="st-tab" :class="{ active: activeStage === i }" @click="activeStage = i">
          {{ s.label }} <span class="st-count">{{ s.done }}/{{ s.total }}</span>
        </span>
      </div>

      <div class="milestone-list">
        <div v-for="(m, i) in currentMilestones" :key="i" class="ml-item" :class="{ done: m.done }" @click="onMilestoneClick(m)">
          <div class="ml-check" :class="{ checked: m.done }"><span v-if="m.done">✓</span></div>
          <div class="ml-info">
            <span class="ml-name" :class="{ done: m.done }">{{ m.name }}</span>
            <span class="ml-desc">{{ m.desc }}</span>
          </div>
          <div v-if="m.done" class="ml-badge badge-done">✅ 已打卡</div>
          <div v-else-if="m.locked" class="ml-badge badge-locked">🔒 未解锁</div>
          <button v-else class="ml-btn" @click.stop="onCheckin(m)">去打卡</button>
        </div>
      </div>

      <!-- 完成奖励提示 -->
      <div v-if="currentStageDone" class="reward-banner" @click="showToast('🎖️ 前往勋章墙领取')">
        🎉 本阶段全部完成！领取「{{ stages[activeStage].badge }}」勋章 ›
      </div>

      <button class="view-badge-btn" @click="goBadgeWall">🎖️ 查看我的勋章墙 ›</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { showDialog, showToast } from 'vant'

const activeStage = ref(1) // 默认孕中期

const stages = ref([
  { label:'🌸备孕期', badge:'备孕达人', done:2, total:3 },
  { label:'🤰孕早期', badge:'孕早期守护者', done:3, total:4 },
  { label:'👶孕中期', badge:'孕中期守护者', done:1, total:4 },
  { label:'🏥孕晚期', badge:'足月准妈妈', done:0, total:3 },
  { label:'🌙月子期', badge:'满分月子妈妈', done:0, total:3 },
  { label:'🍼0-1岁', badge:'百天育儿达人', done:0, total:3 },
  { label:'🧸1-3岁', badge:'成长陪伴官', done:0, total:2 }
])

const milestonesData = [
  [ // 备孕期
    { name:'完成孕前检查', desc:'双方全面身体检查', done:true },
    { name:'开始补充叶酸', desc:'每日400μg叶酸', done:true },
    { name:'测出早孕', desc:'记录发现怀孕的喜悦时刻', done:false }
  ],
  [ // 孕早期
    { name:'第一次B超见胎心', desc:'上传B超单拍照打卡', done:true },
    { name:'完成建档产检', desc:'医院建档 领取母子手册', done:true },
    { name:'NT检查通过', desc:'早期唐氏筛查', done:true },
    { name:'开始记录孕吐日记', desc:'记录早孕反应', done:false }
  ],
  [ // 孕中期
    { name:'第一次感受到胎动', desc:'记录初次胎动的感动瞬间', done:true },
    { name:'四维大排畸通过', desc:'上传报告拍照打卡', done:false },
    { name:'糖耐量筛查', desc:'喝糖水检查妊娠糖尿病', done:false },
    { name:'拍孕妇照', desc:'记录最美的孕肚时刻', done:false }
  ],
  [ // 孕晚期
    { name:'足月37周', desc:'宝宝足月 随时准备见面', done:false, locked:true },
    { name:'入盆', desc:'记录宝宝入盆时刻', done:false, locked:true },
    { name:'备好待产包', desc:'待产物品全部准备齐全', done:false, locked:true }
  ],
  [ // 月子期
    { name:'宝宝满月', desc:'庆祝宝宝满月', done:false, locked:true },
    { name:'产后42天复查', desc:'妈妈和宝宝一起复查', done:false, locked:true },
    { name:'通乳完成', desc:'顺利母乳喂养', done:false, locked:true }
  ],
  [ // 0-1岁
    { name:'宝宝百天', desc:'记录百天成长', done:false, locked:true },
    { name:'第一颗牙', desc:'记录萌牙时刻', done:false, locked:true },
    { name:'周岁生日', desc:'庆祝第一个生日', done:false, locked:true }
  ],
  [ // 1-3岁
    { name:'疫苗接种完成', desc:'按计划完成疫苗', done:false, locked:true },
    { name:'第一次走路', desc:'记录宝宝迈出第一步', done:false, locked:true }
  ]
]

const currentMilestones = computed(() => milestonesData[activeStage.value] || [])
const currentStageDone = computed(() => {
  const m = currentMilestones.value
  return m.length > 0 && m.every(item => item.done)
})

function onMilestoneClick(m){
  if(!m.done) return
  showDialog({ title:'✅ '+m.name, message:`${m.desc}\n\n已完成打卡 ✅\n\n继续完成其他里程碑吧～`, confirmButtonText:'好的 💕', confirmButtonColor:'#F8A8B8' })
}

function onCheckin(m){
  showDialog({
    title:`📌 ${m.name}`,
    message:`${m.desc}\n\n打卡可获得积分+10\n集齐里程碑可解锁勋章 🎖️`,
    confirmButtonText:'确认打卡', cancelButtonText:'取消',
    showCancelButton:true, confirmButtonColor:'#F8A8B8'
  }).then(() => {
    m.done = true
    stages.value[activeStage.value].done++
    showToast('🎉 打卡成功！积分+10')
    if(currentStageDone.value){
      setTimeout(() => {
        showDialog({ title:'🎊 全部完成！', message:`恭喜完成本阶段全部里程碑！\n获得「${stages[activeStage.value].badge}」勋章`, confirmButtonText:'领取勋章', confirmButtonColor:'#F8A8B8' })
        .then(() => goBadgeWall()).catch(() => {})
      }, 500)
    }
  }).catch(() => {})
}

function goBadgeWall(){ window.location.hash = '#/badge-wall' }
function goBack(){ window.history.back() }
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.warm-banner strong { color:#F8A8B8; font-size:18px; }
.stage-tabs { display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:12px; }
.st-tab { flex-shrink:0; padding:6px 14px; background:#f0f0f0; border-radius:14px; font-size:12px; color:#999; cursor:pointer; white-space:nowrap; display:flex; align-items:center; gap:4px; }
.st-tab.active { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; font-weight:500; }
.st-count { font-size:10px; opacity:0.7; }
.milestone-list { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
.ml-item { display:flex; align-items:center; gap:10px; padding:12px 14px; background:#fff; border-radius:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); cursor:pointer; }
.ml-item:active { transform:scale(0.98); }
.ml-item.done { background:#F8FAF8; }
.ml-check { width:22px; height:22px; border-radius:50%; border:2px solid #ddd; display:flex; align-items:center; justify-content:center; font-size:11px; color:#fff; flex-shrink:0; }
.ml-check.checked { background:#52C41A; border-color:#52C41A; }
.ml-info { flex:1; }
.ml-name { font-size:14px; font-weight:500; color:#333; display:block; }
.ml-name.done { color:#bbb; }
.ml-desc { font-size:11px; color:#bbb; margin-top:1px; display:block; }
.ml-badge { font-size:10px; padding:2px 8px; border-radius:6px; font-weight:500; flex-shrink:0; }
.ml-badge.badge-done { color:#52C41A; background:#F0FFF0; }
.ml-badge.badge-locked { color:#ccc; background:#F5F5F5; }
.ml-btn { font-size:11px; color:#fff; background:linear-gradient(135deg,#F8A8B8,#E8889E); border:none; padding:5px 12px; border-radius:8px; cursor:pointer; font-weight:500; flex-shrink:0; }
.ml-btn:active { transform:scale(0.92); }
.reward-banner { padding:12px 14px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:12px; font-size:13px; color:#F8A8B8; font-weight:500; text-align:center; margin-bottom:12px; cursor:pointer; }
.reward-banner:active { opacity:0.7; }
.view-badge-btn { width:100%; padding:12px; background:#fff; border:none; border-radius:12px; font-size:13px; color:#F8A8B8; font-weight:500; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.03); }
</style>
