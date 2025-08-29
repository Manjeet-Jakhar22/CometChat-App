import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const formatList = [
  { cmd: 'bold', label: '𝐁' },
  { cmd: 'italic', label: '𝑰' },
  { cmd: 'underline', label: 'U' },
  { cmd: 'strikeThrough', label: 'S̶' },
  { cmd: 'insertUnorderedList', label: '•' },
  { cmd: 'insertOrderedList', label: '1.' },
];
type Props = {
  onFormatPress?: (cmd: string) => void;
};

const ComposerFormattingToolbar: React.FC<Props> = ({ onFormatPress }) => {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const toggleFormat = (cmd: string) => {
    const newSet = new Set(activeFormats);
    if (newSet.has(cmd)) {
      newSet.delete(cmd);
    } else {
      newSet.add(cmd);
    }
    setActiveFormats(newSet);
    onFormatPress?.(cmd);
  };

  return (
    <View style={styles.toolbar}>
      {formatList.map(({ cmd, label }) => (
        <TouchableOpacity
          key={cmd}
          onPress={() => toggleFormat(cmd)}
          style={[
            styles.button,
            activeFormats.has(cmd) && styles.activeButton,
          ]}
        >
          <Text style={[styles.label, activeFormats.has(cmd) && styles.activeLabel]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: '#F58D1F',
  },
  label: {
    color: '#000',
    fontSize: 16,
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ComposerFormattingToolbar;
