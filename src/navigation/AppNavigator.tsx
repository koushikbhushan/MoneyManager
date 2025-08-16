import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import BudgetCategoriesScreen from '../screens/BudgetCategoriesScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Budget') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'Investments') {
              iconName = focused ? 'trending-up' : 'trending-up-outline';
            }

            // You can return any component here
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e7d32',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Budget" component={BudgetCategoriesScreen} />
        <Tab.Screen name="Investments" component={InvestmentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
