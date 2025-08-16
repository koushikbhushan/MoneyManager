import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { InvestmentType } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; ticker: string; type: InvestmentType; value: number; initialInvestment: number; returnPercentage: number }) => void;
  initial?: { name: string; ticker: string; type: InvestmentType; value: number; initialInvestment: number; returnPercentage: number };
}

const InvestmentForm: React.FC<Props> = ({ visible, onClose, onSubmit, initial }) => {
  const [name, setName] = useState(initial?.name || '');
  const [ticker, setTicker] = useState(initial?.ticker || '');
  const [type, setType] = useState<InvestmentType>(initial?.type || 'Stock');
  const [value, setValue] = useState(initial?.value?.toString() || '');
  const [initialInvestment, setInitialInvestment] = useState(initial?.initialInvestment?.toString() || '');
  const [returnPercentage, setReturnPercentage] = useState(initial?.returnPercentage?.toString() || '');

  const handleSave = () => {
    if (!name || !ticker || !type || !value || !initialInvestment || !returnPercentage) return;
    onSubmit({
      name,
      ticker,
      type,
      value: Number(value),
      initialInvestment: Number(initialInvestment),
      returnPercentage: Number(returnPercentage),
    });
    setName('');
    setTicker('');
    setType('Stock');
    setValue('');
    setInitialInvestment('');
    setReturnPercentage('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.title}>{initial ? 'Edit' : 'Add'} Investment</Text>
          <TextInput
            style={styles.input}
            placeholder="Investment Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Ticker"
            value={ticker}
            onChangeText={setTicker}
          />
          <TextInput
            style={styles.input}
            placeholder="Type (e.g. Stock, ETF)"
            value={type}
            onChangeText={t => setType(t as InvestmentType)}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Value"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Initial Investment"
            value={initialInvestment}
            onChangeText={setInitialInvestment}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Return %"
            value={returnPercentage}
            onChangeText={setReturnPercentage}
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

export default InvestmentForm;
