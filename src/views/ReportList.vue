<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">📋 产检报告</span>
      <button class="dp-action" @click="onUpload">＋上传</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🤰 已为你解读 <strong>3</strong> 份报告，每次产检都是和宝宝的美好见面～</div>

      <!-- 统计卡片 -->
      <div class="stats-bar">
        <div class="stat-item"><span class="stat-num">3</span><span class="stat-label">全部正常</span></div>
        <div class="stat-div"></div>
        <div class="stat-item"><span class="stat-num">✅</span><span class="stat-label">四维已过</span></div>
        <div class="stat-div"></div>
        <div class="stat-item"><span class="stat-num">✅</span><span class="stat-label">糖耐正常</span></div>
      </div>

      <!-- 报告列表 -->
      <div class="section-title">📄 已解读报告</div>
      <div v-for="r in reports" :key="r.id" class="report-card" @click="onReportDetail(r)">
        <div class="rc-left">
          <span class="rc-icon">{{ r.icon }}</span>
          <div class="rc-info">
            <span class="rc-name">{{ r.name }}</span>
            <span class="rc-date">{{ r.date }} · AI解读</span>
          </div>
        </div>
        <div class="rc-right">
          <span class="rc-badge" :class="r.status">{{ r.badge }}</span>
          <span class="rc-arrow">›</span>
        </div>
      </div>

      <!-- AI解读详情（可展开） -->
      <div class="section-title">🤖 AI解读详情</div>
      <div class="ai-report">
        <div class="ai-header" @click="onReportDetail(reports[0])">
          <span>📷 四维彩超排畸报告</span>
          <span class="ai-header-date">2026/05/20</span>
        </div>
        <div class="ai-data">
          <div class="ai-row"><span>胎位</span><span>头位 ✅</span></div>
          <div class="ai-row"><span>双顶径</span><span>6.0cm ✅ 符合孕周</span></div>
          <div class="ai-row"><span>股骨长</span><span>4.3cm ✅ 符合孕周</span></div>
          <div class="ai-row"><span>羊水量</span><span>正常 ✅</span></div>
          <div class="ai-row"><span>胎心率</span><span>156次/分 ✅ 正常</span></div>
        </div>
        <div class="ai-footer">
          <span class="ai-conf">可信度 96%</span>
          <span class="ai-summary">🎉 宝宝很健康，继续加油哦～</span>
        </div>
      </div>

      <!-- 上传入口 -->
      <div class="upload-zone" @click="onUpload">
        <span class="uz-icon">📤</span>
        <div class="uz-info">
          <span class="uz-title">上传新报告</span>
          <span class="uz-desc">支持B超单 · 血常规 · 糖耐量 · 唐筛报告</span>
        </div>
        <span class="uz-arrow">›</span>
      </div>

      <div class="tip-text">💡 所有报告仅你可见，氧宝严格保护你的隐私 🔒</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
