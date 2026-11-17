const collectionButtons = [...document.querySelectorAll('[data-collection]')];
const taoView = document.querySelector('#tao-view');
const bibleViews = [document.querySelector('.browse'), document.querySelector('.reading'), document.querySelector('#book-directory')].filter(Boolean);
const chapterSelect = document.querySelector('#tao-chapter-select');
const topicSelect = document.querySelector('#tao-topic-select');
const verseSelect = document.querySelector('#tao-verse-select');
const translationSelect = document.querySelector('#tao-translation-select');
const verseList = document.querySelector('#tao-verse-list');
const locationLabel = document.querySelector('#tao-location');
const contextTitle = document.querySelector('#tao-context-title');
const chapterDescription = document.querySelector('#tao-chapter-description');
const versePosition = document.querySelector('#tao-verse-position');
const previousVerse = document.querySelector('#tao-previous');
const nextVerse = document.querySelector('#tao-next');
const selectionTools = document.querySelector('#tao-selection-tools');
const selectionCount = document.querySelector('#tao-selection-count');
const readerStatus = document.querySelector('#tao-reader-status');
const closerRead = document.querySelector('#tao-closer-read');
const fullChapterDialog = document.querySelector('#tao-full-chapter');
const fullChapterComparison = document.querySelector('#tao-full-chapter-comparison');
const dialogTitle = document.querySelector('#tao-dialog-title');
const dialogVerses = document.querySelector('#tao-dialog-verses');
const scrollPane = document.querySelector('#tao-scroll-reader-pane');
const scrollToggle = document.querySelector('#tao-scroll-mode-toggle');
const TAO_STORAGE_KEY = 'still-waters-tao-favorites-v1';
const TAO_TRANSLATION_KEY = 'still-waters-tao-translation-v1';
const chapterInfo = [
['The Way and the Name','The nameless Tao gives rise to the world; desire shapes what we notice.'],
['The Harmony of Opposites','Beauty and goodness are understood through their contrasts; the sage acts without possession.'],
['Leading Without Forcing','A sage governs by reducing rivalry and allowing life to find its own order.'],
['The Unfathomable Source','The Tao is an inexhaustible origin, older than every named power.'],
['The Space Between Heaven and Earth','Impartial nature is like a bellows: empty, inexhaustible, and generous in motion.'],
['The Valley Spirit','The mysterious source remains present and never runs dry.'],
['The Way of Selfless Endurance','Heaven and earth endure because they do not live only for themselves.'],
['The Goodness of Water','Water benefits all things, seeks low places, and does not contend.'],
['Knowing When to Stop','Excess cannot be kept; finishing and letting go is the natural way.'],
['Returning to the One','The deepest virtue gives life without possessing and leads without control.'],
['The Usefulness of Emptiness','A wheel, vessel, and room are useful because of the space within them.'],
['Beyond the Senses','The sage chooses inner substance over distraction and display.'],
['Favor, Fear, and the Self','Favor and disgrace unsettle us when our sense of self is held too tightly.'],
['The Source Beyond Sight','The Tao cannot be grasped by the senses, yet its presence is never lost.'],
['The Signs of the Sage','Those who follow the Tao are subtle, patient, and hard to define.'],
['Returning to the Root','All things flourish and return; stillness reveals their enduring source.'],
['Quiet Leadership','The finest ruler is trusted because people feel the work is their own.'],
['When the Tao Is Lost','When natural harmony fades, moral slogans and institutions multiply.'],
['Simplicity Before Cleverness','Let go of artifice and return to what is plain, sufficient, and true.'],
['Different from the Crowd','The sage stays open and nourished by the great mother rather than appearances.'],
['The Great Image','The Tao is elusive and vast, yet it nourishes every being.'],
['Yielding and Becoming Whole','The bent, empty, and worn can be renewed through yielding.'],
['The Wind and the Storm','What is natural does not last by force or excess.'],
['Standing Without Display','Those who stand on tiptoe do not stand firm; the Tao needs no display.'],
['The Formless Beginning','The great pattern precedes heaven and earth and remains beyond its names.'],
['Keeping to the Root','Stillness and care let a traveler move without losing the source.'],
['The Skill of Not Leaving Traces','True skill is quiet, inclusive, and wastes nothing.'],
['Knowing the Feminine','Strength stays rooted in receptivity, humility, and the valley.'],
['The World Cannot Be Possessed','The world is a sacred vessel; forcing and grasping disturb its nature.'],
['The Way of Peace','Violence leaves harm behind; the wise do not celebrate force.'],
['The Instrument of the Tao','Weapons are ill omens; the wise use them only when there is no other way.'],
['The Tao Within the World','The Tao is plain and small, yet nothing can stand outside its care.'],
['Knowing Yourself','Knowing others is insight; knowing yourself is true wisdom and strength.'],
['The Tao Does Not Abandon','The Tao gives and sustains without exhausting itself or seeking recognition.'],
['The Great Image','Hold to the great image and the world comes into harmony.'],
['The Subtle Perception of Change','Expansion and decline follow one another; the soft overcomes the hard.'],
['The Tao Does Not Strive','When people return to the Tao, life is transformed without command.'],
['Virtue Without Force','The highest virtue acts naturally and makes no claim on its work.'],
['Returning to Simplicity','The movement of the Tao is return; its strength is found in softness.'],
['The Paradox of the Tao','The Tao appears empty, ordinary, and even contrary to worldly wisdom.'],
['The Way of the Ancient Ones','Those who followed the Tao were subtle, watchful, and hard to define.'],
['The Tao Gives Birth to the Many','The Tao gives rise to unity, distinction, and the many forms of life.'],
['The Softest Thing','The soft and formless can move through what seems impenetrable.'],
['The Value of Non-Contending','The sage does not compete, so no one can truly compete with them.'],
['Contentment and Sufficiency','Knowing what is enough brings freedom and lasting abundance.'],
['When the Tao Prevails','When the Tao guides a country, people live without preparing for war.'],
['Quiet Knowing','The world can be understood without restless travel or display.'],
['The Way of Decrease','Learning accumulates; practicing the Tao lets go of what is unnecessary.'],
['The Heart of the Sage','The sage meets all people with an open heart and does not abandon them.'],
['Life and Death','Life and death belong to a larger movement that cannot be controlled.'],
['The Tao Gives Life','The Tao brings forth, nourishes, and sustains without claiming ownership.'],
['The Origin and the Mother','Keep in touch with the source and the many forms of life can be understood.'],
['The Danger of Straying','A little departure from the Tao can lead far from the natural path.'],
['The Virtue of Cultivation','Rooted virtue can be cultivated in oneself, family, community, and world.'],
['The Virtue of the Infant','A life in harmony with the Tao is supple, vital, and untroubled by display.'],
['The Mystery of Unity','Close the senses and soften the edges; become one with the dust of the world.'],
['Governing with Restraint','The more force and prohibition are used, the more disorder grows.'],
['When Fortune Turns','Misfortune and fortune transform into one another; do not rush to judge.'],
['The Roots of Peace','Conserving strength and living simply allow a long and steady life.'],
['Governing a Great State','Lead a large country as carefully as one would cook a small fish.'],
['The Great State Yields','A great state can lead by placing itself below the people and smaller states.'],
['The Tao as Refuge','The Tao is a refuge for all beings and is not diminished by being shared.'],
['Acting Without Strain','Approach even difficulty gently, before it grows into a burden.'],
['Care Before Trouble','Tend to things while they are small; great tasks begin in simple steps.'],
['The Way of the Ancient Rulers','A people are best guided toward simplicity, steadiness, and natural understanding.'],
['The River and the Sea','The rivers and sea lead by staying below the streams.'],
['The Three Treasures','Compassion, simplicity, and humility provide lasting strength.'],
['The Virtue of Not Contending','The best warrior is not violent; the best victor does not struggle for glory.'],
['Proceed with Care','Treat conflict with gravity and caution, never as a game.'],
['Words That Are Hard to Know','The Tao is easy to understand, yet people often miss it in practice.'],
['Knowing What You Do Not Know','Recognizing what is unknown is a form of wisdom.'],
['Do Not Oppress the People','When people no longer fear their rulers, rulers have gone too far.'],
['The Way of Heaven','Heaven’s way does not contend, yet it brings things into their proper balance.'],
['Life and Death Are Great Matters','Do not make light of life or death; the way of life is stronger than force.'],
['The Burden of Bad Government','People go hungry when rulers take too much from them.'],
['The Hard and the Soft','The living are supple; rigidity belongs to what has died.'],
['The Gentle Bow','Heaven lowers what is high and raises what is low, restoring balance.'],
['The Truth of Water','Nothing is softer than water, yet it can wear down what is hard.'],
['Making Peace After Conflict','A settlement may leave resentment; the wise keep their part of the responsibility.'],
['The Small Country','A small, contented community has little need to seek distant ambitions.'],
['The Lasting Way','True words may not be polished; the Tao gives without running out.']
];
const taoTopics = [
  {id:'stillness',label:'Stillness and quiet',chapters:[4,11,16,20,26,36,37,48,56,63]},
  {id:'simplicity',label:'Simplicity',chapters:[9,15,19,28,32,37,46,57,63,80]},
  {id:'nonaction',label:'Non-action',chapters:[2,3,10,37,38,43,48,63]},
  {id:'water',label:'Water and yielding',chapters:[8,22,36,43,66,78]},
  {id:'balance',label:'Balance and opposites',chapters:[2,5,9,22,28,36,39,42,45,58,77,78]},
  {id:'leadership',label:'Leadership',chapters:[3,7,17,26,28,37,57,60,61,65,66,67,68]},
  {id:'governing',label:'Governing wisely',chapters:[3,17,57,60,61,65]},
  {id:'humility',label:'Humility',chapters:[7,8,9,22,28,34,44,66,67]},
  {id:'desire',label:'Desire and contentment',chapters:[1,3,12,19,37,46,57,64,75,80]},
  {id:'nature',label:'Nature and its cycles',chapters:[16,23,25,40,42,51,52,55,76,77,78]},
  {id:'origin',label:'The source of the Tao',chapters:[1,4,6,14,21,25,32,42,51,52,62]},
  {id:'mystery',label:'Mystery and the unseen',chapters:[1,4,6,14,15,21,41,56,70]},
  {id:'names',label:'Names and words',chapters:[1,32,56,70,81]},
  {id:'silence',label:'Silence and speech',chapters:[5,23,56,70,81]},
  {id:'letting-go',label:'Letting go',chapters:[9,16,20,22,38,48,64]},
  {id:'compassion',label:'Compassion',chapters:[5,27,49,67]},
  {id:'courage',label:'Courage',chapters:[67,68,69,73]},
  {id:'fear',label:'Fear and security',chapters:[13,16,20,72,74]},
  {id:'conflict',label:'Conflict and non-contention',chapters:[30,31,44,68,69,79]},
  {id:'war',label:'War and force',chapters:[30,31,46,69,74,80]},
  {id:'serving',label:'Leading by serving',chapters:[7,17,22,66,67,68]},
  {id:'self-knowledge',label:'Knowing yourself',chapters:[13,33,44,47,49,71]},
  {id:'wisdom',label:'Wisdom and understanding',chapters:[15,16,27,33,41,47,48,70,71]},
  {id:'patience',label:'Patience',chapters:[15,23,26,40,64]},
  {id:'plain-life',label:'A simple life',chapters:[9,12,15,19,46,63,80]},
  {id:'excess',label:'Excess and enough',chapters:[9,12,22,24,45,46,58,77]},
  {id:'community',label:'Community and trust',chapters:[17,18,49,54,57,61,80]},
  {id:'care',label:'Care for all beings',chapters:[5,8,27,34,49,51,62]},
  {id:'possessions',label:'Possession and generosity',chapters:[2,10,34,51,62]},
  {id:'virtue',label:'Virtue',chapters:[10,21,38,51,54,55,65]},
  {id:'status',label:'Humility and status',chapters:[13,22,24,28,34,66]},
  {id:'root',label:'Returning to the root',chapters:[16,28,32,40,52,64]},
  {id:'life-death',label:'Life and death',chapters:[50,51,52,55,74,76]},
  {id:'resilience',label:'Resilience and softness',chapters:[8,22,36,43,55,76,78]},
  {id:'rulers',label:'Rulers and responsibility',chapters:[17,57,60,61,65,66]},
  {id:'harmony',label:'Living in harmony',chapters:[8,16,23,25,28,37,51,63]},
  {id:'wealth',label:'Wealth and sufficiency',chapters:[3,9,44,46,67,75,80]},
  {id:'consequences',label:'Action and consequence',chapters:[3,9,24,30,36,57,64,69]},
  {id:'teaching',label:'Teaching without words',chapters:[2,43,56,63,68]},
  {id:'moderation',label:'Moderation',chapters:[5,9,42,45,58,77]},
  {id:'low-place',label:'Choosing the low place',chapters:[8,22,28,61,66]},
  {id:'feminine',label:'The receptive and feminine',chapters:[6,10,28,52]},
  {id:'society',label:'Society and the common good',chapters:[17,18,57,60,61,80]},
  {id:'natural-leadership',label:'Natural leadership',chapters:[17,26,37,66,68]},
  {id:'nonviolence',label:'Avoiding force',chapters:[3,29,30,31,37,57,63]},
  {id:'honesty',label:'Honest words',chapters:[70,81]},
  {id:'difficult',label:'The difficult and the easy',chapters:[2,63,64]},
  {id:'enough',label:'Knowing what is enough',chapters:[9,33,44,46,67,80]},
  {id:'sage',label:'The way of the sage',chapters:[2,3,7,15,20,22,27,49,64,67,68]},
  {id:'everyday',label:'The Tao in everyday life',chapters:[8,10,19,32,37,51,63,81]}
];
let selectedTopic = 'all';
let versions = [];
let chapter = 1;
let verse = 1;
let selectedTranslation = 'mitchelldefault';
let selectionMode = false;
let selectedVerses = new Set();
let scrollMode = false;
let favorites = {};
try { favorites = JSON.parse(localStorage.getItem(TAO_STORAGE_KEY) || '{}') || {}; } catch {}

