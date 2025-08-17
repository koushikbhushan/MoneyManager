import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; defaultBudget: number }) => void;
  initial?: { name: string; defaultBudget: number };
}

const OverallPlanCategoryForm: React.FC<Props> = ({ visible, onClose, onSubmit, initial }) => {
  const [name, setName] = useState(initial?.name || '');
  const [defaultBudget, setDefaultBudget] = useState(initial?.defaultBudget?.toString() || '');

  useEffect(() => {
    setName(initial?.name || '');
    setDefaultBudget(initial?.defaultBudget?.toString() || '');
  }, [initial, visible]);

  const handleSave = () => {
    if (!name || !defaultBudget) return;
    onSubmit({ name, defaultBudget: Number(defaultBudget) });
    setName('');
    setDefaultBudget('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.title}>{initial ? 'Edit' : 'Add'} Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Default Budget"
            value={defaultBudget}
            onChangeText={setDefaultBudget}
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={[styles.buttonText, { color: 'white' }]}>{initial ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  form: { backgroundColor: 'white', borderRadius: 10, padding: 20, width: 300, elevation: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 10, borderRadius: 5, backgroundColor: '#eee', minWidth: 80, alignItems: 'center' },
  saveButton: { backgroundColor: '#2e7d32' },
  buttonText: { fontWeight: 'bold' },
});

// Removed: This form is now handled in BudgetScreen.
