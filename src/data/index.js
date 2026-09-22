import week1 from './week1';

// Add each new week here, newest last.
export const weeks = [week1];

// Every vocabulary word across every week, tagged with the week it came from.
export const allVocab = weeks.flatMap((w) =>
  w.vocab.map((word) => ({ ...word, week: w.title, weekId: w.id }))
);
