import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, arabicFont } from '../theme';
import { buildDeck } from '../quiz';
import { load, save, remove, clearAll, loadWordStats, recordAnswer } from '../storage';

const MODES = [
  { id: 'ar-en', label: 'Arabic → English' },
  { id: 'en-ar', label: 'English → Arabic' },
  { id: 'mixed', label: 'Mixed' },
];

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

export default function TestScreen({ pool, scopeId, scopeLabel }) {
  const sessionKey = `session:${scopeId}`;
  const historyKey = `history:${scopeId}`;

  const [mode, setMode] = useState(() => {
    const saved = load('mode', 'ar-en');
    return MODES.some((m) => m.id === saved) ? saved : 'ar-en';
  });

  // An unfinished test is restored on load, so closing the tab (or losing
  // signal mid-test) doesn't throw away the round.
  const [session, setSession] = useState(() => load(sessionKey, null));
  const [selected, setSelected] = useState(null);
  const [stats, setStats] = useState(loadWordStats);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [history, setHistory] = useState(() => load(historyKey, []));

  // Re-read when the lesson scope changes (the component is remounted by key,
  // but this keeps things correct if that ever stops being true).
  useEffect(() => {
    setSession(load(sessionKey, null));
    setHistory(load(historyKey, []));
    setSelected(null);
  }, [sessionKey, historyKey]);

  function persistSession(next) {
    setSession(next);
    if (next) save(sessionKey, next);
    else remove(sessionKey);
  }

  function start(nextMode = mode, customPool = pool) {
    setMode(nextMode);
    save('mode', nextMode);
    setSelected(null);
    persistSession({
      deck: buildDeck(customPool, nextMode, pool),
      index: 0,
      score: 0,
      missed: [],
      total: customPool.length,
    });
  }

  function answer(option) {
    if (selected !== null || !session) return;
    setSelected(option);

    const question = session.deck[session.index];
    const wasCorrect = option === question.answer;
    setStats(recordAnswer(question.word, wasCorrect));

    persistSession({
      ...session,
      score: session.score + (wasCorrect ? 1 : 0),
      missed: wasCorrect ? session.missed : [...session.missed, question.word],
    });
  }

  function next() {
    setSelected(null);
    const nextIndex = session.index + 1;
    const finished = nextIndex >= session.deck.length;

    if (finished) {
      const entry = {
        score: session.score,
        total: session.deck.length,
        mode,
        at: Date.now(),
      };
      const nextHistory = [entry, ...history].slice(0, 20);
      setHistory(nextHistory);
      save(historyKey, nextHistory);
    }

    persistSession({ ...session, index: nextIndex });
  }

  const weakWords = pool.filter((w) => {
    const s = stats[w.ar];
    return s && s.wrong > 0 && s.wrong >= s.right;
  });

  const best = history.reduce(
    (b, h) => (b === null || h.score / h.total > b.score / b.total ? h : b),
    null
  );

  // ---- Setup screen -------------------------------------------------------
  if (!session) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Vocabulary Test</Text>
          <Text style={styles.subtitle}>
            {pool.length} words from {scopeLabel}, in random order. Every word is
            asked exactly once.
          </Text>

          {history.length > 0 && (
            <View style={styles.statsStrip}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {history[0].score}/{history[0].total}
                </Text>
                <Text style={styles.statLabel}>Last</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {best.score}/{best.total}
                </Text>
                <Text style={styles.statLabel}>Best</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{history.length}</Text>
                <Text style={styles.statLabel}>
                  {history.length === 1 ? 'Attempt' : 'Attempts'}
                </Text>
              </View>
            </View>
          )}

          <Text style={styles.label}>Direction</Text>
          {MODES.map((m) => (
            <Pressable
              key={m.id}
              onPress={() => {
                setMode(m.id);
                save('mode', m.id);
              }}
              style={[styles.modeRow, mode === m.id && styles.modeRowActive]}
            >
              <View style={[styles.radio, mode === m.id && styles.radioActive]} />
              <Text style={styles.modeLabel}>{m.label}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.primaryButton} onPress={() => start()}>
            <Text style={styles.primaryButtonText}>Start test</Text>
          </Pressable>

          {weakWords.length > 0 && (
            <Pressable
              style={styles.secondaryButton}
              onPress={() => start(mode, weakWords)}
            >
              <Text style={styles.secondaryButtonText}>
                Drill my {weakWords.length} weakest{' '}
                {weakWords.length === 1 ? 'word' : 'words'}
              </Text>
            </Pressable>
          )}

          {(history.length > 0 || Object.keys(stats).length > 0) && (
            <Pressable
              style={styles.linkButton}
              onPress={() => {
                if (!confirmingReset) {
                  setConfirmingReset(true);
                  return;
                }
                clearAll();
                setStats({});
                setHistory([]);
                setConfirmingReset(false);
              }}
            >
              <Text style={[styles.linkButtonText, confirmingReset && styles.linkDanger]}>
                {confirmingReset
                  ? 'Tap again to erase all scores and history'
                  : 'Reset saved progress'}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    );
  }

  // ---- Results screen -----------------------------------------------------
  if (session.index >= session.deck.length) {
    const { score, deck, missed } = session;
    const pct = Math.round((score / deck.length) * 100);
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {score} / {deck.length} correct
          </Text>
          <Text style={styles.subtitle}>
            {pct}% — {scopeLabel}
          </Text>

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

          <Pressable style={styles.linkButton} onPress={() => persistSession(null)}>
            <Text style={styles.linkButtonText}>Back to settings</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // ---- Question screen ----------------------------------------------------
  const question = session.deck[session.index];
  const answered = selected !== null;
  const progress = (session.index + (answered ? 1 : 0)) / session.deck.length;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          {session.index + 1} of {session.deck.length}
        </Text>
        <Text style={styles.progressText}>Score {session.score}</Text>
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
                {session.index + 1 === session.deck.length
                  ? 'See results'
                  : 'Next word'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <Pressable style={styles.linkButton} onPress={() => persistSession(null)}>
        <Text style={styles.linkButtonText}>Abandon this test</Text>
      </Pressable>
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

  statsStrip: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.accentSoft,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: { fontSize: 20, fontWeight: '700', color: colors.accent },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.muted,
    marginTop: 2,
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
  linkDanger: { color: colors.wrong, fontWeight: '700' },

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
