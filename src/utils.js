// Fisher-Yates — returns a new shuffled array, never mutates the input.
export function shuffle(items) {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Pick up to `count` items from `pool`, skipping anything matching `exclude`.
export function pickDistractors(pool, exclude, count) {
  const candidates = shuffle(pool.filter((item) => item !== exclude));
  return candidates.slice(0, count);
}
