function filenamePart(value){return String(value||'devotional').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'devotional';}
function textContent(data){
  const lines=[data.title,''];
  for(const section of data.sections){if(!section.paragraphs.length)continue;lines.push(section.title.toUpperCase(),'');for(const paragraph of section.paragraphs)lines.push(paragraph,'');}
  if(data.questions.length){lines.push('QUESTIONS TO CARRY','');data.questions.forEach((item,index)=>lines.push((index+1)+'. '+item));lines.push('');}
  if(data.passages.length){lines.push('FULL VERSES REFERENCED','');for(const item of data.passages)lines.push(item.reference+' — '+item.text,'');}
  return lines.join('\n').trim()+'\n';
}
function saveBlob(blob,name){const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);}
export function downloadDevotionalText(data){saveBlob(new Blob([textContent(data)],{type:'text/plain;charset=utf-8'}),'devotional-'+filenamePart(data.title)+'.txt');}
async function makePdf(data){
  const module=await import('https://esm.sh/jspdf@2.5.2');
  const Pdf=module.jsPDF||module.default?.jsPDF;
  const doc=new Pdf({unit:'mm',format:'a4',orientation:'portrait'});
  const pageWidth=doc.internal.pageSize.getWidth(),pageHeight=doc.internal.pageSize.getHeight(),margin=19,width=pageWidth-margin*2,bottom=pageHeight-margin-12;
  let y=margin;
  const addPage=()=>{doc.addPage();y=margin;};
  const addText=(text,{font='times',style='normal',size=11,color=[52,45,36],leading=5.4,after=3}={})=>{
    doc.setFont(font,style);doc.setFontSize(size);doc.setTextColor(...color);
    const lines=doc.splitTextToSize(String(text||''),width);
    for(const line of lines){if(y+leading>bottom)addPage();doc.text(line,margin,y);y+=leading;}
    y+=after;
  };
  addText(data.title,{font:'times',style:'bold',size:24,color:[55,48,37],leading:10,after:7});
  for(const section of data.sections){if(!section.paragraphs.length)continue;addText(section.title,{font:'helvetica',style:'bold',size:10,color:[112,82,45],leading:6,after:2});for(const paragraph of section.paragraphs)addText(paragraph,{font:'times',size:11,color:[52,45,36],leading:5.5,after:3});y+=2;}
  if(data.questions.length){addText('Questions to carry',{font:'helvetica',style:'bold',size:10,color:[112,82,45],leading:6,after:2});data.questions.forEach((question,index)=>addText((index+1)+'. '+question,{font:'times',size:11,leading:5.5,after:3}));y+=2;}
  if(data.passages.length){addText('Full verses referenced',{font:'helvetica',style:'bold',size:10,color:[112,82,45],leading:6,after:2});for(const item of data.passages)addText(item.reference+' — '+item.text,{font:'times',size:10.5,leading:5.2,after:3});}
  const total=doc.getNumberOfPages();for(let page=1;page<=total;page++){doc.setPage(page);doc.setDrawColor(218,208,189);doc.line(margin,pageHeight-10,pageWidth-margin,pageHeight-10);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(126,112,91);doc.text(page+' / '+total,pageWidth-margin,pageHeight-6,{align:'right'});}
  doc.setProperties({title:data.title||'Devotional',subject:'Devotional reflection and referenced Scripture'});
  return doc.output('blob');
}
export async function downloadDevotionalPdf(data){const blob=await makePdf(data);saveBlob(blob,'devotional-'+filenamePart(data.title)+'.pdf');}
export async function downloadDevotionalZip(data){const [pdf,zipModule]=await Promise.all([makePdf(data),import('https://esm.sh/jszip@3.10.1?bundle')]);const JSZip=zipModule.default||zipModule.JSZip;const zip=new JSZip();zip.file('devotional.txt',textContent(data));zip.file('devotional.pdf',pdf);const archive=await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:5}});saveBlob(archive,'devotional-'+filenamePart(data.title)+'.zip');}
