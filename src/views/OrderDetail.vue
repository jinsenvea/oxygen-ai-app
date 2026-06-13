<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">📋 订单详情</span>
      <button class="dp-action" @click="onContact">联系顾问</button>
    </div>
    <div class="dp-body">
      <div class="order-status-hero" :style="{ background: heroBg }">
        <span class="osh-icon">{{ order.icon }}</span>
        <span class="osh-name">{{ order.name }}</span>
        <span class="osh-store">{{ order.store }}</span>
        <span class="osh-badge" :style="{ background: badgeBg }">{{ order.statusText }}</span>
      </div>

      <div class="info-card">
        <div class="info-row"><span>订单编号</span><span>ERPT-{{ order.id }}</span></div>
        <div class="info-row"><span>服务门店</span><span>{{ order.store }}</span></div>
        <div class="info-row"><span>预约时间</span><span>{{ order.date }} {{ order.time }}</span></div>
        <div class="info-row"><span>服务状态</span><span :style="{color:statusColor, fontWeight:500}">{{ order.statusText }}</span></div>
      </div>

      <div class="timeline-card">
        <div class="tl-title">📌 订单进度</div>
        <div v-for="(s,i) in steps" :key="i" class="tl-step" :class="{ done: s.done, current: s.current }">
          <div class="tl-dot"><span v-if="s.done">✓</span></div>
          <div class="tl-info">
            <span class="tl-label">{{ s.label }}</span>
            <span class="tl-time">{{ s.time }}</span>
          </div>
          <div v-if="s.current" class="tl-tag">进行中</div>
        </div>
      </div>

      <div v-if="order.status==='pending'" class="action-card">
        <button class="ac-btn primary" @click="onContact">📞 联系门店顾问</button>
        <button class="ac-btn outline" @click="onCancel">取消预约</button>
      </div>
      <div v-if="order.status==='confirmed'" class="action-card">
        <button class="ac-btn primary" @click="showToast('📋 已添加到日历')">📅 加入日历提醒</button>
        <button class="ac-btn outline" @click="showToast('📍 导航已打开')">📍 导航到店</button>
      </div>
      <div v-if="order.status==='done'" class="action-card">
        <button class="ac-btn primary" @click="onReview">⭐ 给个评价</button>
        <button class="ac-btn outline" @click="showToast('🔄 再次预约')">🔄 再次预约</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast, showDialog } from 'vant'
