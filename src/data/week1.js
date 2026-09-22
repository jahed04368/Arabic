// Week 1 — Arabic Intensive Course
// To add a new week: copy this file to week2.js, edit it, then register it in index.js

export default {
  id: 'week-1',
  title: 'Week 1',
  subtitle: 'Arabic Intensive Course',

  rules: [
    {
      heading: '1. The Demonstrative Pronoun: هَٰذَا (Hādhā — "This")',
      points: [
        { text: 'Used for objects or people that are masculine, singular, and close to us.' },
        {
          text:
            'Indefinite nouns (ending in tanween / 2 dammas): a noun directly following هَٰذَا without "the" (الـ) takes tanween ḍamm (ـٌ) at the end, which acts like "a" or "an" in English.',
        },
        { ar: 'هَٰذَا بَابٌ', tr: 'Hādhā bāb', en: 'This is a door.' },
      ],
    },
    {
      heading: '2. Asking Questions: مَا, مَنْ, and هَلْ',
      points: [
        { text: 'مَا (Mā — "What"): used for non-humans — objects, concepts and animals.' },
        { ar: 'مَا هَٰذَا؟', tr: 'Mā hādhā?', en: 'What is this?' },
        { text: 'مَنْ (Man — "Who"): used for humans, both male and female.' },
        { ar: 'مَنْ هَٰذَا؟', tr: 'Man hādhā?', en: 'Who is this?' },
        { text: 'هَلْ (Hal — "Is/Are…?"): used to ask yes/no questions. نَعَمْ (Na‘am) = Yes, لَا (Lā) = No.' },
        {
          ar: 'هَلْ هَٰذَا كِتَابٌ؟ ← نَعَمْ، هَٰذَا كِتَابٌ',
          tr: 'Hal hādhā kitāb? → Na‘am, hādhā kitāb',
          en: 'Is this a book? → Yes, this is a book.',
        },
      ],
    },
    {
      heading: '3. Conjunction: وَ (Wa — "And")',
      points: [
        { text: 'Used to connect sentences or words.' },
        {
          ar: 'هَٰذَا بَابٌ وَهَٰذَا كَلْبٌ',
          tr: 'Hādhā bāb wa-hādhā kalb',
          en: 'This is a door and this is a dog.',
        },
      ],
    },
    {
      heading: '4. Definite Nouns: اَلْـ (Al — "The")',
      points: [
        {
          text:
            'When adding الـ ("the") to a noun, it loses its double damma (tanween ـٌ) and takes a single damma (ـُ). A word cannot have both الـ and tanween.',
        },
        {
          ar: 'بَيْتٌ ← اَلْبَيْتُ',
          tr: 'Baytun → Al-baytu',
          en: 'a house → the house',
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
