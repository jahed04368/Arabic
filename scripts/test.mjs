// Run with: npm test
// Checks the lesson data is well-formed, that the quiz asks every word exactly
// once, and that saved progress survives (and degrades gracefully).

const BASE = new URL('../src/', import.meta.url).href;

// Minimal localStorage stand-in so storage.js can be exercised in Node.
const store = new Map();
globalThis.window = {
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  },
};
// Mirror the real Storage API: .length and .key(i)
globalThis.window.localStorage.key = (i) => [...store.keys()][i] ?? null;
Object.defineProperty(globalThis.window.localStorage, 'length', {
  get: () => store.size,
  configurable: true,
});

const { buildDeck } = await import(BASE + 'quiz.js');
const { vocabFor, lessons } = await import(BASE + 'data/index.js');
const storage = await import(BASE + 'storage.js');

let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures++;
};

// ---- lesson data is well-formed ----
for (const l of lessons) {
  const words = l.vocab;
  const dupes = words.map((w) => w.ar).filter((a, i, arr) => arr.indexOf(a) !== i);
  check(`${l.title}: no duplicate words`, dupes.length === 0, dupes.join(', '));
  check(`${l.title}: every word has all three fields`,
    words.every((w) => w.ar && w.tr && w.en));
  const badPoints = l.rules.flatMap((r) =>
    r.points.filter((p) => ['sub', 'list', 'ar', 'text'].filter((k) => p[k]).length !== 1)
  );
  check(`${l.title}: every note point has exactly one shape`, badPoints.length === 0,
    JSON.stringify(badPoints).slice(0, 120));
  check(`${l.title}: has a rules summary`,
    Array.isArray(l.summary) && l.summary.length > 0);
  const badSummary = (l.summary || []).filter(
    (g) => !g.title || !Array.isArray(g.lines) || g.lines.length === 0
  );
  check(`${l.title}: every summary group has a title and lines`, badSummary.length === 0);
  const badSummaryLines = (l.summary || []).flatMap((g) =>
    g.lines.filter((ln) => (ln.text ? ln.ar || ln.en : !(ln.ar && ln.en)))
  );
  check(`${l.title}: every summary line is a rule or an Arabic/English pair`,
    badSummaryLines.length === 0, JSON.stringify(badSummaryLines).slice(0, 120));
  const summaryCovers = l.summary.length >= 1 && l.rules.length >= 1;
  check(`${l.title}: summary covers the lesson's rules`, summaryCovers,
    `${l.summary.length} summary groups for ${l.rules.length} rules`);
  const badItems = l.rules.flatMap((r) =>
    r.points.filter((p) => p.list).flatMap((p) => p.list.filter((i) => !i.ar || !i.tr || !i.en))
  );
  check(`${l.title}: every example is complete`, badItems.length === 0);
}
{
  const combined = vocabFor(lessons);
  const raw = lessons.reduce((n, l) => n + l.vocab.length, 0);
  check('combined pool has no duplicates across lessons',
    combined.length === new Set(combined.map((w) => w.ar)).size,
    `${combined.length} unique of ${raw} listed`);
  const ens = combined.map((w) => w.en.toLowerCase());
  const sameEn = ens.filter((e, i) => ens.indexOf(e) !== i);
  check('no two words share an English meaning', sameEn.length === 0, sameEn.join(', '));
}

// ---- deck invariants, over many shuffles ----
const pool = vocabFor(lessons);
for (const mode of ['ar-en', 'en-ar', 'mixed']) {
  let allOnce = true, answerPresent = true, uniqueOpts = true, fullOpts = true, orderVaried = false;
  let firstWord = null;
  for (let run = 0; run < 200; run++) {
    const deck = buildDeck(pool, mode);
    if (deck.length !== pool.length) allOnce = false;
    const asked = deck.map((q) => q.word.ar);
    if (new Set(asked).size !== pool.length) allOnce = false;
    if (firstWord === null) firstWord = asked[0];
    else if (asked[0] !== firstWord) orderVaried = true;
    for (const q of deck) {
      if (!q.options.includes(q.answer)) answerPresent = false;
      if (new Set(q.options).size !== q.options.length) uniqueOpts = false;
      if (q.options.length !== 4) fullOpts = false;
    }
  }
  check(`[${mode}] every word asked exactly once`, allOnce);
  check(`[${mode}] correct answer always among the options`, answerPresent);
  check(`[${mode}] no repeated options`, uniqueOpts);
  check(`[${mode}] always 4 options`, fullOpts);
  check(`[${mode}] order is actually randomised`, orderVaried);
}

// ---- short retry round still gets 4 options ----
const three = pool.slice(0, 3);
const retry = buildDeck(three, 'ar-en', pool);
check('retry round asks only the missed words', retry.length === 3 && new Set(retry.map(q=>q.word.ar)).size === 3);
check('retry round still offers 4 options', retry.every((q) => q.options.length === 4));

// ---- storage ----
storage.save('mode', 'mixed');
check('save/load round-trip', storage.load('mode', 'ar-en') === 'mixed');
check('load returns fallback for missing key', storage.load('nope', 'fallback') === 'fallback');

storage.recordAnswer({ ar: 'بَابٌ' }, true);
storage.recordAnswer({ ar: 'بَابٌ' }, true);
storage.recordAnswer({ ar: 'بَابٌ' }, false);
const st = storage.loadWordStats();
check('per-word stats accumulate', st['بَابٌ'].right === 2 && st['بَابٌ'].wrong === 1, JSON.stringify(st['بَابٌ']));

const session = { deck: buildDeck(pool.slice(0, 5), 'ar-en', pool), index: 2, score: 1, missed: [pool[0]] };
storage.save('session:lesson-1', session);
const restored = storage.load('session:lesson-1', null);
check('an unfinished test survives a reload', restored && restored.index === 2 && restored.deck.length === 5 && restored.missed[0].ar === pool[0].ar);

store.set('unrelated-app-key', 'keep me');
storage.clearAll();
check('reset clears app keys only', storage.load('mode', null) === null && store.get('unrelated-app-key') === 'keep me');

// ---- storage unavailable (private browsing) ----
globalThis.window.localStorage = {
  get length() { throw new Error('blocked'); },
  key() { throw new Error('blocked'); },
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('blocked'); },
  removeItem() { throw new Error('blocked'); },
};
let survived = true;
try { storage.save('mode', 'x'); storage.load('mode', 'ar-en'); storage.recordAnswer({ar:'x'}, true); storage.clearAll(); }
catch { survived = false; }
check('app survives blocked localStorage', survived);

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
