import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BudgetItem, MonthlyBudgetCategory } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<BudgetItem>, itemId?: string) => void;
  initial?: Partial<BudgetItem>;
  categories: MonthlyBudgetCategory[];
}

const BudgetItemForm: React.FC<Props> = ({ visible, onClose, onSubmit, initial, categories }) => {
  const [name, setName] = useState(initial?.name || '');
  const [amount, setAmount] = useState(initial?.amount?.toString() || '');
  const [categoryName, setCategoryName] = useState(initial?.categoryName || (categories[0]?.name || ''));
  const [date, setDate] = useState(initial?.date ? new Date(initial.date) : new Date());
  const [note, setNote] = useState(initial?.note || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  React.useEffect(() => {
    setName(initial?.name || '');
    setAmount(initial?.amount?.toString() || '');
    setCategoryName(initial?.categoryName || (categories[0]?.name || ''));
    setDate(initial?.date ? new Date(initial.date) : new Date());
    setNote(initial?.note || '');
  }, [initial, visible]);

  const handleSave = () => {
    if (!name || !amount || !categoryName || !date) return;
    onSubmit({ name, amount: Number(amount), categoryName, date: new Date(date).toISOString(), note });
    setName('');
    setAmount('');
    setCategoryName(categories[0]?.name || '');
  setDate(new Date());
    setNote('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.title}>{initial && initial.name ? 'Edit' : 'Add'} Item</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
          <View style={styles.pickerRow}>
            <Text style={styles.pickerLabel}>Category:</Text>
            <Picker
              selectedValue={categoryName}
              style={styles.picker}
              onValueChange={setCategoryName}
            >
              {categories.map(cat => (
                <Picker.Item key={cat.name} label={cat.name} value={cat.name} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.input, { color: '#333', paddingVertical: 12 }]}>Date: {date.toISOString().slice(0,10)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event: any, selectedDate?: Date) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
          <TextInput style={styles.input} placeholder="Note (optional)" value={note} onChangeText={setNote} />
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
  form: { backgroundColor: 'white', borderRadius: 10, padding: 20, width: 320, elevation: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  pickerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pickerLabel: { fontSize: 14, marginRight: 10 },
  picker: { flex: 1, height: 40 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 10, borderRadius: 5, backgroundColor: '#eee', minWidth: 80, alignItems: 'center' },
  saveButton: { backgroundColor: '#2e7d32' },
  buttonText: { fontWeight: 'bold' },
});

export default BudgetItemForm;
