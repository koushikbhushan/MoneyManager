
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../context/AppContext';
import { Investment } from '../types';
import InvestmentForm from '../components/InvestmentForm';

const InvestmentsScreen = () => {
  const { investments, loading, error, addInvestment, updateInvestment, deleteInvestment } = useAppContext();
  const [formVisible, setFormVisible] = useState(false);
  const [editInvestment, setEditInvestment] = useState<Investment | null>(null);

  const handleAdd = () => {
    setEditInvestment(null);
    setFormVisible(true);
  };

  const handleEdit = (investment: Investment) => {
    setEditInvestment(investment);
    setFormVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Investment', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteInvestment(id) },
    ]);
  };

  const handleSubmit = async (data: { name: string; ticker: string; type: string; value: number; initialInvestment: number; returnPercentage: number }) => {
    const investmentData = { ...data, type: data.type as any };
    if (editInvestment) {
      await updateInvestment({ ...editInvestment, ...investmentData });
    } else {
      await addInvestment(investmentData);
    }
    setFormVisible(false);
  };

  const renderInvestmentItem = ({ item }: { item: Investment }) => {
    const isPositive = item.returnPercentage >= 0;
    return (
      <TouchableOpacity style={styles.investmentItem} onPress={() => handleEdit(item)} onLongPress={() => handleDelete(item.id)}>
        <View style={styles.investmentHeader}>
          <View>
            <Text style={styles.investmentName}>{item.name}</Text>
            <Text style={styles.investmentTicker}>{item.ticker} • {item.type}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.investmentValue}>${item.value.toLocaleString()}</Text>
            <Text style={[
              styles.returnPercentage,
              { color: isPositive ? '#2e7d32' : '#e53935' }
            ]}>
              {isPositive ? '+' : ''}{item.returnPercentage.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.investmentDetails}>
          <Text style={styles.detailLabel}>Initial Investment</Text>
          <Text style={styles.detailValue}>${item.initialInvestment.toLocaleString()}</Text>
        </View>
        <View style={styles.investmentDetails}>
          <Text style={styles.detailLabel}>Current Value</Text>
          <Text style={styles.detailValue}>${item.value.toLocaleString()}</Text>
        </View>
        <View style={styles.investmentDetails}>
          <Text style={styles.detailLabel}>Gain/Loss</Text>
          <Text style={[
            styles.detailValue,
            { color: isPositive ? '#2e7d32' : '#e53935' }
          ]}>
            ${(item.value - item.initialInvestment).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const totalValue = investments.reduce((sum, investment) => sum + investment.value, 0);
  const totalInitial = investments.reduce((sum, investment) => sum + investment.initialInvestment, 0);
  const totalReturn = totalInitial > 0 ? ((totalValue - totalInitial) / totalInitial) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Investments</Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Value</Text>
          <Text style={styles.summaryValue}>${totalValue.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Return</Text>
          <Text style={[
            styles.summaryValue,
            { color: totalReturn >= 0 ? '#2e7d32' : '#e53935' }
          ]}>
            {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
          </Text>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ margin: 20 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>}
      {investments.length > 0 ? (
        <FlatList
          data={investments}
          renderItem={renderInvestmentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No investments yet</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add Investment</Text>
      </TouchableOpacity>
      <InvestmentForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSubmit}
        initial={editInvestment ? {
          name: editInvestment.name,
          ticker: editInvestment.ticker,
          type: editInvestment.type,
          value: editInvestment.value,
          initialInvestment: editInvestment.initialInvestment,
          returnPercentage: editInvestment.returnPercentage,
        } : undefined}
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
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  investmentItem: {
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
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  investmentName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  investmentTicker: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  investmentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  returnPercentage: {
    fontSize: 14,
    marginTop: 2,
  },
  investmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
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

export default InvestmentsScreen;
