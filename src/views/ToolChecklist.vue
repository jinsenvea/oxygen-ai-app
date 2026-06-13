<template>
  <div class="detail-page">
    <div class="dp-header">
      <button class="dp-back" @click="goBack">‹ 返回</button>
      <span class="dp-title">📋 待产清单</span>
      <button class="dp-action" @click="showAddPanel = !showAddPanel">{{ showAddPanel ? '完成' : '+ 新增' }}</button>
    </div>
    <div class="dp-body">
      <div class="warm-banner">🧸 距离预产期还有 <strong>112天</strong>，提前准备，从容迎接宝宝～</div>

      <!-- 进度 -->
      <div class="progress-card">
        <div class="progress-header"><span>准备进度</span><span class="progress-num">{{ doneCount }}/{{ totalCount }} <span class="progress-percent">{{ Math.round(doneCount/totalCount*100) }}%</span></span></div>
        <div class="progress-bar"><div class="progress-fill" :style="{width: (doneCount/totalCount*100)+'%'}"></div></div>
      </div>

      <!-- 新增面板 -->
      <div v-if="showAddPanel" class="add-panel">
        <div class="add-tabs">
          <span class="add-tab" :class="{active: addType==='item'}" @click="addType='item'">➕ 新增物品</span>
          <span class="add-tab" :class="{active: addType==='category'}" @click="addType='category'">📁 新增分类</span>
        </div>

        <!-- 新增物品 -->
        <div v-if="addType==='item'" class="add-form">
          <div class="add-row">
            <span class="add-label">所属分类</span>
            <select v-model="newItemGroup" class="add-select">
              <option v-for="(g, i) in checklist" :key="i" :value="i">{{ g.label }}</option>
            </select>
          </div>
          <div class="add-row">
            <span class="add-label">物品名称</span>
            <input v-model="newItemName" class="add-input" placeholder="输入物品名称" maxlength="20" />
          </div>
          <div class="add-row">
            <span class="add-label">备注说明</span>
            <input v-model="newItemNote" class="add-input" placeholder="如：3-4件" maxlength="30" />
          </div>
          <button class="add-submit" :disabled="!newItemName.trim()" @click="onAddItem">✅ 添加物品</button>
        </div>

        <!-- 新增分类 -->
        <div v-if="addType==='category'" class="add-form">
          <div class="add-row">
            <span class="add-label">分类名称</span>
            <input v-model="newCategoryName" class="add-input" placeholder="如：🛏️ 家居用品" maxlength="20" />
          </div>
          <div class="add-row">
            <span class="add-label">首个物品</span>
            <input v-model="newCategoryItem" class="add-input" placeholder="输入第一个物品名称" maxlength="20" />
          </div>
          <button class="add-submit" :disabled="!newCategoryName.trim()" @click="onAddCategory">📁 创建分类</button>
        </div>
      </div>

      <!-- 清单列表 -->
      <div v-for="(group, gi) in checklist" :key="gi" class="check-group">
        <div class="group-header">
          <span class="group-title">{{ group.label }}</span>
          <div class="group-actions">
            <span class="group-count">{{ group.items.filter(i=>i.done).length }}/{{ group.items.length }}</span>
            <span class="group-add" @click="onQuickAdd(gi)">＋</span>
          </div>
        </div>
        <div v-for="(item, ii) in group.items" :key="ii" class="check-item" :class="{ done: item.done }" @click="toggleItem(group, item)">
          <div class="check-box" :class="{ checked: item.done }"><span v-if="item.done">✓</span></div>
          <span class="check-text">{{ item.name }}</span>
          <span v-if="item.note" class="check-note">{{ item.note }}</span>
          <span class="check-del" @click.stop="onDeleteItem(group, ii)">✕</span>
        </div>
      </div>

      <!-- 快捷新增 -->
      <div class="quick-add-bar" @click="showAddPanel = true; addType = 'item'">
        <span class="qa-icon">＋</span>
        <span class="qa-text">添加新物品</span>
      </div>

      <div class="tip-text">💡 勾选完成的项目·点击＋快速添加·左划删除</div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { showToast, showDialog } from 'vant'

