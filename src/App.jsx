import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import NotesScreen from './components/NotesScreen';
import TestScreen from './components/TestScreen';
import { lessons, vocabFor } from './data';
import { colors } from './theme';
import { load, save } from './storage';

const TABS = [
  { id: 'notes', label: 'Notes' },
  { id: 'test', label: 'Test' },
];

export default function App() {
  // Remember where you left off between visits.
  const [tab, setTab] = useState(() => {
    const saved = load('tab', 'notes');
    return TABS.some((t) => t.id === saved) ? saved : 'notes';
  });

  const [scope, setScope] = useState(() => {
    const saved = load('scope', null);
    const valid = saved === 'all' || lessons.some((l) => l.id === saved);
    return valid ? saved : lessons[lessons.length - 1].id;
  });

  function chooseTab(id) {
    setTab(id);
    save('tab', id);
  }

  function chooseScope(id) {
    setScope(id);
    save('scope', id);
  }

  const selectedLessons = useMemo(
    () => (scope === 'all' ? lessons : lessons.filter((l) => l.id === scope)),
    [scope]
  );

  const pool = useMemo(() => vocabFor(selectedLessons), [selectedLessons]);

  const scopeLabel =
    scope === 'all' ? 'all lessons' : selectedLessons[0]?.title ?? 'all lessons';

  const scopeOptions = [
    ...lessons.map((l) => ({ id: l.id, label: l.title })),
    ...(lessons.length > 1 ? [{ id: 'all', label: 'All lessons' }] : []),
  ];

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.brand}>Arabic Intensive Course</Text>

          <View style={styles.tabs}>
            {TABS.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => chooseTab(t.id)}
                style={[styles.tab, tab === t.id && styles.tabActive]}
              >
                <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>
                  {t.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {scopeOptions.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {scopeOptions.map((opt) => (
                <Pressable
                  key={opt.id}
                  onPress={() => chooseScope(opt.id)}
                  style={[styles.chip, scope === opt.id && styles.chipActive]}
                >
                  <Text
                    style={[styles.chipText, scope === opt.id && styles.chipTextActive]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      <View style={styles.body}>
        {tab === 'notes' ? (
          <NotesScreen lessons={selectedLessons} />
        ) : (
          // Remount the test whenever the selected lessons change
          <TestScreen
            key={scope}
            pool={pool}
            scopeId={scope}
            scopeLabel={scopeLabel}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerInner: {
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  brand: { fontSize: 19, fontWeight: '700', color: colors.ink, marginBottom: 12 },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabText: { fontSize: 15, fontWeight: '600', color: colors.muted },
  tabTextActive: { color: '#fff' },
  chips: { flexDirection: 'row', gap: 8, paddingTop: 12 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.muted },
  chipTextActive: { color: colors.accent },
  body: { flex: 1 },
});
