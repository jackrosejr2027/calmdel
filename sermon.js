import {initDevotionalFeatures} from './devotional-features.js';
import {downloadDevotionalText,downloadDevotionalPdf,downloadDevotionalZip} from './devotional-exports.js';

const BIBLE_FONT_KEY='still-waters-parchment-mode';
const devotionalFontToggle=document.querySelector('#font-toggle');
function setDevotionalTypeface(enabled){
  document.documentElement.classList.toggle('bible-1611',enabled);
  document.querySelector('meta[name=theme-color]')?.setAttribute('content',enabled?'#ead9b8':'#f7f4ec');
  devotionalFontToggle.setAttribute('aria-pressed',String(enabled));
  devotionalFontToggle.setAttribute('aria-label',enabled?'Switch back to the white page and usual typeface':'Switch to parchment and an old Bible typeface');
  devotionalFontToggle.title=enabled?'Switch back to the white page and usual typeface':'Switch to parchment and an old Bible typeface';
  try{localStorage.setItem(BIBLE_FONT_KEY,enabled?'classic':'regular');}catch{}
}
let devotionalOldFont=false;
try{devotionalOldFont=localStorage.getItem(BIBLE_FONT_KEY)==='classic';}catch{}
setDevotionalTypeface(devotionalOldFont);
devotionalFontToggle.addEventListener('click',()=>setDevotionalTypeface(!document.documentElement.classList.contains('bible-1611')));