function setCollection(collection) {
  const tao = collection === 'tao';
  taoView.hidden = !tao;
  bibleViews.forEach(view => { view.hidden = tao; });
  collectionButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.collection === collection)));
  document.querySelector('.shell')?.classList.toggle('tao-active', tao);
  const downloadAll = document.querySelector('#download-bible-zip');
  const downloadSelected = document.querySelector('#open-content-downloads');
  const inquiry = document.querySelector('#open-experience-menu');
  const backup = document.querySelector('#backup-menu-toggle');
  const saveAction = document.querySelector('#download-json');
  const loadAction = document.querySelector('#import-json-button');
  if (downloadAll) { downloadAll.title = tao ? 'Download all Tao Te Ching versions' : 'Download all'; downloadAll.setAttribute('aria-label', downloadAll.title); }
  if (downloadSelected) { downloadSelected.title = tao ? 'Download selected Tao chapters' : 'Download selected content'; downloadSelected.setAttribute('aria-label', downloadSelected.title); }
  if (inquiry) { inquiry.title = tao ? 'Tao inquiry' : 'Inquiry'; inquiry.setAttribute('aria-label', inquiry.title); }
  if (backup) { backup.title = 'Save/Load App'; backup.setAttribute('aria-label', 'Save/Load App'); }
  if (saveAction) saveAction.textContent = tao ? 'Save Tao app' : 'Save app';
  if (loadAction) loadAction.textContent = tao ? 'Load Tao app' : 'Load app';
}
function versionById(id) { return versions.find(version => version.id === id) || versions[0]; }
function currentChapterUnits() { return versionById(selectedTranslation)?.chapters[chapter - 1] || []; }
function favoriteKey(chapterNumber, verseNumber) { return chapterNumber + '|' + verseNumber; }
function savedEntry(key) {
  const value = favorites[key];
  return value && typeof value === 'object' ? value : value ? { favorite: true } : {};
}
function isFavorite(key) { return Boolean(savedEntry(key).favorite); }
function updateSavedEntry(key, patch) {
  const entry = { ...savedEntry(key), ...patch };
  for (const field of Object.keys(entry)) if (entry[field] === false || entry[field] === '' || entry[field] == null) delete entry[field];
  if (Object.keys(entry).length) favorites[key] = entry; else delete favorites[key];
}
function saveFavorites() {
  try { localStorage.setItem(TAO_STORAGE_KEY, JSON.stringify(favorites)); } catch {}
}
function maxVerseCount(chapterNumber) {
  return Math.max(1, ...versions.map(version => version.chapters[chapterNumber - 1]?.length || 0));
}
function buildTopicOptions() {
  topicSelect.replaceChildren();
  const all = document.createElement('option');
  all.value = 'all'; all.textContent = 'All topics'; topicSelect.append(all);
  taoTopics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic.id; option.textContent = topic.label; topicSelect.append(option);
  });
  topicSelect.value = selectedTopic;
}
function buildChapterOptions() {
  chapterSelect.replaceChildren();
  const topic = taoTopics.find(item => item.id === selectedTopic);
  const numbers = topic ? topic.chapters : Array.from({length:81}, (_, index) => index + 1);
  numbers.forEach(number => {
    const option = document.createElement('option');
    option.value = String(number);
    option.textContent = 'Chapter ' + number + ' · ' + chapterInfo[number - 1][0];
    chapterSelect.append(option);
  });
  chapterSelect.value = String(chapter);
}
function setTopic(topicId) {
  selectedTopic = topicId;
  topicSelect.value = selectedTopic;
  buildChapterOptions();
  const topic = taoTopics.find(item => item.id === selectedTopic);
  if (topic && !topic.chapters.includes(chapter)) setChapter(topic.chapters[0]);
  else renderChapter();
}
function buildChapterDirectory() {
  const nav = document.querySelector('#tao-chapter-links');
  nav.replaceChildren();
  chapterInfo.forEach(([title, description], index) => {
    const number = index + 1;
    const link = document.createElement('a');
    link.className = 'tao-chapter-link';
    link.href = '#tao-chapter-' + number;
    const numberLabel = document.createElement('span');
    numberLabel.className = 'tao-link-number';
    numberLabel.textContent = String(number).padStart(2, '0');
    const copy = document.createElement('span');
    copy.className = 'tao-link-copy';
    const heading = document.createElement('strong');
    heading.textContent = title;
    const summary = document.createElement('small');
    summary.textContent = description;
    copy.append(heading, summary);
    link.append(numberLabel, copy);
    link.addEventListener('click', event => {
      event.preventDefault();
      selectedTopic = 'all';
      topicSelect.value = selectedTopic;
      buildChapterOptions();
      setChapter(number);
      document.querySelector('.tao-directory').open = false;
      document.querySelector('.tao-reading').scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#tao-chapter-' + number);
    });
    nav.append(link);
  });
}
function updateVerseOptions() {
  const units = currentChapterUnits();
  verse = Math.min(verse, Math.max(1, units.length));
  verseSelect.replaceChildren();
  units.forEach((_, index) => {
    const option = document.createElement('option');
    option.value = String(index + 1);
    option.textContent = 'Verse ' + (index + 1);
    verseSelect.append(option);
  });
  verseSelect.value = String(verse);
}
function updateCurrentVerseControls(scroll = false) {
  versePosition.textContent = 'Verse ' + verse;
  previousVerse.disabled = verse <= 1;
  nextVerse.disabled = verse >= currentChapterUnits().length;
  document.querySelectorAll('.tao-verse-open').forEach(button => {
    const row = button.closest('.tao-verse-row');
    row.classList.toggle('is-current', Number(row.dataset.verse) === verse);
  });
  if (scroll) document.querySelector('.tao-verse-row[data-verse="' + verse + '"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function updateSelectionTools() {
  const count = selectedVerses.size;
  selectionCount.textContent = count + ' selected';
  document.querySelector('#tao-favorite-selected').disabled = !count;
  document.querySelector('#tao-copy-selected').disabled = !count;
  document.querySelector('#tao-clear-selected').disabled = !count;
}
function setSelectionMode(active) {
  selectionMode = active;
  const button = document.querySelector('#tao-select-verses');
  button.textContent = active ? '☑' : '☐';
  button.setAttribute('aria-pressed', String(active));
  button.title = active ? 'Finish selecting verses' : 'Select verses';
  button.setAttribute('aria-label', button.title);
  selectionTools.hidden = !active;
  verseList.classList.toggle('selecting-verses', active);
  renderChapterVerses();
  updateSelectionTools();
}
function renderChapterVerses() {
  const units = currentChapterUnits();
  verseList.replaceChildren();
  units.forEach((text, index) => {
    const number = index + 1;
    const key = favoriteKey(chapter, number);
    const row = document.createElement('article');
    row.className = 'tao-verse-row' + (isFavorite(key) ? ' is-favorite' : '') + (savedEntry(key).highlight ? ' is-highlighted' : '') + (savedEntry(key).read ? ' is-read' : '');
    row.dataset.verse = String(number);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'tao-verse-checkbox';
    checkbox.checked = selectedVerses.has(key);
    checkbox.setAttribute('aria-label', 'Select verse ' + number);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selectedVerses.add(key); else selectedVerses.delete(key);
      updateSelectionTools();
    });
    const open = document.createElement('button');
    open.type = 'button';
    open.className = 'tao-verse-open';
    open.setAttribute('aria-label', 'Closer read, chapter ' + chapter + ', verse ' + number);
    const verseNumber = document.createElement('span');
    verseNumber.className = 'tao-verse-number';
    verseNumber.textContent = String(number);
    const verseText = document.createElement('span');
    verseText.className = 'tao-verse-copy';
    verseText.textContent = text;
    open.append(verseNumber, verseText);
    open.addEventListener('click', () => openCloserRead(number));
    row.append(checkbox, open);
    verseList.append(row);
  });
  updateCurrentVerseControls();
}
function renderChapter() {
  const [title, description] = chapterInfo[chapter - 1];
  chapterSelect.value = String(chapter);
  locationLabel.textContent = 'Chapter ' + chapter;
  contextTitle.textContent = title;
  contextTitle.title = 'Open full chapter comparison';
  contextTitle.setAttribute('aria-label', 'Open full chapter comparison for Chapter ' + chapter + ': ' + title);
  chapterDescription.textContent = description;
  updateVerseOptions();
  renderChapterVerses();
  const units = currentChapterUnits();
  const allFavorite = units.length > 0 && units.every((_, index) => isFavorite(favoriteKey(chapter, index + 1)));
  const chapterButton = document.querySelector('#tao-favorite-chapter');
  chapterButton.textContent = allFavorite ? '★' : '☆';
  chapterButton.title = allFavorite ? 'Remove chapter favorites' : 'Favorite chapter';
  chapterButton.setAttribute('aria-label', chapterButton.title);
  chapterButton.setAttribute('aria-pressed', String(allFavorite));
  document.querySelector('#tao-previous-chapter').disabled = chapter <= 1;
  document.querySelector('#tao-next-chapter').disabled = chapter >= 81;
}
function setChapter(nextChapter, scroll = false) {
  const targetChapter = Math.max(1, Math.min(81, nextChapter));
  const topic = taoTopics.find(item => item.id === selectedTopic);
  if (topic && !topic.chapters.includes(targetChapter)) {
    selectedTopic = 'all';
    topicSelect.value = selectedTopic;
    buildChapterOptions();
  }
  chapter = targetChapter;
  verse = 1;
  selectedVerses.clear();
  if (selectionMode) updateSelectionTools();
  renderChapter();
  if (scroll) document.querySelector('.tao-reading').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function setVerse(nextVerse, scroll = true) {
  const count = currentChapterUnits().length;
  verse = Math.max(1, Math.min(count, nextVerse));
  verseSelect.value = String(verse);
  updateCurrentVerseControls(scroll);
}
function toggleFavorite(chapterNumber, verseNumber) {
  const key = favoriteKey(chapterNumber, verseNumber);
  updateSavedEntry(key, { favorite: !isFavorite(key) });
  saveFavorites();
  renderChapter();
  if (closerRead.open && chapterNumber === chapter) renderCloserRead();
}
function toggleChapterFavorite() {
  const units = currentChapterUnits();
  const favorite = !(units.length && units.every((_, index) => isFavorite(favoriteKey(chapter, index + 1))));
  units.forEach((_, index) => {
    const key = favoriteKey(chapter, index + 1);
    updateSavedEntry(key, { favorite });
  });
  saveFavorites();
  renderChapter();
}
function openCloserRead(number) {
  verse = number;
  scrollMode = false;
  renderScrollPane();
  document.querySelector('#tao-all-translations').open = false;
  verseSelect.value = String(verse);
  updateCurrentVerseControls(false);
  renderCloserRead();
  if (!closerRead.open) closerRead.showModal();
}
function renderScrollPane() {
  scrollToggle.setAttribute('aria-pressed', String(scrollMode));
  scrollToggle.textContent = scrollMode ? 'Close scrolling reading' : 'Scroll rest of this book';
  scrollPane.hidden = !scrollMode;
  if (!scrollMode) return;
  scrollPane.replaceChildren();
  const selectedVersion = versionById(selectedTranslation);
  for (let chapterNumber = chapter; chapterNumber <= 81; chapterNumber++) {
    const heading = document.createElement('h3');
    heading.className = 'scroll-chapter-heading';
    heading.textContent = 'Chapter ' + chapterNumber + ' · ' + chapterInfo[chapterNumber - 1][0];
    scrollPane.append(heading);
    const units = selectedVersion.chapters[chapterNumber - 1] || [];
    const firstVerse = chapterNumber === chapter ? verse : 1;
    units.slice(firstVerse - 1).forEach((text, offset) => {
      const line = document.createElement('p');
      line.className = 'scroll-verse';
      line.textContent = (firstVerse + offset) + '. ' + text;
      scrollPane.append(line);
    });
  }
}
function openFullChapter() {
  const title = chapterInfo[chapter - 1][0];
  document.querySelector('#tao-full-chapter-title').textContent = 'Chapter ' + chapter + ' · ' + title;
  fullChapterComparison.replaceChildren();
  const ordered = [versionById(selectedTranslation), ...versions.filter(version => version.id !== selectedTranslation)];
  ordered.forEach(version => {
    const card = document.createElement('section');
    card.className = 'translation-version-card tao-full-version' + (version.id === selectedTranslation ? ' is-current-translation' : '');
    const label = document.createElement('h3');
    label.className = 'translation-version-name';
    label.textContent = version.label + (version.id === 'mitchelldefault' ? ' · default' : '');
    card.append(label);
    (version.chapters[chapter - 1] || []).forEach((text, index) => {
      const line = document.createElement('p');
      line.className = 'tao-full-chapter-verse';
      const number = document.createElement('span');
      number.className = 'tao-full-chapter-number';
      number.textContent = String(index + 1);
      const content = document.createElement('span');
      content.textContent = text;
      line.append(number, content);
      card.append(line);
    });
    fullChapterComparison.append(card);
  });
  if (!fullChapterDialog.open) fullChapterDialog.showModal();
}
function renderCloserRead() {
  const title = chapterInfo[chapter - 1][0];
  const selectedVersion = versionById(selectedTranslation);
  const primaryText = currentChapterUnits()[verse - 1] || '';
  const showAll = document.querySelector('#tao-all-translations').open;
  dialogTitle.textContent = 'Tao Te Ching ' + chapter + ':' + verse;
  document.querySelector('#tao-current-label').textContent = selectedVersion.label + (selectedTranslation === 'mitchelldefault' ? ' · default' : '');
  const currentText = document.querySelector('#tao-current-text');
  currentText.textContent = primaryText;
  currentText.classList.toggle('verse-highlight', Boolean(savedEntry(favoriteKey(chapter, verse)).highlight));
  document.querySelector('#tao-dialog-position').textContent = verse + ' of ' + currentChapterUnits().length + ' · ' + title;
  dialogVerses.replaceChildren();
  versions.forEach(version => {
    const text = version.chapters[chapter - 1]?.[verse - 1] || '';
    const article = document.createElement('article');
    article.className = 'translation-version-card';
    const label = document.createElement('p');
    label.className = 'translation-version-name';
    label.textContent = version.label + (version.id === 'mitchelldefault' ? ' · default' : '');
    const passage = document.createElement('p');
    passage.className = 'translation-version-text';
    passage.textContent = text || 'No matching verse group in this edition.';
    article.append(label, passage);
    dialogVerses.append(article);
  });
  document.querySelector('#tao-all-translations').open = showAll;
  const prev = document.querySelector('#tao-dialog-previous');
  const next = document.querySelector('#tao-dialog-next');
  prev.disabled = verse <= 1;
  next.disabled = verse >= currentChapterUnits().length;
  syncCloserTools();
  if (scrollMode) renderScrollPane();
}
function syncCloserTools() {
  const entry = savedEntry(favoriteKey(chapter, verse));
  const favoriteButton = document.querySelector('#tao-dialog-favorite');
  favoriteButton.textContent = entry.favorite ? '★ Favorited' : '☆ Favorite';
  favoriteButton.setAttribute('aria-pressed', String(Boolean(entry.favorite)));
  const highlightButton = document.querySelector('#tao-dialog-highlight');
  highlightButton.textContent = entry.highlight ? 'Remove highlight' : 'Highlight verse';
  highlightButton.setAttribute('aria-pressed', String(Boolean(entry.highlight)));
  document.querySelector('#tao-note').value = entry.note || '';
  document.querySelector('#tao-mark-read').checked = Boolean(entry.read);
  document.querySelector('#tao-note-status').textContent = '';
}
function toggleCurrentHighlight() {
  const key = favoriteKey(chapter, verse);
  updateSavedEntry(key, { highlight: !savedEntry(key).highlight });
  saveFavorites();
  renderChapter();
  renderCloserRead();
}
async function copyCurrentVerse() {
  const text = 'Tao Te Ching ' + chapter + ':' + verse + '\n' + (currentChapterUnits()[verse - 1] || '');
  try { await navigator.clipboard.writeText(text); readerStatus.textContent = 'Copied Chapter ' + chapter + ':' + verse + '.'; }
  catch {
    const field = document.createElement('textarea'); field.value = text; field.setAttribute('readonly', ''); field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select();
    const copied = document.execCommand('copy'); field.remove(); readerStatus.textContent = copied ? 'Copied Chapter ' + chapter + ':' + verse + '.' : 'Could not copy this verse.';
  }
}
async function copySelected() {
  const keys = [...selectedVerses].sort((a, b) => {
    const [ac, av] = a.split('|').map(Number), [bc, bv] = b.split('|').map(Number);
    return ac - bc || av - bv;
  });
  if (!keys.length) return;
  const text = keys.map(key => {
    const [c, v] = key.split('|').map(Number);
    const passage = versionById(selectedTranslation)?.chapters[c - 1]?.[v - 1] || '';
    return 'Tao Te Ching ' + c + ':' + v + '\n' + passage;
  }).join('\n\n');
  try { await navigator.clipboard.writeText(text); readerStatus.textContent = 'Copied ' + keys.length + ' verse' + (keys.length === 1 ? '' : 's') + '.'; }
  catch {
    const field = document.createElement('textarea'); field.value = text; field.setAttribute('readonly', ''); field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select();
    const copied = document.execCommand('copy'); field.remove(); readerStatus.textContent = copied ? 'Copied ' + keys.length + ' verses.' : 'Could not copy the selection.';
  }
}
function clearSelected() { selectedVerses.clear(); renderChapterVerses(); updateSelectionTools(); }

const taoDownloadDialog = document.querySelector('#tao-download-dialog');
const taoDownloadTranslation = document.querySelector('#tao-download-translation');
const taoDownloadList = document.querySelector('#tao-download-chapters');
const taoDownloadSearch = document.querySelector('#tao-chapter-search');
const taoDownloadCount = document.querySelector('#tao-download-count');
const taoDownloadAction = document.querySelector('#tao-download-selected');
const taoDownloadStatus = document.querySelector('#tao-download-status');
const taoInquiryDialog = document.querySelector('#tao-inquiry-dialog');
const taoInquiryForm = document.querySelector('#tao-inquiry-form');
const taoInquiryQuestion = document.querySelector('#tao-inquiry-question');
const taoInquiryResults = document.querySelector('#tao-inquiry-results');
const taoImportFile = document.querySelector('#tao-import-file');
let selectedDownloadChapters = new Set();

function closeBackupMenuForTao() {
  const menu = document.querySelector('#backup-menu');
  const toggle = document.querySelector('#backup-menu-toggle');
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
}
function selectedDownloadRows() {
  const query = taoDownloadSearch.value.trim().toLocaleLowerCase();
  return chapterInfo.map(([title, description], index) => ({number:index + 1,title,description}))
    .filter(item => !query || (item.title + ' ' + item.description + ' ' + item.number).toLocaleLowerCase().includes(query));
}
function renderTaoDownloadList() {
  taoDownloadList.replaceChildren();
  selectedDownloadRows().forEach(item => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = String(item.number);
    checkbox.checked = selectedDownloadChapters.has(item.number);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selectedDownloadChapters.add(item.number);
      else selectedDownloadChapters.delete(item.number);
      syncTaoDownloadCount();
    });
    const copy = document.createElement('span');
    copy.append(document.createTextNode('Chapter ' + item.number + ' · ' + item.title));
    const description = document.createElement('small');
    description.textContent = item.description;
    copy.append(description);
    label.append(checkbox, copy);
    taoDownloadList.append(label);
  });
  syncTaoDownloadCount();
}
function syncTaoDownloadCount() {
  const count = selectedDownloadChapters.size;
  taoDownloadCount.textContent = count + ' chapter' + (count === 1 ? '' : 's') + ' selected';
  taoDownloadAction.disabled = !count;
}
function openTaoDownloadDialog() {
  selectedDownloadChapters = new Set([chapter]);
  taoDownloadSearch.value = '';
  taoDownloadStatus.textContent = '';
  taoDownloadTranslation.replaceChildren();
  versions.forEach(version => {
    const option = document.createElement('option');
    option.value = version.id;
    option.textContent = version.label;
    taoDownloadTranslation.append(option);
  });
  taoDownloadTranslation.value = selectedTranslation;
  renderTaoDownloadList();
  if (!taoDownloadDialog.open) taoDownloadDialog.showModal();
}
function taoEditionText(version, chapters = null) {
  const chosen = chapters || Array.from({length:81}, (_, i) => i + 1);
  const lines = ['Tao Te Ching', 'Translation: ' + version.label, ''];
  chosen.forEach(number => {
    lines.push('Chapter ' + number + ' · ' + chapterInfo[number - 1][0], chapterInfo[number - 1][1]);
    (version.chapters[number - 1] || []).forEach((text, index) => lines.push((index + 1) + '. ' + text));
    lines.push('');
  });
  return lines.join('\n');
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
async function downloadAllTao() {
  const exportButton = document.querySelector('#download-bible-zip');
  exportButton.disabled = true;
  readerStatus.textContent = 'Preparing all translations…';
  try {
    const zipModule = await import('https://esm.sh/jszip@3.10.1?bundle');
    const JSZip = zipModule.default || zipModule.JSZip;
    const zip = new JSZip();
    versions.forEach(version => zip.folder('translations').file(version.id + '.txt', taoEditionText(version)));
    zip.file('README.txt', 'Tao Te Ching · all attached translations\nIncludes 81 chapters in seven English editions.');
    const archive = await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:5}});
    downloadBlob(archive, 'Tao Te Ching - All Translations.zip');
    readerStatus.textContent = 'All seven translations downloaded.';
  } catch (error) {
    console.error('Tao download failed:', error);
    readerStatus.textContent = 'Could not create the download. Please try again.';
  } finally { exportButton.disabled = false; }
}
async function downloadSelectedTao() {
  const chosen = [...selectedDownloadChapters].sort((a,b) => a-b);
  const version = versionById(taoDownloadTranslation.value);
  if (!chosen.length || !version) return;
  taoDownloadAction.disabled = true;
  taoDownloadStatus.textContent = 'Preparing download…';
  try {
    const zipModule = await import('https://esm.sh/jszip@3.10.1?bundle');
    const JSZip = zipModule.default || zipModule.JSZip;
    const zip = new JSZip();
    zip.file(version.id + '-selected-chapters.txt', taoEditionText(version, chosen));
    zip.file('README.txt', version.label + '\nSelected chapters: ' + chosen.join(', '));
    const archive = await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:5}});
    downloadBlob(archive, 'Tao Te Ching - Selected Chapters.zip');
    taoDownloadStatus.textContent = chosen.length + ' chapter' + (chosen.length === 1 ? '' : 's') + ' ready.';
    taoDownloadAction.disabled = false;
  } catch (error) {
    console.error('Tao chapter export failed:', error);
    taoDownloadStatus.textContent = 'Could not create the download. Please try again.';
    syncTaoDownloadCount();
  }
}
function openTaoInquiry() {
  taoInquiryQuestion.value = '';
  taoInquiryResults.replaceChildren();
  if (!taoInquiryDialog.open) taoInquiryDialog.showModal();
  taoInquiryQuestion.focus();
}
function searchTaoInquiry(question) {
  const ignored = new Set(['the','and','for','with','from','that','this','what','when','where','which','who','how','does','can','are','you','your','into','about','why']);
  const terms = [...new Set(question.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) || [])].filter(term => term.length > 2 && !ignored.has(term));
  taoInquiryResults.replaceChildren();
  if (!terms.length) {
    const hint = document.createElement('p'); hint.className = 'tao-inquiry-empty'; hint.textContent = 'Add a subject to find related chapters.'; taoInquiryResults.append(hint); return;
  }
  const version = versionById(selectedTranslation);
  const matches = chapterInfo.map(([title, description], index) => {
    const number = index + 1;
    const text = (version.chapters[index] || []).join(' ');
    const searchable = (title + ' ' + description + ' ' + text).toLocaleLowerCase();
    const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
    const excerpt = (version.chapters[index] || []).find(unit => terms.some(term => unit.toLocaleLowerCase().includes(term))) || description;
    return {number,title,description,score,excerpt};
  }).filter(item => item.score > 0).sort((a,b) => b.score-a.score || a.number-b.number).slice(0,7);
  if (!matches.length) {
    const empty = document.createElement('p'); empty.className = 'tao-inquiry-empty'; empty.textContent = 'No close matches. Try a broader word such as “change” or “stillness”.'; taoInquiryResults.append(empty); return;
  }
  matches.forEach(item => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'tao-inquiry-result';
    const title = document.createElement('strong'); title.textContent = 'Chapter ' + item.number + ' · ' + item.title;
    const excerpt = document.createElement('span'); excerpt.textContent = item.excerpt;
    button.append(title, excerpt);
    button.addEventListener('click', () => { setChapter(item.number, true); taoInquiryDialog.close(); });
    taoInquiryResults.append(button);
  });
}
function exportTaoApp() {
  const backup = {type:'still-waters-tao-app',version:1,translation:selectedTranslation,favorites,exportedAt:new Date().toISOString()};
  downloadBlob(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}),'Tao Te Ching - App Backup.json');
  readerStatus.textContent = 'Tao app settings and saved verses downloaded.';
}
function importTaoAppFile() {
  const file = taoImportFile.files?.[0];
  if (!file) return;
  file.text().then(raw => {
    const data = JSON.parse(raw);
    if (data.type !== 'still-waters-tao-app' || !data.favorites || typeof data.favorites !== 'object') throw new Error('This is not a Tao app backup.');
    favorites = data.favorites;
    if (versions.some(version => version.id === data.translation)) selectedTranslation = data.translation;
    localStorage.setItem(TAO_STORAGE_KEY, JSON.stringify(favorites));
    localStorage.setItem(TAO_TRANSLATION_KEY, selectedTranslation);
    translationSelect.value = selectedTranslation;
    renderChapter();
    readerStatus.textContent = 'Tao app backup loaded.';
  }).catch(error => { readerStatus.textContent = error.message || 'Could not load that backup.'; });
  taoImportFile.value = '';
}

