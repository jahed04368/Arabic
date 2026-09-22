// Lesson 1 — Arabic Intensive Course
// To add a lesson: copy this file to lessonN.js, edit it, then register it in index.js

export default {
  id: 'lesson-1',
  title: 'Lesson 1',
  subtitle: 'Arabic Intensive Course',

  rules: [
    {
      heading: '1. Demonstrative Pronoun: هَٰذَا (Hādhā — "This")',
      points: [
        { text: 'Used for masculine, singular nouns that are close to us.' },
        {
          text:
            'Indefinite nouns (tanween / 2 dammas): a noun directly following هَٰذَا without "the" (الـ) takes tanween ḍamm (ـٌ) at the end, which acts like "a" or "an" in English.',
        },
        {
          list: [
            { ar: 'هَٰذَا بَابٌ', tr: 'Hādhā bāb', en: 'This is a door' },
            { ar: 'هَٰذَا كَلْبٌ', tr: 'Hādhā kalb', en: 'This is a dog' },
            { ar: 'هَٰذَا رَجُلٌ', tr: 'Hādhā rajul', en: 'This is a man' },
            { ar: 'هَٰذَا بَيْتٌ', tr: 'Hādhā bayt', en: 'This is a house' },
            { ar: 'هَٰذَا مَسْجِدٌ', tr: 'Hādhā masjid', en: 'This is a mosque' },
            { ar: 'هَٰذَا كِتَابٌ', tr: 'Hādhā kitāb', en: 'This is a book' },
            { ar: 'هَٰذَا قَلَمٌ', tr: 'Hādhā qalam', en: 'This is a pen' },
            { ar: 'هَٰذَا مِفْتَاحٌ', tr: 'Hādhā miftāḥ', en: 'This is a key' },
            { ar: 'هَٰذَا مَكْتَبٌ', tr: 'Hādhā maktab', en: 'This is a desk' },
            { ar: 'هَٰذَا سَرِيرٌ', tr: 'Hādhā sarīr', en: 'This is a bed' },
            { ar: 'هَٰذَا كُرْسِيٌّ', tr: 'Hādhā kursī', en: 'This is a chair' },
          ],
        },
      ],
    },
    {
      heading: '2. Asking Questions: مَا, مَنْ, and هَلْ',
      points: [
        { sub: 'مَا (Mā — "What")' },
        { text: 'Used for non-humans — objects and animals.' },
        {
          ar: 'مَا هَٰذَا؟ ← هَٰذَا بَابٌ',
          tr: 'Mā hādhā? → Hādhā bāb',
          en: 'What is this? → This is a door.',
        },

        { sub: 'مَنْ (Man — "Who")' },
        { text: 'Used for humans, both male and female.' },
        {
          list: [
            { ar: 'مَنْ هَٰذَا؟ ← هَٰذَا طَالِبٌ', tr: 'Man hādhā? → Hādhā ṭālib', en: 'Who is this? → This is a student.' },
            { ar: 'مَنْ هَٰذَا؟ ← هَٰذَا طَبِيبٌ', tr: 'Man hādhā? → Hādhā ṭabīb', en: 'Who is this? → This is a doctor.' },
          ],
        },

        { sub: 'هَلْ (Hal — "Is / Are…?")' },
        {
          text:
            'Used to ask yes/no questions. Note that هَلْ is the question particle, whereas الـ means "the" — don\'t mix them up.',
        },
        { text: 'Answer with نَعَمْ (Na‘am — Yes) or لَا (Lā — No).' },
        {
          list: [
            { ar: 'هَلْ هَٰذَا كِتَابٌ؟ ← نَعَمْ، هَٰذَا كِتَابٌ', tr: 'Hal hādhā kitāb? → Na‘am, hādhā kitāb', en: 'Is this a book? → Yes, this is a book.' },
            { ar: 'هَلْ هَٰذَا كِتَابٌ؟ ← لَا، هَٰذَا كَلْبٌ', tr: 'Hal hādhā kitāb? → Lā, hādhā kalb', en: 'Is this a book? → No, this is a dog.' },
          ],
        },
      ],
    },
    {
      heading: '3. Conjunction: وَ (Wa — "And")',
      points: [
        { text: 'Used to connect words or complete clauses.' },
        {
          ar: 'هَٰذَا بَابٌ وَهَٰذَا كَلْبٌ',
          tr: 'Hādhā bāb wa-hādhā kalb',
          en: 'This is a door and this is a dog.',
        },
      ],
    },
  ],

  vocab: [
    { ar: 'هَٰذَا', tr: 'Hādhā', en: 'This' },
    { ar: 'مَا', tr: 'Mā', en: 'What' },
    { ar: 'مَنْ', tr: 'Man', en: 'Who' },
    { ar: 'هَلْ', tr: 'Hal', en: 'Is / Are…? (question particle)' },
    { ar: 'وَ', tr: 'Wa', en: 'And' },
    { ar: 'نَعَمْ', tr: 'Na‘am', en: 'Yes' },
    { ar: 'لَا', tr: 'Lā', en: 'No' },
    { ar: 'بَابٌ', tr: 'Bāb', en: 'Door' },
    { ar: 'كَلْبٌ', tr: 'Kalb', en: 'Dog' },
    { ar: 'رَجُلٌ', tr: 'Rajul', en: 'Man' },
    { ar: 'بَيْتٌ', tr: 'Bayt', en: 'House' },
    { ar: 'مَسْجِدٌ', tr: 'Masjid', en: 'Mosque' },
    { ar: 'كِتَابٌ', tr: 'Kitāb', en: 'Book' },
    { ar: 'قَلَمٌ', tr: 'Qalam', en: 'Pen' },
    { ar: 'مِفْتَاحٌ', tr: 'Miftāḥ', en: 'Key' },
    { ar: 'مَكْتَبٌ', tr: 'Maktab', en: 'Desk' },
    { ar: 'سَرِيرٌ', tr: 'Sarīr', en: 'Bed' },
    { ar: 'كُرْسِيٌّ', tr: 'Kursī', en: 'Chair' },
    { ar: 'طَالِبٌ', tr: 'Ṭālib', en: 'Student' },
    { ar: 'طَبِيبٌ', tr: 'Ṭabīb', en: 'Doctor' },
    { ar: 'قِطٌّ', tr: 'Qiṭṭ', en: 'Cat' },
    { ar: 'دِيكٌ', tr: 'Dīk', en: 'Rooster' },
    { ar: 'حِمَارٌ', tr: 'Ḥimār', en: 'Donkey' },
    { ar: 'جَمَلٌ', tr: 'Jamal', en: 'Camel' },
    { ar: 'حِصَانٌ', tr: 'Ḥiṣān', en: 'Horse' },
  ],
};
