// ===== 氧阁AI孕产APP - Mock数据 =====

// 用户信息
export const userInfo = {
  avatar: '',
  nickname: '小笼包妈妈',
  pregnancyWeek: '孕24周+3天',
  memberLevel: 'LV3',
  memberTitle: '孕妈守护者',
  memberProgress: 65,
  memberNextExp: 200,
  memberTotalExp: 1200
}

// 场景数据
export const scenes = [
  {
    id: 1,
    title: '孕期守护日记',
    subtitle: '记录你的孕期每一天',
    icon: '🤰',
    status: 'active',
    bgColor: '#FFF0F3',
    progress: { current: '24周+3天', total: '40周' },
    tasks: [
      { id: 1, text: '每日胎动计数', done: true },
      { id: 2, text: '补钙 + 维生素', done: false },
      { id: 3, text: '预约下周三产检', done: false },
      { id: 4, text: '做凯格尔运动15分钟', done: true }
    ],
    healthData: {
      weight: '65.2kg',
      bloodPressure: '120/80',
      fetalWeight: '650g'
    }
  },
  {
    id: 2,
    title: '月子安心陪伴',
    subtitle: '科学坐月子方案',
    icon: '🌙',
    status: 'inactive',
    bgColor: '#F8E8FF'
  },
  {
    id: 3,
    title: '产后修复计划',
    subtitle: '42天黄金修复方案',
    icon: '💪',
    status: 'inactive',
    bgColor: '#FFF0F3'
  }
]

// 快捷场景
export const quickScenes = [
  { id: 1, icon: '📅', title: '产检预约', desc: '一键预约产检', color: '#F8A8B8' },
  { id: 2, icon: '🤱', title: '月嫂见面会', desc: '与月嫂面对面', color: '#E0C3FC' },
  { id: 3, icon: '💆', title: '产康体验', desc: '免费体验产康', color: '#F8A8B8' },
  { id: 4, icon: '📋', title: '待产清单', desc: '智能生成待产包', color: '#C9A0E8' }
]

// 运营活动
export const activities = [
  {
    id: 1,
    title: '💝 新人专享礼包',
    desc: '免费领取价值888元产康体验券',
    subDesc: '限时新人专享',
    cta: '立即领取',
    bg: 'linear-gradient(135deg, #FFF0F3, #FFE4E9)'
  },
  {
    id: 2,
    title: '📚 妈妈课堂 · 本周精选',
    items: ['孕晚期营养与运动', '母乳喂养技巧准备', '新生儿护理入门'],
    bg: '#FFFFFF'
  }
]

// 每日Tips
export const dailyTip = {
  content: '孕24周可以做四维彩超排畸了，记得提前预约哦～',
  source: '氧宝小知识'
}

// 快捷问题
export const quickQuestions = [
  '孕晚期脚肿怎么办？',
  '帮我预约月嫂见面会',
  '产检报告怎么看？',
  '怎么数胎动？',
  '月子餐怎么吃？',
  '产后修复什么时候开始？'
]

// AI对话历史
export const chatHistory = [
  {
    id: 1,
    role: 'user',
    content: '孕晚期脚肿怎么办？',
    time: '10:30'
  },
  {
    id: 2,
    role: 'ai',
    content: `您好！孕晚期脚肿很常见，医学上称为"妊娠期水肿"，是由于子宫增大压迫静脉回流引起的。给您几个实用的缓解建议：

**1️⃣ 抬高双腿休息**
每天休息时用枕头垫高双腿，高于心脏水平，每次15-20分钟。

**2️⃣ 避免久站久坐**
每隔1小时起来活动一下，促进血液循环。

**3️⃣ 控制盐分摄入**
每日食盐不超过5g，减少腌制食品。

**4️⃣ 适当补充水分**
每天饮水1.5-2L，帮助代谢废物排出。

**⚠️ 注意：** 如果出现以下情况请及时就医：
- 水肿突然加重
- 伴有头痛、视力模糊
- 单侧腿部明显肿胀疼痛`,
    time: '10:30',
    type: 'text',
    feedback: null,
    serviceCard: {
      title: '孕期舒缓按摩',
      desc: '专业孕产按摩师上门服务',
      price: '¥298/次',
      rating: 4.8,
      image: ''
    }
  },
  {
    id: 3,
    role: 'user',
    content: '帮我预约月嫂见面会',
    time: '10:35'
  },
  {
    id: 4,
    role: 'ai',
    content: `好的！我来帮您预约月嫂见面会 🎉

请问您方便的时间是？👇`,
    time: '10:35',
    type: 'text',
    quickReplies: [
      { label: '本周六上午', value: '本周六上午' },
      { label: '本周日下午', value: '本周日下午' },
      { label: '下周六', value: '下周六' }
    ]
  }
]

// 分类标签
export const serviceCategories = [
  { key: 'all', label: '综合' },
  { key: 'pregnancy', label: '孕期用品' },
  { key: 'month', label: '月子服务' },
  { key: 'recovery', label: '产康项目' },
  { key: 'matron', label: '月嫂套餐' }
]

