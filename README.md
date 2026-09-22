# Arabic Intensive Course

A small React Native (via `react-native-web`) site for your lesson notes, with a
vocabulary test. It works offline and saves your progress on your device.

## Running it

```bash
npm install     # first time only
npm run dev     # then open http://localhost:5173
npm test        # check the lesson data and quiz logic
npm run build   # static site in dist/
```

## Adding a new lesson

1. Copy `src/data/lesson2.js` to `src/data/lesson3.js`.
2. Edit the `id`, `title`, `rules` and `vocab` in the new file.
3. Register it in `src/data/index.js`:

```js
import lesson3 from './lesson3.js';

export const lessons = [lesson1, lesson2, lesson3];
```

4. Run `npm test` to catch typos, duplicate words or malformed notes.

The lesson picker, the notes page and the test all pick it up automatically.
Words repeated from an earlier lesson are only asked once when you test across
all lessons.

### Note format

Each entry in `rules` is one numbered grammar rule. Each of its `points` takes
exactly one of four shapes:

```js
{
  heading: '1. Demonstrative Pronoun: هَٰذِهِ (Hādhihi — "This" [feminine])',
  points: [
    { sub: 'A sub-heading inside the rule' },
    { text: 'A plain bullet point.' },
    { ar: 'هَٰذِهِ حَقِيبَةٌ', tr: 'Hādhihi ḥaqībah', en: 'This is a bag.' },
    { list: [                       // several examples in a compact table
      { ar: 'سَيَّارَةٌ', tr: 'Sayyārah', en: 'a car' },
      { ar: 'نَافِذَةٌ', tr: 'Nāfidhah', en: 'a window' },
    ] },
  ],
}
```

Each entry in `vocab` is one word:

```js
{ ar: 'بَابٌ', tr: 'Bāb', en: 'Door' }
```

## The test

- Asks **every** word in the selected lesson(s), exactly once, in random order.
- Three directions: Arabic → English, English → Arabic, or Mixed.
- Four multiple-choice options; wrong answers are drawn from the other words.
- Lists the words you missed afterwards so you can retry just those.
- Tracks which words you keep getting wrong and offers to drill them.

## Offline and saved progress

The site installs as a PWA: open it once online and it works with no connection
after that. The Amiri Arabic font is self-hosted, so nothing is fetched from a
third party at runtime.

On iPhone, open the site in Safari and choose **Share → Add to Home Screen** to
get it as an app icon.

Saved in your browser's `localStorage`, on your device only:

- which tab and lesson you were on, and your chosen test direction
- an unfinished test, so closing the tab mid-round doesn't lose it
- per-word right/wrong tallies, and your score history per lesson

"Reset saved progress" on the test screen clears all of it. Nothing is uploaded
anywhere, and the data is per-browser — it doesn't sync between your phone and
your laptop.

## Deploying

Pushing to `main` redeploys automatically if the repo is connected to Vercel
(framework preset: Vite, build `npm run build`, output `dist`).
