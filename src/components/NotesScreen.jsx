import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, arabicFont } from '../theme';

function Example({ point }) {
  return (
    <View style={styles.example}>
      <Text style={styles.exampleArabic}>{point.ar}</Text>
      <Text style={styles.exampleTranslit}>{point.tr}</Text>
      <Text style={styles.exampleEnglish}>{point.en}</Text>
    </View>
  );
}

function ExampleList({ items }) {
  return (
    <View style={styles.exampleList}>
      {items.map((item, i) => (
        <View
          key={i}
          style={[styles.exampleListRow, i > 0 && styles.exampleListRowDivided]}
        >
          <Text style={styles.exampleListArabic}>{item.ar}</Text>
          <View style={styles.exampleListText}>
            <Text style={styles.exampleListEnglish}>{item.en}</Text>
            <Text style={styles.exampleListTranslit}>{item.tr}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function Point({ point }) {
  if (point.sub) return <Text style={styles.subHeading}>{point.sub}</Text>;
  if (point.list) return <ExampleList items={point.list} />;
  if (point.ar) return <Example point={point} />;
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{point.text}</Text>
    </View>
  );
}

function Rule({ rule }) {
  return (
    <View style={styles.card}>
      <Text style={styles.ruleHeading}>{rule.heading}</Text>
      {rule.points.map((point, i) => (
        <Point key={i} point={point} />
      ))}
    </View>
  );
}

function VocabRow({ word, index }) {
  return (
    <View style={[styles.vocabRow, index % 2 === 1 && styles.vocabRowAlt]}>
      <Text style={styles.vocabArabic}>{word.ar}</Text>
      <Text style={styles.vocabTranslit}>{word.tr}</Text>
      <Text style={styles.vocabEnglish}>{word.en}</Text>
    </View>
  );
}

function LessonSection({ lesson, showTitle }) {
  return (
    <View>
      {showTitle && <Text style={styles.lessonTitle}>{lesson.title}</Text>}

      <Text style={styles.sectionTitle}>Grammar Rules</Text>
      {lesson.rules.map((rule, i) => (
        <Rule key={i} rule={rule} />
      ))}

      <Text style={styles.sectionTitle}>
        Words to Learn · {lesson.vocab.length} words
      </Text>
      <View style={styles.card}>
        <View style={styles.vocabHeader}>
          <Text style={[styles.vocabHeaderCell, styles.colArabic]}>Arabic</Text>
          <Text style={[styles.vocabHeaderCell, styles.colTranslit]}>Transliteration</Text>
          <Text style={[styles.vocabHeaderCell, styles.colEnglish]}>Meaning</Text>
        </View>
        {lesson.vocab.map((word, i) => (
          <VocabRow key={word.ar + i} word={word} index={i} />
        ))}
      </View>
    </View>
  );
}

export default function NotesScreen({ lessons }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {lessons.map((lesson) => (
        <LessonSection
          key={lesson.id}
          lesson={lesson}
          showTitle={lessons.length > 1}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lessonTitle: { fontSize: 24, fontWeight: '700', color: colors.ink, marginTop: 24 },
  scroll: { padding: 16, paddingBottom: 48, maxWidth: 820, width: '100%', alignSelf: 'center' },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.muted,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 14,
  },
  ruleHeading: { fontSize: 17, fontWeight: '700', color: colors.ink, marginBottom: 12, lineHeight: 26 },
  bulletRow: { flexDirection: 'row', marginBottom: 10 },
  bulletDot: { color: colors.accent, marginRight: 8, fontSize: 15, lineHeight: 23 },
  bulletText: { flex: 1, fontSize: 15, lineHeight: 23, color: colors.ink },
  example: {
    backgroundColor: colors.accentSoft,
    borderRadius: 10,
    padding: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  exampleArabic: {
    fontFamily: arabicFont,
    fontSize: 26,
    lineHeight: 46,
    color: colors.ink,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accent,
    marginTop: 14,
    marginBottom: 8,
    lineHeight: 26,
  },
  exampleList: {
    backgroundColor: colors.accentSoft,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: 4,
    marginBottom: 10,
  },
  exampleListRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  exampleListRowDivided: { borderTopWidth: 1, borderTopColor: '#d3e3dc' },
  exampleListArabic: {
    flex: 1,
    minWidth: 130,
    fontFamily: arabicFont,
    fontSize: 22,
    lineHeight: 40,
    color: colors.ink,
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingRight: 14,
  },
  exampleListText: { flex: 1, minWidth: 130 },
  exampleListEnglish: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  exampleListTranslit: { fontSize: 13, fontStyle: 'italic', color: colors.accent },
  exampleTranslit: { fontSize: 14, fontStyle: 'italic', color: colors.accent, marginTop: 4 },
  exampleEnglish: { fontSize: 15, color: colors.ink, marginTop: 2 },

  vocabHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 4,
  },
  vocabHeaderCell: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  vocabRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderRadius: 8 },
  vocabRowAlt: { backgroundColor: '#faf8f4' },
  colArabic: { width: 110, textAlign: 'right', paddingRight: 14 },
  colTranslit: { width: 130 },
  colEnglish: { flex: 1, minWidth: 100 },
  vocabArabic: {
    width: 110,
    paddingRight: 14,
    fontFamily: arabicFont,
    fontSize: 24,
    lineHeight: 42,
    textAlign: 'right',
    writingDirection: 'rtl',
    color: colors.ink,
  },
  vocabTranslit: { width: 130, fontSize: 14, fontStyle: 'italic', color: colors.accent },
  vocabEnglish: { flex: 1, minWidth: 100, fontSize: 15, color: colors.ink },
});
