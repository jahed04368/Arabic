import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, arabicFont } from '../theme';
import { shuffle, pickDistractors } from '../utils';

const MODES = [
  { id: 'ar-en', label: 'Arabic → English' },
  { id: 'en-ar', label: 'English → Arabic' },
  { id: 'mixed', label: 'Mixed' },
];

const OPTION_COUNT = 4;

function buildQuestion(word, pool, mode) {
  const direction =
    mode === 'mixed' ? (Math.random() < 0.5 ? 'ar-en' : 'en-ar') : mode;
  const answerKey = direction === 'ar-en' ? 'en' : 'ar';
  const promptKey = direction === 'ar-en' ? 'ar' : 'en';

  const answer = word[answerKey];
  const answerPool = [...new Set(pool.map((w) => w[answerKey]))];
  const options = shuffle([
    answer,
    ...pickDistractors(answerPool, answer, OPTION_COUNT - 1),
  ]);

  return { word, direction, prompt: word[promptKey], answerKey, answer, options };
}

// Every word in `deckPool`, in random order, exactly once.
// Wrong answers are drawn from `distractorPool` so a short retry round
// (e.g. only the missed words) still offers a full set of choices.
function buildDeck(deckPool, mode, distractorPool = deckPool) {
  return shuffle(deckPool).map((word) => buildQuestion(word, distractorPool, mode));
}

function Prompt({ question }) {
  const isArabic = question.direction === 'ar-en';
  return (
    <View style={styles.promptBox}>
      <Text style={styles.promptLabel}>
        {isArabic ? 'What does this mean?' : 'How do you say this in Arabic?'}
      </Text>
      <Text style={isArabic ? styles.promptArabic : styles.promptEnglish}>
        {question.prompt}
      </Text>
    </View>
  );
}

export default function TestScreen({ pool, scopeLabel }) {
  const [mode, setMode] = useState('ar-en');
  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);

  function start(nextMode = mode, customPool = pool) {
    setMode(nextMode);
    setDeck(buildDeck(customPool, nextMode, pool));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setMissed([]);
  }

  function answer(option) {
    if (selected !== null) return;
    setSelected(option);
    const question = deck[index];
    if (option === question.answer) {
      setScore((s) => s + 1);
    } else {
      setMissed((m) => [...m, question.word]);
    }
  }

  function next() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  // ---- Setup screen -------------------------------------------------------
  if (!deck) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Vocabulary Test</Text>
          <Text style={styles.subtitle}>
            {pool.length} words from {scopeLabel}, in random order. Every word is
            asked exactly once.
          </Text>

          <Text style={styles.label}>Direction</Text>
          {MODES.map((m) => (
            <Pressable
              key={m.id}
              onPress={() => setMode(m.id)}
              style={[styles.modeRow, mode === m.id && styles.modeRowActive]}
            >
              <View style={[styles.radio, mode === m.id && styles.radioActive]} />
              <Text style={styles.modeLabel}>{m.label}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.primaryButton} onPress={() => start()}>
            <Text style={styles.primaryButtonText}>Start test</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // ---- Results screen -----------------------------------------------------
  if (index >= deck.length) {
    const pct = Math.round((score / deck.length) * 100);
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {score} / {deck.length} correct
          </Text>
          <Text style={styles.subtitle}>{pct}% — {scopeLabel}</Text>

          {missed.length > 0 && (
            <>
              <Text style={styles.label}>Words to review ({missed.length})</Text>
              {missed.map((word, i) => (
                <View key={word.ar + i} style={styles.missedRow}>
                  <Text style={styles.missedArabic}>{word.ar}</Text>
                  <View style={styles.missedText}>
                    <Text style={styles.missedEnglish}>{word.en}</Text>
                    <Text style={styles.missedTranslit}>{word.tr}</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          <Pressable style={styles.primaryButton} onPress={() => start(mode)}>
            <Text style={styles.primaryButtonText}>Test all words again</Text>
          </Pressable>

          {missed.length > 0 && (
            <Pressable
              style={styles.secondaryButton}
              onPress={() => start(mode, missed)}
            >
              <Text style={styles.secondaryButtonText}>
                Practise the {missed.length} I missed
              </Text>
            </Pressable>
          )}

          <Pressable style={styles.linkButton} onPress={() => setDeck(null)}>
            <Text style={styles.linkButtonText}>Change settings</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // ---- Question screen ----------------------------------------------------
  const question = deck[index];
  const answered = selected !== null;
  const progress = (index + (answered ? 1 : 0)) / deck.length;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          {index + 1} of {deck.length}
        </Text>
        <Text style={styles.progressText}>Score {score}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.card}>
        <Prompt question={question} />

        {question.options.map((option) => {
          const isCorrect = option === question.answer;
          const isPicked = option === selected;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isPicked && !isCorrect;
          const arabicOption = question.answerKey === 'ar';

          return (
            <Pressable
              key={option}
              onPress={() => answer(option)}
              style={[
                styles.option,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
            >
              <Text
                style={[
                  arabicOption ? styles.optionArabic : styles.optionText,
                  showCorrect && styles.optionTextCorrect,
                  showWrong && styles.optionTextWrong,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}

        {answered && (
          <View style={styles.feedback}>
            <Text style={styles.feedbackLine}>
              {question.word.ar} · {question.word.tr} · {question.word.en}
            </Text>
            <Pressable style={styles.primaryButton} onPress={next}>
              <Text style={styles.primaryButtonText}>
                {index + 1 === deck.length ? 'See results' : 'Next word'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingBottom: 48, maxWidth: 640, width: '100%', alignSelf: 'center' },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.ink },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 6, lineHeight: 22 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.muted,
    marginTop: 22,
    marginBottom: 8,
  },

  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  modeRowActive: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 10,
  },
  radioActive: { borderColor: colors.accent, borderWidth: 5 },
  modeLabel: { fontSize: 15, color: colors.ink },

  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { fontSize: 13, fontWeight: '600', color: colors.muted },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: colors.border, marginBottom: 16 },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: colors.accent },

  promptBox: { alignItems: 'center', paddingVertical: 12, marginBottom: 14 },
  promptLabel: { fontSize: 13, color: colors.muted, marginBottom: 10 },
  promptArabic: {
    fontFamily: arabicFont,
    fontSize: 52,
    lineHeight: 92,
    color: colors.ink,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  promptEnglish: { fontSize: 30, fontWeight: '600', color: colors.ink, textAlign: 'center' },

  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  optionCorrect: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  optionWrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
  optionText: { fontSize: 16, color: colors.ink, textAlign: 'center' },
  optionArabic: {
    fontFamily: arabicFont,
    fontSize: 28,
    lineHeight: 50,
    color: colors.ink,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  optionTextCorrect: { color: colors.correct, fontWeight: '700' },
  optionTextWrong: { color: colors.wrong, fontWeight: '700' },

  feedback: { marginTop: 10 },
  feedbackLine: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: arabicFont,
    lineHeight: 30,
  },

  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: { color: colors.accent, fontSize: 15, fontWeight: '700' },
  linkButton: { alignItems: 'center', paddingVertical: 14 },
  linkButtonText: { color: colors.muted, fontSize: 14 },

  missedRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  missedArabic: {
    width: 100,
    fontFamily: arabicFont,
    fontSize: 24,
    lineHeight: 44,
    textAlign: 'right',
    paddingRight: 14,
    color: colors.ink,
    writingDirection: 'rtl',
  },
  missedText: { flex: 1 },
  missedEnglish: { fontSize: 15, color: colors.ink },
  missedTranslit: { fontSize: 13, fontStyle: 'italic', color: colors.accent },
});
