// Lesson 3 — Arabic Intensive Course
// To add a lesson: copy this file to lessonN.js, edit it, then register it in index.js

export default {
  id: 'lesson-3',
  title: 'Lesson 3',
  subtitle: 'Arabic Intensive Course',

  summary: [
    {
      title: 'Shaddah with a kasrah',
      lines: [
        { text: 'A shaddah (ّ) doubles the letter. A kasrah going with it is written under the shaddah itself.' },
        { ar: 'مُدَرَّسٌ', en: 'taught — fathah above the shaddah' },
        { ar: 'مُدَرِّسٌ', en: 'teacher — kasrah below the shaddah' },
      ],
    },
    {
      title: 'Personal pronouns',
      lines: [
        { ar: 'أَنَا', en: 'I' },
        { ar: 'أَنْتَ · أَنْتِ', en: 'you — to a man · to a woman' },
        { ar: 'هُوَ · هِيَ', en: 'he / it (m) · she / it (f)' },
        { ar: 'نَحْنُ', en: 'we' },
        { ar: 'أَنَا طَالِبٌ', en: 'I am a student — there is no word for "am".' },
      ],
    },
    {
      title: 'Possessive endings',
      lines: [
        { text: 'Attach to the end of the noun; its ending becomes a single damma (or a kasrah before ي).' },
        { ar: 'بَيْتِي', en: 'my house' },
        { ar: 'بَيْتُكَ · بَيْتُكِ', en: 'your house — to a man · to a woman' },
        { ar: 'بَيْتُهُ · بَيْتُهَا', en: 'his house · her house' },
        { ar: 'بَيْتُنَا', en: 'our house' },
      ],
    },
  ],

  rules: [
    {
      heading: '1. Reading the Shaddah (ّ) and Kasrah (ِ)',
      points: [
        { text: 'The shaddah (ّ) marks a doubled / emphasised letter.' },
        {
          text:
            'When a kasrah falls on a letter carrying a shaddah, the kasrah is often written directly underneath the shaddah symbol itself, rather than under the letter.',
        },
        {
          ar: 'مُدَرِّسٌ',
          tr: 'Mudarrisun',
          en: 'Teacher — the line under the shaddah gives the "ri" sound.',
        },
        { sub: 'Fathah above the shaddah vs kasrah below it' },
        {
          list: [
            { ar: 'مُدَرَّسٌ', tr: 'Mudarrasun', en: 'taught (fathah above the shaddah)' },
            { ar: 'مُدَرِّسٌ', tr: 'Mudarrisun', en: 'teacher (kasrah under the shaddah)' },
          ],
        },
      ],
    },
    {
      heading: '2. Personal Pronouns',
      points: [
        {
          list: [
            { ar: 'أَنَا', tr: 'Anā', en: 'I' },
            { ar: 'أَنْتَ', tr: 'Anta', en: 'You (masculine singular)' },
            { ar: 'أَنْتِ', tr: 'Anti', en: 'You (feminine singular)' },
            { ar: 'هُوَ', tr: 'Huwa', en: 'He / It (male humans, masculine objects or animals)' },
            { ar: 'هِيَ', tr: 'Hiya', en: 'She / It (female humans, feminine objects or animals)' },
            { ar: 'نَحْنُ', tr: 'Naḥnu', en: 'We' },
          ],
        },

        { sub: 'Example sentences' },
        {
          list: [
            { ar: 'أَنَا طَالِبٌ', tr: 'Anā ṭālibun', en: 'I am a student.' },
            { ar: 'أَنْتَ مُهَنْدِسٌ', tr: 'Anta muhandisun', en: 'You are an engineer (m).' },
            { ar: 'أَنْتِ مُهَنْدِسَةٌ', tr: 'Anti muhandisatun', en: 'You are an engineer (f).' },
            { ar: 'هُوَ مُحَمَّدٌ', tr: 'Huwa Muḥammadun', en: 'He is Muhammad.' },
            { ar: 'هُوَ كَلْبٌ', tr: 'Huwa kalbun', en: 'It is a dog.' },
            { ar: 'هِيَ آمِنَةُ', tr: 'Hiya Āminatu', en: 'She is Amina.' },
            { ar: 'هِيَ طَالِبَةٌ', tr: 'Hiya ṭālibatun', en: 'She is a student.' },
            { ar: 'هِيَ سَيَّارَةٌ', tr: 'Hiya sayyāratun', en: 'It is a car.' },
            { ar: 'نَحْنُ طُلَّابٌ', tr: 'Naḥnu ṭullābun', en: 'We are students.' },
          ],
        },
      ],
    },
    {
      heading: '3. Possessive Pronouns (Attached Pronouns)',
      points: [
        {
          text:
            'Attach the suffix to the end of the noun. The noun’s final ending becomes a single damma or kasrah before the suffix is added.',
        },

        { sub: 'My ("-ī") — add ي with a sukoon, and a kasrah on the letter before it' },
        {
          list: [
            { ar: 'بَيْتٌ ← بَيْتِي', tr: 'Baytun → Baytī', en: 'a house → my house' },
            { ar: 'قَلَمٌ ← قَلَمِي', tr: 'Qalamun → Qalamī', en: 'a pen → my pen' },
            { ar: 'جَمَلٌ ← جَمَلِي', tr: 'Jamalun → Jamalī', en: 'a camel → my camel' },
            { ar: 'سَيَّارَةٌ ← سَيَّارَتِي', tr: 'Sayyāratun → Sayyāratī', en: 'a car → my car' },
          ],
        },

        { sub: 'Your [masculine] ("-uka") — add كَ' },
        {
          list: [
            { ar: 'بَيْتٌ ← بَيْتُكَ', tr: 'Baytun → Baytuka', en: 'a house → your house' },
            { ar: 'بَيْتُكَ جَمِيلٌ', tr: 'Baytuka jamīlun', en: 'Your house is beautiful.' },
          ],
        },

        { sub: 'Your [feminine] ("-uki") — add كِ' },
        { ar: 'بَيْتٌ ← بَيْتُكِ', tr: 'Baytun → Baytuki', en: 'a house → your house' },

        { sub: 'His / Its [masculine] ("-uhu") — add هُ' },
        {
          list: [
            { ar: 'بَيْتٌ ← بَيْتُهُ', tr: 'Baytun → Baytuhu', en: 'a house → his house' },
            { ar: 'قَلَمٌ ← قَلَمُهُ', tr: 'Qalamun → Qalamuhu', en: 'a pen → his pen' },
            { ar: 'كِتَابٌ ← كِتَابُهُ', tr: 'Kitābun → Kitābuhu', en: 'a book → his book' },
          ],
        },

        { sub: 'Her / Its [feminine] ("-uhā") — add هَا' },
        {
          list: [
            { ar: 'بَيْتٌ ← بَيْتُهَا', tr: 'Baytun → Baytuhā', en: 'a house → her house' },
            { ar: 'قَلَمٌ ← قَلَمُهَا', tr: 'Qalamun → Qalamuhā', en: 'a pen → her pen' },
            { ar: 'كِتَابٌ ← كِتَابُهَا', tr: 'Kitābun → Kitābuhā', en: 'a book → her book' },
          ],
        },

        { sub: 'Our ("-unā") — add نَا' },
        {
          list: [
            { ar: 'بَيْتٌ ← بَيْتُنَا', tr: 'Baytun → Baytunā', en: 'a house → our house' },
            { ar: 'قَلَمٌ ← قَلَمُنَا', tr: 'Qalamun → Qalamunā', en: 'a pen → our pen' },
            { ar: 'دِينٌ ← دِينُنَا', tr: 'Dīnun → Dīnunā', en: 'a religion → our religion' },
          ],
        },
      ],
    },
  ],

  vocab: [
    { ar: 'أَنَا', tr: 'Anā', en: 'I' },
    { ar: 'أَنْتَ', tr: 'Anta', en: 'You (m)' },
    { ar: 'أَنْتِ', tr: 'Anti', en: 'You (f)' },
    { ar: 'هُوَ', tr: 'Huwa', en: 'He / It (m)' },
    { ar: 'هِيَ', tr: 'Hiya', en: 'She / It (f)' },
    { ar: 'نَحْنُ', tr: 'Naḥnu', en: 'We' },
    { ar: 'اَلْمَدْرَسَةُ', tr: 'Al-Madrasah', en: 'The school' },
    { ar: 'دَفْتَرٌ', tr: 'Daftar', en: 'Notebook' },
    { ar: 'اَلْفَصْلُ', tr: 'Al-Faṣl', en: 'The classroom' },
    { ar: 'فَصْلٌ', tr: 'Faṣl', en: 'A class' },
    { ar: 'سُوقٌ', tr: 'Sūq', en: 'Market' },
    { ar: 'وَرَقٌ', tr: 'Waraq', en: 'Paper' },
    { ar: 'تَاجِرٌ', tr: 'Tājir', en: 'Merchant' },
    { ar: 'خُبْزٌ', tr: 'Khubz', en: 'Bread' },
    { ar: 'مَطْبَخٌ', tr: 'Maṭbakh', en: 'Kitchen' },
    { ar: 'دِينٌ', tr: 'Dīn', en: 'Religion' },
    { ar: 'غُرْفَةٌ', tr: 'Ghurfah', en: 'A room' },
    { ar: 'زَمِيلٌ', tr: 'Zamīl', en: 'A colleague' },
    { ar: 'شَارِعٌ', tr: 'Shāri‘', en: 'A street' },
    { ar: 'طِفْلٌ', tr: 'Ṭifl', en: 'A child' },
    { ar: 'جَامِعَةٌ', tr: 'Jāmi‘ah', en: 'A university' },
    { ar: 'أُمٌّ', tr: 'Umm', en: 'A mother' },
    { ar: 'زَوْجٌ', tr: 'Zawj', en: 'A husband' },
    { ar: 'رَأْسٌ', tr: "Ra's", en: 'A head' },
    { ar: 'اِسْمٌ', tr: 'Ism', en: 'Name' },
    { ar: 'اِسْمُهُ', tr: 'Ismuhu', en: 'His name' },
    { ar: 'وَجْهٌ', tr: 'Wajh', en: 'A face' },
    { ar: 'يَدٌ', tr: 'Yad', en: 'A hand' },
    { ar: 'رِجْلٌ', tr: 'Rijl', en: 'Leg' },
    { ar: 'اِبْنٌ', tr: 'Ibn', en: 'Son' },
  ],
};
