import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';


import { BudgetItem } from '../types';
import BudgetItemForm from '../components/BudgetItemForm';

const BudgetItemsScreen = () => {
  const { monthlyBudget, loading, error, addOrEditBudgetItem, deleteBudgetItem } = useAppContext();
  const [formVisible, setFormVisible] = useState(false);
  const [editItem, setEditItem] = useState<BudgetItem | null>(null);

  const handleAdd = () => {
    setEditItem(null);
    setFormVisible(true);
  };

  const handleEdit = (item: BudgetItem) => {
    setEditItem(item);
    setFormVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteBudgetItem(id) },
    ]);
  };


  const handleSubmit = async (data: Partial<BudgetItem>) => {
    if (editItem) {
      await addOrEditBudgetItem(data, editItem._id);
    } else {
      await addOrEditBudgetItem(data);
    }
    setFormVisible(false);
    setEditItem(null);
  };

  const renderItem = ({ item }: { item: BudgetItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleEdit(item)} onLongPress={() => handleDelete(item._id)}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.amount}>-${item.amount.toLocaleString()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.category}>{item.categoryName}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Budget Items</Text>
      {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ margin: 20 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>}
      {monthlyBudget && monthlyBudget.items.length > 0 ? (
        <FlatList
          data={[...monthlyBudget.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
        />
      ) : !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No budget items yet</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>
      <BudgetItemForm
        visible={formVisible}
        onClose={() => { setFormVisible(false); setEditItem(null); }}
        onSubmit={handleSubmit}
        initial={editItem ? {
          name: editItem.name,
          amount: editItem.amount,
          categoryName: editItem.categoryName,
          date: editItem.date,
          note: editItem.note,
        } : undefined}
        categories={monthlyBudget ? monthlyBudget.categories : []}
        key={formVisible && editItem ? editItem._id : 'add'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', padding: 20 },
  list: { padding: 16 },
  item: { backgroundColor: 'white', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '500', color: '#333' },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#e53935' },
  category: { fontSize: 14, color: '#666' },
  date: { fontSize: 14, color: '#888' },
  note: { fontSize: 13, color: '#555', marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center' },
  addButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2e7d32', borderRadius: 30, paddingVertical: 12, paddingHorizontal: 20, elevation: 4 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default BudgetItemsScreen;
