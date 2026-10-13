import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, arabicFont } from '../theme';

function Line({ line }) {
  // A line is either a short rule in plain English, or an Arabic form with its gloss.
  if (line.text) return <Text style={styles.ruleLine}>{line.text}</Text>;

  return (
    <View style={styles.row}>
      <Text style={styles.arabic}>{line.ar}</Text>
      <Text style={styles.english}>{line.en}</Text>
    </View>
  );
}

function Group({ group }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      {group.lines.map((line, i) => (
        <Line key={i} line={line} />
      ))}
    </View>
  );
}

export default function SummaryScreen({ lessons }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.intro}>
        Every rule so far, stripped to the essentials. The full explanations and
        examples are on the Notes tab.
      </Text>

      {lessons.map((lesson) => (
        <View key={lesson.id} style={styles.card}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          {lesson.summary.map((group, i) => (
            <Group key={i} group={group} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingBottom: 48,
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
  },
  intro: { fontSize: 14, color: colors.muted, lineHeight: 21, marginBottom: 16 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 6,
    marginBottom: 14,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 4,
  },
  group: { marginTop: 14, marginBottom: 6 },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0ece2',
  },
  arabic: {
    width: 170,
    paddingRight: 16,
    fontFamily: arabicFont,
    fontSize: 23,
    lineHeight: 42,
    color: colors.ink,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  english: { flex: 1, minWidth: 180, fontSize: 14, color: colors.ink, lineHeight: 21 },
  ruleLine: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    paddingVertical: 5,
  },
});
