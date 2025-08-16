import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; budget: number; spent: number }) => void;
  initial?: { name: string; budget: number; spent: number };
}

const BudgetCategoryForm: React.FC<Props> = ({ visible, onClose, onSubmit, initial }) => {
  const [name, setName] = useState(initial?.name || '');
  const [budget, setBudget] = useState(initial?.budget?.toString() || '');
  const [spent, setSpent] = useState(initial?.spent?.toString() || '0');

  const handleSave = () => {
    if (!name || !budget) return;
    onSubmit({ name, budget: Number(budget), spent: Number(spent) });
    setName('');
    setBudget('');
    setSpent('0');
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
            placeholder="Budget Amount"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Spent Amount"
            value={spent}
            onChangeText={setSpent}
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
    minWidth: 80,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2e7d32',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default BudgetCategoryForm;