const checklist = ref([
  { label:'📄 证件资料', items:[{name:'双方身份证',done:true,note:'原件+复印件'},{name:'医保卡/社保卡',done:true},{name:'产检档案',done:true},{name:'银行卡/现金',done:false}] },
  { label:'👩 妈妈用品', items:[{name:'哺乳文胸',done:true,note:'3-4件'},{name:'一次性内裤',done:true},{name:'产妇卫生巾',done:true,note:'L/M/S各1包'},{name:'吸奶器',done:false},{name:'防溢乳垫',done:false},{name:'月子服',done:false,note:'2-3套'},{name:'包跟拖鞋',done:false},{name:'保温杯+吸管',done:false}] },
  { label:'👶 宝宝用品', items:[{name:'NB尿不湿',done:true,note:'1包'},{name:'婴儿湿巾',done:true},{name:'奶瓶',done:true,note:'2个'},{name:'奶粉1段',done:false},{name:'婴儿服',done:false,note:'3-4套'},{name:'包被',done:false},{name:'婴儿帽+袜子',done:false}] },
  { label:'🛁 洗护用品', items:[{name:'婴儿沐浴露',done:true},{name:'婴儿润肤露',done:true},{name:'护臀膏',done:false},{name:'婴儿指甲剪',done:false},{name:'浴巾',done:false}] }
])

// 新增状态
const showAddPanel = ref(false)
const addType = ref('item')
const newItemGroup = ref(0)
const newItemName = ref('')
const newItemNote = ref('')
const newCategoryName = ref('')
const newCategoryItem = ref('')

const totalCount = computed(() => { let c=0; checklist.value.forEach(g=>c+=g.items.length); return c })
const doneCount = computed(() => { let c=0; checklist.value.forEach(g=>g.items.forEach(i=>{if(i.done)c++})); return c })

function goBack(){window.history.back()}
function toggleItem(g,item){item.done=!item.done}

// 新增物品
function onAddItem(){
  if(!newItemName.value.trim()) return
  const group = checklist.value[newItemGroup.value]
  group.items.push({ name:newItemName.value.trim(), note:newItemNote.value.trim(), done:false })
  newItemName.value = ''
  newItemNote.value = ''
  showToast(`✅ 已添加「${group.items[group.items.length-1].name}」到${group.label}`)
}

// 新增分类
function onAddCategory(){
  if(!newCategoryName.value.trim()) return
  const items = newCategoryItem.value.trim() ? [{ name:newCategoryItem.value.trim(), note:'', done:false }] : []
  checklist.value.push({ label:newCategoryName.value.trim(), items })
  newCategoryName.value = ''
  newCategoryItem.value = ''
  showToast(`📁 已创建分类「${checklist.value[checklist.value.length-1].label}」`)
}

// 快速添加
function onQuickAdd(gi){
  newItemGroup.value = gi
  showAddPanel.value = true
  addType.value = 'item'
}

