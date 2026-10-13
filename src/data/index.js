import lesson1 from './lesson1.js';
import lesson2 from './lesson2.js';
import lesson3 from './lesson3.js';

// Add each new lesson here, newest last.
export const lessons = [lesson1, lesson2, lesson3];

// Words from the given lessons, tagged with their lesson and de-duplicated by
// the Arabic spelling — a word revised in a later lesson is still only asked once.
export function vocabFor(selected) {
  const seen = new Set();
  const out = [];
  for (const lesson of selected) {
    for (const word of lesson.vocab) {
      if (seen.has(word.ar)) continue;
      seen.add(word.ar);
      out.push({ ...word, lesson: lesson.title, lessonId: lesson.id });
    }
  }
  return out;
}

export const allVocab = vocabFor(lessons);
