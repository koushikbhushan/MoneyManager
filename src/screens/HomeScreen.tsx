import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../context/AppContext';

const HomeScreen = () => {
  const { monthlyBudget, investments } = useAppContext();

  // Calculate total budget and spent from monthlyBudget
  const totalBudget = monthlyBudget ? monthlyBudget.categories.reduce((sum, c) => sum + c.budget, 0) : 0;
  const totalSpent = monthlyBudget ? monthlyBudget.items.reduce((sum, item) => sum + item.amount, 0) : 0;
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Recent transactions (sorted by date desc)
  const recentItems = monthlyBudget ? [...monthlyBudget.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3) : [];

  // Calculate total investment value
  const totalInvestmentValue = investments.reduce((sum, investment) => sum + investment.value, 0);
  const totalInitialInvestment = investments.reduce((sum, investment) => sum + investment.initialInvestment, 0);
  const totalReturn = totalInitialInvestment > 0 
    ? ((totalInvestmentValue - totalInitialInvestment) / totalInitialInvestment) * 100 
    : 0;

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Money Manager</Text>
        <Text style={styles.headerSubtitle}>Dashboard</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Summary</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Budget</Text>
          <Text style={styles.amount}>${totalBudget.toLocaleString()}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progress, 
                  { 
                    width: `${Math.min(spentPercentage, 100)}%`,
                    backgroundColor: spentPercentage > 90 ? '#e53935' : spentPercentage > 75 ? '#ff9800' : '#2e7d32'
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{spentPercentage.toFixed(0)}% spent</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.card}>
          {recentItems.length > 0 ? (
            recentItems.map((item) => (
              <View key={item._id} style={styles.transactionItem}>
                <Text style={styles.transactionName}>{item.name} <Text style={{ color: '#888' }}>({item.categoryName})</Text></Text>
                <Text style={styles.transactionAmount}>-${item.amount.toLocaleString()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No transactions yet</Text>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Investment Overview</Text>
        <View style={styles.card}>
          {investments.length > 0 ? (
            <>
              <View style={styles.investmentSummary}>
                <View style={styles.investmentSummaryItem}>
                  <Text style={styles.investmentSummaryLabel}>Total Value</Text>
                  <Text style={styles.investmentSummaryValue}>${totalInvestmentValue.toLocaleString()}</Text>
                </View>
                <View style={styles.investmentSummaryItem}>
                  <Text style={styles.investmentSummaryLabel}>Total Return</Text>
                  <Text style={[
                    styles.investmentSummaryValue,
                    { color: totalReturn >= 0 ? '#2e7d32' : '#e53935' }
                  ]}>
                    {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                  </Text>
                </View>
              </View>
              
              {investments.slice(0, 2).map((investment) => (
                <View key={investment.id} style={styles.investmentItem}>
                  <View>
                    <Text style={styles.investmentName}>{investment.name}</Text>
                    <Text style={styles.investmentTicker}>{investment.ticker} • {investment.type}</Text>
                  </View>
                  <View style={styles.investmentValues}>
                    <Text style={styles.investmentValue}>${investment.value.toLocaleString()}</Text>
                    <Text style={[
                      styles.investmentReturn,
                      { color: investment.returnPercentage >= 0 ? '#2e7d32' : '#e53935' }
                    ]}>
                      {investment.returnPercentage >= 0 ? '+' : ''}{investment.returnPercentage.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.emptyText}>No investments yet</Text>
          )}
        </View>
      </View>
    </ScrollView>
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
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2e7d32',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2e7d32',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionName: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#e53935',
  },
  investmentSummary: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  investmentSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  investmentSummaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  investmentSummaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  investmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  investmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  investmentTicker: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  investmentValues: {
    alignItems: 'flex-end',
  },
  investmentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  investmentReturn: {
    fontSize: 14,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    padding: 20,
  },
});

export default HomeScreen;