const reports = ref([
  { id:1, icon:'📷', name:'四维彩超排畸报告', date:'2026-05-20', status:'success', badge:'✅ 正常' },
  { id:2, icon:'🩸', name:'糖耐量筛查报告', date:'2026-05-10', status:'success', badge:'✅ 正常' },
  { id:3, icon:'💉', name:'血常规+尿常规检验', date:'2026-04-28', status:'success', badge:'✅ 正常' }
])
function goBack() { window.history.back() }
function onUpload() {
  showDialog({ title:'📤 上传产检报告', message:'📸 拍照或从相册选择\n\n氧宝AI自动识别并解读\n\n支持：B超单 · 血常规\n糖耐量 · 唐筛 · 无创DNA', confirmButtonText:'📸 拍照上传', cancelButtonText:'📁 从相册选', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(() => {
    showDialog({ title:'📸 请拍摄报告', message:'将报告单平铺在光线充足的地方拍摄\n\n确保文字清晰可辨\n氧宝AI会在几秒内完成解读', confirmButtonText:'开始拍摄', cancelButtonText:'取消', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
    .then(() => showToast('🔍 正在识别...氧宝正在解读你的报告 💕')).catch(() => {})
  }).catch(() => {
    showDialog({ title:'📁 从相册选择', message:'选择包含完整报告内容的图片\n\n建议整张报告单入镜', confirmButtonText:'选择照片', confirmButtonColor:'#F8A8B8' })
    .then(() => showToast('🔍 正在识别...氧宝正在解读你的报告 💕')).catch(() => {})
  })
}
function onReportDetail(r) {
  showDialog({ title:`${r.icon} ${r.name}`, message:`📅 ${r.date}\n🤖 AI解读结论：一切正常 ✅\n\n各项指标均符合孕周标准，宝宝发育良好！\n\n📊 完整解读报告已生成，可随时查看`, confirmButtonText:'查看完整解读', cancelButtonText:'关闭', showCancelButton:true, confirmButtonColor:'#F8A8B8' })
  .then(() => showToast('📄 完整解读报告已打开')).catch(() => {})
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; position:sticky; top:0; z-index:10; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; padding:4px 0; flex-shrink:0; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; color:#333; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; flex-shrink:0; padding:4px 0; }
.dp-body { flex:1; overflow-y:auto; padding:16px; -webkit-overflow-scrolling:touch; }
.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.warm-banner strong { color:#F8A8B8; font-size:18px; }
.stats-bar { display:flex; align-items:center; background:#fff; border-radius:14px; padding:14px 0; margin-bottom:16px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.stat-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
.stat-num { font-size:20px; font-weight:700; color:#F8A8B8; }
.stat-label { font-size:11px; color:#999; }
.stat-div { width:1px; height:20px; background:rgba(248,168,184,0.1); }
.section-title { font-size:15px; font-weight:600; color:#333; margin-bottom:10px; margin-top:4px; }
.report-card { display:flex; align-items:center; justify-content:space-between; padding:14px 14px; background:#fff; border-radius:14px; margin-bottom:8px; cursor:pointer; transition:all 0.2s; box-shadow:0 1px 4px rgba(0,0,0,0.03); }
.report-card:active { transform:scale(0.98); background:#FFF8FA; }
.rc-left { display:flex; align-items:center; gap:12px; }
.rc-icon { font-size:24px; width:36px; text-align:center; }
.rc-info { display:flex; flex-direction:column; }
.rc-name { font-size:14px; font-weight:500; color:#333; }
.rc-date { font-size:11px; color:#bbb; margin-top:2px; }
.rc-right { display:flex; align-items:center; gap:8px; }
.rc-badge { font-size:11px; padding:2px 8px; border-radius:6px; font-weight:500; }
.rc-badge.success { color:#52C41A; background:#F0FFF0; }
.rc-arrow { color:#ddd; font-size:14px; }
.ai-report { background:#fff; border-radius:16px; padding:14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.ai-header { display:flex; justify-content:space-between; align-items:center; padding-bottom:10px; border-bottom:1px solid #F5F5F5; margin-bottom:10px; font-size:14px; font-weight:600; color:#333; cursor:pointer; }
.ai-header-date { font-size:11px; color:#bbb; font-weight:400; }
.ai-data { display:flex; flex-direction:column; gap:6px; margin-bottom:10px; }
.ai-row { display:flex; justify-content:space-between; font-size:13px; color:#555; padding:3px 0; }
.ai-row span:first-child { color:#999; }
.ai-footer { display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px solid #F5F5F5; }
.ai-conf { font-size:11px; color:#52C41A; background:#F0FFF0; padding:2px 8px; border-radius:4px; }
.ai-summary { font-size:12px; color:#F8A8B8; font-weight:500; }
.upload-zone { display:flex; align-items:center; gap:12px; padding:16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; cursor:pointer; margin-bottom:10px; border:1.5px dashed rgba(248,168,184,0.3); }
.upload-zone:active { opacity:0.7; }
.uz-icon { font-size:28px; }
.uz-info { flex:1; }
.uz-title { font-size:14px; font-weight:600; color:#333; display:block; }
.uz-desc { font-size:11px; color:#888; margin-top:2px; display:block; }
.uz-arrow { color:#ccc; font-size:16px; }
.tip-text { text-align:center; font-size:11px; color:#ccc; padding:8px; }
</style>