const themes = [
  {title:'Hope that holds in the dark',terms:['hope','light','morning','wait','promise','comfort','restore','darkness','joy']},
  {title:'Learning to trust',terms:['trust','believe','faith','confidence','fear','refuge','rely','shelter']},
  {title:'Courage for the next step',terms:['courage','strong','strength','fear','bold','stand','help','deliver']},
  {title:'A patient heart',terms:['patience','wait','longsuffering','endure','steadfast','quiet','season','timing']},
  {title:'Peace in an anxious hour',terms:['peace','care','anxious','trouble','rest','still','mind','fear','comfort']},
  {title:'When grief has a voice',terms:['weep','tears','sorrow','mourn','grief','comfort','broken','hope','heal']},
  {title:'Mercy and a new beginning',terms:['mercy','forgive','forgiven','sin','clean','wash','new','compassion','transgression']},
  {title:'Wisdom for ordinary days',terms:['wisdom','wise','understanding','knowledge','instruction','teach','discern','path']},
  {title:'Prayer when words are few',terms:['pray','prayer','call','cry','ask','seek','answer','supplication','listen']},
  {title:'A practice of gratitude',terms:['thank','thanks','praise','bless','goodness','sing','thanksgiving','joy','remember']},
  {title:'The steadiness of God',terms:['faithful','steadfast','never','forever','keep','preserve','covenant','mercy']},
  {title:'Love that becomes action',terms:['love','charity','neighbor','serve','kindness','compassion','brother','one another']},
  {title:'The quiet strength of humility',terms:['humble','lowly','meek','proud','pride','servant','exalt','heart']},
  {title:'Justice and the overlooked',terms:['justice','poor','oppressed','widow','stranger','righteous','judge','defend','mercy']},
  {title:'Serving with an open hand',terms:['serve','minister','work','labor','gift','give','help','fellow','neighbor']},
  {title:'Belonging to one another',terms:['one another','fellowship','body','brother','sister','together','unity','peace']},
  {title:'Faithfulness at home',terms:['children','father','mother','house','family','teach','generation','love','honour']},
  {title:'Words that make room for life',terms:['tongue','word','speak','mouth','answer','truth','gentle','silence','wisdom']},
  {title:'Faithful work, offered well',terms:['work','labour','diligent','hand','serve','faithful','do','strength','reward']},
  {title:'Healing and restoration',terms:['heal','healing','restore','whole','health','sick','comfort','mercy','save']},
  {title:'Beginning again',terms:['new','begin','renew','created','clean','restore','turn','return','morning']},
  {title:'Making room for lament',terms:['cry','weep','sorrow','trouble','lament','forsaken','comfort','deliver','hear']},
  {title:'Faith beyond what is seen',terms:['faith','believe','assurance','hope','unseen','trust','promise','believed']},
  {title:'Waiting without losing heart',terms:['wait','patient','longsuffering','hope','strength','renew','quiet','trust']},
  {title:'The nearness of God',terms:['near','presence','with thee','dwell','abide','face','seek','comfort','refuge']},
  {title:'Rest for the weary',terms:['rest','sleep','labour','weary','burden','quiet','peace','sabbath','come']},
  {title:'Generosity without fear',terms:['give','giving','generous','poor','treasure','freely','bountiful','hand','share']},
  {title:'Perseverance in a hard season',terms:['endure','patience','overcome','steadfast','run','finish','tribulation','strength','hope']},
  {title:'Integrity in the hidden places',terms:['integrity','truth','upright','honest','pure','heart','righteous','secret','walk']},
  {title:'Choosing the faithful way',terms:['tempt','deliver','evil','escape','way','walk','keep','word','righteous']},
  {title:'Joy as a quiet witness',terms:['joy','rejoice','glad','praise','sing','thank','delight','hope']},
  {title:'Wonder in the created world',terms:['earth','heaven','creation','made','works','sea','light','stars','wonder']},
  {title:'The wide reach of mercy',terms:['mercy','compassion','forgive','grace','kindness','pity','love','salvation']},
  {title:'Remembering who you are',terms:['called','beloved','chosen','child','name','image','redeemed','inheritance','light']},
  {title:'Following in the way of Jesus',terms:['follow','disciples','Jesus','cross','serve','commandment','love','way','learn']},
  {title:'A life that bears witness',terms:['witness','light','truth','testify','good works','gospel','word','shine','faith']},
  {title:'The work of reconciliation',terms:['reconcile','peace','forgive','enmity','together','love','brother','mercy']},
  {title:'Meeting fear with faith',terms:['fear','afraid','courage','trust','help','refuge','deliver','peace','strong']},
  {title:'Faith in uncertain times',terms:['trust','unknown','way','lead','guide','faith','hope','light','step']},
  {title:'Leadership shaped by service',terms:['serve','servant','lead','rule','shepherd','example','humble','people','justice']},
  {title:'Growing in grace',terms:['grow','grace','fruit','spirit','knowledge','perfect','mature','faith','love']},
  {title:'A holy pause',terms:['rest','sabbath','remember','cease','quiet','still','renew','worship','holy']},
  {title:'Living inside the promise',terms:['promise','covenant','word','faithful','inheritance','hope','sure','everlasting']},
  {title:'Compassion that sees',terms:['compassion','mercy','see','poor','hungry','stranger','widow','kindness','help']},
  {title:'Obedience as a response of love',terms:['obey','keep','commandment','hear','word','love','walk','do','faithful']},
  {title:'Endurance with hope',terms:['endure','persevere','patience','hope','tribulation','finish','strength','crown']},
  {title:'Worship in every season',terms:['worship','praise','sing','glory','thank','bless','holy','joy','rejoice']},
  {title:'Freedom from what binds',terms:['free','liberty','bondage','deliver','prison','yoke','truth','sin','redeem']},
  {title:'Bringing honest doubt to God',terms:['doubt','believe','faith','question','answer','understand','trust','seek','hear']},
  {title:'Enough for today',terms:['daily','bread','provide','need','content','care','give','trust','supply']},
  {title:'Renewed from the inside',terms:['renew','new','spirit','heart','transform','strength','mind','create','restore']},
  {title:'Light for the way ahead',terms:['light','lamp','path','darkness','word','guide','truth','lead','way']},
  {title:'A blessing for the year ahead',terms:['bless','hope','peace','mercy','keep','light','grace','faithful','goodness']}
];
const dailyAngles = [
  'Notice what the passage invites you to receive.',
  'Consider what it asks you to release.',
  'Look for the next faithful step, however small.',
  'Listen for the promise beneath the difficulty.',
  'Ask how this word might shape your care for another.',
  'Make space for an honest response, not a polished one.',
  'Carry one phrase into the week ahead.',
  'Attend to what is true, even if it is not yet resolved.',
  'Notice how this passage makes room for both honesty and hope.',
  'Consider what faithful care could look like in an ordinary moment.',
  'Listen for the difference between what is promised and what is left open.',
  'Let one word from the reading guide a thoughtful response.',
  'Bring your questions to the text without rushing toward an answer.',
  'Consider what this passage reveals about living with compassion.'
];
const broadReferences = ['Psalms 23:1','Psalms 27:1','Psalms 46:1','Psalms 121:1','Isaiah 40:31','Isaiah 41:10','Matthew 5:9','Matthew 6:33','Matthew 11:28','John 14:27','John 15:5','Romans 8:28','Romans 8:38','Romans 12:12','Philippians 4:6','Philippians 4:13','Hebrews 4:16','Hebrews 12:1','1 Peter 5:7','1 John 4:18','Lamentations 3:22','Proverbs 3:5','Micah 6:8','2 Corinthians 12:9','Revelation 21:4'];
const dateInput=document.querySelector('#devotional-date');
const themeTitle=document.querySelector('#theme-title');
const themeFocus=document.querySelector('#theme-focus');
const dayIndex=document.querySelector('#day-index');
const prepareButton=document.querySelector('#prepare');
const statusNode=document.querySelector('#status');
const article=document.querySelector('#devotional');
const DEVOTIONAL_ARCHIVE_KEY='still-waters-devotional-archive-v1';
let bible;
let currentDay;
let currentTheme;
let currentPassages=[];
let currentMode='daily';
let currentRandomKey='';
let currentDocumentKey='daily:pending';
let busy=false;
const devotionalFeatures=initDevotionalFeatures({getDocumentKey:()=>currentDocumentKey,onRandom:prepareRandomDevotional});