taoDownloadSearch.addEventListener('input', renderTaoDownloadList);
document.querySelector('#tao-select-visible').addEventListener('click', () => {
  const rows = selectedDownloadRows();
  const allChecked = rows.length > 0 && rows.every(item => selectedDownloadChapters.has(item.number));
  rows.forEach(item => allChecked ? selectedDownloadChapters.delete(item.number) : selectedDownloadChapters.add(item.number));
  renderTaoDownloadList();
});
document.querySelector('#tao-download-selected').addEventListener('click', downloadSelectedTao);
document.querySelector('#tao-download-close').addEventListener('click', () => taoDownloadDialog.close());
taoDownloadDialog.addEventListener('click', event => { if (event.target === taoDownloadDialog) taoDownloadDialog.close(); });
document.querySelector('#tao-inquiry-close').addEventListener('click', () => taoInquiryDialog.close());
taoInquiryDialog.addEventListener('click', event => { if (event.target === taoInquiryDialog) taoInquiryDialog.close(); });
taoInquiryForm.addEventListener('submit', event => { event.preventDefault(); searchTaoInquiry(taoInquiryQuestion.value); });
taoImportFile.addEventListener('change', importTaoAppFile);
document.addEventListener('click', event => {
  if (taoView.hidden) return;
  const target = event.target instanceof Element ? event.target.closest('#download-bible-zip,#open-content-downloads,#open-experience-menu,#download-json,#import-json-button') : null;
  if (!target) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (target.id === 'download-bible-zip') void downloadAllTao();
  else if (target.id === 'open-content-downloads') openTaoDownloadDialog();
  else if (target.id === 'open-experience-menu') openTaoInquiry();
  else if (target.id === 'download-json') { closeBackupMenuForTao(); exportTaoApp(); }
  else if (target.id === 'import-json-button') { closeBackupMenuForTao(); taoImportFile.click(); }
}, true);

