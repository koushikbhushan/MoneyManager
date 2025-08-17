import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../context/AppContext';
import { OverallPlanCategory, MonthlyBudgetCategory, BudgetItem } from '../types';
import BudgetCategoryForm from '../components/BudgetCategoryForm';


const BudgetScreen = () => {
  const {
    overallPlan,
    monthlyBudget,
    loading,
    error,
    saveOverallPlan,
    updateOverallPlanCategory,
    updateMonthlyBudgetCategories,
    fetchOverallPlan,
    fetchMonthlyBudget,
  } = useAppContext();
  const [formVisible, setFormVisible] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [editMode, setEditMode] = useState<'plan' | 'month'>('month');
  // Month/year state for planning per month
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  // Fetch monthly budget when month/year changes
  React.useEffect(() => {
    fetchMonthlyBudget(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear]);

  // --- Master Plan Logic ---
  const handleAddPlan = () => {
    setEditCategory(null);
    setFormVisible(true);
    setEditMode('plan');
  };
  const handleEditPlan = (category: OverallPlanCategory) => {
    setEditCategory({ name: category.name, budget: category.defaultBudget });
    setFormVisible(true);
    setEditMode('plan');
  };
  const handleDeletePlan = async (name: string) => {
    if (!overallPlan) return;
    const updated = overallPlan.categories.filter(c => c.name !== name);
    await saveOverallPlan({ ...overallPlan, categories: updated });
    await fetchOverallPlan();
  };
  const handleSubmitPlan = async (data: { name: string; budget: number }) => {
    // For plan, treat 'budget' as 'defaultBudget'
    const planData = { name: data.name, defaultBudget: data.budget };
    if (!overallPlan) {
      await saveOverallPlan({ name: 'My Plan', userId: 'default', categories: [planData] });
    } else if (editCategory) {
      await updateOverallPlanCategory(editCategory.name, planData);
    } else {
      await saveOverallPlan({ ...overallPlan, categories: [...overallPlan.categories, planData] });
    }
    setFormVisible(false);
    setEditCategory(null);
    await fetchOverallPlan();
  };

  // --- Monthly Budget Logic ---
  const handleAddMonth = () => {
    setEditCategory(null);
    setFormVisible(true);
    setEditMode('month');
  };
  const handleEditMonth = (category: MonthlyBudgetCategory) => {
    setEditCategory(category);
    setFormVisible(true);
    setEditMode('month');
  };
  const handleDeleteMonth = (name: string) => {
    if (!monthlyBudget) return;
    Alert.alert('Delete Category', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        const updated = monthlyBudget.categories.filter(c => c.name !== name);
        await updateMonthlyBudgetCategories(updated);
      } },
    ]);
  };
  const handleSubmitMonth = async (data: { name: string; budget: number }) => {
    if (!monthlyBudget) return;
    let updated;
    if (editCategory) {
      updated = monthlyBudget.categories.map(c => c.name === editCategory.name ? { ...c, ...data } : c);
    } else {
      updated = [...monthlyBudget.categories, data];
    }
    await updateMonthlyBudgetCategories(updated);
    setFormVisible(false);
  };

  // --- Monthly Summary ---
  const getMonthSummary = () => {
    if (!monthlyBudget) return { totalBudget: 0, totalSpent: 0 };
    const totalBudget = monthlyBudget.categories.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = monthlyBudget.items.reduce((sum, item) => sum + item.amount, 0);
    return { totalBudget, totalSpent };
  };
  const { totalBudget, totalSpent } = getMonthSummary();

  // --- Renderers ---
  const renderPlanItem = ({ item }: { item: OverallPlanCategory }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleEditPlan(item)} onLongPress={() => handleDeletePlan(item.name)}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryAmount}>${item.defaultBudget.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderMonthItem = ({ item }: { item: MonthlyBudgetCategory }) => {
    // Calculate spent for this category
    const spent = monthlyBudget ? monthlyBudget.items.filter(i => i.categoryName === item.name).reduce((sum, i) => sum + i.amount, 0) : 0;
    const percent = item.budget > 0 ? Math.min(spent / item.budget, 1) : 0;
    const overspent = spent > item.budget;
    return (
      <TouchableOpacity style={styles.categoryItem} onPress={() => handleEditMonth(item)} onLongPress={() => handleDeleteMonth(item.name)}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={[styles.categoryAmount, overspent && { color: '#e53935', fontWeight: 'bold' }]}>${item.budget.toFixed(2)}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${Math.min(100, percent * 100)}%`, backgroundColor: overspent ? '#e53935' : '#2e7d32' }]} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 12, color: '#555' }}>Spent: ${spent.toFixed(2)}</Text>
          {overspent && <Text style={{ fontSize: 12, color: '#e53935', fontWeight: 'bold' }}>Overspent!</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Budget</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.toggleLabel}>Year:</Text>
          <TouchableOpacity onPress={() => setSelectedYear(selectedYear - 1)}><Text style={styles.toggleLabel}>◀</Text></TouchableOpacity>
          <Text style={styles.toggleLabel}>{selectedYear}</Text>
          <TouchableOpacity onPress={() => setSelectedYear(selectedYear + 1)}><Text style={styles.toggleLabel}>▶</Text></TouchableOpacity>
          <Text style={styles.toggleLabel}>Month:</Text>
          <TouchableOpacity onPress={() => setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1)}><Text style={styles.toggleLabel}>◀</Text></TouchableOpacity>
          <Text style={styles.toggleLabel}>{selectedMonth}</Text>
          <TouchableOpacity onPress={() => setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1)}><Text style={styles.toggleLabel}>▶</Text></TouchableOpacity>
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Edit Master Plan</Text>
          <Switch
            value={editMode === 'plan'}
            onValueChange={v => setEditMode(v ? 'plan' : 'month')}
          />
          <Text style={styles.toggleLabel}>Edit This Month</Text>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ margin: 20 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>}
  {editMode === 'plan' ? (
  <>
          <Text style={styles.sectionTitle}>Master Plan Categories</Text>
          {overallPlan && overallPlan.categories.length > 0 ? (
            <FlatList
              data={overallPlan.categories}
              renderItem={renderPlanItem}
              keyExtractor={item => item.name}
              contentContainerStyle={styles.listContainer}
            />
          ) : !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No master plan categories yet</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlan}>
            <Text style={styles.addButtonText}>+ Add Plan Category</Text>
          </TouchableOpacity>
          <BudgetCategoryForm
            visible={formVisible && editMode === 'plan'}
            onClose={() => setFormVisible(false)}
            onSubmit={handleSubmitPlan}
            initial={editCategory ? { name: editCategory.name, budget: editCategory.budget } : undefined}
          />
        </>
      ) : (
        <>
          {/* Monthly summary */}
          <View style={{ padding: 16, backgroundColor: '#e8f5e9', borderRadius: 10, margin: 16, marginBottom: 0 }}>
            <Text style={{ fontWeight: 'bold', color: '#2e7d32' }}>This Month's Summary</Text>
            <Text>Total Budget: ${totalBudget.toFixed(2)}</Text>
            <Text>Total Spent: ${totalSpent.toFixed(2)}</Text>
            <Text>Remaining: ${(totalBudget - totalSpent).toFixed(2)}</Text>
          </View>
          <Text style={styles.sectionTitle}>This Month's Categories</Text>
          {monthlyBudget && monthlyBudget.categories.length > 0 ? (
            <FlatList
              data={monthlyBudget.categories}
              renderItem={renderMonthItem}
              keyExtractor={item => item.name}
              contentContainerStyle={styles.listContainer}
            />
          ) : !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories for this month yet</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.addButton} onPress={handleAddMonth}>
            <Text style={styles.addButtonText}>+ Add Monthly Category</Text>
          </TouchableOpacity>
          <BudgetCategoryForm
            visible={formVisible && editMode === 'month'}
            onClose={() => setFormVisible(false)}
            onSubmit={handleSubmitMonth}
            initial={editCategory ? { name: editCategory.name, budget: editCategory.budget } : undefined}
            key={formVisible && editMode === 'month' && editCategory ? editCategory.name : 'add'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerRow: { padding: 20, backgroundColor: '#2e7d32' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  toggleLabel: { color: 'white', marginHorizontal: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', margin: 16 },
  listContainer: { padding: 16 },
  categoryItem: { backgroundColor: 'white', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryName: { fontSize: 18, fontWeight: '500', color: '#333' },
  categoryAmount: { fontSize: 16, color: '#555' },
  progressBarBg: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center' },
  addButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2e7d32', borderRadius: 30, paddingVertical: 12, paddingHorizontal: 20, elevation: 4 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default BudgetScreen;