function dateParts(value){return new Date(value+'T12:00:00');}
function ordinalOf(date){const start=new Date(date.getFullYear(),0,0);return Math.floor((date-start)/86400000);}
function planFor(date){
  const ordinal=ordinalOf(date)-1;
  const theme=themes[Math.floor(ordinal/14)%themes.length];
  const angle=dailyAngles[ordinal%dailyAngles.length];
  const number=ordinal+1;
  return {theme,angle,number};
}
function normalize(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function scoreText(text,terms){
  const clean=normalize(text);
  const words=new Set(clean.split(' '));
  let score=0;
  for(const term of terms){
    const t=normalize(term);
    if(!t)continue;
    if(t.includes(' ')){if((' '+clean+' ').includes(' '+t+' '))score+=3;continue;}
    if(words.has(t))score+=3;
    else if(t.length>4&&[...words].some(word=>word.startsWith(t)))score+=1.5;
  }
  return score;
}
function verseAt(reference){
  const match=reference.match(/^(.+?) (\d+):(\d+)$/);
  if(!match)return null;
  const [,book,ch,v]=match;
  const text=bible.books[book]?.[Number(ch)-1]?.verses[Number(v)-1];
  return text?{reference,text,book,chapter:Number(ch),verse:Number(v)}:null;
}
function pickPassages(theme,angle,date){
  const terms=theme.terms;
  const candidates=[];
  for(const book of bible.order){
    bible.books[book].forEach((chapter,ci)=>chapter.verses.forEach((text,vi)=>{
      const score=scoreText(text,terms);
      if(score>0)candidates.push({reference:book+' '+(ci+1)+':'+(vi+1),text,book,chapter:ci+1,score});
    }));
  }
  const seed=Array.from(date).reduce((n,ch)=>n+ch.charCodeAt(0),0);
  candidates.sort((a,b)=>b.score-a.score||((a.reference.charCodeAt(a.reference.length-1)+seed)%7)-((b.reference.charCodeAt(b.reference.length-1)+seed)%7));
  const chosen=[];const chapterCounts=new Map();const bookCounts=new Map();const seen=new Set();
  for(const item of candidates){
    const ck=item.book+' '+item.chapter;
    if((chapterCounts.get(ck)||0)>=2||(bookCounts.get(item.book)||0)>=5)continue;
    chosen.push(item);seen.add(item.reference);chapterCounts.set(ck,(chapterCounts.get(ck)||0)+1);bookCounts.set(item.book,(bookCounts.get(item.book)||0)+1);
    if(chosen.length===25)break;
  }
  if(chosen.length<25){
    for(const item of candidates){if(!seen.has(item.reference)){chosen.push(item);seen.add(item.reference);if(chosen.length===25)break;}}
  }
  for(const ref of broadReferences){if(chosen.length>=25)break;if(seen.has(ref))continue;const verse=verseAt(ref);if(verse){chosen.push(verse);seen.add(ref);}}
  return chosen.slice(0,25);
}
function verseHref(book,chapter,verse){
  const params=new URLSearchParams({book,chapter:String(chapter),verse:String(verse)});
  return '/?'+params.toString();
}
function appendCitationLinks(parent,text){
  const books=[...bible.order,'Psalm'].sort((a,b)=>b.length-a.length).join('|');
  const pattern=new RegExp('\\[('+books+')\\s+(\\d+):(\\d+)(?:[-–]\\d+)?\\]','g');
  let cursor=0,match;
  while((match=pattern.exec(text))!==null){
    parent.append(document.createTextNode(text.slice(cursor,match.index)));
    const rawBook=match[1];
    const book=rawBook==='Psalm'?'Psalms':rawBook;
    const chapter=Number(match[2]),verse=Number(match[3]);
    const exists=bible.books[book]?.[chapter-1]?.verses[verse-1];
    if(exists){
      const link=document.createElement('a');
      link.className='devotional-ref-link';
      link.href=verseHref(book,chapter,verse);
      link.textContent=match[0];
      link.setAttribute('aria-label','Open '+book+' '+chapter+':'+verse+' in Find a verse for this moment');
      parent.append(link);
    }else parent.append(document.createTextNode(match[0]));
    cursor=pattern.lastIndex;
  }
  parent.append(document.createTextNode(text.slice(cursor)));
}
function renderText(target,text){
  target.replaceChildren();
  const paragraphs=Array.isArray(text)?text.map(value=>String(value).trim()).filter(Boolean):String(text||'').trim().split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  for(const paragraph of paragraphs){
    const node=document.createElement('p');
    appendCitationLinks(node,paragraph.replace(/^\s*[-*]\s+/gm,''));
    target.append(node);
  }
}
function showPassages(passages){
  const list=document.querySelector('#passages');
  const frag=document.createDocumentFragment();
  passages.forEach(item=>{
    const li=document.createElement('li');
    const link=document.createElement('a');
    link.className='scripture-passage-link';
    link.href=verseHref(item.book,item.chapter,item.verse);
    link.setAttribute('aria-label','Open '+item.reference+' in Find a verse for this moment');
    const ref=document.createElement('span');
    ref.className='scripture-ref';
    ref.textContent=item.reference;
    link.append(ref,document.createTextNode(item.text));
    li.append(link);
    frag.append(li);
  });
  list.replaceChildren(frag);
  document.querySelector('#scripture-count').textContent=passages.length+' verses';
}
function archiveDevotional(data,date,mode){
  const id=currentDocumentKey||mode+':'+date;
  const record={id,mode,date:String(date||''),title:data.title||currentTheme?.theme?.title||'Devotional',theme:currentTheme?.theme?.title||'',focus:currentTheme?.angle||'',createdAt:new Date().toISOString(),references:currentPassages.map(item=>item.reference||[item.book,item.chapter,item.verse].filter(Boolean).join(' ')).filter(Boolean),content:{opening:data.opening||'',middle:data.middle||[],closing:data.closing||'',reflectionQuestions:data.reflectionQuestions||[],body:data.body||''}};
  try{const stored=JSON.parse(localStorage.getItem(DEVOTIONAL_ARCHIVE_KEY)||'[]');const archive=Array.isArray(stored)?stored:[];const existing=archive.findIndex(item=>item.id===id);if(existing>=0)archive[existing]=record;else archive.push(record);localStorage.setItem(DEVOTIONAL_ARCHIVE_KEY,JSON.stringify(archive.slice(-150)));}catch(error){console.warn('Could not save devotional history on this device.',error);}
}
function renderDevotional(data,date,mode='daily',customId=''){
  currentMode=mode;
  currentDocumentKey=mode==='daily'?'daily:'+date:mode==='random'?'random:'+currentRandomKey:'custom:'+customId;
  archiveDevotional(data,date,mode);
  document.querySelector('#devotional-title').textContent=data.title||currentTheme.theme.title;
  renderText(document.querySelector('#opening'),data.opening);
  renderText(document.querySelector('#middle'),data.middle);
  renderText(document.querySelector('#closing'),data.closing);
  const questions=document.querySelector('#questions');
  questions.replaceChildren(...(data.reflectionQuestions||[]).map(question=>{const li=document.createElement('li');li.textContent=question;return li;}));
  document.querySelector('#opening-section').hidden=!document.querySelector('#opening').textContent.trim();
  document.querySelector('#middle-section').hidden=!document.querySelector('#middle').textContent.trim();
  document.querySelector('#closing-section').hidden=!document.querySelector('#closing').textContent.trim();
  document.querySelector('#reflection-section').hidden=!questions.children.length;
  document.querySelector('.scripture-list').hidden=!currentPassages.length;
  showPassages(currentPassages);
  article.hidden=false;
  devotionalFeatures.refreshAnnotations();
}
function updateDay({autoPrepare=true}={}){
  if(!bible)return;
  const date=dateInput.value;const parsed=dateParts(date);
  if(Number.isNaN(parsed.getTime()))return;
  currentDay=date;currentMode='daily';currentRandomKey='';currentDocumentKey='daily:'+date;
  currentTheme=planFor(parsed);
  document.querySelector('#theme-label').textContent='DEVOTIONAL THEME';
  themeTitle.textContent=currentTheme.theme.title;
  themeFocus.textContent='A reflection: '+currentTheme.angle;
  dayIndex.textContent='';article.hidden=true;statusNode.textContent='';
  prepareButton.disabled=false;prepareButton.innerHTML='Prepare this devotional <span aria-hidden="true">↗</span>';
  let cached=null;try{cached=localStorage.getItem('daily-devotional-v2-'+date);}catch{}
  if(cached){
    try{currentPassages=pickPassages(currentTheme.theme,currentTheme.angle,date);renderDevotional(JSON.parse(cached),date,'daily');prepareButton.textContent='Devotional prepared';prepareButton.disabled=true;statusNode.textContent='Your devotional is ready.';return;}
    catch{try{localStorage.removeItem('daily-devotional-v2-'+date);}catch{}}
  }
  if(autoPrepare)void prepareDevotional('daily');
}
function renderCustomDevotional(item){
  currentMode='custom';currentRandomKey='';currentTheme={theme:{title:item.title,terms:[]},angle:'Your imported devotional',number:null};currentPassages=item.references||[];
  document.querySelector('#theme-label').textContent='YOUR DEVOTIONAL';themeTitle.textContent=item.title;themeFocus.textContent=currentPassages.length?currentPassages.length+' scripture reference'+(currentPassages.length===1?'':'s'):'Imported from your text';
  prepareButton.disabled=false;prepareButton.textContent='Return to daily devotional';statusNode.textContent='';
  renderDevotional({title:item.title,opening:item.body||'A verse to carry with you.',middle:[],closing:[],reflectionQuestions:[]},'Imported devotional','custom',item.id);
}
function prepareRandomDevotional(){
  if(!bible||busy)return;
  const theme=themes[Math.floor(Math.random()*themes.length)];const angle=dailyAngles[Math.floor(Math.random()*dailyAngles.length)];
  currentTheme={theme,angle,number:null};currentRandomKey=crypto.randomUUID?.()||String(Date.now()+Math.random());
  document.querySelector('#theme-label').textContent='RANDOM THEME';themeTitle.textContent=theme.title;themeFocus.textContent='A randomly chosen reflection: '+angle;
  prepareButton.disabled=false;prepareButton.textContent='Return to daily devotional';statusNode.textContent='';
  return prepareDevotional('random');
}
function localDevotional(theme,angle,passages){
  const groups=[];
  for(let i=0;i<passages.length;i+=5){
    const batch=passages.slice(i,i+5);
    const n=groups.length+1;
    const witnesses=batch.map(item=>'['+item.reference+'] “'+item.text+'”').join(' ');
    groups.push('In this part of the reading, stay close to the words themselves. '+witnesses+' These passages come from different moments and voices; let each keep its own meaning while you notice how it meets the theme of '+theme.title.toLowerCase()+'. What does each text actually promise, ask, grieve, or celebrate? Hold those differences together without forcing them into an easy answer. '+(n===1?'Begin with what the words say plainly.':'Return to the words that speak most directly to your life today.'));
  }
  return {
    title:theme.title,
    opening:[
      'We gather around '+theme.title.toLowerCase()+'. This is not an invitation to pretend that every question has already been answered. It is a chance to bring the real shape of life into the presence of Scripture: its hopes, its weariness, its choices, and its unfinished parts. The Word gives us language to attend honestly to what is here.',
      'A point of focus: '+angle+' Read slowly. Notice which line steadies you, which one challenges you, and which one is difficult to hear. These twenty-five passages are not all saying the same thing; together they offer a wide, truthful conversation for prayer and reflection.'
    ],
    middle:groups,
    closing:[
      'As these readings draw to a close, do not measure your faith by how quickly you can resolve what remains open. Carry one exact phrase with you. Let it be a companion for the next ordinary decision, conversation, or quiet moment. Where a passage offers comfort, receive it without turning it into a demand. Where it calls for change, consider one honest and practicable response.',
      'The invitation is simple: return to the passage that stayed with you, read it once more in its own context, and let it shape one act of attention or care. You do not have to carry everything at once. Take your next step with the words of Scripture beside you.'
    ],
    reflectionQuestions:[
      'Which line from '+passages[0].reference+' most closely meets what you are carrying, and why?',
      'What do the readings say plainly about '+theme.title.toLowerCase()+'—and what do they leave open?',
      'Which passage challenges your first response to this situation?',
      'Is there a promise, prayer, or instruction here you want to return to? What does it invite you to notice?',
      'What is one small, concrete way you could carry this word into your life?'
    ]
  };
}
function showLocalDevotional(message,mode='daily'){
  const devotional=localDevotional(currentTheme.theme,currentTheme.angle,currentPassages);
  if(mode==='daily')try{localStorage.setItem('daily-devotional-v2-'+currentDay,JSON.stringify(devotional));}catch{}
  renderDevotional(devotional,currentDay,mode);
  statusNode.textContent=message;
  if(mode==='daily')prepareButton.textContent='Devotional prepared';
}
async function prepareDevotional(mode='daily'){
  if(busy||!bible||!currentDay)return;
  busy=true;prepareButton.disabled=true;dateInput.disabled=true;document.querySelector('#random-devotional').disabled=true;statusNode.textContent='Gathering the passages and shaping your devotional…';article.hidden=true;
  try{
    const passageSeed=mode==='random'?currentDay+'|'+currentRandomKey:currentDay;
    currentPassages=pickPassages(currentTheme.theme,currentTheme.angle,passageSeed);
    if(currentPassages.length!==25)throw new Error('Could not gather 25 passages for this date. Please try again.');
    if(!window.websim?.chat?.completions?.create){
      showLocalDevotional('Prepared directly from the 25 KJV readings. The writing assistant is not available in this view.',mode);
      return;
    }
    const readings=currentPassages.map(item=>({reference:item.reference,text:item.text}));
    const completion=await window.websim.chat.completions.create({
      messages:[
        {role:'system',content:'You are a careful, compassionate devotional writer creating a complete Christian devotional in the King James Bible tradition. Keep the devotional grounded only in the 25 supplied KJV passages; do not invent Scripture quotations or references. Write a cohesive, timeless devotional with a clear opening, a substantial reflection that unfolds one connected insight from the passages, and a closing that offers a gentle, practical response. Do not mention a calendar date, weekday, day number, or day of the year; write so the devotion stands on its own whenever it is read. Integrate and cite every supplied passage at least once in the reflection or opening using its exact reference in square brackets, such as [Psalms 23:1]. Do not merely list citations. Avoid clichés, guilt, claims that suffering is the reader’s fault, or promises the text does not make. Address the reader warmly and plainly. Return opening, middle, and closing as arrays of separate paragraph strings: 1–2 opening paragraphs, 5–7 middle paragraphs, and 1–2 closing paragraphs; aim for 700–950 words total. Cite each of the 25 supplied references exactly at least once, and do not introduce other references. Read every passage in its own context; do not infer hidden symbolism or build an argument from accidental word overlap. Make connections textually sound and explain differences between passages honestly. Write exactly five open-ended reflection questions grounded in the readings. Return only the requested JSON.'},
        {role:'user',content:JSON.stringify({theme:currentTheme.theme.title,focus:currentTheme.angle,passages:readings,request:'Write one complete, cohesive devotional with no date or day number. Structure it as Opening, Reflection, Closing, then five reader reflection questions. The 25 supplied passages are the devotional’s foundation; connect their shared witness to this theme.'})}
      ],
      schema:{type:'object',properties:{title:{type:'string'},opening:{type:'array',items:{type:'string'}},middle:{type:'array',items:{type:'string'}},closing:{type:'array',items:{type:'string'}},reflectionQuestions:{type:'array',items:{type:'string'}}},required:['title','opening','middle','closing','reflectionQuestions'],additionalProperties:false}
    });
    const devotional=JSON.parse(completion.content);
    if(!Array.isArray(devotional.opening)||devotional.opening.length<1||devotional.opening.length>2||!Array.isArray(devotional.middle)||devotional.middle.length<5||devotional.middle.length>7||!Array.isArray(devotional.closing)||devotional.closing.length<1||devotional.closing.length>2||!Array.isArray(devotional.reflectionQuestions)||devotional.reflectionQuestions.length!==5)throw new Error('The devotional response was incomplete. Please prepare it again.');
    if(mode==='daily')localStorage.setItem('daily-devotional-v2-'+currentDay,JSON.stringify(devotional));
    renderDevotional(devotional,currentDay,mode);
    statusNode.textContent='';
    prepareButton.textContent=mode==='daily'?'Devotional prepared':'Return to daily devotional';
  }catch(error){
    if(currentPassages.length===25){
      showLocalDevotional('Prepared directly from the 25 KJV readings because the writing assistant could not respond.',mode);
    }else{
      statusNode.textContent=error?.message||'The devotional could not be prepared just now. Please try again.';
      article.hidden=true;
    }
  }finally{busy=false;prepareButton.disabled=currentMode==='daily'&&!article.hidden;dateInput.disabled=false;document.querySelector('#random-devotional').disabled=false;}
}
function collectDevotionalExport(){
  const paragraphs=id=>[...document.querySelectorAll('#'+id+' p')].map(item=>item.textContent.trim()).filter(Boolean);
  return {
    title:document.querySelector('#devotional-title').textContent.trim()||currentTheme.theme.title,
    sections:[{title:'Opening',paragraphs:paragraphs('opening')},{title:'Reflection',paragraphs:paragraphs('middle')},{title:'Closing',paragraphs:paragraphs('closing')}],
    questions:[...document.querySelectorAll('#questions li')].map(item=>item.textContent.trim()).filter(Boolean),
    passages:currentPassages.map(item=>({reference:item.reference,text:item.text}))
  };
}
const devotionalDownloadButtons=[...document.querySelectorAll('#devotional-downloads button')];
const devotionalDownloadStatus=document.querySelector('#download-devotional-status');
async function runDevotionalDownload(action,button){
  if(article.hidden||button.disabled)return;
  devotionalDownloadButtons.forEach(item=>item.disabled=true);devotionalDownloadStatus.textContent='Preparing your download…';
  try{await action(collectDevotionalExport());devotionalDownloadStatus.textContent='Your download is ready.';}
  catch(error){console.error('Devotional download failed:',error);devotionalDownloadStatus.textContent=error?.message||'The download could not be prepared. Please try again.';}
  finally{devotionalDownloadButtons.forEach(item=>item.disabled=false);}
}
document.querySelector('#download-devotional-txt').addEventListener('click',event=>runDevotionalDownload(downloadDevotionalText,event.currentTarget));
document.querySelector('#download-devotional-pdf').addEventListener('click',event=>runDevotionalDownload(downloadDevotionalPdf,event.currentTarget));
document.querySelector('#download-devotional-zip').addEventListener('click',event=>runDevotionalDownload(downloadDevotionalZip,event.currentTarget));
function localISODate(date){const offset=date.getTimezoneOffset();return new Date(date.getTime()-offset*60000).toISOString().slice(0,10);}
async function start(){
  dateInput.value=localISODate(new Date());
  dateInput.addEventListener('change',updateDay);
  prepareButton.addEventListener('click',()=>{if(currentMode!=='daily')updateDay({autoPrepare:false});if(article.hidden&&!busy)prepareDevotional('daily');});
  try{
    const response=await fetch('./bible.json');
    if(!response.ok)throw new Error('The Bible text could not be loaded.');
    bible=await response.json();
    prepareButton.disabled=false;
    updateDay();
  }catch(error){statusNode.textContent=error.message;}
}
start();