// 删除物品
function onDeleteItem(group, ii){
  const item = group.items[ii]
  showDialog({
    title: '🗑️ 删除物品',
    message: `确定删除「${item.name}」吗？`,
    confirmButtonText: '删除', cancelButtonText: '取消',
    showCancelButton: true, confirmButtonColor: '#FF4D4F'
  }).then(() => {
    group.items.splice(ii, 1)
    showToast('已删除')
  }).catch(() => {})
}
</script>
<style scoped>
.detail-page { height:100vh; background:#FFF8FA; display:flex; flex-direction:column; }
.dp-header { display:flex; align-items:center; padding:50px 16px 12px; background:#fff; flex-shrink:0; border-bottom:1px solid #F0F0F0; }
.dp-back { font-size:16px; color:#333; background:none; border:none; cursor:pointer; font-weight:500; }
.dp-title { flex:1; text-align:center; font-size:17px; font-weight:700; }
.dp-action { font-size:14px; color:#F8A8B8; background:none; border:none; cursor:pointer; font-weight:600; }
.dp-body { flex:1; overflow-y:auto; padding:16px; }

.warm-banner { font-size:14px; color:#666; padding:14px 16px; background:linear-gradient(135deg,#FFF0F3,#F8E8FF); border-radius:16px; margin-bottom:14px; line-height:1.7; }
.warm-banner strong { color:#F8A8B8; font-size:18px; }

.progress-card { background:#fff; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.progress-header { display:flex; justify-content:space-between; font-size:14px; font-weight:600; color:#333; margin-bottom:8px; }
.progress-num { color:#F8A8B8; }
.progress-percent { font-size:11px; color:#bbb; font-weight:400; margin-left:4px; }
.progress-bar { height:6px; background:rgba(248,168,184,0.12); border-radius:3px; overflow:hidden; }
.progress-fill { height:100%; background:linear-gradient(90deg,#F8A8B8,#E0C3FC); border-radius:3px; transition:width 0.3s; }

/* 新增面板 */
.add-panel { background:#fff; border-radius:16px; padding:16px; margin-bottom:14px; box-shadow:0 2px 8px rgba(248,168,184,0.08); border:1px solid rgba(248,168,184,0.1); }
.add-tabs { display:flex; gap:8px; margin-bottom:14px; }
.add-tab { flex:1; padding:8px; text-align:center; background:#F5F5F5; border-radius:10px; font-size:13px; color:#999; cursor:pointer; font-weight:500; }
.add-tab.active { background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; }
.add-form { display:flex; flex-direction:column; gap:10px; }
.add-row { display:flex; align-items:center; gap:10px; }
.add-label { font-size:12px; color:#888; width:64px; flex-shrink:0; }
.add-input, .add-select { flex:1; height:36px; border:1.5px solid #eee; border-radius:10px; padding:0 12px; font-size:13px; color:#333; outline:none; background:#fff; }
.add-input:focus, .add-select:focus { border-color:#F8A8B8; }
.add-submit { height:38px; border:none; border-radius:10px; background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; font-size:13px; font-weight:600; cursor:pointer; margin-top:4px; }
.add-submit:disabled { opacity:0.4; }
.add-submit:active { transform:scale(0.97); }

/* 清单 */
.check-group { margin-bottom:14px; }
.group-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; padding:0 4px; }
.group-title { font-size:14px; font-weight:600; color:#333; }
.group-actions { display:flex; align-items:center; gap:8px; }
.group-count { font-size:11px; color:#bbb; }
.group-add { width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; cursor:pointer; }
.group-add:active { transform:scale(0.85); }

.check-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#fff; border-radius:10px; margin-bottom:4px; cursor:pointer; transition:all 0.15s; box-shadow:0 1px 3px rgba(0,0,0,0.02); }
.check-item:active { background:#FFF8FA; }
.check-item.done { opacity:0.6; }
.check-box { width:20px; height:20px; border-radius:50%; border:2px solid #ddd; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; flex-shrink:0; transition:all 0.2s; }
.check-box.checked { background:#52C41A; border-color:#52C41A; }
.check-text { flex:1; font-size:13px; color:#333; }
.check-item.done .check-text { color:#bbb; text-decoration:line-through; }
.check-note { font-size:10px; color:#bbb; background:#F5F5F5; padding:1px 8px; border-radius:4px; }
.check-del { font-size:12px; color:#ddd; cursor:pointer; opacity:0; transition:opacity 0.2s; padding:2px; }
.check-item:hover .check-del, .check-item:active .check-del { opacity:1; }

.quick-add-bar { display:flex; align-items:center; gap:8px; padding:12px 14px; background:#fff; border:1.5px dashed #ddd; border-radius:12px; cursor:pointer; margin-bottom:8px; transition:all 0.2s; }
.quick-add-bar:active { border-color:#F8A8B8; background:#FFF8FA; }
.qa-icon { width:24px; height:24px; border-radius:50%; background:linear-gradient(135deg,#F8A8B8,#E8889E); color:#fff; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; flex-shrink:0; }
.qa-text { font-size:13px; color:#bbb; }

.tip-text { text-align:center; font-size:10px; color:#ccc; padding:8px; }
</style>
