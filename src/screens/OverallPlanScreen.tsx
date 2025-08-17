import OverallPlanCategoryForm from '../components/OverallPlanCategoryForm';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { OverallPlanCategory } from '../types';

const OverallPlanScreen = () => {
  const { overallPlan, loading, error, saveOverallPlan, updateOverallPlanCategory, fetchOverallPlan } = useAppContext();
  // Removed: This screen is now merged into BudgetScreen.

  const handleAdd = () => {
    setEditCategory(null);
    setFormVisible(true);
  };

  const handleEdit = (category: OverallPlanCategory) => {
    setEditCategory(category);
    setFormVisible(true);
  };

  const handleDelete = async (name: string) => {
    if (!overallPlan) return;
    const updated = overallPlan.categories.filter(c => c.name !== name);
    await saveOverallPlan({ ...overallPlan, categories: updated });
    await fetchOverallPlan();
  };

  const handleSubmit = async (data: { name: string; defaultBudget: number }) => {
    if (!overallPlan) {
      await saveOverallPlan({ name: planName, userId: 'default', categories: [data] });
    } else if (editCategory) {
      await updateOverallPlanCategory(editCategory.name, data);
    } else {
      await saveOverallPlan({ ...overallPlan, categories: [...overallPlan.categories, data] });
    }
    setFormVisible(false);
    setEditCategory(null);
    await fetchOverallPlan();
  };

  const renderCategoryItem = ({ item }: { item: OverallPlanCategory }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleEdit(item)} onLongPress={() => handleDelete(item.name)}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryAmount}>${item.defaultBudget.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overall Plan</Text>
      {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ margin: 20 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>}
      {overallPlan && overallPlan.categories.length > 0 ? (
        <FlatList
          data={overallPlan.categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.list}
        />
      ) : !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No categories yet. Add your first category.</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add Category</Text>
      </TouchableOpacity>
      <OverallPlanCategoryForm
        visible={formVisible}
        onClose={() => { setFormVisible(false); setEditCategory(null); }}
        onSubmit={handleSubmit}
        initial={editCategory ? { name: editCategory.name, defaultBudget: editCategory.defaultBudget } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', padding: 20 },
  list: { padding: 16 },
  categoryItem: { backgroundColor: 'white', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryName: { fontSize: 18, fontWeight: '500', color: '#333' },
  categoryAmount: { fontSize: 16, color: '#555' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center' },
  addButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2e7d32', borderRadius: 30, paddingVertical: 12, paddingHorizontal: 20, elevation: 4 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default OverallPlanScreen;
