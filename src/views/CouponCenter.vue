<template>
  <div class="detail-page">
    <div class="dp-header"><button class="dp-back" @click="goBack">‹ 返回</button><span class="dp-title">🎫 我的卡券</span><button class="dp-action" style="visibility:hidden">　</button></div>
    <div class="dp-body">
      <div class="warm-banner">🎉 您有 <strong>3</strong> 张可用优惠券，不要错过哦～</div>
      <div class="coupon-tabs"><span class="ct-tab" :class="{active: tab==='valid'}" @click="tab='valid'">可使用</span><span class="ct-tab" :class="{active: tab==='used'}" @click="tab='used'">已使用</span><span class="ct-tab" :class="{active: tab==='expired'}" @click="tab='expired'">已过期</span></div>
      <div v-if="tab==='valid'">
        <div v-for="(c,i) in validCoupons" :key="i" class="coupon-card" @click="onUse(c)">
          <div class="coupon-left"><span class="coupon-amount">{{ c.amount }}</span><span class="coupon-unit">{{ c.unit }}</span></div>
          <div class="coupon-right"><span class="coupon-name">{{ c.name }}</span><span class="coupon-desc">{{ c.desc }}</span><span class="coupon-expire">{{ c.expire }}</span></div>
        </div>
      </div>
      <div v-if="tab==='used'"><div class="empty-state">暂无已使用卡券</div></div>
      <div v-if="tab==='expired'"><div class="empty-state">暂无已过期卡券</div></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
const tab = ref('valid')
const validCoupons = ref([
  { amount:'888', unit:'元', name:'产康体验券', desc:'适用于盆底肌修复/腹直肌修复', expire:'2026/08/12 过期' },
  { amount:'500', unit:'元', name:'月嫂专享优惠券', desc:'签约月嫂服务立减', expire:'2026/09/01 过期' },
  { amount:'1', unit:'次', name:'免费孕产咨询', desc:'氧宝AI私教1对1咨询', expire:'2026/12/31 过期' }
])
function goBack(){window.history.back()}
function onUse(c){showToast(`🎫 使用「${c.name}」即将上线`)}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:14px; margin-bottom:14px; }
.warm-banner strong { color:#F8A8B8; }
.coupon-tabs { display:flex; gap:8px; margin-bottom:14px; }
.ct-tab { padding:6px 18px; background:#f0f0f0; border-radius:14px; font-size:13px; color:#999; cursor:pointer; }
.ct-tab.active { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; font-weight:500; }
.coupon-card { display:flex; background:#fff; border-radius:14px; overflow:hidden; margin-bottom:10px; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.coupon-card:active { transform:scale(0.98); }
.coupon-left { width:90px; background:linear-gradient(135deg,#F8A8B8,#E8889E); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; padding:14px 0; }
.coupon-amount { font-size:28px; font-weight:700; line-height:1; }
.coupon-unit { font-size:12px; margin-top:2px; opacity:0.8; }
.coupon-right { flex:1; padding:12px 14px; display:flex; flex-direction:column; }
.coupon-name { font-size:14px; font-weight:600; color:#333; }
.coupon-desc { font-size:11px; color:#888; margin:2px 0; }
.coupon-expire { font-size:10px; color:#bbb; }
.empty-state { text-align:center; padding:40px; color:#bbb; font-size:13px; }
</style>