// 服务数据
export const serviceList = [
  {
    id: 1,
    name: '高级月嫂 · 42天VIP套餐',
    desc: '金牌月嫂住家服务',
    category: 'matron',
    price: 13800,
    originalPrice: 16800,
    rating: 4.9,
    sales: 328,
    tags: ['金牌月嫂', '住家', '含月子餐'],
    badge: '热销',
    image: ''
  },
  {
    id: 2,
    name: '月子中心 · 28天尊享套餐',
    desc: '一站式月子照护',
    category: 'month',
    price: 26800,
    originalPrice: 32800,
    rating: 4.8,
    sales: 256,
    tags: ['五星级', '全天护理', '含产康'],
    badge: '精选',
    image: ''
  },
  {
    id: 3,
    name: '盆底肌修复 · 10次套餐',
    desc: '专业仪器+手法修复',
    category: 'recovery',
    price: 2980,
    originalPrice: 3980,
    rating: 4.7,
    sales: 568,
    tags: ['仪器修复', '手法', '无痛'],
    badge: null,
    image: ''
  },
  {
    id: 4,
    name: '开奶通乳 · 3次上门',
    desc: '专业通乳师上门服务',
    category: 'recovery',
    price: 1980,
    originalPrice: 2580,
    rating: 4.9,
    sales: 892,
    tags: ['上门服务', '无痛通乳'],
    badge: '新人价',
    image: ''
  },
  {
    id: 5,
    name: '孕期瑜伽 · 12次小班课',
    desc: '专业孕产瑜伽指导',
    category: 'pregnancy',
    price: 2680,
    originalPrice: 3280,
    rating: 4.6,
    sales: 234,
    tags: ['小班制', '专业教练'],
    badge: null,
    image: ''
  },
  {
    id: 6,
    name: '月嫂面试会 · 免费',
    desc: '精选月嫂面对面沟通',
    category: 'matron',
    price: 0,
    originalPrice: 199,
    rating: 4.8,
    sales: 1200,
    tags: ['免费', '线下面试'],
    badge: '免费',
    image: ''
  }
]

// 服务详情
export const serviceDetail = {
  id: 1,
  name: '高级月嫂 · 42天VIP套餐',
  rating: 4.9,
  sales: 328,
  tags: ['金牌月嫂', '住家服务', '42天', '含月子餐'],
  price: 13800,
  originalPrice: 16800,
  images: [],
  desc: `<p>氧阁金牌月嫂服务，为您提供专业的产后照护。</p>
<h3>服务内容</h3>
<ul>
<li>产妇护理：伤口护理、母乳指导、产后康复</li>
<li>新生儿护理：喂养、洗澡、抚触、脐带护理</li>
<li>月子餐制作：科学搭配一日六餐</li>
<li>产后心理疏导</li>
</ul>
<h3>月嫂资质</h3>
<ul>
<li>持证上岗：高级母婴护理师证+营养师证</li>
<li>5年以上从业经验</li>
<li>服务超过50个家庭</li>
</ul>`,
  faq: [
    { q: '月嫂资质如何保证？', a: '所有月嫂均持证上岗，经过三轮面试筛选，背景调查通过后才能入职。' },
    { q: '如果对月嫂不满意怎么办？', a: '服务期内可免费更换一次月嫂，我们将在24小时内安排新月嫂到岗。' },
    { q: '月嫂的饮食如何安排？', a: '月嫂与雇主同吃，不需要额外支付餐费。' }
  ],
  reviews: [
    { user: '乐乐妈妈', avatar: '', rating: 5, content: '张阿姨非常专业，对宝宝很有耐心，月子餐也做得很好吃！推荐！', date: '2026-05-20' },
    { user: '糖糖妈妈', avatar: '', rating: 5, content: '非常满意的体验，月嫂把宝宝照顾得很好，我也恢复得很快。', date: '2026-04-15' }
  ]
}

// 服务状态
export const serviceStatus = {
  appointments: 2,
  inProgress: 2,
  completed: 3
}

// 工具列表
export const tools = [
  { id: 'checklist', icon: '📋', title: '待产清单', desc: '智能生成待产包', stage: '孕晚期' },
  { id: 'checkup', icon: '🏥', title: '产检记录', desc: '产检日历+记录', stage: '全孕期' },
  { id: 'kick', icon: '👶', title: '胎动计数', desc: '胎动记录+曲线', stage: '孕中晚期' },
  { id: 'contraction', icon: '⏱️', title: '宫缩记录', desc: '宫缩频率记录', stage: '临产期' },
  { id: 'weight', icon: '⚖️', title: '体重管理', desc: '体重曲线+建议', stage: '全周期' },
  { id: 'feeding', icon: '🍼', title: '母乳记录', desc: '喂养频率记录', stage: '产后' }
]

// 设置列表
export const settings = [
  { type: 'account', icon: '👤', title: '账号设置', desc: '手机号/微信绑定/修改密码' },
  { type: 'privacy', icon: '🔒', title: '隐私管理', desc: '数据授权/AI记忆管理' },
  { type: 'ai', icon: '🤖', title: 'AI对话管理', desc: '对话历史/AI个性设定' },
  { type: 'about', icon: 'ℹ️', title: '关于氧阁', desc: '版本号/用户协议/隐私政策' },
  { type: 'feedback', icon: '💡', title: '意见反馈', desc: '提交反馈/建议' }
]
