const archaicForms = new Map([
  ['hath','have'],['hast','have'],['doth','do'],['dost','do'],['didst','do'],['thou','you'],['thee','you'],['ye','you'],['thy','your'],['thine','yours'],
  ['art','be'],['wert','be'],['wast','be'],['shalt','shall'],['wilt','will'],['canst','can'],['couldst','could'],['shouldst','should'],['wouldst','would'],['mightst','might'],
  ['mayst','may'],['whence','where'],['whither','where'],['hither','here'],['thither','there'],['wherefore','why'],['wherewith','with'],['whatsoever','whatever'],['whosoever','whoever'],['whomsoever','whomever'],
  ['wherein','where'],['thereof','there'],['herein','here'],['hence','here'],['thence','there'],['ere','before'],['betwixt','between'],['amongst','among'],['nay','no'],['yea','yes'],
  ['spake','speak'],['brake','break'],['bare','bear'],['begat','beget'],['begotten','beget'],['sware','swear'],['swore','swear'],['sworn','swear'],['forbad','forbid'],['forbade','forbid'],
  ['forsook','forsake'],['forsaken','forsake'],['slew','slay'],['slain','slay'],['smote','smite'],['smitten','smite'],['drave','drive'],['drove','drive'],['driven','drive'],['rode','ride'],
  ['ridden','ride'],['wrought','work'],['wot','know'],['wist','know'],['quoth','say'],['clove','cleave'],['cleft','cleave'],['clave','cleave'],['arose','arise'],['awoke','awake'],
  ['awoken','awake'],['began','begin'],['begun','begin'],['bound','bind'],['bore','bear'],['born','bear'],['borne','bear'],['broke','break'],['broken','break'],['brought','bring'],
  ['bought','buy'],['caught','catch'],['crept','creep'],['dealt','deal'],['drew','draw'],['drawn','draw'],['drank','drink'],['drunk','drink'],['ate','eat'],['eaten','eat'],
  ['fell','fall'],['fallen','fall'],['fled','flee'],['flew','fly'],['flown','fly'],['forgot','forget'],['forgotten','forget'],['found','find'],['fought','fight'],['gave','give']
]);
const irregularPlurals = new Map([
  ['children','child'],['brethren','brother'],['men','man'],['women','woman'],['feet','foot'],['teeth','tooth'],['geese','goose'],['mice','mouse'],['lice','louse'],['oxen','ox'],['kine','cow']
]);
export function dictionaryFallbackCandidates(word){
  const candidates=[],seen=new Set([word]);
  const add=value=>{if(value&&value!==word&&!seen.has(value)){seen.add(value);candidates.push(value);}};
  if(archaicForms.has(word))add(archaicForms.get(word));
  if(irregularPlurals.has(word))add(irregularPlurals.get(word));
  const rules=[
    [/eth$/,''],[/eth$/,'e'],[/est$/,''],[/est$/,'e'],[/iest$/,'y'],[/ier$/,'y'],[/ies$/,'y'],[/ves$/,'f'],[/ves$/,'fe'],[/oes$/,'o'],[/ches$/,'ch'],[/shes$/,'sh'],[/xes$/,'x'],[/zes$/,'z'],[/sses$/,'ss'],[/s$/,''],
    [/ied$/,'y'],[/ed$/,''],[/ed$/,'e'],[/ing$/,''],[/ing$/,'e'],[/ying$/,'ie'],[/er$/,''],[/er$/,'e'],[/ly$/,''],[/ness$/,''],[/less$/,''],[/ful$/,''],[/ment$/,''],[/ments$/,''],[/ation$/,'e'],[/ations$/,'e'],[/tion$/,'t'],[/tions$/,'t'],[/al$/,''],[/ally$/,''],[/able$/,''],[/ible$/,''],[/ous$/,''],[/ious$/,''],[/ive$/,''],[/ively$/,''],[/en$/,''],[/th$/,''],[/st$/,''],[/’s$/,''],[/'s$/,''],[/-$/,''],[/^un/,''],[/^re/,''],[/^mis/,''],[/^dis/,''],[/^over/,''],[/^under/,'']
  ];
  for(const [pattern,replacement] of rules){if(pattern.test(word)){const base=word.replace(pattern,replacement);add(base);if(['ed','ing','est','er','eth'].some(suffix=>word.endsWith(suffix))&&base&&!/[aeiou]e$/.test(base))add(base+'e');}}
  const doubled=word.match(/^(.*)([b-df-hj-np-tv-z])\2(?:ed|ing|er|est)?$/);
  if(doubled)add(doubled[1]+doubled[2]);
  return candidates.slice(0,100);
}
