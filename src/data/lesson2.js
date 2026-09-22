// Lesson 2 — Arabic Intensive Course
// To add a lesson: copy this file to lessonN.js, edit it, then register it in index.js

export default {
  id: 'lesson-2',
  title: 'Lesson 2',
  subtitle: 'Arabic Intensive Course',

  rules: [
    {
      heading: '1. Demonstrative Pronoun: هَٰذِهِ (Hādhihi — "This is" [feminine])',
      points: [
        { text: 'Used for feminine, singular nouns that are close to us.' },
        { ar: 'هَٰذِهِ حَقِيبَةٌ', tr: 'Hādhihi ḥaqībah', en: 'This is a bag.' },
      ],
    },
    {
      heading: '2. Identifying Feminine Nouns',
      points: [
        { sub: 'a. The Tāʾ Marbūṭah (ة / ـة)' },
        {
          text:
            'The most common indicator of a feminine noun is the letter tāʾ marbūṭah at the end of the word.',
        },
        {
          text:
            'Isolated / end position (ة): written as a round circle with two dots above, when it follows a non-connecting letter (ا, د, ذ, ر, ز, و).',
        },
        {
          list: [
            { ar: 'سَيَّارَةٌ', tr: 'Sayyārah', en: 'a car' },
            { ar: 'نَافِذَةٌ', tr: 'Nāfidhah', en: 'a window' },
          ],
        },
        { text: 'Connected position (ـة): written attached to the preceding letter.' },
        {
          list: [
            { ar: 'مِلْعَقَةٌ', tr: 'Mil‘aqah', en: 'a spoon' },
            { ar: 'ثَلَّاجَةٌ', tr: 'Thallājah', en: 'a fridge' },
          ],
        },

        { sub: 'Converting masculine to feminine' },
        {
          text:
            'Take the masculine word, put a fathah (ـَ) on the final letter, and add ة / ـة at the end.',
        },
        {
          list: [
            { ar: 'مُسْلِمٌ ← مُسْلِمَةٌ', tr: 'Muslimun → Muslimatun', en: 'a muslim (m) → a muslim (f)' },
            { ar: 'طَالِبٌ ← طَالِبَةٌ', tr: 'Ṭālibun → Ṭālibatun', en: 'male student → female student' },
            { ar: 'مُدَرِّسٌ ← مُدَرِّسَةٌ', tr: 'Mudarrisun → Mudarrisatun', en: 'male teacher → female teacher' },
          ],
        },

        { sub: 'b. Feminine nouns without tāʾ marbūṭah' },
        { text: 'Female family relationships are inherently feminine by meaning.' },
        {
          list: [
            { ar: 'بِنْتٌ', tr: 'Bintun', en: 'a daughter / girl' },
            { ar: 'أُخْتٌ', tr: 'Ukhtun', en: 'a sister' },
          ],
        },

        { sub: 'c. Feminine proper names (diptotes)' },
        {
          text:
            'Female proper names do not take tanween (2 dammas). They end with a single damma (ـُ).',
        },
        {
          list: [
            { ar: 'عَائِشَةُ', tr: 'Ā‘ishatu', en: 'Aisha' },
            { ar: 'فَاطِمَةُ', tr: 'Fāṭimatu', en: 'Fatima' },
            { ar: 'زَيْنَبُ', tr: 'Zaynabu', en: 'Zaynab' },
            { ar: 'مَرْيَمُ', tr: 'Maryamu', en: 'Maryam' },
          ],
        },
      ],
    },
    {
      heading: '3. The Definite Article: اَلْـ (Al — "The")',
      points: [
        { text: 'Adding الـ ("the") converts an indefinite noun into a definite noun.' },
        {
          text:
            'Rule: الـ and tanween (2 dammas / ـٌ) never appear on the same word. Adding الـ forces the ending to change from 2 dammas to 1 damma (ـُ).',
        },
        {
          list: [
            { ar: 'بَيْتٌ ← اَلْبَيْتُ', tr: 'Baytun → Al-baytu', en: 'a house → the house' },
            { ar: 'قَلَمٌ ← اَلْقَلَمُ', tr: 'Qalamun → Al-qalamu', en: 'a pen → the pen' },
            { ar: 'مَسْجِدٌ ← اَلْمَسْجِدُ', tr: 'Masjidun → Al-masjidu', en: 'a mosque → the mosque' },
          ],
        },
      ],
    },
    {
      heading: '4. Prepositions: فِي (Fī — "In") and عَلَى (ʿAlā — "On")',
      points: [
        {
          text:
            'When a preposition (فِي or عَلَى) comes before a noun, it forces the ending of that noun to take a kasrah (ـِ or ـٍ). This state is called majroor.',
        },

        { sub: 'a. Preposition + definite noun (with اَلْـ)' },
        { text: 'The single damma (ـُ) changes to a single kasrah (ـِ).' },
        {
          list: [
            { ar: 'مُحَمَّدٌ فِي الْبَيْتِ', tr: 'Muḥammadun fil-bayti', en: 'Muhammad is in the house.' },
            { ar: 'اَلطَّالِبُ عَلَى الْبَابِ', tr: 'Aṭ-ṭālibu ‘alal-bābi', en: 'The student is at / on the door.' },
          ],
        },

        { sub: 'b. Preposition + indefinite noun (without اَلْـ)' },
        {
          text:
            'The double damma (tanween ḍamm ـٌ) changes to a double kasrah (tanween kasr ـٍ).',
        },
        {
          list: [
            { ar: 'مُحَمَّدٌ فِي بَيْتٍ', tr: 'Muḥammadun fī baytin', en: 'Muhammad is in a house.' },
            { ar: 'طَالِبٌ عَلَى بَابٍ', tr: 'Ṭālibun ‘alā bābin', en: 'A student is at / on a door.' },
          ],
        },
      ],
    },
  ],

  vocab: [
    { ar: 'هَٰذِهِ', tr: 'Hādhihi', en: 'This (feminine)' },
    { ar: 'فِي', tr: 'Fī', en: 'In' },
    { ar: 'عَلَى', tr: '‘Alā', en: 'On' },
    { ar: 'حَقِيبَةٌ', tr: 'Ḥaqībah', en: 'A bag' },
    { ar: 'بِنْتٌ', tr: 'Bint', en: 'A daughter / girl' },
    { ar: 'أُخْتٌ', tr: 'Ukht', en: 'A sister' },
    { ar: 'شَايٌ', tr: 'Shāy', en: 'Tea' },
    { ar: 'قَهْوَةٌ', tr: 'Qahwah', en: 'Coffee' },
    { ar: 'قَمِيصٌ', tr: 'Qamīṣ', en: 'A shirt' },
    { ar: 'مِكْوَاةٌ', tr: 'Mikwāh', en: 'An iron' },
    { ar: 'مِنْدِيلٌ', tr: 'Mindīl', en: 'A handkerchief' },
    { ar: 'مِلْعَقَةٌ', tr: 'Mil‘aqah', en: 'A spoon' },
    { ar: 'ثَلَّاجَةٌ', tr: 'Thallājah', en: 'A fridge' },
    { ar: 'نَافِذَةٌ', tr: 'Nāfidhah', en: 'A window' },
    { ar: 'دَرَّاجَةٌ', tr: 'Darrājah', en: 'A bike' },
    { ar: 'دُكَّانٌ', tr: 'Dukkān', en: 'A shop' },
    { ar: 'سَيَّارَةٌ', tr: 'Sayyārah', en: 'A car' },
    { ar: 'نَجْمٌ', tr: 'Najm', en: 'A star' },
    { ar: 'زَهْرَةٌ', tr: 'Zahrah', en: 'A rose' },
    { ar: 'مَكْسُورٌ', tr: 'Maksūr', en: 'Broken' },
    { ar: 'مَفْتُوحٌ', tr: 'Maftūḥ', en: 'Open' },
    { ar: 'جَالِسٌ', tr: 'Jālis', en: 'Sitting' },
    { ar: 'وَاقِفٌ', tr: 'Wāqif', en: 'Standing' },
    { ar: 'مُدَرِّسٌ', tr: 'Mudarris', en: 'Teacher' },
    { ar: 'جَدِيدٌ', tr: 'Jadīd', en: 'New' },
    { ar: 'قَدِيمٌ', tr: 'Qadīm', en: 'Old' },
    { ar: 'صَغِيرٌ', tr: 'Ṣaghīr', en: 'Small' },
    { ar: 'كَبِيرٌ', tr: 'Kabīr', en: 'Big' },
    { ar: 'مَاءٌ', tr: "Mā'", en: 'Water' },
    { ar: 'بَارِدٌ', tr: 'Bārid', en: 'Cold' },
    { ar: 'نَظِيفٌ', tr: 'Naẓīf', en: 'Clean' },
  ],
};
