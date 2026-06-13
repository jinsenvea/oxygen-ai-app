import{_ as w,c as b,a as s,u as c,s as e,n as m,F as r,b as i,e as u,r as x,t as o,f as g,k as v,i as d}from"./index-DtvUdD_i.js";const F={class:"detail-page"},T={class:"dp-header"},D={class:"dp-body"},N={class:"main-tabs"},A={class:"baby-grid-detail"},V={class:"feed-card"},M={class:"fc-time"},R={class:"fc-duration"},S={class:"fc-amount"},z={__name:"NursingReport",setup(E){const t=g("mom"),k=g([{time:"06:30",type:"right",duration:15,amount:80},{time:"09:00",type:"left",duration:18,amount:90},{time:"11:30",type:"right",duration:12,amount:70},{time:"14:00",type:"left",duration:20,amount:100}]);function f(){window.history.back()}function C(){v({title:"🩹 伤口护理详情",message:`🟢 恢复良好

📅 已护理12次
📅 下次护理：今日15:00

✅ 伤口无红肿
✅ 愈合良好
✅ 可正常淋浴

💬 张阿姨说：宝妈恢复得很快，继续保持～`,confirmButtonText:"知道了 💕",confirmButtonColor:"#F8A8B8"})}function y(){v({title:"🍼 通乳记录",message:`🟢 乳腺通畅

📊 今日数据：
• 排奶次数：6次
• 总奶量：480ml
• 单次最大：100ml

✅ 乳房无硬块
✅ 宝宝吸吮有力
✅ 含接姿势正确

💬 保持心情愉快，多喝汤水，奶量会越来越好～`,confirmButtonText:"好的 💕",confirmButtonColor:"#F8A8B8"})}function B(){v({title:"💕 情绪记录",message:`😊 今日心情：开心
😴 睡眠质量：7.5小时 良好
📊 情绪评分：8/10

💬 今天和妈妈视频了很开心，宝宝也很乖～

🌟 保持好心情是最好的月子调理～`,confirmButtonText:"好的 💕",confirmButtonColor:"#F8A8B8"})}function l(p){const n={洗澡:{icon:"🛁",msg:`已洗 8 次，每隔一天洗一次

✅ 水温37-38℃
✅ 室温26-28℃
✅ 洗完立即擦干
✅ 脐带处注意防水

张阿姨说：宝宝很喜欢洗澡，每次都很享受～`},脐带:{icon:"🩹",msg:`已护理 8 次，现已自然脱落 ✅

📅 脱落日期：06/10
✅ 脐窝干燥
✅ 无红肿
✅ 无分泌物

张阿姨说：脐带护理得很好，完全不用担心～`},喂养:{icon:"🍼",msg:`纯母乳喂养·日均6次

🍼 吸吮有力
🍼 含接姿势正确
🍼 每次10-15分钟
🍼 大小便正常

体重增长良好，说明吃得很好哦～`},睡眠:{icon:"😴",msg:`日均睡眠 16 小时

🌙 夜间睡眠：8-9小时
☀️ 白天小睡：3-4次
😴 睡眠规律：良好

宝宝睡得好，妈妈也能休息好～`},黄疸:{icon:"☀️",msg:`生理性黄疸 ✅ 已消退

📅 出现时间：产后第3天
📅 消退时间：产后第10天

✅ 经皮胆红素值正常
✅ 皮肤颜色正常
✅ 精神状态良好

完全不用担心～`},便便:{icon:"💩",msg:`每日 3-4 次 · 性状正常

✅ 颜色：金黄色
✅ 性状：糊状
✅ 气味：正常酸味

张阿姨说：宝宝的便便很健康，说明消化吸收良好～`}}[p]||{icon:"👶",msg:"一切正常 ✅"};v({title:`${n.icon} ${p}护理详情`,message:n.msg,confirmButtonText:"知道了 💕",confirmButtonColor:"#F8A8B8"})}return(p,a)=>(d(),b("div",F,[s("div",T,[s("button",{class:"dp-back",onClick:f},"‹ 返回"),a[11]||(a[11]=s("span",{class:"dp-title"},"📋 护理报告",-1)),s("button",{class:"dp-action",onClick:a[0]||(a[0]=n=>c(e)("📅 完整护理日历"))},"📅 日历")]),s("div",D,[a[26]||(a[26]=s("div",{class:"warm-banner"},"💕 张阿姨每天细心记录，妈妈和宝宝都被照顾得很好～",-1)),s("div",N,[s("div",{class:m(["mt-tab",{active:t.value==="mom"}]),onClick:a[1]||(a[1]=n=>t.value="mom")},[...a[12]||(a[12]=[s("span",{class:"mt-icon"},"🤱",-1),s("span",{class:"mt-label"},"宝妈护理",-1),s("span",{class:"mt-count"},"2项",-1)])],2),s("div",{class:m(["mt-tab",{active:t.value==="baby"}]),onClick:a[2]||(a[2]=n=>t.value="baby")},[...a[13]||(a[13]=[s("span",{class:"mt-icon"},"👶",-1),s("span",{class:"mt-label"},"宝宝护理",-1),s("span",{class:"mt-count"},"4项",-1)])],2)]),t.value==="mom"?(d(),b(r,{key:0},[s("div",{class:"nurse-card",onClick:C},[...a[14]||(a[14]=[i('<div class="nc-header" data-v-b205647b><span class="nc-icon" data-v-b205647b>🩹</span><span class="nc-name" data-v-b205647b>伤口护理</span><span class="nc-status green" data-v-b205647b>🟢 恢复良好</span><span class="nc-arrow" data-v-b205647b>›</span></div><div class="nc-progress" data-v-b205647b><div class="nc-pbar" data-v-b205647b><div class="nc-pfill" style="width:100%;" data-v-b205647b></div></div><span class="nc-plabel" data-v-b205647b>已护理 12 次 · 今日15:00第13次</span></div><div class="nc-note" data-v-b205647b>💬 伤口愈合得很好，今天可以淋浴了～</div>',3)])]),s("div",{class:"nurse-card",onClick:y},[...a[15]||(a[15]=[i('<div class="nc-header" data-v-b205647b><span class="nc-icon" data-v-b205647b>🍼</span><span class="nc-name" data-v-b205647b>通乳记录</span><span class="nc-status green" data-v-b205647b>🟢 通畅</span><span class="nc-arrow" data-v-b205647b>›</span></div><div class="milk-stats" data-v-b205647b><div class="milk-stat" data-v-b205647b><span class="ms-num" data-v-b205647b>6次</span><span class="ms-label" data-v-b205647b>今日排奶</span></div><div class="ms-div" data-v-b205647b></div><div class="milk-stat" data-v-b205647b><span class="ms-num" data-v-b205647b>480ml</span><span class="ms-label" data-v-b205647b>总奶量</span></div><div class="ms-div" data-v-b205647b></div><div class="milk-stat" data-v-b205647b><span class="ms-num" data-v-b205647b>✅</span><span class="ms-label" data-v-b205647b>乳腺通畅</span></div></div>',2)])]),s("div",{class:"nurse-card",onClick:B},[...a[16]||(a[16]=[i('<div class="nc-header" data-v-b205647b><span class="nc-icon" data-v-b205647b>💕</span><span class="nc-name" data-v-b205647b>情绪记录</span><span class="nc-status green" data-v-b205647b>🟢 心情良好</span><span class="nc-arrow" data-v-b205647b>›</span></div><div class="mood-summary" data-v-b205647b><span class="mood-today" data-v-b205647b>😊 开心</span><span class="mood-sleep" data-v-b205647b>😴 睡眠 7.5h</span><span class="mood-score" data-v-b205647b>评分 8/10</span></div>',2)])])],64)):u("",!0),t.value==="baby"?(d(),b(r,{key:1},[a[25]||(a[25]=i('<div class="baby-hero" data-v-b205647b><div class="bh-item" data-v-b205647b><span class="bh-label" data-v-b205647b>体重</span><span class="bh-val" data-v-b205647b>3.2→3.8kg <span class="bh-up" data-v-b205647b>📈</span></span></div><div class="bh-div" data-v-b205647b></div><div class="bh-item" data-v-b205647b><span class="bh-label" data-v-b205647b>身长</span><span class="bh-val" data-v-b205647b>50→54cm <span class="bh-up" data-v-b205647b>📈</span></span></div><div class="bh-div" data-v-b205647b></div><div class="bh-item" data-v-b205647b><span class="bh-label" data-v-b205647b>喂养</span><span class="bh-val" data-v-b205647b>纯母乳</span></div></div>',1)),s("div",A,[s("div",{class:"bg-item",onClick:a[3]||(a[3]=n=>l("洗澡"))},[...a[17]||(a[17]=[s("span",{class:"bg-icon"},"🛁",-1),s("span",{class:"bg-num"},"8次",-1),s("span",{class:"bg-label"},"洗澡",-1),s("span",{class:"bg-status"},"✅ 隔天一次",-1)])]),s("div",{class:"bg-item",onClick:a[4]||(a[4]=n=>l("脐带"))},[...a[18]||(a[18]=[s("span",{class:"bg-icon"},"🩹",-1),s("span",{class:"bg-num"},"8次",-1),s("span",{class:"bg-label"},"脐带护理",-1),s("span",{class:"bg-status"},"✅ 已脱落",-1)])]),s("div",{class:"bg-item",onClick:a[5]||(a[5]=n=>l("喂养"))},[...a[19]||(a[19]=[s("span",{class:"bg-icon"},"🍼",-1),s("span",{class:"bg-num"},"6次/日",-1),s("span",{class:"bg-label"},"喂养",-1),s("span",{class:"bg-status"},"✅ 吸吮有力",-1)])]),s("div",{class:"bg-item",onClick:a[6]||(a[6]=n=>l("睡眠"))},[...a[20]||(a[20]=[s("span",{class:"bg-icon"},"😴",-1),s("span",{class:"bg-num"},"16h/日",-1),s("span",{class:"bg-label"},"睡眠",-1),s("span",{class:"bg-status"},"✅ 规律",-1)])]),s("div",{class:"bg-item",onClick:a[7]||(a[7]=n=>l("黄疸"))},[...a[21]||(a[21]=[s("span",{class:"bg-icon"},"☀️",-1),s("span",{class:"bg-num"},"✅",-1),s("span",{class:"bg-label"},"黄疸",-1),s("span",{class:"bg-status"},"已消退",-1)])]),s("div",{class:"bg-item",onClick:a[8]||(a[8]=n=>l("便便"))},[...a[22]||(a[22]=[s("span",{class:"bg-icon"},"💩",-1),s("span",{class:"bg-num"},"3-4次/日",-1),s("span",{class:"bg-label"},"便便",-1),s("span",{class:"bg-status"},"✅ 正常",-1)])])]),s("div",{class:"growth-card",onClick:a[9]||(a[9]=n=>c(e)("📈 完整成长曲线"))},[...a[23]||(a[23]=[i('<span class="gc-icon" data-v-b205647b>📈</span><div class="gc-info" data-v-b205647b><span class="gc-title" data-v-b205647b>宝宝成长曲线</span><span class="gc-desc" data-v-b205647b>体重、身长变化趋势 · 查看详细数据</span></div><span class="gc-arrow" data-v-b205647b>›</span>',3)])]),s("div",V,[a[24]||(a[24]=s("div",{class:"fc-title"},"🍼 今日喂养记录",-1)),(d(!0),b(r,null,x(k.value,(n,$)=>(d(),b("div",{class:"fc-item",key:$},[s("span",M,o(n.time),1),s("span",{class:m(["fc-type",n.type])},o(n.type==="left"?"左侧":"右侧"),3),s("span",R,o(n.duration)+"min",1),s("span",S,o(n.amount)+"ml",1)]))),128))])],64)):u("",!0),s("button",{class:"view-all-btn",onClick:a[10]||(a[10]=n=>c(e)("📅 完整护理日历"))},"📅 查看完整护理日历 ›")])]))}},L=w(z,[["__scopeId","data-v-b205647b"]]);export{L as default};
