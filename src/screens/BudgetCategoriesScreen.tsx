
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../context/AppContext';
import { BudgetCategory } from '../types';
import BudgetCategoryForm from '../components/BudgetCategoryForm';

const BudgetCategoriesScreen = () => {
  const { budgetCategories, loading, error, addBudgetCategory, updateBudgetCategory, deleteBudgetCategory } = useAppContext();
  const [formVisible, setFormVisible] = useState(false);
  const [editCategory, setEditCategory] = useState<BudgetCategory | null>(null);

  const handleAdd = () => {
    setEditCategory(null);
    setFormVisible(true);
  };

  const handleEdit = (category: BudgetCategory) => {
    setEditCategory(category);
    setFormVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Category', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteBudgetCategory(id) },
    ]);
  };

  const handleSubmit = async (data: { name: string; budget: number; spent: number }) => {
    if (editCategory) {
      await updateBudgetCategory({ ...editCategory, ...data });
    } else {
      await addBudgetCategory(data);
    }
    setFormVisible(false);
  };

  const renderCategoryItem = ({ item }: { item: BudgetCategory }) => {
    const percentage = (item.spent / item.budget) * 100;
    return (
      <TouchableOpacity style={styles.categoryItem} onPress={() => handleEdit(item)} onLongPress={() => handleDelete(item.id)}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryAmount}>
            ${item.spent.toFixed(2)} / ${item.budget.toFixed(2)}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progress, 
                { 
                  width: `${percentage}%`,
                  backgroundColor: percentage > 90 ? '#e53935' : percentage > 75 ? '#ff9800' : '#2e7d32'
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{percentage.toFixed(0)}% spent</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Categories</Text>
      </View>
      {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ margin: 20 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>}
      {budgetCategories.length > 0 ? (
        <FlatList
          data={budgetCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No budget categories yet</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add Category</Text>
      </TouchableOpacity>
      <BudgetCategoryForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSubmit}
        initial={editCategory ? { name: editCategory.name, budget: editCategory.budget, spent: editCategory.spent } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2e7d32',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  categoryItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  categoryAmount: {
    fontSize: 16,
    color: '#555',
  },
  progressContainer: {
    marginTop: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2e7d32',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BudgetCategoriesScreen;