collectionButtons.forEach(button => button.addEventListener('click', () => setCollection(button.dataset.collection)));
topicSelect.addEventListener('change', () => setTopic(topicSelect.value));
chapterSelect.addEventListener('change', () => setChapter(Number(chapterSelect.value), true));
verseSelect.addEventListener('change', () => setVerse(Number(verseSelect.value)));
translationSelect.addEventListener('change', () => {
  selectedTranslation = translationSelect.value;
  try { localStorage.setItem(TAO_TRANSLATION_KEY, selectedTranslation); } catch {}
  verse = Math.min(verse, Math.max(1, currentChapterUnits().length));
  renderChapter();
});
document.querySelector('#tao-previous').addEventListener('click', () => setVerse(verse - 1));
document.querySelector('#tao-next').addEventListener('click', () => setVerse(verse + 1));
document.querySelector('#tao-previous-chapter').addEventListener('click', () => setChapter(chapter - 1, true));
document.querySelector('#tao-next-chapter').addEventListener('click', () => setChapter(chapter + 1, true));
document.querySelector('#tao-favorite-chapter').addEventListener('click', toggleChapterFavorite);
document.querySelector('#tao-select-verses').addEventListener('click', () => setSelectionMode(!selectionMode));
document.querySelector('#tao-favorite-selected').addEventListener('click', () => {
  selectedVerses.forEach(key => updateSavedEntry(key, { favorite: true })); saveFavorites(); renderChapter(); clearSelected();
});
document.querySelector('#tao-copy-selected').addEventListener('click', copySelected);
document.querySelector('#tao-clear-selected').addEventListener('click', clearSelected);
document.querySelector('#tao-close-dialog').addEventListener('click', () => closerRead.close());
contextTitle.addEventListener('click', openFullChapter);
contextTitle.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openFullChapter(); } });
document.querySelector('#tao-full-chapter-close').addEventListener('click', () => fullChapterDialog.close());
fullChapterDialog.addEventListener('click', event => { if (event.target === fullChapterDialog) fullChapterDialog.close(); });
scrollToggle.addEventListener('click', () => { scrollMode = !scrollMode; renderScrollPane(); });
document.querySelector('#tao-dialog-favorite').addEventListener('click', () => toggleFavorite(chapter, verse));
document.querySelector('#tao-mark-read').addEventListener('change', event => {
  updateSavedEntry(favoriteKey(chapter, verse), { read: event.target.checked });
  saveFavorites();
  renderChapterVerses();
});
document.querySelector('#tao-dialog-highlight').addEventListener('click', toggleCurrentHighlight);
document.querySelector('#tao-dialog-copy').addEventListener('click', copyCurrentVerse);
document.querySelector('#tao-save-note').addEventListener('click', () => {
  const key = favoriteKey(chapter, verse);
  updateSavedEntry(key, { note: document.querySelector('#tao-note').value.trim() });
  saveFavorites();
  document.querySelector('#tao-note-status').textContent = 'Note saved.';
});
document.querySelector('#tao-dialog-previous').addEventListener('click', () => { setVerse(verse - 1, false); renderCloserRead(); });
document.querySelector('#tao-dialog-next').addEventListener('click', () => { setVerse(verse + 1, false); renderCloserRead(); });
closerRead.addEventListener('click', event => { if (event.target === closerRead) closerRead.close(); });
setCollection('bible');
fetch('./tao-versions.json')
  .then(response => { if (!response.ok) throw new Error('Tao Te Ching texts could not be loaded.'); return response.json(); })
  .then(data => {
    versions = data.versions || [];
    try {
      const stored = localStorage.getItem(TAO_TRANSLATION_KEY);
      if (stored && versions.some(item => item.id === stored)) selectedTranslation = stored;
    } catch {}
    translationSelect.replaceChildren();
    versions.forEach(version => {
      const option = document.createElement('option'); option.value = version.id; option.textContent = version.label; translationSelect.append(option);
    });
    translationSelect.value = selectedTranslation;
    buildTopicOptions();
    buildChapterOptions();
    buildChapterDirectory();
    renderChapter();
  })
  .catch(error => { readerStatus.textContent = 'The Tao Te Ching texts could not be loaded.'; console.error('Tao reader failed:', error?.stack || error?.message || String(error)); });
