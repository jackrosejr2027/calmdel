const ANNOTATION_KEY='still-waters-devotional-annotations-v1';
const annotationMemory={};
const byId=id=>document.getElementById(id);
function safeRead(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'')??fallback;}catch{return fallback;}}

export function initDevotionalFeatures({getDocumentKey,onRandom}){
  const article=byId('devotional');
  const selectionTools=byId('devotional-selection-tools');
  const quoteLabel=byId('selection-quote');
  const commentDialog=byId('comment-dialog');
  let activeSelection=null;
  function annotationStore(){return {...safeRead(ANNOTATION_KEY,{}),...annotationMemory};}
  function entry(){const all=annotationStore();return all[getDocumentKey()]||{highlights:[],comments:[]};}
  function persistEntry(value){const key=getDocumentKey();annotationMemory[key]=value;const all=annotationStore();all[key]=value;try{localStorage.setItem(ANNOTATION_KEY,JSON.stringify(all));}catch(error){console.warn('Could not save devotional notes.',error);}}
  function selectionButtonState(){
    if(!activeSelection)return;
    const saved=(entry().highlights||[]).some(item=>item.section===activeSelection.section&&item.paragraph===activeSelection.paragraph&&item.start===activeSelection.start&&item.end===activeSelection.end);
    byId('highlight-selection').textContent=saved?'Remove highlight':'Highlight';
    byId('highlight-selection').setAttribute('aria-pressed',String(saved));
  }
  function paragraphOffset(root,node,offset){const range=document.createRange();range.selectNodeContents(root);range.setEnd(node,offset);return range.toString().length;}
  function getParagraph(node){const element=node?.nodeType===Node.ELEMENT_NODE?node:node?.parentElement;return element?.closest('.devotional-prose p')||null;}
  function captureSelection(){
    const selection=window.getSelection();
    if(!selection||selection.isCollapsed||!selection.toString().trim()){if(activeSelection){selectionTools.hidden=false;selectionButtonState();}else if(!commentDialog.open)selectionTools.hidden=true;return;}
    const range=selection.getRangeAt(0);const startP=getParagraph(range.startContainer);const endP=getParagraph(range.endContainer);
    if(!startP||startP!==endP||!article.contains(startP)||article.hidden){selectionTools.hidden=true;activeSelection=null;return;}
    const section=startP.closest('.devotional-prose')?.id;if(!section){selectionTools.hidden=true;activeSelection=null;return;}
    const paragraphs=[...byId(section).querySelectorAll('p')];let start=paragraphOffset(startP,range.startContainer,range.startOffset);let end=paragraphOffset(startP,range.endContainer,range.endOffset);const raw=range.toString();
    start+=raw.length-raw.trimStart().length;end-=raw.length-raw.trimEnd().length;
    if(end<=start){selectionTools.hidden=true;activeSelection=null;return;}
    const quote=startP.textContent.slice(start,end).trim();if(!quote){selectionTools.hidden=true;activeSelection=null;return;}
    activeSelection={section,paragraph:paragraphs.indexOf(startP),start,end,quote};quoteLabel.textContent=quote.length>70?'“'+quote.slice(0,67)+'…”':'“'+quote+'”';selectionTools.hidden=false;selectionButtonState();
  }
  document.addEventListener('selectionchange',captureSelection);
  selectionTools.addEventListener('pointerdown',event=>event.preventDefault());
  selectionTools.addEventListener('mousedown',event=>event.preventDefault());
  byId('highlight-selection').addEventListener('click',()=>{
    if(!activeSelection)return;const current=entry();const highlights=current.highlights||[];
    const exists=highlights.some(item=>item.section===activeSelection.section&&item.paragraph===activeSelection.paragraph&&item.start===activeSelection.start&&item.end===activeSelection.end);
    const next=exists?highlights.filter(item=>!(item.section===activeSelection.section&&item.paragraph===activeSelection.paragraph&&item.start===activeSelection.start&&item.end===activeSelection.end)):[...highlights,{...activeSelection,id:crypto.randomUUID?.()||String(Date.now())}];
    persistEntry({...current,highlights:next});selectionTools.hidden=true;window.getSelection()?.removeAllRanges();activeSelection=null;refreshAnnotations();
  });
  byId('comment-selection').addEventListener('click',()=>{if(!activeSelection)return;byId('comment-quote').textContent='“'+activeSelection.quote+'”';byId('comment-text').value='';if(!commentDialog.open)commentDialog.showModal();});
  byId('comment-form').addEventListener('submit',event=>{
    event.preventDefault();if(!activeSelection)return;const text=byId('comment-text').value.trim();if(!text)return;
    const current=entry();persistEntry({...current,comments:[...(current.comments||[]),{...activeSelection,id:crypto.randomUUID?.()||String(Date.now()),text,createdAt:Date.now()}]});
    commentDialog.close();selectionTools.hidden=true;window.getSelection()?.removeAllRanges();activeSelection=null;refreshAnnotations();
  });
  function wrapTextRange(root,start,end){
    if(!root||end<=start)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];let offset=0,node;
    while((node=walker.nextNode())){const length=node.nodeValue.length;nodes.push({node,start:offset,end:offset+length});offset+=length;}
    for(let i=nodes.length-1;i>=0;i--){const item=nodes[i];const from=Math.max(start,item.start)-item.start;const to=Math.min(end,item.end)-item.start;if(to<=from)continue;let part=item.node;if(to<part.nodeValue.length)part.splitText(to);if(from>0)part=part.splitText(from);if(part.parentElement?.closest('mark.devotional-highlight'))continue;const mark=document.createElement('mark');mark.className='devotional-highlight';part.parentNode.replaceChild(mark,part);mark.append(part);}
  }
  function renderComments(){
    const section=byId('comments-section');const list=byId('comments-list');const comments=entry().comments||[];list.replaceChildren();section.hidden=!comments.length;
    comments.forEach((item,index)=>{const card=document.createElement('article');card.className='devotional-comment';const quote=document.createElement('blockquote');quote.textContent='“'+item.quote+'”';const note=document.createElement('p');note.textContent=item.text;const remove=document.createElement('button');remove.type='button';remove.className='remove-comment';remove.textContent='Remove';remove.setAttribute('aria-label','Remove comment '+(index+1));remove.addEventListener('click',()=>{const current=entry();persistEntry({...current,comments:(current.comments||[]).filter(comment=>comment.id!==item.id)});renderComments();});card.append(quote,note,remove);list.append(card);});
  }
  article.addEventListener('contextmenu',event=>{
    const mark=event.target.closest('mark.devotional-highlight');
    if(!mark)return;
    event.preventDefault();
    const paragraph=mark.closest('.devotional-prose p');
    const section=paragraph?.closest('.devotional-prose');
    if(!paragraph||!section)return;
    const range=document.createRange();range.selectNodeContents(mark);
    const start=paragraphOffset(paragraph,range.startContainer,range.startOffset);
    const end=paragraphOffset(paragraph,range.endContainer,range.endOffset);
    const paragraphIndex=[...section.querySelectorAll('p')].indexOf(paragraph);
    const current=entry();const highlights=current.highlights||[];
    const remaining=highlights.filter(item=>!(item.section===section.id&&item.paragraph===paragraphIndex&&item.start<end&&item.end>start));
    if(remaining.length===highlights.length)return;
    persistEntry({...current,highlights:remaining});refreshAnnotations();
  });
  document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog')?.close()));
  commentDialog.addEventListener('click',event=>{if(event.target===commentDialog)commentDialog.close();});

  function refreshAnnotations(){
    if(!article||article.hidden)return;article.querySelectorAll('mark.devotional-highlight').forEach(mark=>{const parent=mark.parentNode;while(mark.firstChild)parent.insertBefore(mark.firstChild,mark);mark.remove();});
    const current=entry();const ranges=[...(current.highlights||[])].sort((a,b)=>a.section.localeCompare(b.section)||a.paragraph-b.paragraph||b.start-a.start);for(const item of ranges){const root=byId(item.section);const p=root?.querySelectorAll('p')[item.paragraph];if(p)wrapTextRange(p,item.start,item.end);}renderComments();
  }
  byId('random-devotional').addEventListener('click',()=>onRandom());
  return{refreshAnnotations};
}