const route = useRoute()
const order = ref({ icon:'🤱', name:'月嫂见面会', store:'氧阁·天河店', date:'2026/06/15', time:'10:00', status:'pending', statusText:'⏳ 待确认', id:'20260615-0832' })
const steps = ref([
  { label:'提交预约', time:'06/10 14:32', done:true },
  { label:'门店确认', time:'等待确认中', done:false, current:true },
  { label:'服务进行', time:'', done:false },
  { label:'服务完成', time:'', done:false }
])
const heroBg = computed(() => {
  const map = { pending:'linear-gradient(135deg,#FFF8F0,#FFE8CC)', confirmed:'linear-gradient(135deg,#F0FFF0,#D0FFD0)', done:'linear-gradient(135deg,#F5F5F5,#EEEEEE)' }
  return map[order.value.status]||map.pending
})
const badgeBg = computed(() => {
  const map = { pending:'#FAAD14', confirmed:'#52C41A', done:'#999' }
  return map[order.value.status]||'#999'
})
const statusColor = computed(() => {
  const map = { pending:'#FAAD14', confirmed:'#52C41A', done:'#999' }
  return map[order.value.status]||'#999'
})
onMounted(() => {
  const id = route.params.id
  if(id==='2'){order.value={icon:'💆',name:'产康体验·盆底肌修复',store:'氧阁·海珠店',date:'2026/06/12',time:'14:00',status:'confirmed',statusText:'🟢 已确认',id:'20260612-0715'}
    steps.value=[{label:'提交预约',time:'06/08 09:15',done:true},{label:'门店确认',time:'06/09 10:00',done:true},{label:'服务进行',time:'今日14:00',done:false,current:true},{label:'服务完成',time:'',done:false}]}
  if(id==='3'){order.value={icon:'✅',name:'孕期按摩·3次套餐',store:'氧阁·天河店',date:'2026/06/01',time:'',status:'done',statusText:'✅ 已完成',id:'20260528-0524'}
    steps.value=[{label:'提交预约',time:'05/20 16:00',done:true},{label:'门店确认',time:'05/21 09:00',done:true},{label:'服务进行',time:'06/01',done:true},{label:'服务完成',time:'06/01',done:true}]}
})
function goBack(){window.history.back()}
function onContact(){showDialog({title:'📞 联系门店顾问',message:`门店：${order.value.store}\n📞 热线：400-800-8888\n\n💬 也可在线留言，顾问会尽快回复`,confirmButtonText:'💬 在线咨询',cancelButtonText:'📞 拨打电话',showCancelButton:true,confirmButtonColor:'#F8A8B8'})}
function onCancel(){showDialog({title:'❌ 取消预约',message:'确定要取消吗？\n\n取消后该时段将释放给其他宝妈',confirmButtonText:'确定取消',cancelButtonText:'再想想',showCancelButton:true,confirmButtonColor:'#FF4D4F'}).then(()=>showToast('预约已取消')).catch(()=>{})}
function onReview(){showDialog({title:'⭐ 给服务评分',message:'感谢您的选择！\n\n请给这次服务打个分吧～',confirmButtonText:'去评价',cancelButtonText:'下次再说',showCancelButton:true,confirmButtonColor:'#F8A8B8'}).then(()=>showToast('📝 评价页面已打开')).catch(()=>{})}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.order-status-hero { display:flex; flex-direction:column; align-items:center; gap:4px; padding:24px 16px; border-radius:18px; margin-bottom:12px; text-align:center; }
.osh-icon { font-size:40px; }
.osh-name { font-size:18px; font-weight:700; color:#333; }
.osh-store { font-size:13px; color:#888; }
.osh-badge { font-size:12px; color:#fff; padding:3px 14px; border-radius:12px; font-weight:500; margin-top:4px; }
.info-card { background:#fff; border-radius:14px; padding:14px 16px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.info-row { display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:#555; border-bottom:1px solid #F5F5F5; }
.info-row:last-child { border:none; }
.info-row span:first-child { color:#999; }
.timeline-card { background:#fff; border-radius:14px; padding:14px 16px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.tl-title { font-size:14px; font-weight:600; color:#333; margin-bottom:12px; }
.tl-step { display:flex; gap:10px; padding:8px 0; opacity:0.35; align-items:center; }
.tl-step.done { opacity:1; }
.tl-step.current { opacity:1; }
.tl-dot { width:22px; height:22px; border-radius:50%; border:2px solid #ddd; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; flex-shrink:0; }
.tl-step.done .tl-dot { background:#52C41A; border-color:#52C41A; }
.tl-step.current .tl-dot { background:linear-gradient(135deg,#F8A8B8,#E8889E); border-color:#F8A8B8; }
.tl-info { flex:1; display:flex; flex-direction:column; }
.tl-label { font-size:13px; font-weight:500; color:#333; }
.tl-time { font-size:11px; color:#bbb; margin-top:1px; }
.tl-tag { font-size:9px; color:#F8A8B8; background:#FFF0F3; padding:2px 8px; border-radius:4px; flex-shrink:0; }
.action-card { display:flex; gap:10px; }
.ac-btn { flex:1; height:44px; border-radius:12px; font-size:14px; font-weight:500; cursor:pointer; border:none; }
.ac-btn.primary { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.ac-btn.primary:active { transform:scale(0.97); }
.ac-btn.outline { background:#fff; color:#666; border:1.5px solid #ddd; }
.ac-btn.outline:active { transform:scale(0.97); }
</style>
