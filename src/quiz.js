// Pure quiz logic — no UI imports, so it can be tested on its own.
import { shuffle, pickDistractors } from './utils.js';

export const OPTION_COUNT = 4;

export function buildQuestion(word, pool, mode) {
  const direction =
    mode === 'mixed' ? (Math.random() < 0.5 ? 'ar-en' : 'en-ar') : mode;
  const answerKey = direction === 'ar-en' ? 'en' : 'ar';
  const promptKey = direction === 'ar-en' ? 'ar' : 'en';

  const answer = word[answerKey];
  const answerPool = [...new Set(pool.map((w) => w[answerKey]))];
  const options = shuffle([
    answer,
    ...pickDistractors(answerPool, answer, OPTION_COUNT - 1),
  ]);

  return { word, direction, prompt: word[promptKey], answerKey, answer, options };
}

// Every word in `deckPool`, in random order, exactly once.
// Wrong answers are drawn from `distractorPool` so a short retry round
// (e.g. only the missed words) still offers a full set of choices.
export function buildDeck(deckPool, mode, distractorPool = deckPool) {
  return shuffle(deckPool).map((word) => buildQuestion(word, distractorPool, mode));
}
