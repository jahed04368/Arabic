# Arabic Intensive Course

A small React Native (via `react-native-web`) site for your weekly Arabic notes,
with a vocabulary test.

## Running it

```bash
npm install     # first time only
npm run dev     # then open http://localhost:5173
```

To publish a static build: `npm run build` — the site lands in `dist/`.

## Adding a new week

1. Copy `src/data/week1.js` to `src/data/week2.js`.
2. Edit the `id`, `title`, `rules` and `vocab` in the new file.
3. Register it in `src/data/index.js`:

```js
import week1 from './week1';
import week2 from './week2';

export const weeks = [week1, week2];
```

That's it — the week picker, the notes page and the test all pick it up
automatically.

### Note format

Each entry in `rules` is one numbered grammar rule:

```js
{
  heading: '1. The Demonstrative Pronoun: هَٰذَا (Hādhā — "This")',
  points: [
    { text: 'A plain bullet point.' },
    { ar: 'هَٰذَا بَابٌ', tr: 'Hādhā bāb', en: 'This is a door.' }, // an example box
  ],
}
```

A point with a `text` key renders as a bullet; a point with `ar` / `tr` / `en`
renders as a highlighted example.

Each entry in `vocab` is one word:

```js
{ ar: 'بَابٌ', tr: 'Bāb', en: 'Door' }
```

## The test

- Asks **every** word in the selected scope, exactly once, in random order.
- Three directions: Arabic → English, English → Arabic, or Mixed.
- Four multiple-choice options; wrong answers are drawn from the other words.
- Shows a score, then lists the words you missed so you can retry just those.
