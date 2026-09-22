// Small wrapper around localStorage. Every access is guarded: private windows,
// blocked site data and some in-app browsers make these throw or return null,
// and the app has to keep working when that happens.

const PREFIX = 'arabic:';

export function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full — the app still works, it just won't remember.
  }
}

export function remove(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}

export function clearAll() {
  try {
    const ls = window.localStorage;
    // Collect first, then delete: removing while iterating shifts the indices.
    const keys = [];
    for (let i = 0; i < ls.length; i++) {
      const k = ls.key(i);
      if (k && k.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach((k) => ls.removeItem(k));
  } catch {
    /* ignore */
  }
}

// Per-word running totals, keyed by the Arabic spelling:
//   { 'بَابٌ': { right: 3, wrong: 1 } }
export function loadWordStats() {
  const stats = load('wordStats', {});
  return stats && typeof stats === 'object' ? stats : {};
}

export function recordAnswer(word, wasCorrect) {
  const stats = loadWordStats();
  const entry = stats[word.ar] || { right: 0, wrong: 0 };
  if (wasCorrect) entry.right += 1;
  else entry.wrong += 1;
  stats[word.ar] = entry;
  save('wordStats', stats);
  return stats;
}
